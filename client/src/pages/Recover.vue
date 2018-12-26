<template>
  <v-layout row justify-center>
    <v-flex xs4 dark>
      <v-form v-model="valid">
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
          :disabled="!valid  || changePasswordResponse.pending"
          :loading="changePasswordResponse.pending"
          @click="changePassword({password, token: $route.params.recoverToken})"
        >Change</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import {
  mixinPasswordRules, mixinPassword, mixinRePassword, mixinConfirmPassword,
} from '../mixins';

export default {
  name: 'SignIn',
  mixins: [mixinPasswordRules, mixinPassword, mixinRePassword, mixinConfirmPassword],
  data: () => ({
    valid: true,
  }),
  computed: {
    ...mapState('userModule', ['changePasswordResponse', 'checkRecoverTokenResponse']),
  },
  methods: {
    ...mapActions('userModule', ['changePassword']),
  },
};
</script>
