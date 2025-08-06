<!-- 
    @Author: Sudoria
    [最终完美收官版 - 修复底部白线]
-->
<script setup>
import Header from '@/components/Header.vue';
import CharacterInfo from '@/components/CharacterInfo.vue';
import { onMounted, ref } from 'vue';
import About from '@/components/About.vue';
import MusicPlayer from '@/components/MusicPlayer.vue';
import Photos from '../components/Photos.vue';
const scrollContainer = ref(null);
const activeSection = ref('section1'); 
const handleNavClick = (to) => {
  const sectionId = to.replace('#', '');
  const target = document.getElementById(sectionId);
  if (target) { scrollContainer.value.scrollTo({ top: target.offsetTop, behavior: 'smooth' }); }
};
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { activeSection.value = entry.target.id; } });
  }, { root: scrollContainer.value, threshold: 0.7 });
  document.querySelectorAll('.scroll-page').forEach(section => { observer.observe(section); });
});
</script>

<template>
  <div class="header-container"><Header :active-section="activeSection" @nav-click="handleNavClick" /></div>
  <div class="scroll-container" ref="scrollContainer">
    <section id="section1" class="scroll-page"><div class="video-background-container"><video autoplay loop muted playsinline class="video-background"><source src="/assets/videos/video_和服.mp4" type="video/mp4" />视频加载失败</video></div><div class="title-container"><img src="/assets/images/logo_movie_cn.png"/></div></section>
    <section id="section2" class="scroll-page"><CharacterInfo /></section>
    <section id="section3" class="scroll-page"><MusicPlayer /></section>
    <section id="section4" class="scroll-page"><Photos/></section>
    <section id="section5" class="scroll-page"><About/></section>
  </div>
</template>

<style scoped>
.header-container { position: fixed; top: 0; left: 0; width: 100%; z-index: 1000; }
.scroll-container {
  height: 100vh;
  width: 100vw;
  overflow-y: scroll; 
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  position: fixed;
  top: 0;
  left: 0;
  /* --- [最终修复] --- 添加黑色背景，彻底杜绝底部白线问题 */
  background-color: #141414;
}
.scroll-page { padding-top: 80px; height: 100vh; width: 100%; scroll-snap-align: start; position: relative; display: flex; flex-direction: column; justify-content: center; align-items: center; overflow: hidden; }
.video-background-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; overflow: hidden; background: url('/assets/images/LoginImage1.jpg') no-repeat center center/cover; }
.video-background { position: absolute; top: 50%; left: 50%; width: 100vw; height: 100vh; transform: translate(-50%, -50%); object-fit: cover; }
.content { position: relative; z-index: 1; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white; text-align: center; }
.title-container { position: absolute; top: 50%; left: 50%; z-index: 2; text-align: center; transform: translateY(-40px); }
.title-container img { animation: spinAndLand 2s ease-out forwards; opacity: 0; width: 80vw; max-width: 500px; }
@keyframes spinAndLand { 0% { opacity: 0.5; transform: translate(100%, -100%) scale(2) rotate(1300deg); } 80% { transform: translate(-50%, -90%) scale(1.5) rotate(0); } 100% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); } }
@media (min-width: 768px) { .video-background-container { background: none; } }
@media (max-width: 767px) { .video-background { display: none; } }
</style>
