<template>
  <fragment>
    <v-layout>
      <v-flex xs6>
        <v-layout align-center>
          <v-flex xs6 md4>
            <v-select
              v-model="from"
              :hint="`${from.state}, ${from.abbr}`"
              :items="languagesFrom"
              item-text="state"
              item-value="abbr"
              persistent-hint
              return-object
              single-line
              @change="updateListLanguagesFrom"
              class="mb-3"
            ></v-select>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex shrink>
            <voice-pronunciation :text="inputText" :lang="from.abbr"></voice-pronunciation>
            <voice-recorder
              @onResultVoiceRecorder="handleResultVoiceRecorder"
              :from="from"
              :to="to"
            ></voice-recorder>
            <v-btn icon @click="isShowKeyBoard = !isShowKeyBoard">
              <v-icon :color="isShowKeyBoard ? 'red' : 'black'">keyboard</v-icon>
            </v-btn>
            <v-btn
              :disabled="translateResponse.pending || getDictionaryResponse.pending"
              :loading="translateResponse.pending || getDictionaryResponse.pending"
              @click="switchLanguages(); getTranslateAndDictionary()"
              icon
            >
              <v-icon>fas fa-exchange-alt</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-textarea
          ref="areaInput"
          outline
          clearable
          counter
          auto-grow
          @input="delay(getTranslateAndDictionary,delayTranslate)"
          :label="from.state"
          v-model="inputText"
        ></v-textarea>
        <dictionary-from-lang @clickChoseSyn="handleClickChoseWord"></dictionary-from-lang>
      </v-flex>
      <v-flex xs6>
        <v-layout align-center>
          <v-flex xs6 md4>
            <v-select
              v-model="to"
              :hint="`${to.state}, ${to.abbr}`"
              :items="languagesTo"
              item-text="state"
              item-value="abbr"
              persistent-hint
              return-object
              single-line
              @change="updateListLanguagesTo();inputText && getTranslateAndDictionary()"
              class="mb-3"
            ></v-select>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex shrink>
            <voice-pronunciation :text="outputText" :lang="to.abbr"></voice-pronunciation>
          </v-flex>
        </v-layout>
        <v-textarea
          outline
          counter
          readonly
          auto-grow
          :placeholder="translateResponse.pending ? 'Loading' : ''"
          :label="to.state"
          v-model="outputText"
        ></v-textarea>
        <dictionary-translate
          @clickChoseWord="handleClickChoseWord"
          @clickChoseWordAnotherLang="switchLanguages(); handleClickChoseWord($event)"
        ></dictionary-translate>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs10 md8 lg6>
        <virtual-keyboard
          v-show="isShowKeyBoard"
          :inputText="inputText"
          @onChange="handleOnChangeVirtualKeyboard"
          @onEnter="getTranslateAndDictionary()"
        ></virtual-keyboard>
      </v-flex>
    </v-layout>
  </fragment>
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex';
import VirtualKeyboard from '../components/VirtualKeyboard.vue';
import { LANGUAGES, DELAY_TRANSLATE } from '../constants';
import { checkItemsInLocalStorage } from '../helpers';
import VoiceRecorder from '../components/VoiceRecorder.vue';
import VoicePronunciation from '../components/VoicePronunciation.vue';
import DictionaryTranslate from '../components/DictionaryTranslate.vue';
import DictionaryFromLang from '../components/DictionaryFromLang.vue';

export default {
  name: 'Dashboard',
  components: {
    VoiceRecorder, DictionaryTranslate, DictionaryFromLang, VoicePronunciation, VirtualKeyboard,
  },
  data: () => ({
    languagesFrom: LANGUAGES,
    languagesTo: LANGUAGES,
    delayTimer: 0,
    delayTranslate: DELAY_TRANSLATE,
    isShowKeyBoard: false,
  }),
  created() {
    this.runTranslateQueryUrl(this.$route.query);
  },
  computed: {
    ...mapState('userModule', ['user']),
    ...mapState('translateModule', ['outputText', 'translateResponse']),
    ...mapState('dictionaryModule', ['getDictionaryResponse']),
    inputText: {
      get() {
        return this.$store.state.translateModule.inputText;
      },
      set(text) {
        this.$store.commit('translateModule/updateInputText', text);
      },
    },
    from: {
      get() {
        return this.$store.state.translateModule.from;
      },
      set(lang) {
        this.$store.commit('translateModule/updateFrom', lang);
      },
    },
    to: {
      get() {
        return this.$store.state.translateModule.to;
      },
      set(lang) {
        this.$store.commit('translateModule/updateTo', lang);
      },
    },
  },
  methods: {
    ...mapActions('translateModule', ['translate']),
    ...mapActions('dictionaryModule', ['getDictionary']),
    ...mapMutations('dictionaryModule', ['clearDictionaries']),
    ...mapMutations('translateModule', ['clearOutputText', 'switchChosenLanguages']),
    async getTranslateAndDictionary() {
      if (this.inputText) {
        const isTokensAndExpiresIn = checkItemsInLocalStorage(['refreshToken', 'accessToken', 'expiresIn']);
        if (isTokensAndExpiresIn && localStorage.getItem('expiresIn') < (new Date().getTime() + 10000) / 1000) {
          await this.$store.dispatch('userModule/updateTokens');
        }
        this.translate({ text: this.inputText, from: this.from.abbr, to: this.to.abbr });
        this.getDictionary({ text: this.inputText, from: this.from.abbr, to: this.to.abbr });
        this.$router.push({ path: 'dashboard', query: { text: this.inputText, from: this.from.abbr, to: this.to.abbr } });
      }
    },
    delay(callback, ms) {
      clearTimeout(this.delayTimer);
      this.delayTimer = setTimeout(() => {
        callback();
      }, ms);
    },
    updateListLanguagesFrom() {
      this.languagesTo = LANGUAGES.map((lang) => {
        if (lang.abbr === this.from.abbr) {
          return { ...lang, disabled: true };
        }
        return lang;
      });
    },
    updateListLanguagesTo() {
      this.languagesFrom = LANGUAGES.map((lang) => {
        if (lang.abbr === this.to.abbr) {
          return { ...lang, disabled: true };
        }
        return lang;
      });
    },
    switchLanguages() {
      [this.languagesFrom, this.languagesTo] = [this.languagesTo, this.languagesFrom];
      this.switchChosenLanguages();
    },
    handleResultVoiceRecorder(text) {
      this.inputText = text;
      this.getTranslateAndDictionary();
    },
    handleClickChoseWord(text) {
      this.inputText = text;
      this.getTranslateAndDictionary();
    },
    handleOnChangeVirtualKeyboard(text) {
      this.inputText = text;
    },
    runTranslateQueryUrl(query) {
      const { text, to, from } = query;
      if (text && to && from) {
        const resFrom = this.languagesFrom.find(lang => lang.abbr === from);
        const resTo = this.languagesTo.find(lang => lang.abbr === to);
        if (!resFrom || !resTo) {
          this.$router.push('dashboard');
        } else {
          this.to = resTo;
          this.from = resFrom;
          this.inputText = text;
          this.getTranslateAndDictionary();
        }
      } else {
        this.inputText = '';
        this.clearOutputText();
        this.clearDictionaries();
      }
      this.updateListLanguagesTo();
      this.updateListLanguagesFrom();
    },
  },
  watch: {
    inputText(val) {
      if (!val) {
        this.clearOutputText();
        this.clearDictionaries();
        this.$router.push({ path: 'dashboard', query: { } });
      }
    },
    '$route.query': function (query) {
      this.runTranslateQueryUrl(query);
    },
  },
};
</script>

<style lang="sass">
  .theme--light.v-list.no-bg
    background: none;
</style>
