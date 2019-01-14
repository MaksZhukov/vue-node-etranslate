<template>
  <v-list three-line class="no-bg">
    <v-list-tile-content v-for="(item,key) in dictionaryFromLang" :key="key">
      <v-list-tile-title
        class="subheading"
      >{{item.text}} [{{item.ts}}] {{item.pos}}</v-list-tile-title>
      <template v-for="(itemTr,keyTr) in item.tr">
        <v-list-tile-sub-title class="text--primary" :key="key + 'tr' + keyTr">
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
          >
            {{itemTr.syn.length ===1
            || itemTr.syn.length !==keySyn
            ? ', '
            : ''}}{{syn.text}}
          </span>
        </v-list-tile-sub-title>
      </template>
    </v-list-tile-content>
  </v-list>
</template>


<script>
import { mapState } from 'vuex';


export default {
  name: 'dictionaryFromLang',
  computed: {
    ...mapState('dictionaryModule', ['dictionaryFromLang']),
  },
  methods: {
    handleChoseSyn(text) {
      this.$emit('clickChoseSyn', text);
    },
  },
};
</script>
