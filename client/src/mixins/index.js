const mixinEmailRules = {
  data: () => ({
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),
};

const mixinPasswordRules = {
  data: () => ({
    passwordRules: [
      v => !!v || 'Pass is required',
      v => (v && v.length >= 8) || 'Name must be greater than 8 characters',
    ],
  }),
};
const mixinPassword = {
  data: () => ({
    password: '',
    showPassword: false,
  }),
};

const mixinRePassword = {
  data: () => ({
    rePassword: '',
    showRePassword: false,
  }),
};

const mixinConfirmPassword = {
  computed: {
    confirmPassword() {
      return (
        this.password === this.rePassword
        || 'repeat password must match with password'
      );
    },
  },
};

export {
  mixinEmailRules,
  mixinPasswordRules,
  mixinPassword,
  mixinRePassword,
  mixinConfirmPassword,
};
