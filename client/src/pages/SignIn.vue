<template>
  <v-layout row justify-center>
    <v-flex xs4 dark>
      <v-form v-model="valid">
        <v-text-field
          label="E-mail"
          v-model="email"
          :rules="emailRules"
          required
        ></v-text-field>
        <v-text-field
          label="Password"
          :append-icon="showPassword ? 'visibility_off' : 'visibility'"
          @click:append="showPassword = !showPassword"
          :type="showPassword ? 'text' : 'password'"
          hint="At least 8 characters"
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
        >Sign In</v-btn>
        <v-btn to="/email-for-recover">Forget password</v-btn>
      </v-form>
      <p class="text-uppercase">auth with:
        <v-btn icon>
          <a href="/api/auth/google">
            <v-icon>fab fa-google</v-icon>
          </a>
        </v-btn>
      </p>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { mixinEmailRules, mixinPasswordRules, mixinPassword } from '../mixins';

export default {
  name: 'signIn',
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
  },
};
</script>
