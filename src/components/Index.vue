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
    position: relative;
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

.floating-btn {
    position: fixed;
    z-index: 9999999;
    width: 70px;
    height: 70px;
    display: grid;
    place-items: center;
    background-color: rgb(139, 139, 196);
    top: 85vh;
    left: 75%;
}
.v-enter-active, .v-leave-active  {
    transition: all .5s ease ;
}


.v-enter-from, .v-leave-to {
    transform: scale(0);
}

.v-enter-to, .v-leave-from {
    transform: scale(1);
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
        <section class="content container_fluid p-lg-2 p-md-5 p-2">

          <Transition>
            <div class="modal d-block bg-light" v-if="tweetModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
                role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md" role="document">
                    <div class="modal-content ">
                        <div class="modal-header">
                            <button type="button" class="btn-close" @click="tweetModal = false"></button>
                        </div>

                        <div class="modal-body">
                            <tweetarea :tweet-files="twtFiles"  @add-img-to-form="addImagesToForm" @post-success="tweeted"/>
                        </div>

                    </div>
                </div>
            </div>
          </Transition>

            <div class="w-100 border pt-2 font-lg position-sticky top-0 " style="z-index: 9; background-color: white;">

                <h5 class="ps-3">Home</h5>

                <div class="componets">

                    <ul class="nav justify-content-between ">

                        <li class="nav-item ms-lg-5 m-2  px-3 py-2 mb-2" :class="{ 'active-comp': activeComponent == 'forYou' }"
                            @click="activeComponent = 'forYou'">
                            <b>For you</b>
                        </li>

                        <li class="nav-item me-lg-5 m-2 px-3 py-2 mb-2 " :class="{ 'active-comp': activeComponent == 'following' }"
                            @click="activeComponent = 'following'">
                            <b>Following</b>
                        </li>

                    </ul>

                </div>

            </div>
            <!-- tweet area tag -->
            <!-- <div class="d-lg-block d-none"> -->
                <tweetarea :tweet-files="twtFiles" @add-img-to-form="addImagesToForm" @post-success="tweeted"/>
            <!-- </div> -->
            <!-- tweet area tag -->
            <div>
                <component :is='comp' :profilepics="user.profilepics" :user="user"></component>
            </div>
            <div class="floating-btn btn d-lg-none rounded-circle" @click="tweetModal = !tweetModal">
                <i class="fas fa-feather" ></i>
            </div>
        </section>




    </main>
</template>

<script setup>
import { ref, reactive, inject, computed } from 'vue';

import Following from "./utils/Following.vue";

import ForYou from "./utils/ForYou.vue";

import tweetarea from './utils/tweetarea.vue';

const twtFiles = ref([])
// import rightBar from './utils/rightBar.vue';
import Axios from 'axios';

import Cookies from 'js-cookie';

const user = inject('user')

// let tweet = ref(null)

let tweetModal = ref(false)

let activeComponent = ref('forYou')


const comp = computed(() =>{
    return activeComponent.value == "forYou"?ForYou:Following
})
const tweeted = () =>{
    twtFiles.value = []
    tweetModal.value = false
    location.reload()
    alert("Tweeted Successful")
}

const addImagesToForm = (e) => {
    if (e.target.files.length > 3) {
        alert("Maximimun of Three(3) files is allowed at a time")
        return
    }
    twtFiles.value = []
    const files = e.target.files
    for (const file of files) {
        if (twtFiles.value.length < 4) {
            twtFiles.value.push(file)
        }
    }
}

</script>