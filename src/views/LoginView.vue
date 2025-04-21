<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';

// 原始背景图片集
const originalImages = [
    { url: '/assets/images/LoginImage1.jpg' },
    { url: '/assets/images/LoginImage2.jpg' },
    { url: '/assets/images/LoginImage3.png' },
]

// 扩展图片集（首尾添加复制项，实现无缝衔接）
const extendedImages = ref([
    originalImages[originalImages.length - 1],
    ...originalImages,
    originalImages[0]
])

const containerRef = ref(null)
const i = ref(1)

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
const isAnimating = ref(false);

const Switch = (value) => {
    if (value) {
        isRegister.value = true, isLogin.value = false;
    }
    else {
        isLogin.value = true, isRegister.value = false;
    }
}

const RightImage = () => {
    if (isAnimating.value) return;
    isAnimating.value = true;

    i.value++;
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

    i.value--;
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
        mainRef.value.style.transition = 'opacity 0.5s ease'
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
        <img class="left" src="/assets/images/left.svg" @click="LeftImage"></img>
        <img class="right" src="/assets/images/right.svg" @click="RightImage"></img>
        <div class="box">
            <div class="target">
                <img class="slide-image" :src="extendedImages[i].url" :class="{ 'slide': isRegister }" alt="">
                <img class="target-image" src="/assets/images/target-image1.png" alt="">
                <img class="target-image" src="/assets/images/target-image2.png" alt="">
            </div>
            <div class="targetbox"></div>
            <div class="loginbox">
                <form :model="FormModel" @submit.prevent="submitForm" v-if="isLogin">
                    <h2>Welcome Back</h2>
                    <label class="input-name">Username:</label>
                    <input v-model="FormModel.username"></input>
                    <label class="input-name">Password:</label>
                    <input v-model="FormModel.password"></input>
                    <button>Login</button>
                </form>
                <form :model="FormModel" @submit.prevent="submitForm" v-if="isRegister">
                    <h2>Join Us</h2>
                    <label class="input-name">Username:</label>
                    <input v-model="FormModel.username"></input>
                    <label class="input-name">Password:</label>
                    <input v-model="FormModel.password"></input>
                    <label class="input-name">RePassword:</label>
                    <input v-model="FormModel.RePassword"></input>
                    <button>Register</button>
                </form>
            </div>
            <img class="switch-login" src="/assets/images/电吉他.svg" alt="" @click="Switch(isLogin)">
            <div class="ribbons"></div>
        </div>
        <img class="close-login" src="/assets/images/关闭.svg" alt="" @click="goHome">
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
    transition: all 0.5s ease;
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

.left,
.right {
    position: fixed;
    width: 5%;
    height: 10%;
    cursor: pointer;
    transform: scale(1);
    transition: transform 0.5s ease;
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
    gap: 8%;
    padding-top: 2.5%;
    height: 96%;
    left: 10px;
    top: 0;
    width: 30%;
    z-index: 2;
    background: url(/assets/images/target-background.png);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.7);
}

.targetbox {
    width: 25%;
    height: 95%;
    background-color: white;
    outline: 1.5px dashed #000;
    outline-offset: -8px;
}

.slide-image {
    width: 100%;
    height: 50%;
    object-fit: cover;
    position: absolute;
    top: 10px;
    transition: all 0.5s ease-in-out;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.7);
}

.slide {
    top: 47.5%;
}

.target-image {
    width: 85%;
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
}

h2 {
    font-family: 'Brush-Script-MT';
    font-size: 3em;
    font-weight: bolder;
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
}

button {
    background: none;
    border: none;
    font-size: 1.4em;
    width: auto;
    height: auto;
    font-family: 'Note-Script-SemiBold-2';
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
}
</style>