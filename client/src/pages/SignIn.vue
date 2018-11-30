<template>
  <v-flex xs4 dark>
    <v-form v-model="valid">
      <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
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
      <v-btn color="primary" :disabled="!valid" @click="submit">Sign In</v-btn>
    </v-form>
  </v-flex>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'signIn',
  data: () => ({
    valid: true,
    email: '',
    password: '',
    showPassword: false,
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      v => !!v || 'Pass is required',
      v => (v && v.length >= 8) || 'Name must be greater than 8 characters',
    ],
  }),
  methods: {
    ...mapActions('userModule', ['signIn']),
    submit() {
      console.log('hello');
    },
  },
};
</script>
