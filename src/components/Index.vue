<style scoped>
/* a {
    text-decoration: none;
}

textarea {
    border: none;
    outline: none;
    overflow: hidden;
} */

.content {
    width: 50%;
    margin-left: 23%;

}

.active-comp {
    border-bottom: 2px solid blue;
}


ul li {
    cursor: pointer;
}

.dropdown a {
    padding-bottom: 2px;
}

.profile-pics {
    width: 50px;
    height: 50px;
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
    <main class="">
        <side-bar />
        <right-bar />
        <section class="content container_fluid p-2">

            <div class="w-100 border pt-2 font-lg position-sticky top-0 " style="z-index: 9; background-color: white;">

                <h5 class="ps-3">Home</h5>

                <div class="componets">

                    <ul class="nav justify-content-between ">

                        <li class="nav-item ms-lg-5 mt-2  p-3 mb-1" :class="{ 'active-comp': activeComponent == ForYou }"
                            @click="activeComponent = ForYou">
                            <b>For you</b>
                        </li>

                        <li class="nav-item me-lg-5 mt-2 p-3 mb-1" :class="{ 'active-comp': activeComponent == Following }"
                            @click="activeComponent = Following">
                            <b>Following</b>
                        </li>

                    </ul>

                </div>

            </div>
            <!-- tweet area tag -->
            <tweetarea />
            <!-- tweet area tag -->
            <div>
                <component :is='activeComponent' :profilepics="user.profilepics" :user="user"></component>
            </div>
        </section>

      
    </main>
</template>

<script setup>
import { ref, reactive, inject } from 'vue';

import Following from "./utils/Following.vue";

import ForYou from "./utils/ForYou.vue";

import tweetarea from './utils/tweetarea.vue';

// import rightBar from './utils/rightBar.vue';
import Axios from 'axios';

import Cookies from 'js-cookie';

const user = inject('user')

let tweet = ref(null)

let tweetImg = reactive([])

let activeComponent = ref(ForYou)

function addImagesToForm(e) {

    const imageFiles = e.target.files

    const array = []

    let len = 0;

    const promise = new Promise((resolve, reject) => {

        for (const img of imageFiles) {

            len += 1

            if (len > 4) {

                reject('only 4 images is allowed')

            }
            const reader = new FileReader()

            reader.onload = function () {

                array.push(reader.result)

                if (array.length == imageFiles.length) {

                    resolve(array)

                }
            }
            if (img.type.match('image.*')) {

                reader.readAsDataURL(img)

            }


        }
    })
    promise.then((success) => {
        tweetImg = success
    }, (error) => {
        alert(error)
    })


}

const postTweet = async (e) => {

    const files = $refs.tweetImg.files

    const form = new FormData()

    let len = 0

    form.append('images', files)

    for (const img of files) {

        len += 1

        form.append('images', img)

    }
    form.append('tweet', tweet)

    const headers = {

        'Content-Type': 'multipart/form-data',

        'userId': user.id

    }
    const response = await Axios.post(

        'http://127.0.0.1:8000/home/postTweet/',
        form, { headers }
    )

    if (response.data.status == 'success') {

        tweet = ''
        tweetImg = []

    } else {

        console.log(response.data);
    }

}
</script>