<template>
  <div>
    <h1>Web Camera Demo</h1>
    <video ref="videoElement" autoplay></video>
    <button @click.prevent="capturePhoto">Capture Photo</button>
  </div>
</template>

<script>
export default {
  mounted() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          this.videoElement = this.$refs.videoElement;
          this.videoElement.srcObject = stream;
          this.videoElement.play();
        })
        .catch((error) => {
          console.log('Error accessing the web camera: ', error);
        });
    } else {
      console.log('getUserMedia is not supported in this browser.');
    }
  },
  methods: {
    capturePhoto() {
      const canvasElement = document.createElement('canvas');
      canvasElement.width = this.videoElement.videoWidth;
      canvasElement.height = this.videoElement.videoHeight;

      const context = canvasElement.getContext('2d');
      context.drawImage(
        this.videoElement,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      const imageData = canvasElement.toDataURL('image/png');

      this.$emit('photo-captured', imageData);
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
video {
  display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
}
</style>
