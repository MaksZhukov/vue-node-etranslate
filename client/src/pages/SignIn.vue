<template>
  <v-layout row justify-center>
    <v-flex xs4 dark>
      <v-form v-model="valid">
        <v-text-field
          label="Почта"
          v-model="email"
          :rules="emailRules"
          required
        ></v-text-field>
        <v-text-field
          label="Пароль"
          :append-icon="showPassword ? 'visibility_off' : 'visibility'"
          @click:append="showPassword = !showPassword"
          :type="showPassword ? 'text' : 'password'"
          hint="По крайней мере 8 символов"
          counter
          v-model="password"
          :rules="passwordRules"
          required
        ></v-text-field>
        <v-btn
          color="primary"
          :disabled="!valid || signInResponse.pending"
          :loading="signInResponse.pending"
          @click="signIn({password,email})"
        >Войти</v-btn>
        <v-btn to="/email-for-recover">Забыли пароль?</v-btn>
      </v-form>
      <auth-with></auth-with>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { mixinEmailRules, mixinPasswordRules, mixinPassword } from '../mixins';
import AuthWith from '../components/AuthWith.vue';

export default {
  name: 'signIn',
  components: { AuthWith },
  mixins: [mixinEmailRules, mixinPasswordRules, mixinPassword],
  data: () => ({
    valid: true,
    email: '',
  }),
  computed: {
    ...mapState('userModule', ['signInResponse']),
  },
  methods: {
    ...mapActions('userModule', ['signIn']),
    handleSignIn() {

    },
  },
};
</script>
