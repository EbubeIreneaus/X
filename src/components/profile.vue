<style scoped>
.header small {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.profile-img-sec {
    height: 150px;
    width: 100%;
    position: relative;
    background-image: radial-gradient(circle, yellow, red, black);
}

.profile-img-sec .d-flex img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 3px solid black;
    border-radius: 50%;
}

.profile-img-sec .d-flex {
    padding: 0 10px;
    height: 150px;
    position: absolute;
    bottom: -75px;

}

.name {
    font-family: Arial, Helvetica, sans-serif;
    font-size: medium;
}

.name::first-line {
    font-weight: 700;
    font-size: larger;
    color: black;
}

section[class^="two"] {
    padding: 0 10px;
    margin-top: 60px;
}

section[class^="two"] p {
    color: rgb(97, 94, 94);
    font-family: Arial, Helvetica, sans-serif;

}

section[class^="two"] p:nth-child(3) {
    margin-bottom: 1px;
}

.tab-link button {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    padding: 10px 15px;
    border: none;
    border-radius: 0%;
}

.tab-link button.active {
    border-bottom: 3px solid blue;
}

.tab-enter-active {
    transition: all .5s ease ;
}

.tab-leave-active {
    transition: all .2s ease;
}

.tab-leave-from {
    transform: translate(0);
}

.tab-leave-to {
    transform: translate(-150vh);
}

.tab-enter-from {
    transform: translate(+100vh);
}

.tab-enter-to {
    transform: translate(0);
}

.profile-pics {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.tweetParagraph {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 7;

    text-overflow: ellipsis;
}


.tweet-action-sec p {
    cursor: pointer;
    margin-top: 20px;
}

.tweet-link:hover {
    background-color: whitesmoke !important;
}
</style>

<template>
    <main>
        <div class="d-lg-block d-none"><!-- display set to none cause of profile picture set at the top of the sidbar by default-->
            <side-bar />
        </div>
        <right-bar />
        <div class="content" v-if="profile">

            <div class="header  d-flex align-items-center my-2">
                <i @click="router.go(-1)" class="fa-solid fa-arrow-left btn pe-3"></i>
                <div class=" px-2">
                    <b>{{ profile.name }}</b> <br><small>500 post</small>
                </div>
            </div>

            <section class="one">
                <div class="profile-img-sec border">
                    <div class="d-flex justify-content-between align-items-end w-100">
                        <img :src="`${url}/${profile.profile_pics}`" alt="" class="align-self-center">

                        <button type="button" class="btn border px-4 me-2 py-1 rounded-pill mb-4">Edit Profile</button>
                    </div>
                </div>
            </section>

            <section class="two ">
                <p class="name ms-2">
                    {{ profile.name }} <br /> @{{ profile.user.username }}
                </p>

                <p class="">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam quaerat harum sequi incidunt architecto
                    voluptate doloremque odit? Odio, est blandit
                </p>
                <p class="ps-1">
                    <small>
                        <i class="fa fa-map-marker"></i> Africa &nbsp; &nbsp;
                        <i class="fas fa-calendar-alt"></i> {{ profile.date_joined }} </small>
                </p>
                <p class=""><small>
                        {{ profile.following.length }} Following &nbsp; &nbsp;
                        {{ profile.followers.length }} Followers </small>
                </p>
            </section>

            <section class="three ">
                <div class="tab-link d-flex gap-3 ps-2">
                    <button class="btn" @click="tab = 'post'" :class="{ 'active': tab == 'post' }">Post</button>
                    <button class="btn" @click="tab = 'likes'" :class="{ 'active': tab == 'likes' }">likes</button>
                    <button class="btn" @click="tab = 'replies'" :class="{ 'active': tab == 'replies' }">Replies</button>
                </div>
                <hr>
                <div class="tab-content " style="overflow: hidden;">

                    <Transition name="tab">

                        <div class="" v-if="tab == 'post'">
                            <div class="tweet-section mt-2">
                                <div class="">

                                    <div class="d-block mb-3 border-bottom" v-for="(tweet, index) in tweets" :key="index">

                                        <div class=" mt-2 d-flex gap-1">

                                            <img :src="`${url}/${tweet.profile.profile_pics}`" alt=""
                                                class="profile-pics" />

                                            <router-link to="">
                                                <p class="mt-2">
                                                    <b>{{ tweet.profile.name }}</b>
                                                    <small> @{{ tweet.profile.user.username }}</small>
                                                </p>
                                            </router-link>

                                        </div>

                                        <div class=" w-100  p-2 ms-1">

                                            <div class=" tweet-link">
                                                <router-link :to="'/tweet/' + tweet.id" class="text-dark">
                                                    <p class="tweetParagraph p-2" v-html="formatTweet(tweet.tweet_txt)"></p>
                                                </router-link>

                                                <tweet-action :tweet="tweet" />
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                    <Transition name="tab">
                        <div class="" v-if="tab == 'likes'">
                            <div class="tweet-section mt-2">
                                <div class="">

                                    <div class="d-block mb-3 border-bottom" v-for="(tweet, index) in likedTweet"
                                        :key="index">

                                        <div class=" mt-2 d-flex gap-1">

                                            <img :src="`${url}/${tweet.profile.profile_pics}`" alt=""
                                                class="profile-pics" />

                                            <router-link to="">
                                                <p class="mt-2">
                                                    <b>{{ tweet.profile.name }}</b>
                                                    <small> @{{ tweet.profile.user.username }}</small>
                                                </p>
                                            </router-link>

                                        </div>

                                        <div class=" w-100  p-2 ms-1">

                                            <div class=" tweet-link">
                                                <router-link :to="'/tweet/' + tweet.id" class="text-dark">
                                                    <p class="tweetParagraph p-2" v-html="formatTweet(tweet.tweet_txt)"></p>
                                                </router-link>

                                                <tweet-action :tweet="tweet" />
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                    <Transition name="tab">
                        <keep-alive>
                        
                            <div class="" v-if="tab == 'replies'">
                                <p v-if="repliedTweet.length < 1" class="text-center align-center">nothing found</p>
                                <div class="tweet-section mt-2" v-else>
                                    <div class="">
    
                                        <div class="d-block mb-3 border-bottom" v-for="(tweet, index) in repliedTweet"
                                            :key="index">
    
                                            <div class=" mt-2 d-flex gap-1">
    
                                                <img :src="`${url}/${tweet.profile.profile_pics}`" alt=""
                                                    class="profile-pics" />
    
                                                <router-link to="">
                                                    <p class="mt-2">
                                                        <b>{{ tweet.profile.name }}</b>
                                                        <small> @{{ tweet.profile.user.username }}</small>
                                                    </p>
                                                </router-link>
    
                                            </div>
    
                                            <div class=" w-100  p-2 ms-1">
    
                                                <div class=" tweet-link">
                                                    <router-link :to="'/tweet/' + tweet.id" class="text-dark">
                                                        <p class="tweetParagraph p-2" v-html="formatTweet(tweet.tweet_txt)"></p>
                                                    </router-link>
    
                                                    <tweet-action :tweet="tweet" />
                                                </div>
    
    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </keep-alive>

                    </Transition>
                </div>
            </section>
        </div>
    </main>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Axios from 'axios';
import TweetAction from './utils/TweetAction.vue';
const profile = ref(null)
const router = useRouter()
let tab = ref('post')
const { userId } = inject('user');
const url = inject('xApi');
let tweets = ref([]);
let likedTweet = ref([]);
let repliedTweet = ref([]);

(async function () {
    const response = await Axios.get(`${url}/user/getProfile/${userId}`)
    profile.value = response.data
})()




const getTweets = async () => {
    const response = await Axios.get(`${url}/tweet/${userId}`)
    if (response.data) {
        tweets.value = response.data;
    }
}

const getlikedTweet = async () => {
    const response = await Axios.get(`${url}/tweet/likedTweet/${userId}`)
    if (response.data) {
        likedTweet.value = response.data;
    }
}
const getRepliedTweet = async () => {
    const response = await Axios.get(`${url}/tweet/repliedTweet/${userId}`)
    if (response.data) {
        repliedTweet.value = response.data;
    }
}

const formatTweet = (tweet) => {
    if (tweet) {
        tweet = tweet.replace(/[()']/g, '')
        tweet = tweet.replace(/\\r\\n/g, '<br>')
        return tweet
    } else {
        return ""
    }

}



const checkLiked = (tweetlikelist) => {
    for (const like of tweetlikelist) {
        if (userId == like.user) {
            return 'red';
        } else {
            return ''
        }
    }
}


onMounted(() => {
    getTweets();
    getlikedTweet();
    getRepliedTweet()
})
</script>

