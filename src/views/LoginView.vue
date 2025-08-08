<!-- src/views/LoginView.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

// [核心修复] 将后端API的完整地址定义成一个常量
const API_BASE_URL = 'https://login.kessoku.dpdns.org';

const router = useRouter()

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
const isRegister = ref(false)
const isLogin = ref(true)
const FormModel = ref({
    username: '',
    password: '',
    RePassword: ''
})

const submitForm = async () => {
    try {
        if (isRegister.value) {
            if (FormModel.value.password !== FormModel.value.RePassword) {
                alert('两次输入的密码不一致！');
                return;
            }
            // [核心修复] 使用完整的API地址
            const response = await fetch(`${API_BASE_URL}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: FormModel.value.username,
                    password: FormModel.value.password
                })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || '注册失败');
            alert('注册成功！请登录。');
            Switch(false);
        } else {
            // [核心修复] 使用完整的API地址
            const response = await fetch(`${API_BASE_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: FormModel.value.username,
                    password: FormModel.value.password
                })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || '登录失败');
            
            if (data.token) {
                localStorage.setItem('authToken', data.token);
            }
            if (data.user) {
                localStorage.setItem('currentUser', JSON.stringify(data.user));
            }
            
            goHome();
        }
    } catch (error) {
        alert(error.message);
    }
}

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
        isRegister.value = true;
        isLogin.value = false;
    } 
    else {
        isLogin.value = true;
        isRegister.value = false;
    }
    target_i.value = (target_i.value + 2) % (targetImage.length - 1)
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
        setTimeout(() => { isAnimating.value = false; }, 500);
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
        setTimeout(() => { isAnimating.value = false; }, 500);
    }
}

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
                <Transition name="fade" mode="out-in">
                    <div class="slide-image-container" :class="{ 'slide': isRegister }" :key="i">
                        <img class="slide-image" :src="extendedImages[i].url" :key="i">
                    </div>
                </Transition>
                <Transition name="fade" mode="out-in">
                    <img class="target-image-1" :src="targetImage[target_i].url" alt="">
                </Transition>
                <Transition name="fade" mode="out-in">
                    <img class="target-image-2" :src="targetImage[target_i + 1].url" alt="">
                </Transition>
            </div>
            <div class="targetbox"></div>

            <div class="loginbox">
                <form @submit.prevent="submitForm">
                    <Transition name="fade" mode="out-in">
                        <h2 :key="isLogin">{{ isLogin ? 'Log In' : 'Join Us' }}</h2>
                    </Transition>
                    <div class="input-group">
                        <label class="input-name">Username:</label>
                        <input v-model="FormModel.username">
                    </div>
                    <div class="input-group">
                        <label class="input-name">Password:</label>
                        <input type="password" v-model="FormModel.password">
                    </div>
                    
                    <Transition name="repass-trans">
                        <div v-if="isRegister" class="input-group">
                            <label class="input-name">RePassword:</label>
                            <input type="password" v-model="FormModel.RePassword">
                        </div>
                    </Transition>

                    <Transition name="fade" mode="out-in">
                        <button type="submit" :key="isLogin">{{ isLogin ? 'Login' : 'Register' }}</button>
                    </Transition>
                </form>

                <div class="switch-container" @click="Switch(isLogin)">
                    <Transition name="fade" mode="out-in">
                        <span class="switch-tip" :key="isLogin">{{ isLogin ? '切换到注册' : '返回登录' }}</span>
                    </Transition>
                    <img class="switch-login" src="/assets/images/电吉他.svg" alt="切换模式">
                </div>
            </div>
            
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

.left { left: 30px; }
.right { right: 30px; }

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

.target-image-1 {
    width: 70%;
    transition: all 0.8s ease;
}

.target-image-2 {
    width: 70%;
    margin-top: 29%;
    transition: all 0.8s ease;
}

.loginbox {
    width: 73.5%;
    height: 95%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.7);
    position: relative;
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
    margin-bottom: 20px;
}

.input-group {
    width: 60%;
    display: flex;
    flex-direction: column;
}

input {
    width: 100%;
    border: none;
    border-bottom: 1px solid black;
    font-size: 1.2em;
    background: transparent;
    padding: 5px 0;
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
    width: 100%;
    text-align: left;
    font-size: 20px;
}

button {
    background: none;
    border: none;
    font-size: 1.4em;
    font-family: 'Note-Script-SemiBold-2';
    cursor: pointer;
    margin-top: 30px;
}

.switch-login {
    width: 60px;
    height: auto;
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
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.repass-trans-enter-active,
.repass-trans-leave-active {
    transition: all 0.4s ease-out;
    overflow: hidden;
}
.repass-trans-enter-from,
.repass-trans-leave-to {
    opacity: 0;
    max-height: 0;
    margin-top: 0 !important;
}
.repass-trans-enter-to,
.repass-trans-leave-from {
    opacity: 1;
    max-height: 100px;
}

.switch-container {
    position: absolute;
    top: 5%;
    right: 25px;
    z-index: 2;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.switch-tip {
    font-family: 'Note-Script-SemiBold-2';
    font-size: 14px;
    color: #555;
    margin-bottom: 5px;
    transition: opacity 0.5s ease;
}

@media (max-width: 768px) {
    .left, .right, .target, .targetbox, .ribbons {
        display: none;
    }
    .box {
        width: 90vw;
        height: auto;
        min-height: 70vh;
        padding: 20px 0;
        flex-direction: column;
        outline: none;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        border-radius: 10px;
        background-color: white;
    }
    .loginbox {
        width: 100%;
        height: 100%;
        box-shadow: none;
        border-radius: 10px;
    }
    form {
        gap: 20px;
        justify-content: center;
        height: 100%;
    }
    .input-group, .input-name {
        width: 80%;
    }
    h2 {
        position: static;
        margin-bottom: 20px;
        font-size: 2.8em;
    }
    button {
        position: static;
        margin-top: 20px;
        padding: 12px 30px;
        background-color: #ff86be;
        color: white;
        border-radius: 25px;
        font-size: 1.2em;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    .switch-container {
        top: 15px;
        right: 15px;
    }
    .close-login {
        width: 10%;
        top: 10px;
        right: 10px;
        color: #333;
    }
}
</style>
