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
          <v-btn @click="switchLanguages()" icon>
            <v-icon>fas fa-exchange-alt</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-textarea
        outline
        clearable
        counter
        @input="!delay && handleInput()"
        :label="from.state"
        v-model="inputText"
      ></v-textarea>
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
    </v-flex>
  </v-layout>
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex';
import { LANGUAGES, DELAY_TRANSLATE } from '../constants';
import { delay } from '../helpers';
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
    ...mapMutations('translateModule', ['clearOutputText', 'switchLanguages']),
    async handleInput() {
      this.delay = DELAY_TRANSLATE;
      await delay(this.delay);
      if (this.inputText) {
        this.translate({ text: this.inputText, from: this.from.abbr, to: this.to.abbr });
      }
      this.delay = null;
    },
  },
  watch: {
    inputText(val) {
      if (!val) {
        this.clearOutputText();
      }
    },
  },
};
</script>

<style lang="sass">

</style>
