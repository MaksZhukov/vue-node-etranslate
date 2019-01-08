<template>
  <fragment>
    <v-layout row>
      <v-flex xs3>
        <v-text-field v-model="text" label="Text"></v-text-field>
      </v-flex>
      <v-flex xs3>
        <v-text-field v-model="translate" label="Translate"></v-text-field>
      </v-flex>
      <v-flex>
        <v-btn
          @click="addToDictionary({text,translate})"
          :disabled="addToDictionaryResponse.pending"
          :loading="addToDictionaryResponse.pending"
          small
          fab
          color="success"
        >
          <v-icon dark>add</v-icon>
        </v-btn>
      </v-flex>
      <v-flex>
        <v-text-field v-model="search" append-icon="search" label="Search"></v-text-field>
      </v-flex>
    </v-layout>
    <list-dictionary :listDictionary="dictionary"></list-dictionary>
  </fragment>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ListDictionary from '../components/ListDictionary.vue';

export default {
  name: 'dictionary',
  components: { ListDictionary },
  data: () => ({
    text: '',
    translate: '',
    search: '',
  }),
  created() {
    this.getDictionary();
  },
  computed: {
    ...mapState('dictionaryModule', ['dictionary', 'addToDictionaryResponse']),
  },
  methods: {
    ...mapActions('dictionaryModule', ['getDictionary', 'addToDictionary']),
  },

};

</script>
