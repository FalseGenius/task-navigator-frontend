<template>
  <div >
    <nav class="navbar bg-light pt-4">
     
         

            <div class=" d-flex justify-content-start ms-3">
                <img src="../assets/tasknav.png" alt="" style="height: 50px; width:auto;">
            </div>
            
            <div class="d-flex justify-content-end me-3">
              <p class="d-flex p-2">Already Playing with ClickUp?</p>
              <button class="btn btn-bd-primary h-75 d-flex align-items-center "><router-link to="/login" class="nav-link ">Login</router-link></button>
            </div>
      
    </nav>
  </div>
  
</template>

<script>


export default {
  name: "navbar_comp",
 
  
}
</script>


<style scoped>
nav ul li button {
  text-decoration: none;
  cursor: pointer;
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
.vector{
  position: relative;
left: 6.39%;
right: 90.14%;
top: 6.54%;
bottom: 90.74%;

background: linear-gradient(89.36deg, #2687E8 4.29%, #2687E8 4.3%, #50E3FF 99.63%);
}


.logo{
  position: absolute;
width: 117px;
height: 48px;
left: 32px;
top: 48px;

font-family: 'Segoe UI';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 24px;
/* or 100% */
display: flex;
align-items: center;
letter-spacing: 0.4px;

color: #000000;

position: absolute;
left: 6.39%;
right: 90.14%;
top: 6.54%;
bottom: 90.74%;

background: linear-gradient(89.36deg, #2687E8 4.29%, #2687E8 4.3%, #50E3FF 99.63%);


}
</style>
