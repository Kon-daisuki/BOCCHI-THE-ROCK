<script setup>
import { ref, onMounted } from 'vue';

const originalPhotos = [
  "/assets/images/p_1.jpeg", "/assets/images/p_2.jpeg", "/assets/images/p_3.jpeg", 
  "/assets/images/p_4.gif", "/assets/images/p_5.jpeg", "/assets/images/p_6.jpeg", 
  "/assets/images/p_7.jpeg", "/assets/images/p_8.jpeg", "/assets/images/p_9.jpeg", 
  "/assets/images/p_10.jpeg", "/assets/images/p_11.jpeg", "/assets/images/p_12.jpeg", 
  "/assets/images/p_13.jpeg", "/assets/images/p_14.jpeg", "/assets/images/p_15.jpeg", 
  "/assets/images/p_16.jpeg", "/assets/images/p_17.gif", "/assets/images/p_18.gif", 
  "/assets/images/p_19.gif", "/assets/images/p_20.gif", "/assets/images/p_21.gif", 
  "/assets/images/p_22.gif", "/assets/images/p_23.jpeg",
];

// [核心修改] 创建一个响应式变量来存储随机排序后的照片
const shuffledPhotos = ref([]);

// [核心修改] 组件加载时，执行一次随机排序
onMounted(() => {
  // 使用 Fisher-Yates (aka Knuth) Shuffle 算法，这是最高效的随机排序算法
  let array = [...originalPhotos];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  shuffledPhotos.value = array;
});
</script>

<template>
    <div class="bg">
        <!-- [核心修改] 布局大大简化，变成一个响应式网格 -->
        <div class="photo-grid">
            <div 
                class="photo-item" 
                v-for="(photo, i) in shuffledPhotos" 
                :key="i"
            >
                <img :src="photo" loading="lazy" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.bg { 
  position: relative; 
  width: 100%; 
  height: 100%; 
  background: linear-gradient(-45deg, #ff7d996e, #ffc766, #5cb6ff, #ff6363); 
  background-size: 300% 300%; 
  animation: gradient 15s ease infinite; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  overflow-y: auto; /* [新增] 允许内容超出时滚动 */
  padding: 80px 20px 20px; /* [新增] 增加内边距，避免内容贴边 */
  box-sizing: border-box;
}

@keyframes gradient { 
  0% { background-position: 0% 0%; } 
  50% { background-position: 100% 100%; } 
  100% { background-position: 0% 0%; } 
}

/* --- [核心修改] 新的网格布局样式 --- */
.photo-grid {
  display: grid;
  width: 100%;
  max-width: 1400px; /* 在超宽屏上限制最大宽度 */
  gap: 15px; /* 网格间距 */
  /* 默认是电脑端，每行6张图 */
  grid-template-columns: repeat(6, 1fr);
}

.photo-item {
  aspect-ratio: 1 / 1; /* 保持宽高比为1:1，即正方形 */
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.photo-item:hover {
  transform: scale(1.05) rotate(2deg);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  z-index: 10;
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 平板端，每行4张图 */
@media (max-width: 1024px) {
  .photo-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* 手机端，每行2张图 */
@media (max-width: 768px) {
  .photo-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
   .bg {
    padding: 80px 10px 10px; /* 手机上减小内边距 */
  }
}
/* --- 修改结束 --- */
</style>
