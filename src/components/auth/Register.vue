<style scoped>
.dob-info {
    font-size: small !important;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-weight: lighter !important;
}

.s-2-form-check {
    font-family: Georgia, 'Times New Roman', Times, serif;
}

.txt-info {
    font-size: smaller;
    font-family: sans-serif;
}

.psw span {
    width: 25% !important;
    height: 5px;
    font-family: Arial, Helvetica, sans-serif;
    background-color: rgb(223, 22, 22);
}

.psw span.valid {
    background-color: green !important;
}

/* vue transition */
.sections-enter-active {
    transition: all 0.5s ease 1s;
}

.sections-leave-active {
    transition: all 0.5s ease;
}

.sections-enter-from {
    opacity: 0;
    transform: translateX(+50px);
}

.sections-leave-to {
    opacity: 0;
    transform: translateX(-100px);
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
    <div class="">
        <div class="d-lg-flex gap-1">
            <div>
                <i class="fa fa-arrow-left btn" v-show="section > 1" @click="section--"></i>
            </div>
            <form action="" style="overflow: hidden;" class="flex-grow pt-3">
                <h5>step {{ section }} of 4</h5>
                <Transition name="sections">

                    <div class="section-1" v-if="section == 1">
                        <h3>Create your account</h3>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" v-model="form.name" id="formName" placeholder="">
                            <label for="formName">Name</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input  type="text" class="form-control" v-model="form.email" id="formEmail"
                                placeholder="">
                            <label for="formName">Email</label>
                        </div>

                        <div class="mb-3">
                            <label for="formName"><b>Date of birth</b></label>
                            <p class="dob-info">This will not be shown publicly. Confirm your own age,
                                even if this account is for a business, a pet, or something else.</p>
                            <div>
                                <input type="date" class="form-control" v-model="form.date" id="formEmail" placeholder="">
                            </div>
                        </div>
                    </div>

                    <div class="section-2" v-else-if="section == 2">
                        <h3 class="mb-4">Customize your experience</h3>
                        <p><b>Track where you see X content across the web</b></p>

                        <div class="form-check mb-5 ">
                            <label class="form-check-label s-2-form-check">X uses this data to personalize your experience.
                                This web browsing history will never be stored with your name, email, or phone
                                number.</label>
                            <input class="form-check-input" type="checkbox" id="check1" v-model="form.license" checked>
                        </div>

                        <p class="mt-3 mb-4 txt-info">
                            By signing up, you agree to our Terms, Privacy Policy, and Cookie Use.
                            X may use your contact information, including your email address and phone number
                            for purposes outlined in our Privacy Policy. Learn more
                        </p>
                    </div>

                    <div class="section-3" v-else-if="section == 3">
                        <h2>Confirm your email address</h2><br>
                        <h4>A six(6) digit verification code have been sent to {{ form.email }}</h4>

                        <div class="form-floating mt-3 mb-5">
                            <input type="number" class="form-control" v-model="form.code" id="formName" placeholder="">
                            <label for="formName">Code</label>
                        </div>

                    </div>

                    <div class="section-4" v-else-if="section == 4">
                        <h4>Enter your username</h4>
                        <div class="form-floating mb-3">
                            <input type="text" @change="checkUsername" class="form-control" v-model="form.username" id="formUsername"
                                placeholder="">
                            <label for="formUsername">username</label>
                            <small class="text-danger" v-show="!usernameValid">username already taken</small>
                        </div>

                        <div class="">
                            <strong>Password Must Contain the Following:</strong><br>
                            <em>* uppercase character</em> <em>* lowercase character</em><br>
                            <em>* special character</em> <em>* 8 characters and above</em><br>
                            <div class=" form-floating">
                                <input type="password" class="form-control" v-model="form.psw" id="formPsw" placeholder="">
                                <label for="formPsw"><b>Password</b></label>
                                <div class="psw d-flex mb-5 mt-1 border">
                                    <span :class="{ 'valid': form.psw.match(/[A-Z]/) }"></span>
                                    <span :class="{ 'valid': form.psw.match(/[a-z]/) }"></span>
                                    <span :class="{ 'valid': form.psw.match(/[@#$%^&*!]/) }"></span>
                                    <span :class="{ 'valid': form.psw.length > 7 }"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="section-4" v-else-if="section == 5">
                        <div class="">
                            <div class=" preview-sec mb-3 mx-auto">
                                <img src="" alt="profile pics" class="border img-thumbnail" ref="previewImg">
                            </div>
                            <div class="mb-3">

                                <input type="file" class="form-control" @change="profileImgUpdate($event)" id="" placeholder="">
                            </div>

                        </div>
                    </div>

                </Transition>
                <button @click="goNext" ref="nextBtn"
                    class="btn px-5 mx-auto d-block bg-dark text-light rounded-5 w-75 py-2" type="button">Next</button>
                <div class="d-flex justify-content-between mt-2 fg-sec">
                    <router-link to="#" @click="$emit('changeComp', 'Login')">Already have an account?</router-link>

                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import profilePicsUpload from "./profilePicsUpload.vue";
import Axios from 'axios'
import Cookies from 'js-cookie';
import { ref, reactive, inject, onMounted } from "vue";
import { useRouter} from 'vue-router'
const url = inject('xApi')
const router = useRouter()
const emit = defineEmits(['Registered'])

const nextBtn = ref(null)

let profileImg = ref(null)

let previewImg = ref(null)

let countryList = ref([
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas (the)",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia (Plurinational State of)",
    "Bonaire, Sint Eustatius and Saba",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory (the)",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cayman Islands (the)",
    "Central African Republic (the)",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands (the)",
    "Colombia",
    "Comoros (the)",
    "Congo (the Democratic Republic of the)",
    "Congo (the)",
    "Cook Islands (the)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czechia",
    "Côte d'Ivoire",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic (the)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Falkland Islands (the) [Malvinas]",
    "Faroe Islands (the)",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories (the)",
    "Gabon",
    "Gambia (the)",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and McDonald Islands",
    "Holy See (the)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea (the Democratic People's Republic of)",
    "Korea (the Republic of)",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic (the)",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands (the)",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia (Federated States of)",
    "Moldova (the Republic of)",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands (the)",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger (the)",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands (the)",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine, State of",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines (the)",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Republic of North Macedonia",
    "Romania",
    "Russian Federation (the)",
    "Rwanda",
    "Réunion",
    "Saint Barthélemy",
    "Saint Helena, Ascension and Tristan da Cunha",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin (French part)",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten (Dutch part)",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan (the)",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands (the)",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates (the)",
    "United Kingdom of Great Britain and Northern Ireland (the)",
    "United States Minor Outlying Islands (the)",
    "United States of America (the)",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela (Bolivarian Republic of)",
    "Viet Nam",
    "Virgin Islands (British)",
    "Virgin Islands (U.S.)",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe",
    "Åland Islands"
])

let form = reactive({
    name: '',
    email: '',
    date: '',
    username: '',
    psw: '',
    license: false,
    code: '',
})

let section = ref(1)

let emailVefCode = ref(0)

let usernameValid = ref(true)

function validateFields() {
    if (section.value == 1) {
        if (form.name != '' && form.email != '' && form.date != ''  && form.email.indexOf('@') > -1) {
            return true
        } else { return false }
    }
    // else if (section.value == 2) {
    //     return form.license
    // }
}
function confirmEmail() { // confirm if code and emailvefcode property is same
    if (form.code == emailVefCode.value) {
        return true;
    }
    return false;
}

const registerUser = async () => { // send data to the server. last phase before leaving this componet
     const formData = new FormData()
     formData.append('name', form.name)
     formData.append('username', form.username)
     formData.append('email', form.email)
     formData.append('psw', form.psw)
     formData.append('img', profileImg.value)
    const res = await Axios.post(`${url}/auth/`,formData, {headers:{"Content-Type":"multipart/form-data"}})
   
    if (res.data.status == 'success') {
        Cookies.set('userId', res.data.userId, { expires: 1 });
        router.push("/home")

    }



}
function nextBtnTg(which) {
    if (which == 'load') {
        nextBtn.value.innerHTML = '<i class="spinner-grow"></i>';
        nextBtn.value.disable == true
    } else {
        nextBtn.value.innerHTML = 'next';
        nextBtn.value.disable == false
    }
}
const goNext = () => { //when next button is clicked
    nextBtnTg('load')
    if (section.value == 2) {
        if (form.license) {
            sendCode();
        } else {
            alert('Please read the information and fill in the details carefully!!!!')
            nextBtnTg('unload')
        }

    } else if (section.value == 3) {
        if (confirmEmail()) {
            section.value++
            nextBtnTg('unload')
        } else {
            alert('Incorrect value')
            nextBtnTg('unload')
        }
    } else if (section.value == 4) {
        if (!form.psw.match(/[A-Z]/) || !form.psw.match(/[a-z]/) || !form.psw.match(/[@!#$%^&*]/) ||
            form.psw.length < 7 ) {
                nextBtnTg('unload')
            alert("password is not strong enough")
        } else if (form.username == '' || usernameValid.value == false) {
            nextBtnTg('unload')
            alert('username field cannot be empty')
        } else {
            section.value++;
            nextBtnTg('unload')
        }
    } else if (section.value == 5) {
        registerUser()
    } else {
        if (validateFields()) {
            section.value++;
            nextBtnTg('unload')
        } else {
            alert('Please read the information and fill in the details carefully!!!!')
            nextBtnTg('unload')
        }
    }
}

const checkUsername = async () => { // check if someone has already used the email
    if (form.username !== "") {
        const res = await Axios.get(`${url}/auth/checkUserData/`, {
            params: { 'username':form.username }, headers: {
                'Content-Type': 'application/json'
            }
        })
         usernameValid.value = res.data == 'True' ? false: true //res.data returns true if username exist
    }
}

const sendCode = async () => { // send email verification code
    const res = await Axios.get(`${url}/auth/verifyEmail/`, {
        params: { 'email': form.email }, headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.data.status == 'success') {
        emailVefCode.value = res.data.code;

    } else {

    }
    section.value++;
    nextBtnTg('unload')
}

const profileImgUpdate = (e) => {// image preview 
    const file = e.target.files[0]
    profileImg.value = file
    if (true) {
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            previewImg.value.src = reader.result
        })
        reader.readAsDataURL(file)
    }
}
onMounted(() => {

})
</script>
