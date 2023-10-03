<style></style>

<template>

            <router-view :user="user" :key="$route.fullPath"></router-view>
</template>

<script setup>
import { ref, reactive, onMounted, inject, provide  } from 'vue'
import {useRouter } from 'vue-router'
const router = useRouter()
import Axios from 'axios';
import Cookies from 'js-cookie';
const url = inject("xApi")
// import rightBar from './components/utils/rightBar.vue';

      const userId = Cookies.get('userId')
    let user = ref({})
    provide('user',{user, userId}) //send the user to all componet
      const getUser = async() => {
            const response = await Axios.get(`${url}/user/getUserData/${userId}`)
            if (response.data.status == 'success') {
               user.value = response.data
               
            } else {
                //  redirect to auth page
            }
        }
 

    onMounted(() => {
        
        if (userId == null) {
            router.push('/auth')
        } else {
           getUser()
        }
    })

</script>