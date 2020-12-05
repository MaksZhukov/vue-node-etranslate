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
        <v-text-field
          label="Повторите пароль"
          :append-icon="showRePassword ? 'visibility_off' : 'visibility'"
          @click:append="showRePassword = !showRePassword"
          :type="showRePassword ? 'text' : 'password'"
          hint="По крайней мере 8 символов"
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
        >Зарегистрироваться</v-btn>
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
