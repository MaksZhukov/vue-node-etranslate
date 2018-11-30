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
      <v-btn color="primary" :disabled="!valid" @click="submit">Sign Up</v-btn>
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
    rePassword: '',
    showRePassword: false,
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      v => !!v || 'Pass is required',
      v => (v && v.length >= 8) || 'password must be greater than 8 characters',
    ],
  }),
  mounted() {
    fetch('api/sign-up', { method: 'POST' })
      .then(response => response.json())
      .then(data => data);
  },
  computed: {
    confirmPassword() {
      return (
        this.password === this.rePassword
        || 'repeat password must match with password'
      );
    },
  },
  methods: {
    ...mapActions('userModule', ['signUp']),
    submit() {
      const { password, email } = this;
      this.signUp({ email, password });
    },
  },
};
</script>
