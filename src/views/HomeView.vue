<!-- 
    @Author: Sudoria
-->

<script setup>
import Header from '@/components/Header.vue';
import CharacterInfo from '@/components/CharacterInfo.vue';
import { onMounted, ref } from 'vue';
import About from '@/components/About.vue';
import MusicPlayer from '@/components/MusicPlayer.vue';
import Photos from '../components/Photos.vue';

const scrollContainer = ref(null);
const isScrolling = ref(false); // 变成响应式
const activeSection = ref('section1'); // 当前选中的 section

// 处理滚动事件
const handleWheel = (e) => {
  if (isScrolling.value) return;
  isScrolling.value = true;

  const container = scrollContainer.value;
  const currentScroll = container.scrollTop;
  const pageHeight = window.innerHeight;
  const direction = e.deltaY > 0 ? 1 : -1;
 
  let targetScroll = Math.floor(currentScroll / pageHeight) * pageHeight;
  targetScroll += direction > 0 ? pageHeight : -pageHeight;

  // 确保目标滚动位置不超出边界
  targetScroll = Math.max(0, Math.min(targetScroll, container.scrollHeight - pageHeight));

  // 执行平滑滚动
  container.scrollTo({
    top: targetScroll,
    behavior: 'smooth',
  });

  // 处理滚动结束后的状态
  setTimeout(() => {
    isScrolling.value = false;
    const newSectionIndex = Math.round(targetScroll / pageHeight);
    activeSection.value = `section${newSectionIndex + 1}`;
  }, 400);
};

// 导航点击处理
const handleNavClick = (to) => {
  const sectionId = to.replace('#', '');
  const target = document.getElementById(sectionId);
  if (target) {
    const top = target.offsetTop;
    scrollContainer.value.scrollTo({
      top,
      behavior: 'smooth',
    });
  }
};

// 更新选中的 section
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id;
      }
    });
  }, {
    root: scrollContainer.value,
    threshold: 0.7, // 可调整交叉阈值
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
      <div class="video-background-container">
        <video autoplay loop muted playsinline class="video-background">
          <source src="/assets/videos/video_和服.mp4" type="video/mp4" />
          视频加载失败
        </video>
      </div>

      <div class="title-container">
        <img src="/assets/images/logo_movie_cn.png"/>
      </div>
    </section>

    <section id="section2" class="scroll-page">
      <CharacterInfo />
    </section>

    <section id="section3" class="scroll-page">
      <MusicPlayer />
    </section>

    <section id="section4" class="scroll-page">
      <Photos/>
    </section>

    <section id="section5" class="scroll-page">
      <div class="content">
        <About></About>
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
  z-index: 1000;
}

.scroll-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  position: fixed;
  top: 0;
  left: 0;
}

.scroll-page {
  height: 100%;
  width: 100%;
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
  width: 100%;
  height: 100%;
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
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
}

.title-container {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  text-align: center;
}

.title-container img {
  animation: spinAndLand 2s ease-out forwards;
  opacity: 0; /* 初始透明 */
}

@keyframes spinAndLand {
  0% {
    opacity: 0.5;
    transform: translate(100%, -100%) scale(2) rotate(1300deg); /* 初始放大 + 旋转2圈 */
  }

  80% {
    transform: translate(-50%, -90%) scale(1.5) rotate(0); /* 初始放大 + 旋转2圈 */
  }

  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) rotate(0deg); /* 最终大小 + 停止旋转 */
  }
}
</style>
