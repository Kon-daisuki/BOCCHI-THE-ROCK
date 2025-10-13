<script setup>
import { ref, onMounted } from 'vue';
const photo_list = [ "/assets/images/p_1.jpeg", "/assets/images/p_2.jpeg", "/assets/images/p_3.jpeg", "/assets/images/p_4.gif", "/assets/images/p_5.jpeg", "/assets/images/p_6.jpeg", "/assets/images/p_7.jpeg", "/assets/images/p_8.jpeg", "/assets/images/p_9.jpeg", "/assets/images/p_10.jpeg", "/assets/images/p_11.jpeg", "/assets/images/p_12.jpeg", "/assets/images/p_13.jpeg", "/assets/images/p_14.jpeg", "/assets/images/p_15.jpeg", "/assets/images/p_16.jpeg", "/assets/images/p_17.gif", "/assets/images/p_18.gif", "/assets/images/p_19.gif", "/assets/images/p_20.gif", "/assets/images/p_21.gif", "/assets/images/p_22.gif", "/assets/images/p_23.jpeg", ];
onMounted(() => { const boxesContainers = document.querySelectorAll('.boxes'); boxesContainers.forEach(container => { container.innerHTML += container.innerHTML; }); });
</script>

<template>
    <div class="bg">
        <div class="container">
            <div class="scroll-container"><ol class="boxes boxes-forward"><li class="box" v-for="(photo, i) in photo_list" :key="'forward-'+i"><img :src="photo" loading="lazy" /></li></ol></div>
            <div class="scroll-container"><ol class="boxes boxes-backward"><li class="box" v-for="(photo, i) in photo_list" :key="'backward-'+i"><img :src="photo" loading="lazy" /></li></ol></div>
            <div class="scroll-container"><ol class="boxes boxes-forward"><li class="box" v-for="(photo, i) in photo_list" :key="'forward-2-'+i"><img :src="photo" loading="lazy" /></li></ol></div>
        </div>
    </div>
</template>

<style scoped>
.bg { position: relative; width: 100%; height: 100%; background-color: #FFF; z-index: 0; background: linear-gradient(-45deg, #ff7d996e, #ffc766, #5cb6ff, #ff6363); background-size: 300% 300%; animation: gradient 15s ease infinite; display: flex; justify-content: center; align-items: center; }
.container { width: 100%; }
@keyframes gradient { 0% { background-position: 0% 0%; } 50% { background-position: 100% 100%; } 100% { background-position: 0% 0%; } }
.scroll-container { position: relative; margin-top: 20px; width: 100vw; height: 250px; }
.boxes { position: absolute; display: flex; height: 100%; animation: scroll linear infinite; animation-duration: 50s; gap: 20px ; margin-top: 60px; padding-left: 0; }
.boxes-forward { animation-name: scrollForward; }
.boxes-backward { animation-name: scrollBackward; }
@keyframes scrollForward { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
@keyframes scrollBackward { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
.box { list-style: none; position: relative; width: 200px; height: 200px; flex-shrink: 0; margin-right: 5px; border: none; border-radius: 15px; transition: all 0.5s ease; box-shadow: 0 0px 5px rgba(0, 0, 0, 0.5); opacity: 0.8; transform: perspective(100px) rotateY(-15deg); }
.box img { width: 100%; height: 100%; object-fit: cover; object-position: center; border-radius: 15px; transition: all 0.8s ease; }
.box:hover { opacity: 1; z-index: 1; width: 300px; transition: all 0.5s ease; transform: scale(1.1); }
.boxes:hover { animation-play-state: paused; }
.boxes-backward .box { transform: perspective(100px) rotateY(15deg); }
.boxes-backward .box:hover { transform: scale(1.1); }

/* --- 新增平板样式 --- */
@media (min-width: 769px) and (max-width: 1024px) {
    .scroll-container {
        height: 200px;
        margin-top: 15px;
    }
    .boxes {
        margin-top: 30px;
        gap: 15px;
    }
    .box {
        width: 160px;
        height: 160px;
    }
    .box:hover {
        width: 240px;
    }
}
/* --- 平板样式结束 --- */

@media (max-width: 768px) {
    .container { padding-top: 0; }
    .scroll-container { height: 150px; margin-top: 10px; }
    .boxes { margin-top: 15px; gap: 10px; }
    .box { width: 120px; height: 120px; }
    .box:hover {
        width: 200px;
        transform: scale(1.05) rotateY(0);
    }
    .boxes-backward .box:hover {
        transform: scale(1.05) rotateY(0);
    }
}
</style>
