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
        <v-text-field
          label="Repeat password"
          :append-icon="showRePassword ? 'visibility_off' : 'visibility'"
          @click:append="showRePassword = !showRePassword"
          :type="showRePassword ? 'text' : 'password'"
          hint="At least 8 characters"
          counter
          v-model="rePassword"
          :rules="[confirmPassword]"
          required
        ></v-text-field>
        <v-btn
          color="primary"
          :disabled="!valid  || signUpResponse.pending"
          :loading="signUpResponse.pending"
          @click="signUp({password,email})"
        >Sign Up</v-btn>
      </v-form>
      <auth-with></auth-with>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import {
  mixinConfirmPassword, mixinRePassword, mixinEmailRules, mixinPasswordRules, mixinPassword,
} from '../mixins';
import AuthWith from '../components/AuthWith.vue';

export default {
  name: 'SignIn',
  components: { AuthWith },
  mixins: [mixinConfirmPassword, mixinRePassword, mixinEmailRules,
    mixinPasswordRules, mixinPassword],
  data: () => ({
    valid: true,
    email: '',
  }),
  computed: {
    ...mapState('userModule', ['signUpResponse']),
  },
  methods: {
    ...mapActions('userModule', ['signUp']),
  },
};
</script>
