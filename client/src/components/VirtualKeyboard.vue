<template>
  <div class="simple-keyboard"></div>
</template>

<script>

import Keyboard from 'simple-keyboard';
import ru from 'simple-keyboard-layouts/build/layouts/russian';
import it from 'simple-keyboard-layouts/build/layouts/italian';
import de from 'simple-keyboard-layouts/build/layouts/german';
import zh from 'simple-keyboard-layouts/build/layouts/chinese';
import fr from 'simple-keyboard-layouts/build/layouts/french';
import en from 'simple-keyboard-layouts/build/layouts/english';
import 'simple-keyboard/build/css/index.css';


export default {
  name: 'virtualKeyboard',
  props: {
    inputText: [String, null],
    fromAbbr: String,
  },
  data: () => ({
    keyboard: null,
    layouts: {
      ru, zh, en, de, fr, it,
    },
  }),
  mounted() {
    this.removeComAndDogSymbol();
    this.keyboard = new Keyboard({
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
      layout: this.layouts.en,
      text: this.inputText,
    });
    this.keyboard.setInput(this.inputText);
  },
  methods: {
    onChange(input) {
      this.$emit('onChange', input);
    },
    onKeyPress(button) {
      if (button === '{shift}' || button === '{lock}') {
        this.handleChangeLayout();
      }
      if (button === '{enter}') {
        this.$emit('onEnter');
      }
    },
    handleChangeLayout() {
      const currentLayout = this.keyboard.options.layoutName;
      const shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

      this.keyboard.setOptions({
        layoutName: shiftToggle,
      });
    },
    removeComAndDogSymbol() {
      Object.keys(this.layouts).forEach((lang) => {
        this.layouts[lang].default[4] = this.layouts[lang].default[4].replace('.com @ ', '');
        this.layouts[lang].shift[4] = this.layouts[lang].shift[4].replace('.com @ ', '');
      });
    },
  },
  watch: {
    inputText(text) {
      this.keyboard.setInput(text);
    },
    translateLang(abbr) {
      if (this.layouts[abbr]) {
        this.keyboard.setOptions({
          layout: this.layouts[abbr],
        });
        this.$emit('supportLang', true);
      } else {
        this.$emit('supportLang', false);
      }
    },

  },
};
</script>
