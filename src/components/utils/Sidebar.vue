<style scoped>
ul li a {
    font-size: 20px;
    float: left;
}

ul li {
    list-style-type: none;
    margin-bottom: 10px;
}

ul li a:hover {
    background-color: whitesmoke;
}

ul li a.router-link-active {
    font-weight: 700;
    background-color: whitesmoke;
}

.offcanvas {
    width: 23%;

}

.sidebar-img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
}

.acct-bottom .txt-info {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    text-align: left;
    font-family: Arial, Helvetica, sans-serif;
}

::-webkit-scrollbar {
    width: 7px;
}

::-webkit-scrollbar-track {
    background-color: white;
}

::-webkit-scrollbar-thumb {
    background-color: whitesmoke;
    border-radius: 40px;
}

@media screen and (max-width:992px) {
    .offcanvas {
        width: 80%;
    }
}
</style>

<template>
    <div class="w-100  row align-items-center border-danger p-3 d-lg-none">

        <div class="col-3">

            <img :src="`${url}/${user.pics}`" @click="showOffcanvas = !showOffcanvas" alt="preson"
                class=" ms-3  sidebar-img">

        </div>

        <div class="d-inline col text-center">

            <i class="fa-brands fa-twitter mx-auto p-2  me-3 text-primary offcanvas-title" style="font-size: 30px;"></i>

        </div>
    </div>

    <div class="offcanvas offcanvas-start " :class="{ 'show': showOffcanvas }">

        <div class="sidebar-header offcanvas-header">

            <i class="fa-brands fa-twitter p-2 text-primary offcanvas-title" style="font-size: 30px;"></i>

            <button type="button" class="btn-close text-reset d-lg-none" @click="showOffcanvas = false"></button>

        </div>

        <ul class="list-group mt-2 offcanvas-body ms-3">
            <li>
                <router-link to="/home" class="rounded-pill btn p-2"><i class="fa-solid fa-home me-3"></i>Home</router-link>
            </li>
            <li>
                <router-link to="/profile/" class="rounded-pill btn p-2"><i class="fa-solid fa-user me-3"></i>Profile</router-link>
            </li>
            <li>
                <a href="#" class="rounded-pill btn p-2"><i class="fa-solid fa-bell me-3"></i>Notifications</a>
            </li>
            <li>
                <a href="#" class="rounded-pill btn p-2"><i class="fa-solid fa-envelope me-3"></i>Messages</a>
            </li>
            <li>
                <a href="#" class="rounded-pill btn p-2"><i class="fa-solid fa-list-ul me-3"></i>Lists</a>
            </li>
            <li>
                <a href="#" class="rounded-pill btn p-2"><i class="fa-solid fa-users me-3"></i>Communities</a>
            </li>
            <li>
                <a href="#" class="rounded-pill btn p-2"><i class="fa-solid fa-check-circle me-3"></i>Verify</a>
            </li>
            <li>
                <router-link to="/auth" class="rounded-pill btn p-2"><i
                        class="fa-solid fa-user me-3"></i>Logout</router-link>
            </li>
            <li>
                <a href="l" class="rounded-pill btn p-2 btn btn-primary w-100"> Tweet </a>
            </li>

            <li>

                <router-link :to="`/profile/`" class="rounded-pill btn  w-100 acct-bottom">

                    <div class="row align-items-center rounded-pill">

                        <div class="col-3 "><img :src="`${url}/${user.pics}`"
                                style="width:50px;height: 50px; border-radius: 50%;"></div>
                        <div class="col-9">

                            <b class="float-start w-100 txt-info">
                                <small>{{ user.name }}</small>
                            </b>

                            <small class="float-start txt-info" style="height:30px;overflow: hidden;">
                                @{{ user.username }}</small>
                        </div>
                    </div>
                </router-link>

            </li>
        </ul>
    </div>
</template>

<script setup>

import { ref, onMounted, inject } from 'vue'

let showOffcanvas = ref()

let { user, userId } = inject('user')

const url = inject('xApi')

const getScreenSize = () => {

    if (window.innerWidth < 992) {

        showOffcanvas.value = false

    } else {

        showOffcanvas.value = true

    }

}

onMounted(() => {

    getScreenSize()

    addEventListener('resize', getScreenSize)

})

</script>