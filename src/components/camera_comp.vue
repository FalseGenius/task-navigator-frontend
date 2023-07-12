<template>

  <div>
    <button @click="openModal">
      <i class="fas fa-camera"></i>
    </button>

    <!-- Modal -->
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <button @click="closeModal">Close</button>
        <button @click="openCamera">Camera</button>
        <input type="file" @change="uploadImage" accept="image/*" />
      </div>
    </div>

    <video v-if="showCamera" ref="videoElement" autoplay></video>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { createPopper } from '@popperjs/core';
export default {
  name: "camera_comp",

data() {
  return {
    isModalOpen: false,
    showCamera: false,
    cameraStream: null,
    videoElement: null,
  };
},
methods: {
  openModal() {
    this.isModalOpen = true;
  },
  closeModal() {
    this.isModalOpen = false;
  },
  openCamera() {
    this.isModalOpen = false;
    this.showCamera = true;

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        this.cameraStream = stream;
        this.videoElement.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
  },
  captureImage() {
    if (this.cameraStream && this.videoElement) {
      const canvas = document.createElement('canvas');
      canvas.width = this.videoElement.videoWidth;
      canvas.height = this.videoElement.videoHeight;

      const context = canvas.getContext('2d');
      context.drawImage(
        this.videoElement,
        0,
        0,
        this.videoElement.videoWidth,
        this.videoElement.videoHeight
      );

      const imageUrl = canvas.toDataURL('image/png');
      // Handle the captured image as needed, e.g., send it to the server or process it locally
    }
  },
  stopCamera() {
    if (this.cameraStream) {
      const tracks = this.cameraStream.getTracks();
      tracks.forEach((track) => track.stop());
    }

    this.showCamera = false;
    this.cameraStream = null;
  },
},
}

</script>


<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}

.modal button {
  margin-right: 10px;
}
</style>