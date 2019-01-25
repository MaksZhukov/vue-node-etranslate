<template>
  <p class="text-uppercase">auth with:
    <v-btn href="/api/auth/google" icon>
      <v-icon color="blue">fab fa-google</v-icon>
    </v-btn>
    <v-btn href="/api/auth/yandex" icon>
      <v-icon color="red">fab fa-yandex</v-icon>
    </v-btn>
  </p>
</template>

<script>
export default {
  name: 'authWith',
};
</script>
