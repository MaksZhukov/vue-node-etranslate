<template>
  <v-app>
    <v-toolbar color="teal darken-4" dark>
      <v-toolbar-title>
        <v-icon class="red--text">translate</v-icon>
        <router-link to="/" exact class="red--text">Etranslate</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>
          <router-link to="/sign-in" exact class="red--text">Sign In</router-link>
        </v-btn>
        <v-btn flat>
          <router-link to="/sign-up" exact class="red--text">Sign Up</router-link>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container grid-list-md>
      <v-layout row justify-center>
        <router-view></router-view>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
export default {};
</script>

<style lang="sass">
  a
    text-decoration: none
</style>
