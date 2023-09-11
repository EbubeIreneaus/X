<style>
a {
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
    <side-bar />
    <right-bar />
    <div class="content ">
        <div class="d-flex">
            <i @click="router.go(-1)" class="fa-solid fa-arrow-left btn m-2 "></i>
            <h4 class=" m-2 ms-2">comment</h4>
        </div>

        <div class="d-flex me-2 mt-3 border-bottom" v-if="comment">
            <img :src="url + comment.profile.profile_pics" alt="" class="profile-pics">
            <div class=" w-100  ">
                <div class="d-flex align-items-center justify-content-between mb-3 pb-2">
                    <router-link :to="'profile/'" class=" ms-2">
                        <b>{{ comment.profile.name }} </b>
                        <small> @{{ comment.profile.user.username }}</small>
                    </router-link>
                    <button @click="toogleFollowing($event, comment.profile.id)" type="button"
                        class="btn btn-outline-dark rounded-pill me-2" style="width:100px">
                        {{ checkFollowing(comment.profile.followers) }}</button>
                </div>
                <article>
                    <p v-html="formatTweet(comment.tweet_txt)"></p>

                    <!-- <tweet-action :tweet="tweet" :user="user" /> -->
                    <div class=" w-100 mt-1">
                        <comment-action :comment="comment" />
                    </div>
                    <div>
                        <div v-for="(reply, index) in comment.replies" :key="index">
                            <div class=" mt-2">
                                <img :src="url + reply.profile.profile_pics" alt="" class="profile-pics" />
                            </div>
                            <div class=" w-100 p-2 ms-1">
                                <router-link to="">
                                    <p>
                                        <b>{{ reply.profile.name }}</b>
                                        <small> @{{ reply.profile.user.username }}</small>
                                    </p>
                                </router-link>
                                <div class=" tweet-link">
                                    <router-link :to="'/comment/' + reply.id" class="text-dark">
                                        <p class="tweetParagraph p-2" v-html="formatTweet(reply.tweet_txt)"></p>
                                    </router-link>
                                </div>
                                <comment-action :comment="reply" />

                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>

<script setup>
import Axios from 'axios';
import { inject, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import commentAction from './utils/commentAction.vue';
import commentSection from './utils/commentSection.vue'

const route = useRoute()
const router = useRouter()
const url = inject('xApi')
const commentId = route.params.id
const comment = ref(null)
const { user, userId } = inject('user')

const getSingleTweet = async () => {
    const response = await Axios.get(`${url}/tweet/getComment/${commentId}`)
    console.log(response.data);
    comment.value = response.data
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

onMounted(() => {
    getSingleTweet()
})

</script>