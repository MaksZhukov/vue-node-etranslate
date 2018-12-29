<template>
  <fragment data-appu>
    <v-menu offset-y>
      <v-btn slot="activator" flat>
        {{email}}
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile @click.stop>
          <router-link to="/dashboard" class="black--text">Dashboard</router-link>
        </v-list-tile>
        <v-list-tile @click.stop>
          <router-link to="/dictionary" class="black--text">Dictionary</router-link>
        </v-list-tile>
        <v-list-tile @click="logOut">
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </fragment>
</template>


<script>

import { mapMutations } from 'vuex';

export default {
  name: 'profileBar',
  props: {
    email: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapMutations('userModule', ['logOut']),
  },
};
</script>
