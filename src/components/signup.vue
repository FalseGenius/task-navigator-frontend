<template>
  <navbar_comp></navbar_comp>
  <div class="fbody">
  
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

  <div class="card m-auto shadow p-3 mb-5 bg-body rounded" style="width: 35vw;">
    <h1 class="fw-bold">Let's go!</h1>
    <div class="card-body ">
      <form class=" m-auto " style="width: 28vw;">
<div class="d-flex justify-content-between">
        <div class="icon-container w-100 me-1">
          <p class="text-sm-start fw-semibold mb-1" style="font-size: 10px;">First Name</p>
          <input type="text" class="form-control" style="width: 14vw;" v-model="firstname" placeholder="John"
            aria-describedby="firstNameHelp">
          <i class="lock-icon fa fa-user pb-1 ps-1"></i>
        </div>
        <span class="text-danger" v-if="!isValidFirstName && signupClicked" v-text="firstNameWarning"></span> <!-- Added signupClicked variable -->

       

        <div class="icon-container ">
          <p class="text-sm-start fw-semibold mb-1" style="font-size: 10px;">Last Name</p>
          <input type="text" class="form-control d-flex justify-content-end" style="width: 14vw;" v-model="lastname" placeholder="Doe"
            aria-describedby="lastNameHelp">
          <i class="lock-icon fa fa-user pb-1 ps-1"></i>
        </div>
        <span class="text-danger" v-if="!lastname && signupClicked">Last name required</span>
      </div>
        <br>

        <div class="icon-container ">
          <p class="text-sm-start fw-semibold mb-1" style="font-size: 10px;">Email</p>
          <input type="email" class="form-control" id="exampleInputEmail1" v-model="email"
            placeholder="example@site.com" aria-describedby="emailHelp">
          <i class="lock-icon fa fa-envelope pb-1 ps-1"></i>
        </div>
        <span class="text-danger" v-if="!email && signupClicked">Email required</span>

        <br>

        
      

        <div class="icon-container">
          <p class="text-sm-start fw-semibold mb-1" style="font-size: 10px;">Choose Password</p>
          <input type="password" class="form-control" v-model="password" id="Password1" placeholder="Minimum 8 characters"
            aria-describedby="passwordHelp">
          <i class="lock-icon fa fa-lock pb-1 ps-1"></i>
        </div>
        <span class="text-danger" v-if="!password && signupClicked">Password required</span>
        <br>




        
       <!--<div class="icon-container">
          <p class="text-sm-start fw-semibold mb-1" style="font-size: 12px;">Confirm Password</p>
          <input type="password" class="form-control" v-model="confirm_password" id="Password2"
            placeholder="Confirm new password" aria-describedby="passwordHelp">
          <i class="lock-icon fa fa-lock"></i>
        </div>
        <span class="text-danger" v-if="!passwordMatch && signupClicked">Password does not match</span>
-->

        <button class="btn btn-bd-primary w-100 mt-4 shadow p-2 mb-4" v-on:click.prevent="signupClicked = true, signup">Sign Up</button> <!-- Added signupClicked variable -->
        <div class="fw-semibold mt-3" style="font-size: 10px;">
        <p>Already have an account? <router-link to="/login">Log In</router-link></p>
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
      // confirm_password: '',
      signupClicked: false, // Added signupClicked variable
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
    // passwordMatch() {
    //   return this.password === this.confirm_password;
    // }
  },
  methods: {
    async signup() {
      if (!this.firstname) {
        return;
      }
      if (!this.lastname) {
        return;
      }
      if (!this.email) {
        return;
      }
      if (!this.password) {
        return;
      }
      // if (!this.isPasswordMatch) {
      //   return;
      // }
      let result = await axios.post("http://localhost:3000/user", {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password
      });
      const data = await result.json();

      console.log("result", data);
      if (result.status == 201) {
        localStorage.setItem("user-info", JSON.stringify(result.data));
        this.$router.push({
          name: "Home"
        });
      }
    }
  },

  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({
        name: "Home"
      });
    }
  },
}
</script>

<style scoped>
.icon-container {
  position: relative;
}

.icon-container input {
  padding-right: 70px;
  padding-left: 40px;
  left: 20px;
}

.icon-container .lock-icon {
  position: absolute;
  top: 70%;
  left: 5px; /* Updated left position */
  transform: translateY(-50%);
  color: #999;
  pointer-events: none;
}

/* Added CSS to lock the icon buttons */
.icon-container .lock-icon.fa-envelope:before,
.icon-container .lock-icon.fa-lock:before {
  pointer-events: none;
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

.fbody{
height: 100vh;
   background-image: url('../assets/bg_img.jpg');
   background-size:cover;
   width: 100vw;
}
</style>
