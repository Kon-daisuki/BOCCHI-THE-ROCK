<script setup>
import { ref } from 'vue'


// 背景图片集
const i = ref(0)
const images = [
    { id: 1, url: '/src/assets/images/LoginImage1.jpeg' },
    { id: 2, url: '/src/assets/images/LoginImage2.jpg' }
]

// 登录 and 注册
const isRegister = ref(false)
const isLogin = ref(true)
const FormModel = ref({
    username: '',
    password: '',
    RePassword: ''
})

const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    RePassword: [
        { required: true, message: '请再次输入密码', trigger: 'blur' }
    ]
}

const submitForm = () => {

}

// 动画
// target图片换位
const isAnimate = ref(false)
const Switch = (value) => {
    if (value) {
        isRegister.value = true, isLogin.value = false;
    }
    else {
        isLogin.value = true, isRegister.value = false;
    }
}

const RightImage = () => {
    i.value = (i.value + 1) % images.length;
}

const LeftImage = () => {
    i.value = (i.value + images.length - 1) % images.length;
}

</script>

<template>
    <div class="main" :style="{ background: `url('${images[i].url}') center center / cover no-repeat` }">
        <img class="left" src="/src/assets/images/left.svg" @click="LeftImage"></img>
        <img class="right" src="/src/assets/images/right.svg" @click="RightImage"></img>
        <div class="box">
            <div class="target">
                <img class="slide-image" :src="images[i].url" :class="{ 'slide': isRegister }" alt="">
                <img class="logo" src="/src/assets/images/Loginlogo.png" alt="">
            </div>
            <div class="targetbox"></div>
            <div class="loginbox">
                <el-form :model="FormModel" :rules="rules" :label-width="'auto'" v-if="isLogin">
                    <el-form-item label="账号" prop="username" :required="false">
                        <el-input v-model="FormModel.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" :required="false">
                        <el-input v-model="FormModel.password" :prefix-icon="Lock" type="password" placeholder="请输入密码"
                            show-password></el-input>
                    </el-form-item>
                    <el-button type="success">登录</el-button>
                </el-form>
                <el-form :model="FormModel" :rules="rules" :label-width="'auto'" v-if="isRegister">
                    <el-form-item label="账号" prop="username" :required="false">
                        <el-input v-model="FormModel.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" :required="false">
                        <el-input v-model="FormModel.password" type="password" placeholder="请输入密码"
                            show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="RePassword" :required="false">
                        <el-input v-model="FormModel.RePassword" type="password" placeholder="请再次输入密码"
                            show-password></el-input>
                    </el-form-item>
                    <el-button type="success">注册</el-button>
                </el-form>
            </div>
            <button class="Label" v-if="isLogin" @click="Switch(isLogin)">
                注册
            </button>
            <button class="Label" v-if="isRegister" @click="Switch(isLogin)">
                登录
            </button>
        </div>
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
}

.left,
.right {
    position: fixed;
    width: 5%;
    height: 10%;
    cursor: pointer
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
    width: 45%;
    height: 50%;
}

.target {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    left: 10px;
    top: 0;
    width: 30%;
    height: 100%;
    z-index: 2;
    background: url(/src/assets/images/未命名的设计.png);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.7);
}

.targetbox {
    display: flex;
    flex-direction: column;
    width: 15%;
    height: 95%;
    background-color: white;
}

.slide-image {
    width: 100%;
    height: 50%;
    object-fit: cover;
    position: absolute;
    top: 10px;
    transition: all 0.7s ease-in-out;
}

.slide {
    top: 47.5%;
}

.logo {
    width: 80%;
}

.loginbox {
    width: 95%;
    height: 95%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.7);
}

:deep(.el-form-item__label) {
    color: #000;
}

.el-input {
    width: 200px;
}

.el-input {
    border: none;
    border-bottom: 1px solid #333;
    border-radius: 0;
    border-radius: 0;
    box-shadow: none !important;
}

.el-input:hover {
    border-bottom: 1px solid #333 !important;
}

.el-input:focus {
    border-bottom: 1px solid #409EFF !important;
}

.Label {
    position: absolute;
    display: flex;
    top: 0;
    right: 40px;
    width: 10%;
    height: 25%;
    background-color: pink;
    z-index: 2;
}
</style>