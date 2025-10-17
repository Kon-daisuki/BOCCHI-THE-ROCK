<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { userStore } from '../store/user';

const props = defineProps({
  activeSection: String
});

const emit = defineEmits(['nav-click']);
const router = useRouter();

const clickedSection = ref(null);
// [优化] 使用定时器来管理程序触发的滚动状态，而不是简单的布尔标志
const scrollTimeoutId = ref(null);
// [优化] 添加一个标志来追踪是否正在进行程序控制的滚动
const isScrolling = ref(false);

// [优化] 清除点击状态的函数，确保状态被完全重置
const clearClickedSection = () => {
  clickedSection.value = null;
  if (scrollTimeoutId.value) {
    clearTimeout(scrollTimeoutId.value);
    scrollTimeoutId.value = null;
  }
  isScrolling.value = false;
};

// [优化] 监听 activeSection 的变化
// 当检测到用户手动滚动时（即非程序控制的滚动），立即清除点击状态
watch(() => props.activeSection, (newSectionId, oldSectionId) => {
  // 如果当前没有进行程序控制的滚动，说明这是用户手动滚动
  // 需要立即清除 clickedSection，让 activeSection 接管控制
  if (!isScrolling.value) {
    clickedSection.value = null;
  }
}, { flush: 'post' }); // 使用 post 时机确保 DOM 更新后再执行

// [优化] 添加滚动事件监听，用于检测用户的手动滚动行为
const handleUserScroll = () => {
  // 如果检测到滚动事件，且当前有一个待清除的定时器
  // 说明用户在程序滚动过程中开始了手动操作
  // 这时应该立即取消程序滚动的保护状态
  if (scrollTimeoutId.value && !isScrolling.value) {
    clearClickedSection();
  }
};

onMounted(() => {
  // 监听滚动事件，用于检测用户的手动滚动
  window.addEventListener('scroll', handleUserScroll, { passive: true });
  // 监听触摸开始事件，移动端用户开始滑动时立即响应
  window.addEventListener('touchstart', () => {
    // 用户触摸屏幕时，如果不在程序滚动过程中，清除之前的点击状态
    if (!isScrolling.value && scrollTimeoutId.value) {
      clearClickedSection();
    }
  }, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleUserScroll);
  clearClickedSection();
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
    // [优化] 清除之前的定时器，避免状态混乱
    if (scrollTimeoutId.value) {
      clearTimeout(scrollTimeoutId.value);
    }
    
    // [优化] 标记为程序控制的滚动
    isScrolling.value = true;
    clickedSection.value = item.to;
    
    // 执行平滑滚动
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.classList.add('section-active');
    setTimeout(() => {
      el.classList.remove('section-active');
    }, 600);
    
    // [优化] 设置一个较长的定时器，确保在滚动动画完成后才清除保护状态
    // 平滑滚动通常需要约 1 秒完成，我们设置 1.5 秒的保护期
    scrollTimeoutId.value = setTimeout(() => {
      isScrolling.value = false;
      // 滚动完成后，如果当前的 activeSection 与点击的不一致
      // 说明用户可能在滚动过程中进行了其他操作，此时清除点击状态
      const targetSection = item.to.replace('#', '');
      if (props.activeSection !== targetSection) {
        clickedSection.value = null;
      }
      scrollTimeoutId.value = null;
    }, 1500);
  }
  emit('nav-click', item.to);
};

const goToLogin = () => {
  router.push('/login');
};

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
      <button v-if="!userStore.isLoggedIn" class="login-btn" @click="goToLogin">登录</button>
      
      <div v-else class="user-info">
        <span>欢迎, {{ userStore.user.username }}</span>
        <button class="login-btn logout" @click="handleLogout">退出</button>
      </div>
    </div>
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

@media (min-width: 769px) and (max-width: 1024px) {
  .header {
    padding: 0 25px;
  }
  .nav ul {
    gap: 20px;
  }
  .nav li a {
    font-size: 15px;
  }
}

@media (max-width: 768px) {
  .header { padding: 0 15px; height: 60px; }
  .logo { height: 30px; }
  .nav { display: none; }
  .login-btn { padding: 6px 12px; font-size: 13px; }
}
</style>
