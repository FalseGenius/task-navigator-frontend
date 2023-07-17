<template>
<navbar_comp></navbar_comp>

<div class="fbody">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">

    <div class="card m-auto shadow p-3 mb-5 bg-body rounded" style="width: 35vw;">
        <h1 class="fw-bold">Let's go!</h1>
        <div class="card-body m-auto" style="width: 28vw;">
            <form class="m-auto">


              
                <div class="d-flex justify-content-between">
                    <div class="icon-container w-100 me-1">
                        <p class="text-sm-start fw-semibold mb-1" style="font-size: 10px;">First Name</p>
                        <input type="text" class="form-control" style="width: 100%;" v-model="firstname" :placeholder="firstnamePlaceholder" aria-describedby="firstNameHelp">
                        <i class="lock-icon fa fa-user pb-1 ps-1"></i>
                    </div>
                    <div class="icon-container w-100 me-1">
                        <p class="text-sm-start fw-semibold mb-1" style="font-size: 10px;">Last Name</p>
                        <input type="text" class="form-control" style="width: 100%;" v-model="lastname" :placeholder="lastnamePlaceholder" aria-describedby="lastNameHelp">
                        <i class="lock-icon fa fa-user pb-1 ps-1"></i>
                    </div>
                </div>
                <div class="d-flex justify-content-around">
                    <span class="text-danger mt-1 " v-if="!firstname && signupClicked">Required!</span>
                    <span class="text-danger mt-1" v-if="!lastname && signupClicked">Required!</span>
                </div>

                <div class="icon-container">
                    <p class="text-sm-start fw-semibold mb-1" style="font-size: 10px;">Email</p>
                    <input type="email" class="form-control" id="exampleInputEmail1" v-model="email" placeholder="example@site.com" aria-describedby="emailHelp">
                    <i class="lock-icon fa fa-envelope pb-1 ps-1"></i>
                </div>
                <span class="text-danger mt-1" v-if="!email && signupClicked">Email is required!</span>
                <span class="text-danger mt-1" v-if="emailExists && signupClicked">Email already exists</span>
                <br>



         
       
                <p class="text-sm-start fw-semibold mb-1" style="font-size: 10px;">
        Take picture or Upload Image
          </p>
          <br>
       <!-- Camera and Choose File buttons -->
       <div class="icon-container d-flex justify-content-center align-items-center w-75 m-auto">
         
          <div
            class="video position-relative rounded-circle overflow-hidden"
            :style="{ display: isCameraStarted ? 'block' : 'none', width: isCameraStarted ? '100px' : '0', height: isCameraStarted ? '100px' : '0' }"
          >
            <video ref="videoElement" autoplay style="width: 100%; height: 100%; border-radius: 50%;"></video>

            <!-- Capture button -->
            <button  v-if="isCameraStarted" @click.prevent="captureImage" class="position-absolute bottom-0 start-50 translate-middle-x" style="background-color: #fff; border-radius: 50%; border: none; width: 30px; height: 30px;">
              <i class="fa fa-camera" style="color: #185bcd;"></i>
            </button>
          </div>

          <!-- Camera button -->
          <button class="btn" v-if="!isCameraStarted" @click.prevent="startCamera">
            <i class="fa fa-camera" style="color: #185bcd;"></i>
          </button>

          <!-- Choose File button -->
          <input
            type="file"
            @change="handleImageChange"
            accept="image/*"
            v-if="!isCameraStarted"
          />
        </div>
        <!-- Show the captured image -->
        <img
          :src="capturedImageUrl"
          v-if="capturedImageUrl"
          alt="Captured Image"
          class="mx-auto mt-3"  
          style="width: 200px; height: 150px; border-radius: 50%; object-fit: cover;"
        />
        <br>

              <!-- --------------------------- -->
                <div class="icon-container">
                    <p class="text-sm-start fw-semibold mb-1" style="font-size: 10px; margin-right: 30px;">Choose Password</p>
                    <div class="d-flex ">
                        <div>
                            <input class="form-control me-5" v-model="password" id="Password1" :type="showPassword ? 'text' : 'password'" placeholder="Minimum 8 characters, alphanumeric" aria-describedby="passwordHelp">
                            <i class="lock-icon fa fa-lock pb-1 ps-1"></i></div>
                        <div class="">
                            <button id="showPasswordButton" class="btn btn-outline-secondary" type="button" @click="togglePasswordVisibility">
                                <i class="fa" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
                            </button>
                        </div>

                    </div>
                </div>

                
                <span class="text-danger mt-1" v-if="!password && signupClicked">Password is required!</span>
                <span class="text-danger mt-1" v-if="!isValidPassword && signupClicked">Password should be at least 8 characters long and contain only alphanumeric characters</span>
                <br>

                <button class="btn btn-bd-primary w-100 mt-4 shadow p-2 mb-4" v-on:click.prevent="signup">Sign Up</button>

                <div class="fw-semibold mt-3" style="font-size: 10px;">
                    <p>Already have an account? <router-link to="/login">Log In</router-link>
                    </p>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

  
<script>
import axios from 'axios'
import navbar_comp from './navbar.vue'

export default {
    name: 'signup_comp',
    data() {
        return {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            signupClicked: false,
            emailExists: false,
            errorMessage: '',
            showPassword: false,
            isCameraStarted: false,
            videoStream: null,
            capturedImageUrl: null,
            selectedImage: null,
        }
    },
    components: {
        navbar_comp,
    },
    computed: {
        isValidFirstName() {
            return this.firstname && !this.firstname.includes('_');
        },
        firstNameWarning() {
            return this.firstname.includes('_') ? 'First name cannot contain underscore (_)' : 'First name required';
        },
        isValidPassword() {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            return passwordRegex.test(this.password);
        },
        firstnamePlaceholder() {
            return this.firstname ? this.firstname : 'John';
        },
        lastnamePlaceholder() {
            return this.lastname ? this.lastname : 'Doe';
        },
    },
    methods: {
        startCamera() {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices
                    .getUserMedia({ video: true })
                    .then((stream) => {
                        const videoElement = this.$refs.videoElement;
                        videoElement.srcObject = stream;
                        videoElement.play();
                        this.isCameraStarted = true;
                        this.videoStream = stream;
                    })
                    .catch((error) => {
                        console.log("Error accessing the web camera: ", error);
                    });
            } else {
                console.log("getUserMedia is not supported in this browser.");
            }
        },
        captureImage() {
            const videoElement = this.$refs.videoElement;
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            // Set canvas dimensions to match the video stream
            canvas.width = videoElement.clientWidth;
            canvas.height = videoElement.clientHeight;

            // Draw the current frame of the video onto the canvas
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

            // Convert the canvas image to a Blob
            canvas.toBlob((blob) => {
                // Set the captured image data URL to display the image
                this.capturedImageUrl = URL.createObjectURL(blob);
            });

            // Stop the video stream
            if (this.videoStream) {
                const tracks = this.videoStream.getVideoTracks();
                tracks.forEach((track) => track.stop());
                this.videoStream = null;
                this.isCameraStarted = false;
            }
        },

        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },

        // New method to handle image selection
        handleImageChange(event) {
            const selectedFile = event.target.files[0];
            if (selectedFile) {
                // Store the selected image file in the `selectedImage` data property
                this.selectedImage = selectedFile;

                // Read the selected image file and convert it to a data URL
                const reader = new FileReader();
                reader.onload = () => {
                    this.capturedImageUrl = reader.result;
                };
                reader.readAsDataURL(selectedFile);
            }
        },

        async signup() {
            this.signupClicked = true;
            this.errorMessage = '';
            if (!this.firstname) {
                this.errorMessage = 'First name is required!';
                return;
            }
            if (!this.lastname) {
                this.errorMessage = 'Last name is required!';
                return;
            }
            if (!this.email) {
                this.errorMessage = 'Email is required!';
                return;
            }
            if (!this.password) {
                this.errorMessage = 'Password is required!';
                return;
            }
            if (!this.isValidPassword) {
                this.errorMessage =
                    'Password should be at least 8 characters long and contain only alphanumeric characters';
                return;
            }
            try {
                // Convert the image to base64
                const base64Image = await this.convertImageToBase64();
                
                // Send the data to the backend API
                const response = await axios.post('http://172.16.4.18:8000/api/register', {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.email,
                    password: this.password,
                    image: base64Image, // Send the base64 image data to the backend
                });

                console.log('Response:', response);

                console.log('User Credentials:', {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.email,
                    password: this.password,
                    image: this.capturedImageUrl,
                    

                });

                if (response.status === 201) {
                    // localStorage.setItem('user-info', JSON.stringify(response.data));
                    this.$router.push({ name: 'Login' });
                }
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    this.emailExists = true;
                    this.errorMessage = error.response.data.message; // Assuming the backend returns the error message in the `message` field
                } else {
                    this.errorMessage = 'An error occurred during signup';
                }
            }
        },

        async convertImageToBase64() {
            return new Promise((resolve, reject) => {
                const imageElement = new Image();
                imageElement.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = imageElement.width;
                    canvas.height = imageElement.height;

                    const context = canvas.getContext('2d');
                    context.drawImage(imageElement, 0, 0);

                    // Convert canvas image to base64
                    const base64Image = canvas.toDataURL('image/jpeg'); // You can change 'image/jpeg' to 'image/png' if you prefer PNG format

                    resolve(base64Image);
                };

                imageElement.onerror = reject;
                imageElement.src = this.capturedImageUrl;
            });
        },
    },
    mounted() {
        let user = localStorage.getItem("user-info");
        if (user) {
            this.$router.push({ name: "Login" });
        }
    },
}
</script>

  
<style scoped>
.icon-container {
    position: relative;
}

.icon-container input {
    padding-right: 20px;
    padding-left: 40px;
}

.icon-container .lock-icon {
    position: absolute;
    top: 70%;
    left: 5px;
    transform: translateY(-50%);
    color: #999;
    pointer-events: none;
}

.icon-container .lock-icon.fa-envelope:before,
.icon-container .lock-icon.fa-lock:before {
    pointer-events: none;
}

.btn{
  text-transform: none;
    border: none;
    background: none;
    block-size: initial;
}

.btn-bd-primary {
    --bs-btn-font-weight: 600;
    --bs-btn-color: var(--bs-white);
    --bs-btn-bg: var(--bd-violet-bg);
    --bs-btn-border-color: var(--bd-violet-bg);
    --bs-btn-hover-color: var(--bs-black);
    --bs-btn-hover-bg: #6528e0;
    --bs-btn-hover-border-color: #6528e0;
    --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
    --bs-btn-active-color: var(--bs-btn-hover-color);
    --bs-btn-active-bg: #5a23c8;
    --bs-btn-active-border-color: #5a23c8;
    background: linear-gradient(90deg, #2689EB 0.1%, #47E2FF 100.1%);
    box-shadow: 0px 10px 25px rgba(151, 195, 227, 0.5);
    border-radius: 9px;
}

.fbody {
    height: 109vh;
    background-image: url('../assets/bg_img.jpg');
    background-size: cover;
    width: 100vw;
}
</style>
