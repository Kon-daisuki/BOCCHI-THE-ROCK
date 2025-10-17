<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { userStore } from '../store/user'; // [集成] 导入全局用户状态

const props = defineProps({
  activeSection: String
});

const emit = defineEmits(['nav-click']);
const router = useRouter();

const clickedSection = ref(null);
// [修复] 添加一个标志来追踪是否是程序触发的滚动
const isProgrammaticScroll = ref(false);

// [修复] 改进 watch 逻辑：只要 activeSection 发生变化，就清除 clickedSection
// 这样可以确保滚动时始终使用 activeSection 作为激活状态的唯一来源
watch(() => props.activeSection, (newSectionId) => {
  // 如果不是程序触发的滚动（即用户手动滚动），立即清除 clickedSection
  if (!isProgrammaticScroll.value) {
    clickedSection.value = null;
  }
  // 重置标志
  isProgrammaticScroll.value = false;
});

const nav = [
  {title: '主页', to: '#section1', color: '#fff'},
  {title: '角色', to: '#section2', color: '#ff90b9'},
  {title: '音乐', to: '#section3', color: '#fff475'},
  {title: '相册', to: '#section4', color: '#75bfff'},
  {title: '关于', to: '#section5', color: '#ff5252'},
];

const bg_color = ref('rgba(0, 0, 0, 0.35)');

watch(() => props.activeSection, (newSection) => {
  bg_color.value = newSection !== 'section1'
    ? 'rgba(0, 0, 0, 0.5)'
    : 'rgba(0, 0, 0, 0.35)';
}, { immediate: true });

const handleClick = (e, item) => {
  e.preventDefault();
  const el = document.querySelector(item.to);
  if (el) {
    // [修复] 在点击时设置标志，表示这是程序触发的滚动
    isProgrammaticScroll.value = true;
    clickedSection.value = item.to;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.classList.add('section-active');
    setTimeout(() => {
      el.classList.remove('section-active');
    }, 600);
  }
  emit('nav-click', item.to);
};

const goToLogin = () => {
  router.push('/login');
};

// [修复] 使用 userStore 和 router.push
const handleLogout = () => {
  userStore.logout();
  router.push('/');
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
          :class="{ active: clickedSection ? i.to === clickedSection : i.to === `#${activeSection}` }"
          :style="{'--active-color': i.color}"
        >
          <a 
            :href="i.to" 
            @click.prevent="(e) => handleClick(e, i)"
          >
            {{ i.title }}
            <span class="underline"></span>
          </a>
        </li>
      </ul>
    </div>
    
    <div class="user-area">
      <!-- [集成] 完全依赖 userStore -->
      <button v-if="!userStore.isLoggedIn" class="login-btn" @click="goToLogin">登录</button>
      
      <div v-else class="user-info">
        <span>欢迎, {{ userStore.user.username }}</span>
        <button class="login-btn logout" @click="handleLogout">退出</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles remain unchanged, only the script logic was updated */
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
  transition: background-color 0.5s ease, background 0.5s ease; 
  will-change: background;
}
.logo { height: 40px; transition: transform 0.3s ease; }
.logo:hover { transform: scale(1.05); }
.nav { position: absolute; left: 50%; transform: translateX(-50%); }
.nav ul { display: flex; margin: 0; padding: 0; height: 100%; gap: 32px; justify-self: center; }
.nav li { list-style: none; position: relative; cursor: pointer; }
.nav li a { text-decoration: none; color: rgba(255, 255, 255, 0.9); font-size: 16px; font-weight: 500; letter-spacing: 0.5px; padding: 8px 0; position: relative; transition: all 0.3s ease; display: inline-block; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5); }
.nav li a:hover { color: var(--active-color); transform: translateY(-2px); }
.nav li.active a { color: var(--active-color); font-weight: 600; transform: translateY(-2px); }
.nav li .underline { position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background: linear-gradient(90deg, #ff8a00, #ff5252); transition: width 0.3s ease; }
.nav li:hover .underline, .nav li.active .underline { width: 100%; }
.nav li.active .underline { background: linear-gradient(90deg, #ff8a00, #ff5252); box-shadow: 0 0 10px rgba(255, 255, 255, 0.7); }

.user-area { color: white; }
.user-info { display: flex; align-items: center; gap: 15px; }
.user-info span { font-weight: 500; color: rgba(255, 255, 255, 0.9); }
.login-btn { background: transparent; color: white; border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 4px; padding: 8px 16px; font-size: 14px; cursor: pointer; transition: all 0.3s ease; }
.login-btn:hover { background: rgba(255, 255, 255, 0.1); border-color: white; transform: translateY(-2px); }
.login-btn.logout { border-color: #ff8a8a; color: #ff8a8a; }
.login-btn.logout:hover { background-color: #ff5252; border-color: #ff5252; color: white; }

/* --- section 动画 --- */
.section-active {
  animation: fadeIn 0.6s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0.6;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* --- 新增平板样式 --- */
@media (min-width: 769px) and (max-width: 1024px) {
  .header {
    padding: 0 25px; /* 调整内边距 */
  }
  .nav ul {
    gap: 20px; /* 减小导航项之间的间距 */
  }
  .nav li a {
    font-size: 15px; /* 稍微减小字体大小 */
  }
}
/* --- 平板样式结束 --- */

@media (max-width: 768px) {
  .header { padding: 0 15px; height: 60px; }
  .logo { height: 30px; }
  .nav { display: none; }
  .login-btn { padding: 6px 12px; font-size: 13px; }
}
</style>
