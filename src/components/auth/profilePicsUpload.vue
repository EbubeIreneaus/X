<style scoped>
.body {
    height: 100vh !important;
    display: flex;
    justify-content: center;
    align-items: center;
}

.preview-sec {
    width: 150px;
    height: 150px;
}

.preview-sec img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-position: center;
}
</style>
<template>
    <div class="body">
        <div class="">
            <div class=" preview-sec mb-3 mx-auto">
                <img src="" alt="profile pics" class="border img-thumbnail" ref="previewImg">
            </div>
            <div class="mb-3">

                <input type="file" class="form-control" @change="profileImg($event)" id="" placeholder="">
            </div>

            <div class="mb-3">
                <button type="button" ref="uploadBtn" class="px-5 btn btn-outline-info" :disabled="!img" @click="upload">Upload File</button>
            </div>

        </div>
    </div>
</template>

<script setup>
import Cookies from "js-cookie";
import Axios  from "axios";
import { ref, inject} from 'vue'
import {useRouter} from 'vue-router'
const url = inject('xApi')
const userId = Cookies.get('userId')
const router = useRouter()
const uploadBtn = ref(null)
let img = ref(null)
let previewImg = ref(null)

const upload = async () =>{
      uploadBtn.value.innerHTML = '<i class="spinner-grow"></i>'
    const form = new FormData();
    form.append('pics', img.value)
    form.append('userId', userId)
    const header= {
        'Content-Type':'multipart/form-data'
    }
    const res = await Axios.post(`${url}profile/create_profile_pics.php`, form,{headers:header} )
    if (res.data.status == 'success') {
        window.location.href = 'https://twitter-xx.netlify.app/'
    } else {
        alert("could not upload your profile picture at the moment")
        uploadBtn.value.innerHTML = 'upload'
    }

}
const profileImg = (e) => {
    const file = e.target.files[0]
    img.value = file
    if (true) {
        const reader = new FileReader()
reader.addEventListener('load', ()=>{
    previewImg.value.src = reader.result
})
        reader.readAsDataURL(file)
    }
}
</script>
