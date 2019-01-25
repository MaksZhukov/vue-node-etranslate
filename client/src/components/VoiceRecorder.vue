<template>
  <v-tooltip bottom>
    <v-btn
      slot="activator"
      @click="!isActive ? startRecord() : stopRecord()"
      icon
      :disabled="isDisabled"
    >
      <v-icon :color="isActive ? 'red' : 'black'">mic</v-icon>
    </v-btn>Voice recorder
  </v-tooltip>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'voiceRecorder',
  data: () => ({
    isActive: false,
    isDisabled: false,
    recognition: null,
  }),
  created() {
    if (window.webkitSpeechRecognition || window.SpeechRecognition) {
      this.recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
      this.recognition.onerror = this.onError;
      this.recognition.onend = this.onEnd;
      this.recognition.onresult = this.onResult;
    } else {
      this.isDisabled = true;
    }
  },
  methods: {
    ...mapMutations(['showSnackBar']),
    onEnd() {
      this.isActive = false;
    },
    onResult(event) {
      const recognizeText = event.results[0][0].transcript;
      this.$emit('onResultVoiceRecorder', recognizeText);
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
