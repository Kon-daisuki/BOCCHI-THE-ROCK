<!-- src/components/Header.vue -->
<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  activeSection: String
});

const emit = defineEmits(['nav-click']);

const router = useRouter();
const currentUser = ref(null);

onMounted(() => {
  const userData = localStorage.getItem('currentUser');
  if (userData) {
    currentUser.value = JSON.parse(userData);
  }
});

const nav = [
  {title: '主页', to: '#section1', 'color': '#fff'},
  {title: '角色', to: '#section2', 'color': '#ff90b9'},
  {title: '音乐', to: '#section3', 'color': '#fff475'},
  {title: '相册', to: '#section4', 'color': '#75bfff'},
  {title: '关于', to: '#section5', 'color': '#ff5252'},
];

const bg_color = ref('rgba(0, 0, 0, 0.35)');

watch(() => props.activeSection, (newSection) => {
  if (newSection !== 'section1') {
    bg_color.value = 'rgba(0, 0, 0, 0.5)';
  } else {
    bg_color.value = 'rgba(0, 0, 0, 0.35)';
  }
});

const handleClick = (e, to) => {
  e.preventDefault();
  emit('nav-click', to);
};

const goToLogin = () => {
  router.push('/login');
};

const handleLogout = () => {
  localStorage.removeItem('currentUser');
  window.location.reload();
};
</script>

<template>
  <div class="header" :style="{'--bg-color': bg_color}" >
    <img class="logo" src="/assets/images/logo_movie_cn.png"/>
    <div class="nav">
      <ul>
        <li 
          v-for="i in nav" 
          :key="i.title" 
          :class="{ active: i.to === `#${activeSection}` }"
          :style="{'--active-color': i.color}"
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
    
    <div class="user-area">
      <button v-if="!currentUser" class="login-btn" @click="goToLogin">登录</button>
      
      <div v-else class="user-info">
        <span>欢迎, {{ currentUser.username }}</span>
        <button class="login-btn logout" @click="handleLogout">退出</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header { position: fixed; top: 0; left: 0; right: 0; background: linear-gradient(to bottom, var(--bg-color), transparent); height: 72px; display: flex; justify-content: space-between; align-items: center; padding: 0 40px; z-index: 1000; transition: background-color 0.5s ease, background 0.5s ease; }
.logo { height: 40px; transition: transform 0.3s ease; }
.logo:hover { transform: scale(1.05); }
.nav { position: absolute; left: 50%; transform: translateX(-50%); }
.nav ul { display: flex; margin: 0; padding: 0; height: 100%; gap: 32px; justify-self: center; }
.nav li { list-style: none; position: relative; cursor: pointer; }
.nav li a { text-decoration: none; color: rgba(255, 255, 255, 0.9); font-size: 16px; font-weight: 500; letter-spacing: 0.5px; padding: 8px 0; position: relative; transition: all 0.3s ease; display: inline-block; }
.nav li a:hover { color: var(--active-color); transform: translateY(-2px); }
.nav li.active a { color: var(--active-color); font-weight: 600; }

/* --- [核心修改] --- */
/* 1. 初始状态：横线在中心点，宽度为0 (通过 scaleX(0)) */
.nav li .underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%; /* 宽度始终是100% */
  height: 2px;
  background: linear-gradient(90deg, #ff8a00, #ff5252);
  transform: scaleX(0); /* 初始时在X轴上缩放为0 */
  transform-origin: center; /* 确保从中心开始缩放 */
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); /* 使用更平滑的过渡动画 */
}
/* 2. 激活状态：横线从中心展开到100%宽度 */
.nav li:hover .underline, .nav li.active .underline {
  transform: scaleX(1);
}
/* --- [修改结束] --- */

.nav li.active .underline { box-shadow: 0 0 10px rgba(255, 255, 255, 0.7); }
.user-area { color: white; }
.user-info { display: flex; align-items: center; gap: 15px; }
.user-info span { font-weight: 500; color: rgba(255, 255, 255, 0.9); }
.login-btn { background: transparent; color: white; border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 4px; padding: 8px 16px; font-size: 14px; cursor: pointer; transition: all 0.3s ease; }
.login-btn:hover { background: rgba(255, 255, 255, 0.1); border-color: white; transform: translateY(-2px); }
.login-btn.logout { border-color: #ff8a8a; color: #ff8a8a; }
.login-btn.logout:hover { background-color: #ff5252; border-color: #ff5252; color: white; }

@media (max-width: 1024px) {
  .header { padding: 0 25px; }
  .nav ul { gap: 20px; }
  .nav li a { font-size: 15px; }
}
@media (max-width: 768px) {
  .header { padding: 0 15px; height: 60px; }
  .logo { height: 30px; }
  .nav { display: none; }
  .login-btn { padding: 6px 12px; font-size: 13px; }
}
</style>
