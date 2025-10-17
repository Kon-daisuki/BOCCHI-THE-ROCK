<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { userStore } from '../store/user'; // [集成] 导入 userStore

const API_BASE_URL = 'https://login.bocchi.us.kg';
const isLoading = ref(false); // [修复] 加载状态

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
const currentImageIndex = ref(1)
const isRegister = ref(false)
const FormModel = ref({
    username: '',
    password: '',
    RePassword: ''
})

const submitForm = async () => {
    if (isLoading.value) return;

    try {
        isLoading.value = true;

        if (!FormModel.value.username || !FormModel.value.password) {
            alert('用户名和密码不能为空！');
            return; 
        }

        if (isRegister.value) {
            if (FormModel.value.password !== FormModel.value.RePassword) {
                alert('两次输入的密码不一致！');
                return;
            }
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
            Switch();
        } else {
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
            
            // [修正] 将 data.token 修改为 data.accessToken 以匹配后端返回的字段名。
            // [推荐] 同时传递 accessToken 和 refreshToken，以便 userStore 管理会话刷新。
            userStore.login(data.user, data.accessToken, data.refreshToken);
            
            goHome();
        }
    } catch (error) {
        alert(error.message);
    } finally {
        isLoading.value = false;
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
const targetImageIndex = ref(0);
const isAnimating = ref(false);

const Switch = () => {
    isRegister.value = !isRegister.value;
    targetImageIndex.value = (targetImageIndex.value + 2) % (targetImage.length - 1);
    FormModel.value.username = '';
    FormModel.value.password = '';
    FormModel.value.RePassword = '';
}

const handleImageSwitch = (increment) => {
    if (isAnimating.value) return;
    isAnimating.value = true;
    currentImageIndex.value += increment;

    const isBoundary = increment > 0 
        ? currentImageIndex.value === extendedImages.value.length - 1
        : currentImageIndex.value === 0;

    if (isBoundary) {
        setTimeout(() => {
            containerRef.value.classList.add('no-transition');
            currentImageIndex.value = increment > 0 ? 1 : extendedImages.value.length - 2;
            requestAnimationFrame(() => {
                containerRef.value.classList.remove('no-transition');
                isAnimating.value = false;
            });
        }, 500);
    } else {
        setTimeout(() => { isAnimating.value = false; }, 500);
    }
}

const RightImage = () => handleImageSwitch(1);
const LeftImage = () => handleImageSwitch(-1);

const mainRef = ref(null)
onMounted(() => {
    requestAnimationFrame(() => {
        mainRef.value.style.transition = 'opacity 1s ease'
        mainRef.value.style.opacity = 1
    })
})

const goHome = () => {
    router.push('/');
}
</script>

<template>
    <div class="main" ref="mainRef">
        <div class="background-container"
            :style="{ left: `-${currentImageIndex * 100}%`, '--background-width': extendedImages.length * 100 + '%' }"
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
                    <div class="slide-image-container" :class="{ 'slide': isRegister }" :key="currentImageIndex">
                        <img class="slide-image" :src="extendedImages[currentImageIndex].url" :key="currentImageIndex">
                    </div>
                </Transition>
                <Transition name="fade">
                    <img class="target-image-1" :src="targetImage[targetImageIndex].url" alt="">
                </Transition>
                <Transition name="fade">
                    <img class="target-image-2" :src="targetImage[targetImageIndex + 1].url" alt="">
                </Transition>
            </div>
            <div class="targetbox"></div>

            <div class="loginbox">
                <form @submit.prevent="submitForm">
                    <Transition name="form-fade" mode="out-in">
                        <h2 :key="!isRegister">{{ !isRegister ? 'Log In' : 'Join Us' }}</h2>
                    </Transition>

                    <label class="input-name">Username:</label>
                    <input v-model="FormModel.username" required></input>
                    <label class="input-name">Password:</label>
                    <input type="password" v-model="FormModel.password" required></input>
                    
                    <div class="repassword-container">
                        <Transition name="form-fade" mode="out-in">
                            <div v-if="isRegister" class="repassword-content">
                                <label class="input-name">RePassword:</label>
                                <input type="password" v-model="FormModel.RePassword" required></input>
                            </div>
                        </Transition>
                    </div>
                    
                    <Transition name="form-fade" mode="out-in">
                        <button type="submit" :key="!isRegister" :disabled="isLoading">
                            {{ isLoading ? 'Processing...' : (!isRegister ? 'Login' : 'Register') }}
                        </button>
                    </Transition>
                </form>

                <div class="switch-prompt" @click="Switch">
                    <Transition name="form-fade" mode="out-in">
                        <p v-if="!isRegister" key="to-register">还没有账户？<span class="link">立即注册</span></p>
                        <p v-else key="to-login">已有账户？<span class="link">立即登录</span></p>
                    </Transition>
                </div>
            </div>
            
            <img class="switch-login" src="/assets/images/电吉他.svg" alt="切换模式" @click="Switch"></img>
            
            <div class="ribbons"></div>
        </div>
        <Icon class="close-login" icon="material-symbols:close-rounded" @click="goHome" />
    </div>
</template>

<style scoped>
/* 样式部分无需改动 */
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
    background-position: center bottom; 
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
    justify-content: space-between; 
    align-items: center;
    padding: 10px 0;
    box-sizing: border-box;
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
    z-index: 5;
}

.slide-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.slide {
    top: calc(100% - 10px - 50%);
}


.target-image-1 {
    width: 70%;
    transition: all 0.8s ease;
}

.target-image-2 {
    width: 70%;
    transition: all 0.8s ease;
}

.loginbox {
    width: 73.5%;
    height: 95%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

form { display: flex; flex-direction: column; align-items: center; width: 100%; }
h2 { font-family: 'Brush-Script-MT'; font-size: 3em; font-weight: bolder; margin-bottom: 20px; }
input { width: 60%; border: none; border-bottom: 1px solid black; font-size: 1.2em; background: transparent; margin-bottom: 10px; }
input:focus { outline: none; box-shadow: none; }
button:focus { outline: none; box-shadow: none; }
.input-name { font-family: 'Note-Script-SemiBold-2'; width: 60%; text-align: left; font-size: 20px; }
.repassword-container { height: 70px; width: 100%; display: flex; justify-content: center; flex-direction: column; align-items: center; }
.repassword-content { width: 100%; display: flex; flex-direction: column; align-items: center; }
button { background: none; border: none; font-size: 1.4em; width: auto; height: auto; font-family: 'Note-Script-SemiBold-2'; cursor: pointer; margin-top: 20px; }
button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
}
.switch-prompt { font-size: 14px; color: #888; margin-top: 15px; cursor: pointer; text-align: center; }
.switch-prompt .link { color: #ec407a; text-decoration: underline; font-weight: bold; }
.switch-login { position: absolute; top: 5%; right: 25px; width: 60px; height: auto; z-index: 2; cursor: pointer; transform: scale(1); transition: transform 0.5s ease; }
.switch-login:hover { transform: scale(1.3); }
.close-login { position: absolute; top: 0; right: 0; width: 5%; height: auto; z-index: 4; cursor: pointer; color: #ff3aa0bc; }
.form-fade-enter-active, .form-fade-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.form-fade-enter-from, .form-fade-leave-to { opacity: 0; transform: translateY(10px); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 768px) {
    .left, .right, .target, .targetbox, .switch-login, .ribbons { display: none; }
    .box { width: 90vw; height: 70vh; flex-direction: column; outline: none; box-shadow: 0 4px 15px rgba(0,0,0,0.2); border-radius: 10px; }
    .loginbox { width: 100%; height: 100%; box-shadow: none; border-radius: 10px; }
    form { justify-content: center; height: auto; }
    input, .input-name { width: 80%; }
    h2 { font-size: 2.5em; position: static; margin-bottom: 20px; }
    button { position: static; margin-top: 20px; padding: 12px 30px; background-color: #ff3aa0bc; color: white; border-radius: 8px; font-size: 1.2em; }
    .switch-prompt { display: block; margin-top: 30px; }
    .close-login { width: 10%; top: 10px; right: 10px; }
}
</style>
