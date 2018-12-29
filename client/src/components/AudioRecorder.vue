<template>
  <v-btn @click="!isActive ? startRecord() : stopRecord()" icon>
    <v-icon :color="isActive ? 'red' : 'black'">mic</v-icon>
  </v-btn>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'audioRecorder',
  props: {
    to: {
      type: Object,
      required: true,
    },
    from: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    isActive: false,
    recognition: new window.webkitSpeechRecognition() || new window.SpeechRecognition(),
  }),
  created() {
    this.recognition.onerror = this.onError;
    this.recognition.onend = this.onEnd;
    this.recognition.onresult = this.onResult;
  },
  computed: {
    inputText: {
      get() {
        return this.$store.state.translateModule.inputText;
      },
      set(text) {
        this.$store.commit('translateModule/updateInputText', text);
      },
    },
  },
  methods: {
    ...mapMutations(['showSnackBar']),
    ...mapActions('translateModule', ['translate']),
    onEnd() {
      this.isActive = false;
    },
    onResult(event) {
      const recognizeText = event.results[0][0].transcript;
      this.inputText += this.inputText === '' ? recognizeText : ` ${recognizeText}`;
      this.translate({ text: this.inputText, from: this.from.abbr, to: this.to.abbr });
    },
    onError(event) {
      this.showSnackBar({ message: event.error, color: 'error' });
    },
    startRecord() {
      this.isActive = true;
      this.recognition.start();
    },
    stopRecord() {
      this.isActive = false;
      this.recognition.stop();
    },
  },
};
</script>
