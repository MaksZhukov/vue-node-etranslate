<template>
  <v-tooltip bottom>
    <v-btn
      slot="activator"
      @click="handleClick"
      icon
    >
        <input
      type="file"
      style="display: none"
      ref="fileInput"
      accept=".jpg, .jpeg, .png"
      @change="$emit('onFileChange',$event)">
      <v-icon>image</v-icon>
    </v-btn>Image recognition
  </v-tooltip>
</template>

<script>

export default {
  name: 'imageRecognition',
  props: {
  },
  data: () => ({
  }),
  created() {
    
  },
  methods: {
      handleClick(){
          this.$refs.fileInput.click()
      }
  }
};
</script>
