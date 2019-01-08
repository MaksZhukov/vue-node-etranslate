<template>
  <v-layout>
    <v-flex xs6>
      <v-layout align-center>
        <v-flex xs6 md4>
          <v-select
            v-model="from"
            :hint="`${from.state}, ${from.abbr}`"
            :items="languages"
            item-text="state"
            item-value="abbr"
            persistent-hint
            return-object
            single-line
            class="mb-3"
          ></v-select>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex shrink>
          <audio-recorder :from="from" :to="to"></audio-recorder>
          <v-btn
            :disabled="translateResponse.pending || getDictionaryResponse.pending"
            :loading="translateResponse.pending || getDictionaryResponse.pending"
            @click="switchLanguages(); handleInput(false)"
            icon
          >
            <v-icon>fas fa-exchange-alt</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-textarea
        outline
        clearable
        counter
        @input="!delay && handleInput(true)"
        :label="from.state"
        v-model="inputText"
      ></v-textarea>
      <v-list three-line class="no-bg">
        <v-list-tile-content
          v-for="(item,key) in dictionaryFromLang"
          :key="key"
        >
          <v-list-tile-title
            class="subheading"
          >{{item.text}} [{{item.ts}}] {{item.pos}}</v-list-tile-title>
          <template v-for="(itemTr,keyTr) in item.tr">
            <v-list-tile-sub-title
              class="text--primary"
              :key="key + 'tr' + keyTr"
            >
              {{++keyTr}}
              <span
                class="teal--text"
                :style="{ cursor: 'pointer'}"
                @click="handleChoseSyn(itemTr.text)"
              >{{ itemTr.text }}</span>
              <span
                class="teal--text"
                :style="{ cursor: 'pointer'}"
                v-for="(syn,keySyn) in itemTr.syn"
                @click="handleChoseSyn(syn.text)"
                :key="key + 'syn' + keySyn"
              >{{itemTr.syn.length ===1 || itemTr.syn.length !==keySyn ? ', ': ''}}{{syn.text}}</span>
              <template v-if="itemTr.mean">
                (
                <span
                  class="teal--text"
                  :style="{ cursor: 'pointer'}"
                  v-for="(mean,keyMean) in itemTr.mean"
                  :key="key + 'mean' + keyMean"
                  @click="handleChoseSyn(mean.text)"
                >{{mean.text}}{{itemTr.mean.length !==1 && itemTr.mean.length - 1 !==keyMean ? ', ': ''}}</span>
                )
              </template>
            </v-list-tile-sub-title>
            <v-list-tile-sub-title
              class="pl-3"
              v-for="(ex,keyEx) in itemTr.ex"
              :key="key + ex.text + keyEx"
            >{{ex.text}} - {{ex.tr[0].text}}</v-list-tile-sub-title>
          </template>
        </v-list-tile-content>
      </v-list>
    </v-flex>
    <v-flex xs6>
      <v-layout align-center>
        <v-flex xs6 md4>
          <v-select
            v-model="to"
            :hint="`${to.state}, ${to.abbr}`"
            :items="languages"
            item-text="state"
            item-value="abbr"
            persistent-hint
            return-object
            single-line
            @change="inputText && translate({text: inputText, from: from.abbr, to: to.abbr})"
            class="mb-3"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-textarea
        outline
        counter
        readonly
        :placeholder="translateResponse.pending ? 'Loading' : ''"
        :label="to.state"
        v-model="outputText"
      ></v-textarea>
      <v-list three-line class="no-bg">
        <v-list-tile-content v-for="(item,key) in dictionary" :key="key">
          <v-list-tile-title
            class="subheading"
          >{{item.text}} [{{item.ts}}] {{item.pos}}</v-list-tile-title>
          <template v-for="(itemTr,keyTr) in item.tr">
            <v-list-tile-sub-title
              class="text--primary"
              :key="key + 'tr' + keyTr"
            >
              {{++keyTr}}
              <span
                class="teal--text"
                :style="{ cursor: 'pointer'}"
                @click="switchLanguages(); handleChoseSyn(itemTr.text)"
              >{{ itemTr.text }}</span>
              <span
                class="teal--text"
                :style="{ cursor: 'pointer'}"
                v-for="(syn,keySyn) in itemTr.syn"
                @click="switchLanguages(); handleChoseSyn(syn.text)"
                :key="key + 'syn' + keySyn"
              >{{itemTr.syn.length ===1 || itemTr.syn.length !==keySyn ? ', ': ''}}{{syn.text}}</span>
              <template v-if="itemTr.mean">
                (
                <span
                  class="teal--text"
                  :style="{ cursor: 'pointer'}"
                  v-for="(mean,keyMean) in itemTr.mean"
                  :key="key + 'mean' + keyMean"
                  @click="handleChoseSyn(mean.text)"
                >{{mean.text}}{{itemTr.mean.length !==1 && itemTr.mean.length - 1 !==keyMean ? ', ': ''}}</span>
                )
              </template>
            </v-list-tile-sub-title>
            <v-list-tile-sub-title
              class="pl-3"
              v-for="(ex,keyEx) in itemTr.ex"
              :key="key + ex.text + keyEx"
            >{{ex.text}} - {{ex.tr[0].text}}</v-list-tile-sub-title>
          </template>
        </v-list-tile-content>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex';
import { LANGUAGES, DELAY_TRANSLATE } from '../constants';
import { delay, checkItemsInLocalStorage } from '../helpers';
import AudioRecorder from '../components/AudioRecorder.vue';

export default {
  name: 'Dashboard',
  components: { AudioRecorder },
  data: () => ({
    languages: LANGUAGES,
    delay: null,
  }),
  computed: {
    ...mapState('userModule', ['user']),
    ...mapState('translateModule', ['outputText', 'translateResponse']),
    ...mapState('dictionaryModule', ['dictionary', 'dictionaryFromLang', 'getDictionaryResponse']),
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
    ...mapMutations('translateModule', ['clearOutputText', 'switchLanguages']),
    async handleInput(isDelay) {
      if (isDelay) {
        this.delay = DELAY_TRANSLATE;
        await delay(this.delay);
      }
      if (this.inputText) {
        const isTokensAndExpiresIn = checkItemsInLocalStorage(['refreshToken', 'accessToken', 'expiresIn']);
        if (isTokensAndExpiresIn && localStorage.getItem('expiresIn') < (new Date().getTime() + 10000) / 1000) {
          await this.$store.dispatch('userModule/updateTokens');
        }
        this.translate({ text: this.inputText, from: this.from.abbr, to: this.to.abbr });
        this.getDictionary({ text: this.inputText, from: this.from.abbr, to: this.to.abbr });
      }
      this.delay = null;
    },
    handleChoseSyn(text) {
      this.inputText = text;
      this.handleInput(false);
    },
  },
  watch: {
    inputText(val) {
      if (!val) {
        this.clearOutputText();
        this.clearDictionaries();
      }
    },
  },
};
</script>

<style lang="sass">
  .theme--light.v-list
    background: none;
</style>
