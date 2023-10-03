<style scoped>
a {
    text-decoration: none;
    color: black;
}

.tweetParagraph {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;

    text-overflow: ellipsis;
}

.images {
    height: 200px;
}

.img-con {
    max-height: 100%;
}

.img-con img,
.img-con video {
    height: 100% !important;
    width: 100% !important;
}

.profile-pics {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
</style>

<template>
    <div class="tweet-section mt-2">
        <div class="">

            <div class="d-block mb-3 border-bottom" v-for="(comment, index) in tweet.comments" :key="index">

                <div class=" mt-2 d-flex gap-1">

                    <img :src="`${url}/assets/${comment.profile.profile_pics}`" alt="" class="profile-pics" />

                    <router-link to="">
                        <p class="mt-2">
                            <b>{{ comment.profile.name }}</b>
                            <small> @{{ comment.profile.user.username }}</small>
                        </p>
                    </router-link>

                </div>

                <div class=" w-100  p-2 ms-1">

                    <div class=" tweet-link">
                        <router-link :to="'/comment/' + comment.id" class="text-dark">
                            <p class="tweetParagraph p-2" v-html="formatTweet(comment.tweet_txt)"></p>
                        </router-link>

                        <div class="images w-100 p-1 " v-if="comment.media.length > 0">

                            <div class="img-con " :class="getImageClass(comment.media.length, index)"
                                v-for="(media, index) in comment.media" :key="index">

                                <img :src="`${url}/assets/${media.file}`" class="r" alt="" v-if="media.type == 'img'">

                                <video :src="`${url}/assets/${media.file}`" controls v-else> </video>

                            </div>
                        </div>
                    </div>

                    <comment-action :comment="comment"/>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, reactive, onMounted, inject } from 'vue'
import commentAction from './commentAction.vue'

const { user, userId } = inject('user')

const url = inject('xApi')

const props = defineProps({
    tweet: Object
})

const formatTweet = (tweet) => {
    if (tweet) {
        tweet = tweet.replace(/[()']/g, '')
        tweet = tweet.replace(/\\r\\n/g, '<br>')
        return tweet
    } else {
        return ""
    }

}
const getImageClass = (length, index) => {
    console.log(length);
    // the length is the number of image in a post and the index is the current index of the image
    if (length === 1) {
        return "w-100 h-100"
    } else if (length === 2) {
        return index == 0 ? 'w-50 h-100 float-start img-thumbnail' : 'w-50 h-100 float-end img-thumbnail'
    } else if (length === 3) {
        if (index !== 0) {
            return index == 1 ? " w-50 h-50 float-end img-thumbnail" : 'h-50 w-50 float-end img-thumbnail'
        } else {
            return 'w-50 h-100 float-start img-thumbnail'
        }
    } else {
        if(index == 1 || index == 3){
            return 'w-50 h-50 float-start img-thumbnail'
        }else{
            return 'w-50 h-50 float-end img-thumbnail'
        }
    } {

    }
}
</script>