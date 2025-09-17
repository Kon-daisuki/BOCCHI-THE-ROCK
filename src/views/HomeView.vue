<script setup>
import Header from '@/components/Header.vue';
import CharacterInfo from '@/components/CharacterInfo.vue';
import { onMounted, ref } from 'vue';
import About from '@/components/About.vue';
import MusicPlayer from '@/components/MusicPlayer.vue';
import Photos from '../components/Photos.vue';

const scrollContainer = ref(null);
const activeSection = ref('section1');

// This function remains the same, it works perfectly.
const handleNavClick = (to) => {
  const sectionId = to.replace('#', '');
  const target = document.getElementById(sectionId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
  // --- [代码修改] START ---
  // We are creating a more responsive IntersectionObserver
  const options = {
    root: scrollContainer.value,
    // [Change 1] This creates a trigger zone in the middle of the screen.
    // It shrinks the "viewport" by 40% from the top and 60% from the bottom.
    rootMargin: "-40% 0px -60% 0px",
    // [Change 2] The threshold is now 0, so it triggers the moment
    // a section touches the new rootMargin zone.
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id;
      }
    });
  }, options); // Use the new options here
  // --- [代码修改] END ---

  document.querySelectorAll('.scroll-page').forEach(section => {
    observer.observe(section);
  });
});
</script>

<template>
  <div>
    <!-- 5. Place the Header here and pass the activeSection down as a prop -->
    <Header :activeSection="activeSection" />

    <main>
      <!-- 6. This is where your actual page content goes. -->
      <!--    Each scrollable section needs an 'id' that matches your Header's navigation links. -->
      <section id="section1">
        <h1>主页</h1>
        <!-- Your content for section 1... -->
      </section>
      <section id="section2">
        <h1>角色</h1>
        <!-- Your content for section 2... -->
      </section>
      <section id="section3">
        <h1>音乐</h1>
        <!-- Your content for section 3... -->
      </section>
      <section id="section4">
        <h1>相册</h1>
        <!-- Your content for section 4... -->
      </section>
      <section id="section5">
        <h1>关于</h1>
        <!-- Your content for section 5... -->
      </section>
    </main>
  </div>
</template>

<style scoped>
/* Add some basic styling so you can see the sections and scroll through them */
section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Make each section take up the full screen height */
  font-size: 3rem;
  color: white;
  border-bottom: 1px solid #444;
}

/* Just for demonstration */
#section1 { background: #2c3e50; }
#section2 { background: #34495e; }
#section3 { background: #2c3e50; }
#section4 { background: #34495e; }
#section5 { background: #2c3e50; }
</style>
