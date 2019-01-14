<template>
  <div class="simple-keyboard"></div>
</template>

<script>

import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';


export default {
  name: 'virtualKeyboard',
  props: {
    inputText: [String, null],
  },
  data: () => ({
    keyboard: null,
  }),
  mounted() {
    this.keyboard = new Keyboard({
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
      layout: {
        default: [
          '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
          '{tab} q w e r t y u i o p [ ] \\',
          '{lock} a s d f g h j k l ; \' {enter}',
          '{shift} z x c v b n m , . / {shift}',
          '{space}',
        ],
        shift: [
          '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
          '{tab} Q W E R T Y U I O P { } |',
          '{lock} A S D F G H J K L : " {enter}',
          '{shift} Z X C V B N M < > ? {shift}',
          '{space}',
        ],
      },
    });
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
  },
  watch: {
    inputText(text) {
      this.keyboard.setInput(text);
    },
  },
};
</script>
