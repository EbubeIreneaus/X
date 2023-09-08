<style>
.fg-sec a {
    font-family: Arial, Helvetica, sans-serif;
    color: black;
}
</style>
<template>
    <div class="">
        <div class=" d-flex align-items-center justify-content-center mt-5 w-100">
            <div class="r main-sec w-75 text-center">
                <h1 class="my-3 mb-5">X</h1>
                <h4 class="my-4">Sign in to X.</h4>
                <div class="">
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" v-model="form.username" id="formName" placeholder="">
                        <label for="formName">Username</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" v-model="form.psw" id="formName" placeholder="">
                        <label for="formName">Password</label>
                    </div>
                    <button ref="nextBtn" class="btn px-5 mx-auto d-block bg-dark text-light rounded-5 w-75 py-2"
                        type="button" @click="Login">submit</button>
                    <div class="d-flex justify-content-between mt-2 fg-sec">
                        <router-link to="#" @click="$emit('changeComp', 'Register')">Create account</router-link>
                        <router-link to="#">forget password?</router-link>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Axios from 'axios';
import Cookies from 'js-cookie'
import { ref, reactive, inject } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const url = inject('xApi')
const nextBtn = ref(null)
const form = reactive({
    'username': '',
    'psw': ''
})
const Login = async () => {
    nextBtn.value.innerHTML = '<i class="spinner-grow"></i>'
    if (form.username !== '' && form.psw !== '') {
        const response = await Axios.get(`${url}/auth/`, {
            params: {
                'username': form.username,
                'psw': form.psw

            }
        })
    
        if (response.data.status == 'success') {
            Cookies.set('userId', response.data.userId)
            router.push("/home")

        } else {
            nextBtn.value.innerHTML = 'submit'
            alert("user not found")
        }
    }else{
        alert('Read the information and fill in the details correctly')
        nextBtn.value.innerHTML = 'submit'
    }
}

</script>