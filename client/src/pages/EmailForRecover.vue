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
        <v-btn
          color="primary"
          :disabled="!valid || sendLinkEmailForRecoverResponse.pending"
          :loading="sendLinkEmailForRecoverResponse.pending"
          @click="sendLinkEmailForRecover(email)"
        >Send link to email</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { mixinEmailRules } from '../mixins';

export default {
  name: 'emailForRecover',
  mixins: [mixinEmailRules],
  data: () => ({
    valid: true,
    email: '',
  }),
  computed: {
    ...mapState('userModule', ['sendLinkEmailForRecoverResponse']),
  },
  methods: {
    ...mapActions('userModule', ['sendLinkEmailForRecover']),
  },
};
</script>
