<template>
  <v-btn
    :disabled="isDisabled"
    @click="!isActive ? startSpeak() : stopSpeak()"
    icon
  >
    <v-icon :color="isActive ? 'red' : 'black'">volume_up</v-icon>
  </v-btn>
</template>

<script>

export default {
  name: 'voicePronunciation',
  props: {
    text: [String, null],
    lang: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    isActive: false,
    isDisabled: false,
    msg: new SpeechSynthesisUtterance(),
  }),
  created() {
    this.msg.onend = this.handleEnd;
  },
  methods: {
    startSpeak() {
      this.isActive = true;
      this.msg.lang = this.lang;
      this.msg.text = this.text;
      speechSynthesis.speak(this.msg);
    },
    stopSpeak() {
      this.handleEnd();
    },
    handleEnd() {
      this.isActive = false;
      speechSynthesis.cancel();
    },
  },
  watch: {
    lang(val) {
      if (speechSynthesis.getVoices().filter(voice => voice.lang.includes(val)).length > 0) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
  },
};
</script>
