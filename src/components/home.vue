<template>
   
    <signup_comp></signup_comp>

        
    
</template>
<script>

// import router from './routes.js'
import signup_comp from './signup.vue'
export default{
    name:'home_comp',
    data(){
        return{

            name:'',
         
        }
    },
    components:{
        signup_comp
    },
   
   
  
}
</script>
<style>
table{
    width: 80%;
    margin: auto;
    
}
td{

 width: 150px;
 height: 50px;
}
</style>




