<style scoped>
a {
    text-decoration: none;
    color: black;
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
    <div class="tweet-section mt-2">
        <div class="">

            <div class="d-block mb-3 border-bottom" v-for="(tweet, index) in tweets" :key="index">

                <div class=" mt-2 d-flex gap-1">

                    <img :src="`${url}/assets/${tweet.profile.profile_pics}`" alt="" class="profile-pics" />

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

                        <tweet-action :tweet="tweet" :user="user" />
                    </div>


                </div>
            </div>
        </div>
    </div>
    <!-- Modal for comment-->
 
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import Axios from 'axios'
import Cookies from 'js-cookie'
import TweetAction from './TweetAction.vue';
import tweetarea from './tweetarea.vue';
const url = inject('xApi')

let tweets = ref([])


const getTweets = async () => {
    const response = await Axios.get(`${url}/tweet/`)
    if (response.data) {
        tweets.value = response.data;
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
    getTweets()
})

</script>