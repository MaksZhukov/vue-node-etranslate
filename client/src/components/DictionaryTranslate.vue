<template>
  <v-list three-line class="no-bg">
    <v-list-tile-content v-for="(item,key) in dictionary" :key="key">
      <v-list-tile-title
        class="subheading"
      >{{item.text}} [{{item.ts}}] {{item.pos}}</v-list-tile-title>
      <template v-for="(itemTr,keyTr) in item.tr">
        <v-list-tile-sub-title class="text--primary" :key="key + 'tr' + keyTr">
          {{++keyTr}}
          <span
            class="teal--text"
            :style="{ cursor: 'pointer'}"
            @click="clickChoseWordAnotherLang(itemTr.text)"
          >{{ itemTr.text }}</span>
          <span
            class="teal--text"
            :style="{ cursor: 'pointer'}"
            v-for="(syn,keySyn) in itemTr.syn"
            @click="clickChoseWordAnotherLang(syn.text)"
            :key="key + 'syn' + keySyn"
          >{{itemTr.syn.length ===1 || itemTr.syn.length !==keySyn ? ', ': ''}}{{syn.text}}</span>
          <template v-if="itemTr.mean">
            (
            <span
              class="teal--text"
              :style="{ cursor: 'pointer'}"
              v-for="(mean,keyMean) in itemTr.mean"
              :key="key + 'mean' + keyMean"
              @click="clickChoseWord(mean.text)"
            >
              {{mean.text}}{{itemTr.mean.length !==1
              && itemTr.mean.length - 1 !==keyMean
              ? ', ': ''}}
            </span>
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
</template>

<script>
import { mapState } from 'vuex';


export default {
  name: 'dictionaryTranslate',
  computed: {
    ...mapState('dictionaryModule', ['dictionary']),
  },
  methods: {
    clickChoseWord(text) {
      this.$emit('clickChoseWord', text);
    },
    clickChoseWordAnotherLang(text) {
      this.$emit('clickChoseWordAnotherLang', text);
    },
  },
};
</script>
