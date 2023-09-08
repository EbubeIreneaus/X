<template>

    <div class="tweet-sec row mt-2 border-bottom pb-2">

        <div class="col-1 d-none d-lg-inline">

            <img :src="`${url}/${user.pics}`" alt="" class="profile-pics">

        </div>
        <div class="col ">

            <div class="dropdown">

                <a class="dropdown-toggle  rounded-pill ps-2 pe-4 border border-primary"
                    data-bs-toggle="dropdown">Everyone</a>

            </div><br>

            <div class="textarea">

                <textarea v-model="tweet" id="" cols="30" class="w-100 " placeholder="What is happening?">
                        </textarea>

            </div>
            <div class="image-preview-sec d-flex flex-wrap">

                <div class="m-2 border border-danger " v-for="(file, index ) in previewFile" :key="index">

                    <img v-if="file.startsWith('data:image/')" :src="file" alt="" style="width:100%; height:100%">

                    <video v-else-if="file.startsWith('data:video/')" :src="file" alt=""
                        style="width:100%; height:100%"></video>

                    <i @click="tweetFiles.splice(index, 1)" class="fa-solid fa-trash text-danger"
                        style="position: absolute;top:5px;right: 5px;"></i>

                </div>

            </div>

            <div class="d-flex justify-content-between align-items-center">

                <div class="ms-1">
                    
                    <input type="file" name="" @change="addImagesToForm($event)" id="file-input" class="" multiple
                        accept="image/*, video/*" hidden ref="tweetImg">
                    
                        <label for="file-input"><i class="fa-solid fa-image p-1 text-primary"></i></label>

                    <i class="fa-solid fa-poll p-1 text-primary"></i>

                    <i class="fa-solid fa-smile p-1 text-primary"></i>

                    <i class="fa-solid fa-clock p-1 text-primary"></i>

                    <i class="fa-solid fa-map-marker p-1 text-primary"></i>

                </div>

                <button class=" btn btn-primary rounded-pill" :disabled="tweetBtn" style="width:100px"
                    @click="postTweet($event)">tweet</button>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, reactive, inject, onMounted, computed } from 'vue'

import Axios from 'axios'

import Cookies from 'js-cookie';

const { user, userId } = inject('user')

const url = inject("xApi")

const tweetFiles = ref([])

const tweet = ref(null)

const prevArray = ref([])


const tweetBtn = computed(() => {
    return (tweet.value || tweetFiles.value.length > 0) ? false : true
})

const previewFile = computed(() => {

    const files = tweetFiles.value

    prevArray.value = []

    for (const file of files) {

        const reader = new FileReader()

        reader.addEventListener('load', () => {

            prevArray.value.push(reader.result)

        })
        reader.readAsDataURL(file)
    }
    return prevArray.value;
})

const addImagesToForm = (e) => {
    if (e.target.files.length > 4) {
        alert("Maximimun of four(4) files is allowed at a time")
        return
    }
    tweetFiles.value = []
    const files = e.target.files
    for (const file of files) {
        if (tweetFiles.value.length < 4) {
            tweetFiles.value.push(file)
        }
    }
}

const postTweet = async (e) => {

    const formData = new FormData()

    formData.append('tweet', tweet.value)

    for (const files of tweetFiles.value) {

        formData.append('files', files)
    }
    const headers = {

        "Content-Type": "multipart/form-data",
        'userId': userId
    };

    const res = await Axios.post(`${url}tweet/`, formData, {

        headers: headers
    })
    if(res.data.status == 'success'){

        tweet.value = ''
        tweetFiles.value = []

        alert('Tweeted Successfully')
        
    }else{

        alert('Tweeted Failed try again later')
    }
}
</script>

<style scoped>
a {
    text-decoration: none;
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

.tweet-sec div i {
    margin: 0 5px 0 5px;
}

.alert-success {
    position: absolute;
    top: 0;
    width: 80%;
    padding: 5px !important;
    margin: auto;
}

.profile-pics {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

</style>
