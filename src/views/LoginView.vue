<!-- 
    @Author: Alola
-->

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

// 原始背景图片集
const originalImages = [
    { url: '/assets/images/LoginImage1.jpg' },
    { url: '/assets/images/LoginImage2.jpg' },
    { url: '/assets/images/LoginImage3.jpg' },
]

const extendedImages = ref([
    originalImages[originalImages.length - 1],
    ...originalImages,
    originalImages[0]
])

const containerRef = ref(null)

const i = ref(1)
const j = ref(0)

// 登录 and 注册
const isRegister = ref(false)
const isLogin = ref(true)
const FormModel = ref({
    username: '',
    password: '',
    RePassword: ''
})

const submitForm = () => {

}

// target图片换位 + 动画
const targetImage = [
    { url: '/assets/images/target-image1.png' },
    { url: '/assets/images/target-image2.png' },
    { url: '/assets/images/target-image3.png' },
    { url: '/assets/images/target-image4.png' },
    { url: '/assets/images/target-image5.png' },
    { url: '/assets/images/target-image6.png' },
]

const target_i = ref(0);

const isAnimating = ref(false);

const Switch = (value) => {
    if (value) {
        isRegister.value = true, isLogin.value = false;
    }
    else {
        isLogin.value = true, isRegister.value = false;
    }
    target_i.value = (target_i.value + 2) % (targetImage.length - 1)
}

const RightImage = () => {
    if (isAnimating.value) return;
    isAnimating.value = true;

    i.value++, j.value++;
    if (i.value === extendedImages.value.length - 1) {
        setTimeout(() => {
            containerRef.value.classList.add('no-transition');
            i.value = 1;
            requestAnimationFrame(() => {
                containerRef.value.classList.remove('no-transition');
                isAnimating.value = false;
            })
        }, 500)
    }
    else {
        setTimeout(() => {
            isAnimating.value = false;
        }, 500);
    }
}

const LeftImage = () => {
    if (isAnimating.value) return;
    isAnimating.value = true;

    i.value--, j.value++;
    if (i.value === 0) {
        setTimeout(() => {
            containerRef.value.classList.add('no-transition');
            i.value = extendedImages.value.length - 2;
            requestAnimationFrame(() => {
                containerRef.value.classList.remove('no-transition');
                isAnimating.value = false;
            })
        }, 500)
    }
    else {
        setTimeout(() => {
            isAnimating.value = false;
        }, 500);
    }
}

const router = useRouter()
const mainRef = ref(null)

onMounted(() => {
    requestAnimationFrame(() => {
        mainRef.value.style.transition = 'opacity 1s ease'
        mainRef.value.style.opacity = 1
    })
})

const goHome = () => {
    mainRef.value.style.opacity = 0
    setTimeout(() => {
        router.push('/')
    }, 500)
}
</script>

<template>
    <div class="main" ref="mainRef">
        <div class="background-container"
            :style="{ left: `-${i * 100}%`, '--background-width': extendedImages.length * 100 + '%' }"
            ref="containerRef">
            <div v-for="(img, index) in extendedImages" :key="index" class="main-background" :style="{
                backgroundImage: `url('${img.url}')`
            }"></div>
        </div>

        <Icon class="left" icon="material-symbols:arrow-back-ios-new-rounded" @click="LeftImage" />
        <Icon class="right" icon="material-symbols:arrow-forward-ios-rounded" @click="RightImage" />
        <div class="box">
            <div class="target">
                <Transition name="fade">
                    <div class="slide-image-container" :class="{ 'slide': isRegister }" :key="i">
                        <img class="slide-image" :src="extendedImages[i].url" :key="i">
                    </div>
                </Transition>
                <Transition name="fade">
                    <img class="target-image-1" :src="targetImage[target_i].url" alt="">
                </Transition>
                <Transition name="fade">
                    <img class="target-image-2" :src="targetImage[target_i + 1].url" alt="">
                </Transition>
            </div>
            <div class="targetbox"></div>

            <div class="loginbox">

                <form :model="FormModel" @submit.prevent="submitForm">
                    <Transition name="fade">
                        <h2 :key="isLogin">{{ isLogin ? 'Log In' : 'Join Us' }}</h2>
                    </Transition>
                    <label class="input-name">Username:</label>
                    <input v-model="FormModel.username"></input>
                    <label class="input-name">Password:</label>
                    <input v-model="FormModel.password"></input>
                    <Transition name="fade">
                        <label v-if="isRegister" class="input-name">RePassword:</label>
                    </Transition>
                    <Transition name="fade">
                        <input v-if="isRegister" v-model="FormModel.RePassword"></input>
                    </Transition>
                    <Transition name="fade">
                        <button :key="isLogin">{{ isLogin ? 'Login' : 'Register' }}</button>
                    </Transition>
                </form>

            </div>
            <img class="switch-login" src="/assets/images/电吉他.svg" alt="" @click="Switch(isLogin)"></img>
            <div class="ribbons"></div>
        </div>
        <Icon class="close-login" icon="material-symbols:close-rounded" @click="goHome" />
    </div>
</template>

<style scoped>
.main {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    opacity: 0;
    transition: opacity 1s ease;
}

.background-container {
    will-change: left;
    position: absolute;
    display: flex;
    width: var(--background-width);
    height: 100%;
    transition: left 0.5s ease-in-out;
    z-index: 0;

}

.background-container.no-transition {
    transition: none;
}

.main-background {
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: center;
    flex-shrink: 0;
}

.main-background::before {
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    position: fixed;
    content: '';
    background: linear-gradient(-10deg, rgba(255, 130, 130, 0.05) 50%, rgba(255, 212, 112, 0.05) 100%);
    backdrop-filter: blur(3px);
}

.left,
.right {
    position: fixed;
    width: 5%;
    height: 10%;
    cursor: pointer;
    transform: scale(1);
    transition: transform 0.5s ease;
    color: #ffffff61;
}

.left:hover,
.right:hover {
    transform: scale(1.3);
}

.left {
    left: 30px;
}

.right {
    right: 30px;
}

.box {
    position: relative;
    display: flex;
    align-items: center;
    width: 50%;
    height: 60%;
    z-index: 1;
    outline: 1.5px dashed #000;
    outline-offset: -20px;
}

.target {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2.5%;
    height: 100%;
    left: 10px;
    top: 0;
    width: 30%;
    z-index: 2;
    background-color: #ffecd7;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
    border-radius: 5px;
}

.targetbox {
    width: 25%;
    height: 95%;
    background-color: white;
    outline: 1.5px dashed #000;
    outline-offset: -8px;
}

.slide-image-container {
    will-change: opacity;
    position: absolute;
    width: 100%;
    height: 50%;
    top: 10px;
    transition: all 0.8s ease-in-out;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
}

.slide-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.slide {
    top: 47.5%;
}

@keyframes fadeOutIn {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.87;
    }

    100% {
        opacity: 1;
    }
}

.fade-split-enter-active,
.fade-split-leave-active {
    animation: fadeOutIn 0.5s linear;
}

.target-image-1 {
    width: 70%;
    transition: all 0.8s ease;
}

.target-image-2 {
    width: 70%;
    margin-top: 29%;
    transition: all 0.8s ease;
}

@keyframes fadeOutIn-target {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.fade-split-target-enter-active,
.fade-split-target-leave-active {
    animation: fadeOutIn-target 0.5s linear;
}

.loginbox {
    width: 73.5%;
    height: 95%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.7);
}


@font-face {
    font-family: 'Note-Script-SemiBold-2';
    src: url('/assets/fonts/Note-Script-SemiBold-2.ttf') format('truetype');
    font-style: normal;
}

@font-face {
    font-family: 'Brush-Script-MT';
    src: url('/assets/fonts/Brush-Script-MT-Italic.ttf') format('truetype');
    font-style: normal;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    min-height: 220px;
}

h2 {
    font-family: 'Brush-Script-MT';
    font-size: 3em;
    font-weight: bolder;
    position: absolute;
    top: 10%;
}

input {
    width: 60%;
    border: none;
    border-bottom: 1px solid black;
    font-size: 1.2em;
}

input:focus {
    outline: none;
    box-shadow: none;
}

button:focus {
    outline: none;
    box-shadow: none;
}

.input-name {
    font-family: 'Note-Script-SemiBold-2';
    width: 60%;
    text-align: left;
    font-size: 20px;
    position: relative;
}

button {
    background: none;
    border: none;
    font-size: 1.4em;
    width: auto;
    height: auto;
    font-family: 'Note-Script-SemiBold-2';
    position: absolute;
    top: 70%;
}

.switch-login {
    position: absolute;
    top: 5%;
    right: 25px;
    width: 60px;
    height: auto;
    z-index: 2;
    cursor: pointer;
    transform: scale(1);
    transition: transform 0.5s ease;
}

.switch-login:hover {
    transform: scale(1.3);
}

.close-login {
    position: absolute;
    top: 0;
    right: 0;
    width: 5%;
    height: auto;
    z-index: 4;
    cursor: pointer;
    color: #ff3aa0bc;
}


.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from {
    opacity: 0;
}

.fade-leave-to {
    opacity: 0;
}
</style>