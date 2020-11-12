<template>
  <v-menu offset-y>
    <v-btn slot="activator" flat>
      {{email}}
      <v-icon>more_vert</v-icon>
    </v-btn>
    <v-list>
      <v-list-tile
        :to="{ name: 'translator', query: textLang.abbr && translateLang && inputText ? { text: inputText,
        textLang: textLang.abbr, translateLang: translateLang.abbr } : {}}"
      >Переводчик</v-list-tile>
      <v-list-tile to="/dictionary">Словарь</v-list-tile>
      <v-list-tile to="/info">Информация</v-list-tile>
      <v-list-tile @click="logOut">
        <v-list-tile-title>Выход</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>


<script>

import { mapMutations, mapState } from 'vuex';

export default {
  name: 'profileBar',
  props: {
    email: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState('translateModule', ['inputText', 'textLang', 'translateLang']),
  },
  methods: {
    ...mapMutations('userModule', ['logOut']),
  },
};
</script>
