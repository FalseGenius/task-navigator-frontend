<template>

  <NavbarComp_l/>
    <div class="fbody">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  
    <div class="card  m-auto shadow p-5 mb-3 bg-body rounded" style="width: 35vw;">
      <h1 class="fw-bold">Welcome</h1>
       <div class="card-body">
      <form class=" m-auto" style="width: 25vw;">
        <div class="icon-container">
          <p class="text-sm-start fw-semibold mb-1" style="font-size: 10px;">Email</p>
          <input type="email" class="form-control" id="exampleInputEmail1" v-model="email" placeholder="Enter your email" aria-describedby="emailHelp">
          <i class="lock-icon fa fa-envelope pb-1 ps-1"></i>
        </div>
        <span class="text-danger" v-if="!email && emailClicked">Email required</span> <!-- Added warning message -->

        <br>

        <div class="icon-container">
          <p class="text-sm-start fw-semibold mb-1" style="font-size: 10px;">Password</p>
          <input type="password" class="form-control" v-model="password" id="Password1" placeholder="Enter password" aria-describedby="passwordHelp">
          <i class="lock-icon fa fa-lock pb-1 ps-1"></i>
        </div>
        <span class="text-danger" v-if="!password && passwordClicked">Password required</span> <!-- Added warning message -->


  
        <button class="btn btn-bd-primary w-100 mt-4 shadow p-2 mb-2" v-on:click.prevent="emailClicked = true, passwordClicked = true, login">Log In</button> <!-- Added emailClicked and passwordClicked variables -->
        
      </form>

    </div>
    
  </div>
  <div class="fw-semibold mt-3" style="font-size: 10px;">
  <p class="text-light">Don't have an account? <router-link to="/signup" class="text-light">Sign up</router-link></p>
</div>
</div>
</template>

  
  
<script>
import axios from 'axios'
import NavbarComp_l from './navbar_l.vue'

export default {
  name: 'login_comp',
  data() {
    return {
      email: '',
      password: '',
      emailClicked: false,
      passwordClicked: false
    }
  },
  components: {
    NavbarComp_l
  },
  methods: {
    async login() {
      if (!this.email) {
        return; // Exit the function if the email field is empty
      }
      if (!this.password) {
        return; // Exit the function if the password field is empty
      }
      let result = await axios.get(
        `http://localhost:3000/user?email=${this.email}&password=${this.password}`
      )
      if (result.status == 200 && result.data.length > 0) {
        localStorage.setItem("user-info", JSON.stringify(result.data[0]));
        console.warn(result)
        this.$router.push({ name: "Home" });
      } else {
        alert('Invalid credentials')
      }
    }
  },
    
    mounted() {
      let user = localStorage.getItem("user-info");
      if (user) {
        this.$router.push({ name: "Home" });
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
height: 89vh;
   background-image: url('../assets/bg_img.jpg');
   background-size:cover;
   width: 100vw;
   
}
</style>






