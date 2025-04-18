<script setup>
import { Position } from '@element-plus/icons-vue'
import { ref } from 'vue'


// 背景图片集
const i = ref(0)
const images = [
    { id: 1, url: '/src/assets/LoginImage1.jpeg' }
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
const Position1 = ref(1)
const Position2 = ref(2)

const isAnimate = ref(false)
const Switch = (value) => {
    if (isAnimate.value) return;
    isAnimate.value = true;
    setTimeout(() => {
        isAnimate.value = false
    }, 750)
    if (value){
        isRegister.value = true, isLogin.value = false;
        Position1.value = 2, Position2.value = 1;
    }
    else {
        isLogin.value = true, isRegister.value = false;
        Position1.value = 1, Position2.value = 2;
    }
}



</script>

<template>
    <div class="main" :style="{ background: `url(${images[i].url}) center/cover no-repeat` }">
        <div class="box" :class="{ 'animated flipInY': isAnimate }">
            <div class="target">
                <img :src="images[i].url" alt="" :style="{ order: Position1 }">
                <img src="/src/assets/logo.png" alt="" :style="{ order: Position2 }">
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
    left: 10px;
    top: 0;
    width: 25%;
    height: 100%;
    z-index: 2;
    background-color: #ffccff;
    padding: 15px;
    box-sizing: border-box;
}

.targetbox {
    display: flex;
    flex-direction: column;
    width: 5%;
    height: 95%;
    background-color: rgba(255, 140, 213, 0.7);
}

.target img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.loginbox {
    width: 95%;
    height: 95%;
    background-color: rgba(255, 140, 213, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
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

.animated {
    animation-duration: 0.75s;
    animation-fill-mode: both;
}

@keyframes flipInY {
    from {
        transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
        animation-timing-function: ease-in;
        opacity: 0;
    }

    40% {
        transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
        animation-timing-function: ease-in;
    }

    60% {
        transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
        opacity: 1;
    }

    80% {
        transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
    }

    to {
        transform: perspective(400px);
    }
}

.flipInY {
    backface-visibility: visible !important;
    animation-name: flipInY;
}
</style>