<!-- 
    @Author: Sudoria
    [全量修改版]
-->

<script setup>
import Header from '@/components/Header.vue';
import CharacterInfo from '@/components/CharacterInfo.vue';
import { onMounted, ref } from 'vue';
import About from '@/components/About.vue';
import MusicPlayer from '@/components/MusicPlayer.vue';
import Photos from '../components/Photos.vue';

const scrollContainer = ref(null);
// [修改] activeSection 的逻辑保持不变，它用于高亮导航栏，非常有用。
const activeSection = ref('section1'); 

// [删除] 删除了 isScrolling 和 handleWheel 函数，因为手机端不支持 wheel 事件。
// 现在将完全依靠 CSS 的 scroll-snap 来实现整页滚动，原生支持触摸。

// 导航点击处理 (这个功能保持不变)
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

// 更新选中的 section (这个功能保持不变)
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

  <!-- [修改] 移除了 @wheel="handleWheel" 事件 -->
  <div class="scroll-container" ref="scrollContainer">
    <section id="section1" class="scroll-page">
      <div class="video-background-container">
        <!-- 视频只在桌面端加载和播放 -->
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
/* [全量修改版 CSS] */
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
  /* [修改] 允许 Y 轴滚动，这是让 scroll-snap 生效的关键 */
  overflow-y: scroll; 
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
  /* [新增] 在手机上用一张图片作为背景，代替耗流量的视频 */
  background: url('/assets/images/LoginImage1.jpg') no-repeat center center/cover;
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
  opacity: 0;
  /* [新增] 限制 Logo 在手机上的宽度，防止过大 */
  width: 80vw;
  /* [新增] 限制 Logo 在桌面端的最大宽度 */
  max-width: 500px; 
}

@keyframes spinAndLand {
  0% {
    opacity: 0.5;
    transform: translate(100%, -100%) scale(2) rotate(1300deg);
  }
  80% {
    transform: translate(-50%, -90%) scale(1.5) rotate(0);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
  }
}

/* --- [新增] 响应式媒体查询 --- */

/* 桌面端 (屏幕宽度 > 768px): 移除背景图，让视频显示出来 */
@media (min-width: 768px) {
    .video-background-container {
        background: none;
    }
}

/* 移动端 (屏幕宽度 < 768px): 彻底隐藏 video 元素，节省性能 */
@media (max-width: 767px) {
    .video-background {
        display: none;
    }
}
</style>
