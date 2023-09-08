<style scoped>
.main {
    float: right;
    width: 25%;
    min-height: 100vh;
}

input[type='text'] {
    border: none;
    border-radius: 20px;
    outline: none !important;
    box-shadow: none;
    background-color: transparent;
    width: 85%;
}

.form {
    height: 40px;
    border-radius: 20px;
    background-color: whitesmoke;
}

label {
    border: none;
    outline: none;
}
</style>
<template>
    <div class="main pb-5 d-none d-lg-block position-sticky top-0 p-3">
        <div class=" ">
            <div class="input-group w-100 pt-1 form d-flex align-items-center mb-3 ">
                <i class="btn fa fa-search border-0 outline-0" style="width: 15%;"></i>
                <input type="text" name="" id="" class=" h-100" placeholder="search twitter" aria-describedby="helpId">
            </div>

            <div class=" p-2 bg-light text-dark rounded-4 mb-4">
                <h5 class="mb-1"><b>Get Verified</b> </h5>
                <p><b>Subscribe to unlock new features.</b></p>
                <button class="btn btn-dark pe-3 ps-3 rounded-pill">Get Verified</button>

            </div>

            <div class=" p-2 bg-light text-dark rounded-4">
                <h6 class="mb-3 ms-1"><b>Trends For You</b> </h6>

                <div class="ms-1" v-for="x in [1, 2, 3, 4]" :key="x">
                    <small>Trending in Nigeria</small>
                    <p><b>Tech is Comming</b><br>
                        <small>9,300 tweets</small>
                    </p>
                </div>


            </div>
        </div>

    </div>
</template>

<script>
export default {

}
</script>