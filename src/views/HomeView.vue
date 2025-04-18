<script setup>
import Header from '../components/Header.vue';
import { onMounted, ref, watchEffect } from 'vue';

const scrollContainer = ref(null);
let isScrolling = false;
const activeSection = ref('section1'); // 新增响应式变量

const handleWheel = (e) => {
  // 如果正在滚动，则取消函数执行
  if (isScrolling) return;
  
  // 进入滚动状态
  isScrolling = true;


  
  const container = scrollContainer.value;
  const currentScroll = container.scrollTop;
  const pageHeight = window.innerHeight;
  const direction = e.deltaY > 0 ? 1 : -1;
  
  // 计算目标滚动位置
  let targetScroll;
  if (direction > 0) {
    // 向下滚动
    targetScroll = Math.ceil(currentScroll / pageHeight) * pageHeight;
    if (targetScroll <= currentScroll) {
      targetScroll += pageHeight;
    }
  } else {
    // 向上滚动
    targetScroll = Math.floor(currentScroll / pageHeight) * pageHeight;
    if (targetScroll >= currentScroll) {
      targetScroll -= pageHeight;
    }
  }
  
  // 确保不超出边界
  targetScroll = Math.max(0, Math.min(targetScroll, container.scrollHeight - pageHeight));
  
  // 平滑滚动
  container.scrollTo({
    top: targetScroll,
    behavior: 'smooth'
  });
  
  // 防止连续滚动
  setTimeout(() => {
    isScrolling = false;
    // 计算当前激活的section
    const pageHeight = window.innerHeight;
    const newSectionIndex = Math.round(scrollContainer.value.scrollTop / pageHeight);
    activeSection.value = `section${newSectionIndex + 1}`;
  }, 500); // 确保与滚动动画时间匹配
};

// 新增导航点击处理
const handleNavClick = (to) => {
  const sectionId = to.replace('#', '');
  const target = document.getElementById(sectionId);
  if (target) {
    const top = target.offsetTop;
    scrollContainer.value.scrollTo({
      top,
      behavior: 'smooth'
    });
    // activeSection.value = sectionId;
  }
};

onMounted(() => {
  // 新增交叉观察器
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id;
      }
    });
  }, {
    root: scrollContainer.value,
    threshold: 0.7
  });

  document.querySelectorAll('.scroll-page').forEach(section => {
    observer.observe(section);
  });
});
</script>

<template>
  <div class="header-container">
    <Header :active-section="activeSection" @nav-click="handleNavClick" />
  </div>

  <div class="scroll-container" ref="scrollContainer" @wheel="handleWheel">
    <section id="section1" class="scroll-page">
      <!-- 视频背景容器 -->
      <div class="video-background-container">
        <video autoplay loop muted playsinline class="video-background">
          <source src="../assets/videos/video_电车.mp4" type="video/mp4">
          视频加载失败
        </video>
      </div>

      <!-- 大标题容器 -->
      <div class="title-container">
        <h1 class="main-title">Bocchi The Rock!</h1>
      </div>
    </section>

    <section id="section2" class="scroll-page">
      <div class="content">
        <!-- 第二页的内容 -->
        <h1>第二模块</h1>
      </div>
    </section>

    <section id="section3" class="scroll-page">
      <div class="content">
        <!-- 第三页的内容 -->
        <h1>第三模块</h1>
      </div>
    </section>

    <section id="section4" class="scroll-page">
      <div class="content">
        <!-- 第四页的内容 -->
        <h1>第四模块</h1>
      </div>
    </section>

    <section id="section5" class="scroll-page">
      <div class="content">
        <!-- 第五页的内容 -->
        <h1>第五模块</h1>
      </div>
    </section>
  </div>
</template>

<style scoped>

.header-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* 确保 Header 在最上层 */
}




.scroll-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden; /* 隐藏滚动条 */
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  position: fixed; /* 固定定位防止偏移 */
  top: 0;
  left: 0;
}

.scroll-page {
  height: 100vh;
  width: 100vw;
  scroll-snap-align: start;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.video-background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
}

.video-background {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 100vh;
  transform: translate(-50%, -50%);
  object-fit: cover;
}

.content {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding-top: 80px; /* 给Header留出空间 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
}

/* 大标题容器 */
.title-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  text-align: center;
}

/* 大标题动画 */
.main-title {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s ease-out forwards;
  animation-delay: 0.5s; /* 延迟 0.5s 出现 */
  color: white; /* 根据背景调整颜色 */
  font-size: 3rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}


@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    font-size: 1.5em;
    transform: translateY(0);
  }
}
</style>