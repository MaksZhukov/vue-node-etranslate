<template>
  <v-tooltip bottom>
    <v-btn
      slot="activator"
      :disabled="isDisabled"
      @click="!isActive ? startSpeak() : stopSpeak()"
      icon
    >
      <v-icon :color="isActive ? 'red' : 'black'">volume_up</v-icon>
    </v-btn>Voice pronounication
  </v-tooltip>
</template>

<script>

export default {
  name: 'voicePronunciation',
  props: {
    text: [String, null],
    lang: {
      required: true,
      type: String,
    },
    voices: {
      required: true,
      type: Array,
    },
  },
  data: () => ({
    isActive: false,
    isDisabled: false,
    msg: null,
    voice: null,
  }),
  created() {
    if (window.SpeechSynthesisUtterance) {
      this.msg = new SpeechSynthesisUtterance();
      this.msg.onend = this.handleEnd;
    } else {
      this.isDisabled = true;
    }
  },
  methods: {
    startSpeak() {
      this.isActive = true;
      this.msg.text = this.text;
      this.msg.lang = this.voice.lang;
      window.speechSynthesis.speak(this.msg);
    },
    stopSpeak() {
      this.handleEnd();
    },
    handleEnd() {
      this.isActive = false;
      window.speechSynthesis.cancel();
    },
    checkAllowLang() {
      this.voices.forEach((voice) => {
        if (voice.lang.includes(this.lang)) {
          this.voice = voice;
        }
      });
      if (this.voice) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
  },
  watch: {
    lang() {
      this.checkAllowLang();
    },
    voices() {
      this.checkAllowLang();
    },
  },
};
</script>
