<template>
  <fragment>
    <v-layout>
      <v-flex xs6>
        <v-layout align-center>
          <v-flex xs6 md4>
            <v-select
              v-model="textLang"
              :hint="`${textLang.name}, ${textLang.abbr}`"
              :items="languagesTextLang"
              item-text="name"
              item-value="abbr"
              persistent-hint
              return-object
              single-line
              @change="updateListLanguagesTextLang(); getTranslateAndDictionary()"
              abbr
              class="mb-3"
            ></v-select>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex shrink>
            <voice-pronunciation
              :voices="voices"
              :text="inputText"
              :lang="textLang.abbr"
            ></voice-pronunciation>
            <voice-recorder @onResultVoiceRecorder="handleResultVoiceRecorder"></voice-recorder>
            <v-tooltip bottom>
              <v-btn
                slot="activator"
                icon
                @click="isShowKeyboard = !isShowKeyboard"
                :disabled="disabledKeyboard"
              >
                <v-icon :color="isShowKeyboard ? 'red' : 'black'">keyboard</v-icon>
              </v-btn>Show keyboard
            </v-tooltip>
            <v-tooltip bottom>
              <v-btn
                slot="activator"
                :disabled="translateResponse.pending || getDictionaryResponse.pending"
                :loading="translateResponse.pending || getDictionaryResponse.pending"
                @click="switchLanguages(); getTranslateAndDictionary()"
                icon
              >
                <v-icon>fas fa-exchange-alt</v-icon>
              </v-btn>Swap languages
            </v-tooltip>
          </v-flex>
        </v-layout>
        <v-textarea
          ref="areaInput"
          outline
          clearable
          counter
          auto-grow
          @input="delay(getTranslateAndDictionary,delayTranslate)"
          :label="textLang.name"
          v-model="inputText"
        ></v-textarea>
        <dictionary-text-lang @clickChoseSyn="handleClickChoseWord"></dictionary-text-lang>
      </v-flex>
      <v-flex xs6>
        <v-layout align-center>
          <v-flex xs6 md4>
            <v-select
              v-model="translateLang"
              :hint="`${translateLang.name}, ${translateLang.abbr}`"
              :items="languagesTranslateLang"
              item-text="name"
              item-value="abbr"
              persistent-hint
              return-object
              single-line
              @change="updateListLanguagesTranslateLang(); getTranslateAndDictionary()"
              class="mb-3"
            ></v-select>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex shrink>
            <voice-pronunciation
              :voices="voices"
              :text="outputText"
              :lang="translateLang.abbr"
            ></voice-pronunciation>
          </v-flex>
        </v-layout>
        <v-textarea
          :append-icon="!outputText ? '' : getUserDictionaryWord(inputText) ?
           'star': 'star_border'"
          :append-icon-cb="handleClickAppendIcon"
          outline
          counter
          readonly
          auto-grow
          :placeholder="translateResponse.pending ? 'Loading' : ''"
          :label="translateLang.name"
          v-model="outputText"
        ></v-textarea>
        <dictionary-translate-lang
          @clickChoseWord="handleClickChoseWord"
          @clickChoseWordAnotherLang="switchLanguages(); handleClickChoseWord($event)"
        ></dictionary-translate-lang>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs10 md8 lg6>
        <virtual-keyboard
          v-show="isShowKeyboard"
          :inputText="inputText"
          :translateLang="textLang.abbr"
          @onChange="handleOnChangeVirtualKeyboard"
          @onEnter="handleOnEnterVirtualKeyboard"
          @supportLang="handleSupportLang"
        ></virtual-keyboard>
      </v-flex>
    </v-layout>
  </fragment>
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex';
import VirtualKeyboard from '../components/VirtualKeyboard.vue';
import { LANGUAGES, DELAY_TRANSLATE } from '../constants';
import VoiceRecorder from '../components/VoiceRecorder.vue';
import VoicePronunciation from '../components/VoicePronunciation.vue';
import DictionaryTextLang from '../components/DictionaryTextLang.vue';
import DictionaryTranslateLang from '../components/DictionaryTranslateLang.vue';

export default {
  name: 'Dashboard',
  components: {
    VoiceRecorder, DictionaryTextLang, DictionaryTranslateLang, VoicePronunciation, VirtualKeyboard,
  },
  data: () => ({
    languagesTextLang: LANGUAGES,
    languagesTranslateLang: LANGUAGES,
    delayTimer: 0,
    delayTranslate: DELAY_TRANSLATE,
    isShowKeyboard: false,
    disabledKeyboard: false,
    voices: [],
  }),
  created() {
    this.getUserDictionary();
    this.runTranslateQueryUrl(this.$route.query);
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = this.handleVoicesChanged;
    }
  },
  computed: {
    ...mapState('userModule', ['user']),
    ...mapState('translateModule', ['translateResponse']),
    ...mapState('dictionaryModule', ['getDictionaryResponse']),
    ...mapState('userDictionaryModule', ['userDictionary']),
    inputText: {
      get() {
        return this.$store.state.translateModule.inputText;
      },
      set(text) {
        this.$store.commit('translateModule/updateInputText', text);
      },
    },
    outputText: {
      get() {
        return this.$store.state.translateModule.outputText;
      },
      set(text) {
        this.$store.commit('translateModule/updateOutputText', text);
      },
    },
    textLang: {
      get() {
        return this.$store.state.translateModule.textLang;
      },
      set(lang) {
        this.$store.commit('translateModule/updateTextLang', lang);
      },
    },
    translateLang: {
      get() {
        return this.$store.state.translateModule.translateLang;
      },
      set(lang) {
        this.$store.commit('translateModule/updateTranslateLang', lang);
      },
    },
  },
  methods: {
    ...mapActions('translateModule', ['translate']),
    ...mapActions('dictionaryModule', ['getDictionary']),
    ...mapActions('userDictionaryModule', ['addToUserDictionary', 'removeFromUserDictionary', 'getUserDictionary']),
    ...mapMutations('dictionaryModule', ['clearDictionaries']),
    ...mapMutations('translateModule', ['clearOutputText', 'switchChosenLanguages']),
    async getTranslateAndDictionary() {
      if (this.inputText) {
        this.translate({
          text: this.inputText,
          textLang: this.textLang.abbr,
          translateLang: this.translateLang.abbr,
        });
        this.getDictionary({
          text: this.inputText,
          textLang: this.textLang.abbr,
          translateLang: this.translateLang.abbr,
        });
        this.$router.push({
          path: 'dashboard',
          query: {
            text: this.inputText,
            textLang: this.textLang.abbr,
            translateLang: this.translateLang.abbr,
          },
        });
      }
    },
    delay(callback, ms) {
      clearTimeout(this.delayTimer);
      this.delayTimer = setTimeout(() => {
        callback();
      }, ms);
    },
    updateListLanguagesTextLang() {
      this.languagesTranslateLang = LANGUAGES.map((lang) => {
        if (lang.abbr === this.textLang.abbr) {
          return { ...lang, disabled: true };
        }
        return lang;
      });
    },
    updateListLanguagesTranslateLang() {
      this.languagesTextLang = LANGUAGES.map((lang) => {
        if (lang.abbr === this.translateLang.abbr) {
          return { ...lang, disabled: true };
        }
        return lang;
      });
    },
    switchLanguages() {
      [this.languagesTextLang,
        this.languagesTranslateLang] = [this.languagesTranslateLang, this.languagesTextLang];
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
    handleOnEnterVirtualKeyboard() {
      this.getTranslateAndDictionary();
      this.$router.push({
        path: 'dashboard',
        query: {
          text: this.inputText,
          textLang: this.textLang.abbr,
          translateLang: this.translateLang.abbr,
        },
      });
    },
    handleSupportLang(support) {
      if (support) {
        this.disabledKeyboard = false;
      } else {
        this.isShowKeyboard = false;
        this.disabledKeyboard = true;
      }
    },
    handleClickAppendIcon() {
      const wordD = this.getUserDictionaryWord(this.inputText);
      if (wordD) {
        this.removeFromUserDictionary(wordD.id);
      } else {
        this.addToUserDictionary({
          text: this.inputText,
          translate: this.outputText,
          textLang: this.textLang.abbr,
          translateLang: this.translateLang.abbr,
        });
      }
    },
    getUserDictionaryWord(word) {
      return this.userDictionary.find(dWord => dWord.text === word);
    },
    runTranslateQueryUrl(query) {
      const { text, translateLang, textLang } = query;
      if (text !== undefined && translateLang && textLang) {
        const resTextLang = this.languagesTextLang.find(lang => lang.abbr === textLang);
        const resTranslateLang = this.languagesTranslateLang.find(
          lang => lang.abbr === translateLang,
        );
        if (!resTextLang || !resTranslateLang) {
          this.$router.push('dashboard');
        } else {
          this.translateLang = resTranslateLang;
          this.textLang = resTextLang;
          this.inputText = text;
          this.getTranslateAndDictionary();
        }
      } else {
        this.inputText = '';
        this.clearOutputText();
        this.clearDictionaries();
      }
      this.updateListLanguagesTranslateLang();
      this.updateListLanguagesTextLang();
    },
    handleVoicesChanged() {
      this.voices = window.speechSynthesis.getVoices();
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
    textLang(val) {
      this.$router.push({
        path: 'dashboard',
        query: {
          text: this.inputText,
          textLang: val.abbr,
          translateLang: this.translateLang.abbr,
        },
      });
    },
    translateLang(val) {
      this.$router.push({
        path: 'dashboard',
        query: {
          text: this.inputText,
          textLang: this.textLang.abbr,
          translateLang: val.abbr,
        },
      });
    },
  },
};
</script>

<style lang="sass">
  .theme--light.v-list.no-bg
    background: none;
</style>
