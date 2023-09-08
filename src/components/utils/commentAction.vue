<style scoped>
* {
    box-sizing: border-box;
}

a {
    text-decoration: none;
    color: black;
}

.images {
    max-height: 200px
}

.img-con {
    max-height: 100%;
}

img {
    height: 100%;
    width: 100%;
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
.image-preview-sec div {
    max-width: 100px;
    max-height: 100px;
    position: relative;
}

</style>
<template>
    <!-- <div class="images w-100 p-1 ">
        <div class="img-con " :class="getImageClass(comment.image.length, index)" v-for="(img, index) in comment.image">
            <img :src="'http://127.0.0.1:8000' + img.image" class="img-thumbnail" alt="">
        </div>
    </div> -->

    <div class="d-flex justify-content-between align-items-center w-100 p-1" v-if="comment">

        <p><i @click="reply_comment(comment)" class="fa-solid fa-comment btn"></i><small ref="commentNo">{{
            comment.replies.length }}</small></p>

        <p><i @click="likeComment(comment.id, $event)" class="fa-solid fa-heart btn"
                :style="{ color: checkLiked(comment.likes) }"></i>
            <small>{{ comment.likes.length }}</small>
        </p>

        <p> <i class="fa-solid fa-retweet btn"></i> <small>12</small></p>

        <p><i class="fa fa-chart-bar "></i> <small></small></p>

    </div>

    <!-- 
        modal for tweet commenting
 -->
    <div class="modal" :class="{ 'd-block': display_modal }" id="modalId" tabindex="-1" data-bs-backdrop="static"
        data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" @click="display_modal = false"></button>
                </div>
                <div class="modal-body position-relative">
                    <!--  tweet to comment -->
                    <div class="d-flex mb-3 ">
                        <div class=" mt-2">
                            <img :src="`${url}/${comment_to_reply.profileics}`" alt="" class="profile-pics" />
                        </div>
                        <div class=" w-100 p-2 ms-1">
                            <div>
                                <p>
                                    <b>{{ comment_to_reply.full_name }}</b>
                                    <small> @{{ comment_to_reply.username }}</small>
                                </p>
                            </div>
                            <div class=" tweet-link">
                                <p class="tweetParagraph p-2" v-html="formatTweet(comment_to_reply.txt)"></p>
                            </div>
                        </div>
                    </div>
                    <div class="vertical-line border"></div>

                    <!-- your comment -->
                    <div class="tweet-sec row mt-2 border-bottom pb-2">
                        <div class="col-1">
                            <img :src="`${url}/${user.pics}`" alt="" class="profile-pics">
                        </div>
                        <div class="col ms-3">
                            <div class="dropdown">
                                <a class=""> <small> replying @{{ comment_to_reply.username }}</small></a>
                            </div><br>
                            <div class="textarea">
                                <textarea id="" v-model="reply" cols="30" class="w-100 " placeholder="What is happening?">
                        </textarea>
                            </div>

                            <div class="image-preview-sec d-flex flex-wrap">

                                <div class="m-2 border border-danger " v-for="(file, index ) in imgArrays" :key="index">

                                    <img v-if="file.startsWith('data:image/')" :src="file" alt=""
                                        style="width:100%; height:100%">

                                    <video v-else-if="file.startsWith('data:video/')" :src="file" alt=""
                                        style="width:100%; height:100%"></video>

                                    <i @click="tweetImage.splice(index, 1)" class="fa-solid fa-trash text-danger"
                                        style="position: absolute;top:5px;right: 5px;"></i>

                                </div>

                            </div>

                            <div class="d-flex justify-content-between align-items-center">

                                <div class="ms-1">

                                    <input type="file" name="" @change="addImagesToTweet($event)" id="replyImg" class=""
                                        multiple accept="image/*, video/*" hidden ref="tweetImg">

                                    <label for="replyImg"><i class="fa-solid fa-image p-1 text-primary"></i></label>

                                    <i class="fa-solid fa-poll p-1 text-primary"></i>

                                    <i class="fa-solid fa-smile p-1 text-primary"></i>

                                    <i class="fa-solid fa-clock p-1 text-primary"></i>

                                    <i class="fa-solid fa-map-marker p-1 text-primary"></i>
                                </div>

                                <button class=" btn btn-primary rounded-pill" :disabled="tweetBtn" style="width:100px"
                                    @click="replyComment($event)">tweet</button>
                            </div>

                        </div>

                        <!-- XXXXX your coment XXXXXXXXXXX  -->
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, inject } from 'vue'
import Axios from 'axios';

const props = defineProps({ comment: Object })
const { user, userId } = inject('user')
const url = inject('xApi')
const display_modal = ref(false)

const reply = ref(null)

const commentNo = ref(null)

const comment_to_reply = reactive({
    txt: '',
    profileics: '',
    username: '',
    full_name: '',
    id: ''

})
const tweetImage = ref([])
const imgUrls = ref([])

const tweetBtn = computed(() => {
    return (reply.value || tweetImage.value.length > 0) ? false : true
})

const imgArrays = computed(() => {
    imgUrls.value = []
    for (const img of tweetImage.value) {
        const reader = new FileReader()

        reader.onload = () => {
            imgUrls.value.push(reader.result)
        }
        if (img.type.match("image.*/") || img.type.match("video.*/")) {
            reader.readAsDataURL(img)
        }
    }
    return imgUrls.value

})


const checkLiked = (likesList) => {

    // loop through the likeList which is the tweet.likes array containing the id, userId if the user that
    // liked the post etc... an checked if my user.id is in likelist.user which return the id of the user
    for (const likes of likesList) {
        if (userId == likes.user) {
            return 'red'
        }
    }
}


const likeComment = (commentId, e) => {
    const query = e.target.style.color == 'red' ? 'unlike' : 'like'
    if (query == 'like') {
        e.target.style.color = 'red'
        e.target.nextElementSibling.innerHTML = parseInt(e.target.nextElementSibling.innerHTML) + 1
    } else {
        e.target.style.color = ''
        e.target.nextElementSibling.innerHTML -= 1
    }
    const response = Axios.post(`${url}/tweet/toogleLikeComment/`,
        { commentId: commentId, query: query }, {
        headers: { userId: userId }
    })

}

const reply_comment = (replyComment) => {
    comment_to_reply.username = replyComment.profile.user.username
    comment_to_reply.profileics = replyComment.profile.profile_pics
    comment_to_reply.txt = replyComment.tweet_txt
    comment_to_reply.full_name = replyComment.profile.name
    display_modal.value = true
    comment_to_reply.id = replyComment.id
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
const addImagesToTweet = (e) => {
    tweetImage.value = []

    const imageFiles = e.target.files
    if (imageFiles.length > 4) {
        alert("only four images allowed")
    } else {
        for (const img of imageFiles) {
            tweetImage.value.push(img)
        }
        console.log(tweetImage.value);
    }
}

const delImg = (index) => {
    tweetImage.value.splice(index, 1)
}
const replyComment = async (e) => {
    let form = new FormData()
    form.append('commentId', comment_to_reply.id)
    form.append('comment_txt', reply.value)
    for (const img of tweetImage.value) {
        form.append('files', img)
    }
    const headers = {
        "Content-Type": 'multipart/form-data',
        'userId':userId
    }
    const response = await Axios.post(`${url}/tweet/replyComment/`, form, { headers })
    if (response.data.status == 'success') {
        commentNo.value.innerHTML = parseInt(commentNo.value.innerHTML) + 1
        display_modal.value = false
    } else {
        console.log(response.data);
    }
}



    // mounted() {
    //     console.log(comment.likes.length);
    // },

</script>