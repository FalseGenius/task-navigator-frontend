<template>
<router-view/>
<router/>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">

</template>

<script>
import router from "./routes.js";


export default {
  name: 'App',
  components:{
    router
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  margin: 0%;
  padding: 0%;
}
img{
    width: 70px;
}
/*
.register input, .login input{
    display: block;
    margin: auto;
    width: 50%;
    height: 40px;
    margin-top: 20px;
    padding-left: 20px;
    border: 1px solid skyblue;
}
/*
.register button, .login button{
    margin: auto;
    width: 53%;
    height: 40px;
    margin-top: 20px;
    background-color: skyblue;
    color: azure;
    border: 1px solid skyblue;
    cursor: pointer;
}*/

</style>
