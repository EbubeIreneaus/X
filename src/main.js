// import './assets/main.css'
import { createRouter, createWebHistory } from 'vue-router';
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css';
import Auth from "./components/Auth.vue";
import Index from './components/Index.vue'
import Sidebar from './components/utils/Sidebar.vue'
import Rightbar from './components/utils/rightBar.vue'
import SingleTweet from './components/SingleTweet.vue'
import singleComment from './components/singleComment.vue';
import GSignInButton from 'vue-google-signin-button'
import profile from './components/profile.vue';
import tweetArea from './components/utils/tweetarea.vue'

import { createApp } from 'vue'
import App from './App.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path:'/', component: Index},
        {path:'/home', component: Index},
        {path:'/auth', component: Auth},
        {path:"/tweet/:id", component: SingleTweet},
        {path:"/comment/:id", component : singleComment},
        {path:"/profile/", component:profile} ,
        {path:"/profile/ss", component:tweetArea} 
    ]
    })

const app = createApp(App)
app.component('side-bar', Sidebar)
app.component('right-bar', Rightbar)
app.provide('xApi', ' http://127.0.0.1:8000/')
app.use(router)
app.use(GSignInButton)
app.mount('#app')
