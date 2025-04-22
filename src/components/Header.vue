<!-- 
    @Author: Sudoria
-->


<script setup>
import { ref } from 'vue';

const props = defineProps({
  activeSection: String
});

const emit = defineEmits(['nav-click']);

const nav = [
  {title: '主页', to: '#section1'},
  {title: '角色', to: '#section2'},
  {title: '音乐', to: '#section3'},
  {title: '相册', to: '#section4'},
  {title: '关于', to: '#section5'},
];

const bg_color = ref('rgba(0, 0, 0, 0.35)');

const handleClick = (e, to) => {
  e.preventDefault();
  emit('nav-click', to);
  if (to != '#section1'){
    bg_color.value = 'rgba(0, 0, 0, 0.5)';
  }else {
    bg_color.value = 'rgba(0, 0, 0, 0.35)';
  }
};

const goToLogin = () => {
  window.location.href = '/login';
};
</script>

<template>
  <div class="header" :style="{'--bg-color': bg_color}">
    <img class="logo" src="/assets/images/logo_movie_cn.png"/>
    <div class="nav">
      <ul>
        <li 
          v-for="i in nav" 
          :key="i.title" 
          :class="{ active: i.to === `#${activeSection}` }"
        >
          <a 
            :href="i.to" 
            @click="(e) => handleClick(e, i.to)"
          >
            {{ i.title }}
            <span class="underline"></span>
          </a>
        </li>
      </ul>
    </div>
    <button class="login-btn" @click="goToLogin">登录</button>
  </div>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to bottom, var(--bg-color), transparent);
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  z-index: 1000;
  transition: background-color 0.5s ease;
}

.logo {
  height: 40px;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.nav {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.nav ul {
  display: flex;
  margin: 0;
  padding: 0;
  height: 100%;
  gap: 32px;
  justify-self: center;
}

.nav li {
  list-style: none;
  position: relative;
  cursor: pointer;
}

.nav li a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.5px;
  padding: 8px 0;
  position: relative;
  transition: all 0.3s ease;
  display: inline-block;
}

.nav li a:hover {
  color: white;
  transform: translateY(-2px);
}

.nav li.active a {
  color: white;
  font-weight: 600;
}

.nav li .underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #ff8a00, #e52e71);
  transition: width 0.3s ease;
}

.nav li:hover .underline,
.nav li.active .underline {
  width: 100%;
}

.nav li.active .underline {
  background: white;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
}

.login-btn {
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
  transform: translateY(-2px);
}
</style>