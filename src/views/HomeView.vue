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
