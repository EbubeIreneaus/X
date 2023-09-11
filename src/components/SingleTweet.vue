<style scoped>
a{
    text-decoration: none;
    color: black;
}
.content {
    width: 50%;
    margin-left: 23%;
    padding-left: 10px;
}

.profile-pics {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

@media screen and (max-width:992px) {
    .content {
        width: 100vw;
        margin-left: 0;

    }

    .image-preview-sec div {
        width: 60px;
        height: 60px;
    }
}
</style>

<template>
    <main>
        <div class="d-lg-block d-none">
            <side-bar />
        </div>
        <right-bar />
        <div class="content ">

            <div class="d-flex">

                <i @click="router.go(-1)" class="fa-solid fa-arrow-left btn m-2 "></i>

                <h4 class=" m-2 ms-2">Tweet</h4>

            </div>

            <div class="d-flex me-2 mt-4 border-bottom" v-if="tweet">

                <img :src="`${url}/${tweet.profile.profile_pics}`" alt="" class="profile-pics">

                <div class=" w-100  ">

                    <div class="d-flex align-items-center justify-content-between mb-3 pb-2">

                        <router-link :to="'profile/'" class=" ms-2">

                            <b>{{ tweet.profile.name }}</b>
                            <small> @{{ tweet.profile.user.username }}</small>

                        </router-link>
                        <button @click="toogleFollowing($event, tweet.profile.id)" type="button"
                        class="btn btn-outline-dark rounded-pill me-2" style="width:100px">
                        {{ checkFollowing(tweet.profile.followers) }}</button>
                    </div>

                    <article>
                        <p v-html="format(tweet.tweet_txt)"></p>

                        <tweet-action :tweet="tweet"/>

                        <div class=" w-100 mt-1">

                            <comment-section :tweet="tweet"/>

                        </div>

                    </article>
                </div>
            </div>

        </div>
    </main>
</template>

<script setup>

import { ref, reactive, onMounted, inject, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TweetAction from './utils/TweetAction.vue';
import commentSection from './utils/commentSection.vue'
import Axios from 'axios';

const url = inject('xApi')

const { user, userId } = inject('user')

const route = useRoute()

const router = useRouter()

const tweetId = route.params.id

const tweet = ref(null)

const getSingleTweet = async () => {
    const response = await Axios.get(`${url}/tweet/getTweet/${tweetId}`)
    tweet.value = response.data
}

const format = (text) => {
    text = text.replace(/<script .*<\/script>/gi, "")
    text = text.replace(/\\r\\n/g, "<br>")
    text = text.replace(/[()]/g, '')
    return text
   
}
const toogleFollowing = async (e, id) => {
    const response = await Axios.post(`${url}/user/toggleFollowing/`, {
        personId: id,
        userId: userId
    })
    if (response.data.status == "success") {
        return response.data.code == 'follow' ? e.target.innerHTML = "Following" : e.target.innerHTML = "Follow"
    }
}

const checkFollowing = (followersArray) => {
    for (const follower of followersArray) {
        if(follower.my_profile.user.id == userId){
            return "Following"
        }
    }
    return "Follow"
}


onBeforeMount(() => {
    getSingleTweet()
})

</script>