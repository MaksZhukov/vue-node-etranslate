<template>
    <fragment>
      <v-layout row align-center>
        <v-flex xs1>
          <v-checkbox></v-checkbox>
        </v-flex>
        <v-flex xs5>
          <p class="text-uppercase font-weight-bold">Text</p>
        </v-flex>
        <v-flex xs5>
          <p class="text-uppercase font-weight-bold">Translate</p>
        </v-flex>
        <v-flex xs1>
          <v-btn
            @click="saveToDictionary(item.id)"
            small
            fab
            dark
            color="primary"
          >
            <v-icon dark>save</v-icon>
          </v-btn>
          <v-btn
          @click="removeFromDictionary(item.id)"
          small
          fab
          dark
          color="red"
        >
          <v-icon dark>remove</v-icon>
        </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row v-for="item in listDictionary" :key="item.id">
        <v-flex xs1>
          <v-checkbox></v-checkbox>
        </v-flex>
        <v-flex xs5>
          <v-text-field v-model="item.text"></v-text-field>
        </v-flex>
        <v-flex xs5>
          <v-text-field v-model="item.translate"></v-text-field>
        </v-flex>
      </v-layout>
    </fragment>
  </template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'dictionary',
  props: {
    listDictionary: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapActions('dictionaryModule', ['removeCheckedFromDictionary', 'saveCheckedInDictionary']),
  },
};

</script>
