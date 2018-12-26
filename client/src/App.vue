<template>
  <fragment>
    <v-app v-if="isLoad">
      <v-toolbar color="teal darken-4" dark>
        <v-toolbar-title>
          <v-icon class="red--text">translate</v-icon>
          <router-link to="/" exact class="red--text">Etranslate</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn v-if="!user" to="/sign-in" exact flat class="red--text">Sign In</v-btn>
          <v-btn v-if="!user" to="/sign-up" exact flat class="red--text">Sign Up</v-btn>
          <profile-bar v-if="user" :email="user.email"></profile-bar>
        </v-toolbar-items>
      </v-toolbar>
      <v-container grid-list-md>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
      <v-snackbar v-model="snackBar.visible" top :color="snackBar.color">
        <span class="black--text">{{snackBar.message}}</span>
        <v-btn color="black" flat dark @click="hideSnackBar">Close</v-btn>
      </v-snackbar>
    </v-app>
  </fragment>
</template>
<script>

import { mapState, mapMutations } from 'vuex';
import ProfileBar from './components/ProfileBar.vue';

export default {
  name: 'App',
  computed: {
    ...mapState(['snackBar', 'isLoad']),
    ...mapState('userModule', ['user', 'checkTokenResponse', 'updateTokensResponse']),
  },
  methods: {
    ...mapMutations(['hideSnackBar']),
  },
  components: { ProfileBar },
};
</script>

<style lang="sass">
  a
    text-decoration: none
  .fade-enter-active, .fade-leave-active
    transition: all .2s
  .fade-enter, .fade-leave-to
    opacity: 0
</style>
