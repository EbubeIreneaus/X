<style scoped>
main{
    width: 100vw;
    min-height: 80vh;
    scale: 1.1;
}
.x-logo{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    
}
button{
display: block;
width: 250px;
padding: 5px 0;
border-radius: 20px;
}
.or{
    width: 250px;
    text-align: center;
}
h1{
    font-size: 50px;
}
h4{
    font-size: 30px;
}
h1, h4{
    font-weight: bolder;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.small-text{
    font-size: x-small;
    width: 250px;
}
.sin:hover{
    background-color:gainsboro;
}
.v-enter-active {
    transition: all 0.5s ease 1s;
}

.v-leave-active {
    transition: all 0.5s ease;
}

.v-enter-from {
    opacity: 0;
    transform: translateX(+50px);
}

.v-leave-to {
    opacity:0;
    transform: translateX(-100px);
}
@media screen and (max-width:992px){
    main{
        scale: 1;
    }
    .main{
        justify-content: center !important;
    }
    /* .x-logo{
    height: 100px;
    display: flex;
    justify-content: left;
    align-items: center !important;

    
}
.x-logo img{
    width: 50px;
    margin-left: 15%;
} */
}

@media screen and (max-width:465px){

    .x-logo{
    height: 100px;
    display: flex;
    justify-content: left;
    align-items: center !important;

    
}
.x-logo img{
    width: 50px;
    margin-left: 15%;
}
}

</style>
<template>
    <main>
        <!-- main page logic -->
      <div class="row ">
        <div class="col-md-6 col-12 x-logo ">
            <img src="../../public/x-logo-light.png" alt="">
        </div >
        <div class="col-md-6 col-12 d-flex align-items-center mx-auto">
            <div class="  p-2 ps-5 ps-lg-2" style="min-height:80vh;">
                <h1 class="my-3 mb-5">Happening now</h1>
                <h4 class="my-4">Join today.</h4>
                <div class="">

                    <button class="btn border sin" @click="comp = Login">Sign in</button>
                   
                    <p class="or  my-2 ">or</p>
                    
                    <button class="btn btn-primary" @click="comp = Register">Create account</button>
                    <p class="small-text">
                        By signing up you agree to the <a href="#">Terms of service</a> and
                         <a href="#">Privacy policy</a>, including <a href="#">cookies use</a>
                    </p>
                </div>
            </div>
        </div>
      </div>

      <!-- modal logic -->
      <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
      <div class="modal bg-light" :class="{'d-block':comp != null}" id="modalId" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scroll modal-md" role="document">
            <div class="modal-content " style="min-height: 85vh; ">
                <div class="modal-body ">

                   <Transition>
                    <component :is='comp' @Registered="registerComplete"  @change-comp="changeComp">
                    </component>
                   </Transition>
                </div>
             
            </div>
        </div>
      </div>
    </main>
</template>
<script setup>
import { ref } from "vue";
import Register from "./auth/Register.vue";
import Login from './auth/Login.vue'
import profilePicsUploadVue from "./auth/profilePicsUpload.vue";
let comp = ref(null)
const changeComp = (value)=>{
if (value == 'Register') {
    comp.value = Register
} else if (value == 'Login') {
    comp.value = Login
} else{
    
}
}
const registerComplete = () =>{
    comp.value = profilePicsUploadVue;
}
</script>