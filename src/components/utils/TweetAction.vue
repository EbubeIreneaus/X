<style scoped>
* {
    box-sizing: border-box;
}

a {
    text-decoration: none;
}

.images {
    height: 250px
}

.img-con {
    max-height: 100%;
}

img,
video {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    filter: contrast(170%);
}

.profile-pics {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.tweetParagraph {
    height: 85px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;

    text-overflow: ellipsis;
}

.vertical-line {
    position: absolute;
    height: 125px;
    top: 18%;
    left: 7%;
}

textarea {
    border: none;
    outline: none;
    overflow: hidden;
}
</style>

<template>
    <div class="images w-100 p-1 ">

        <div class="img-con " :class="getImageClass(tweet.media.length, index)" v-for="(media, index) in tweet.media"
            :key="index">

            <img :src="`${url}/${media.file}`" class="r" alt="" v-if="media.type == 'img'">

            <video :src="`${url}/${media.file}`" controls v-else> </video>

        </div>
    </div>

    <div class="d-flex justify-content-between align-items-center w-100 p-1">

        <p><i @click="comment(tweet)" class="fa-solid fa-comment btn"></i><small ref="commentNo">{{ tweet.comments.length
        }}</small></p>

        <p><i @click="likeTweet(tweet.id, $event)" class="fa-solid fa-heart btn"
                :style="{ color: checkLiked(tweet.likes) }"></i> <small>{{ tweet.likes.length
                }}</small></p>

        <p> <i class="fa-solid fa-retweet btn"></i> <small>0</small></p>

        <p><i class="fa fa-chart-bar "></i> <small>{{ tweet.views }}</small></p>

    </div>

    <!-- 
        modal for tweet commenting
     -->
    <div class="modal" :class="{ 'd-block': display_modal }" id="modalId" tabindex="-1" data-bs-backdrop="static"
        data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">

        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md" role="document">

            <div class="modal-content">

                <div class="modal-header">

                    <button type="button" @click="display_modal = false" class="btn btn-close p-2 me-2"></button>

                </div>

                <div class="modal-body position-relative">

                    <!--  tweet to comment -->
                    <div class="d-flex mb-3 ">

                        <div class=" mt-2">

                            <img :src="url + tweet_to_comment.profileics" alt="" class="profile-pics" />

                        </div>

                        <div class=" w-100 p-2 ms-1">

                            <div>
                                <p>
                                    <b>{{ tweet_to_comment.full_name }}</b>
                                    <small> @{{ tweet_to_comment.username }}</small>
                                </p>

                            </div>

                            <div class=" tweet-link">

                                <p class="tweetParagraph p-2" v-html="formatTweet(tweet_to_comment.tweet)"></p>

                            </div>


                        </div>
                    </div>
                    <!-- XXXXX tweet to comment XXXXXX -->
                    <div class="vertical-line border"></div>
                    <!-- your comment -->

                    <div class="tweet-sec row mt-2 border-bottom pb-2">

                        <div class="col-1">

                            <img :src="url + '/' + user.pics" alt="" class="profile-pics">

                        </div>

                        <div class="col ms-2">

                            <div class="dropdown">

                                <a class=" ms-lg-1 ms-2"> <small> replying @{{ tweet_to_comment.username }}</small></a>

                            </div><br>

                            <div class="textarea">

                                <textarea id="" v-model="reply" cols="30" class="w-100 " placeholder="What is happening?">
                        </textarea>

                            </div>
                            <div class="image-preview-sec d-flex flex-wrap">

                                <div class="m-2 border border-danger position-relative "
                                    v-for="(file, index ) in imgArrays" :key="index">


                                    <img v-if="file.startsWith('data:image/')" :src="file" alt=""
                                        style="width:100%; height:100%">

                                    <video v-else-if="file.startsWith('data:video/')" :src="file" alt=""
                                        style="width:100%; height:100%"></video>
                                        
                                    <i @click="delImg(index)" class="fa-solid fa-trash text-danger"
                                        style="position: absolute;top:5px;right: 5px;"></i>

                                </div>

                            </div>
                            <div class="d-flex justify-content-between align-items-center">

                                <div class="ms-1">

                                    <input type="file" name="" @change="addImagesToReply($event)" id="image" class=""
                                        multiple accept="image/*, video/" hidden ref="tweetImg">

                                    <label for="image"><i class="fa-solid fa-image p-1 text-primary"></i></label>

                                    <i class="fa-solid fa-poll p-1 text-primary"></i>

                                    <i class="fa-solid fa-smile p-1 text-primary"></i>

                                    <i class="fa-solid fa-clock p-1 text-primary"></i>

                                    <i class="fa-solid fa-map-marker p-1 text-primary"></i>

                                </div>
                                <button class=" btn btn-primary rounded-pill" :disabled="tweetBtn" style="width:100px"
                                    @click="postComment($event)">tweet</button>

                            </div>
                        </div>
                    </div>
                    <!-- XXXXX your coment XXXXXXXXXXX  -->


                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, inject } from 'vue'
import Axios from 'axios'

const url = inject('xApi')

const { user, userId } = inject('user')

const props = defineProps({

    tweet: Object
})

let display_modal = ref(false)

let reply = ref(null)

const commentNo = ref(null)

const tweet_to_comment = reactive({
    tweet: '',
    profileics: '',
    username: '',
    full_name: '',
    id: ''

})

const replyFiles = ref([])

const imgUrls = ref([])

const imgArrays = computed(() => {

    imgUrls.value = []

    for (const file of replyFiles.value) {

        const reader = new FileReader()

        reader.onload = () => {

            imgUrls.value.push(reader.result)
        }

        if (file.type.match("image.*/") || file.type.match('video.*/')) {

            reader.readAsDataURL(file)

        }
    }
    return imgUrls.value
})

const tweetBtn = computed(() => {
    return (reply.value || replyFiles.value.length > 0) ? false : true
})

const addImagesToReply = (e) => {
    if (e.target.files.length > 4) {
        alert("Maximimun of four(4) files is allowed at a time")
        return
    }
    replyFiles.value = []
    const files = e.target.files

    for (const file of files) {

        if (replyFiles.value.length < 4) {
            replyFiles.value.push(file)
        }

    }
}

const checkLiked = (likesList) => {
    // loop through the likeList which is the tweet.likes array containing the id, userId if the user that
    // liked the post etc... an checked if my user.id is in likelist.user which return the id of the user
    for (const likes of likesList) {

        if (userId == likes.user) {
            return 'red'
        }
    }
}

const getImageClass = (length, index) => {
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

    } {

    }
}

const likeTweet = async (tweetId, e) => {
    const query = e.target.style.color == 'red' ? 'unlike' : 'like'
    if (query == 'like') {

        e.target.style.color = 'red'

        e.target.nextElementSibling.innerHTML = parseInt(e.target.nextElementSibling.innerHTML) + 1

    } else {

        e.target.style.color = ''

        e.target.nextElementSibling.innerHTML -= 1

    }
    const response = await Axios.post(`${url}/tweet/toogleLikeTweet/`, { tweetId: tweetId, query: query }, {

        headers: { userId: userId }
    })
    console.log(response.data);
}
const comment = (tweet) => {

    tweet_to_comment.username = props.tweet.profile.user.username

    tweet_to_comment.profileics = props.tweet.profile.profile_pics

    tweet_to_comment.tweet = props.tweet.tweet_txt

    tweet_to_comment.full_name = props.tweet.profile.name

    display_modal.value = true

    tweet_to_comment.id = props.tweet.id
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

const delImg = (index) => {
    replyFiles.value.splice(index, 1)
}
const postComment = async (e) => {

    let form = new FormData()

    form.append('tweetId', tweet_to_comment.id)

    form.append('comment', reply.value)

    for (const file of replyFiles.value) {

        form.append('files', file)

    }
    const headers = {
        "Content-Type": 'multipart/form-data',
        'userId': userId
    }
    const response = await Axios.post('http://127.0.0.1:8000/tweet/replyTweet/', form, { headers })

    if (response.data.status == 'success') {
        commentNo.value.innerHTML = parseInt(commentNo.value.innerHTML) + 1
        display_modal.value = false
    } else {
        // console.log(response.data);
    }
}

</script>