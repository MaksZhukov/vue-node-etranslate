<template>
  <v-btn @click="!isActive ? startRecord() : stopRecord()" icon>
    <v-icon :color="isActive ? 'red' : 'black'">mic</v-icon>
  </v-btn>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'voiceRecorder',
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
