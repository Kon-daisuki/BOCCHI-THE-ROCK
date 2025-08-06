<!-- 
    @Author: Alola
    [最终打磨版 - 修复滚动和缺失问题]
-->

<script setup>
const producers = [
    { name: 'Sudoria', url: '/assets/images/Sudoria.jpg', color: '#d65484', desc: 'Bocchi the Rock！！！' },
    { name: 'Alola', url: '/assets/images/Alola.jpg', color: '#ce2525', desc: '那我问你，有耳朵不能体现耋，没耳朵不能体现耄，那耄耋娘化是什么样子？' },
    { name: 'Daxi', url: '/assets/images/Daxi.jpg', color: '#99d6f1', desc: '关注永雏塔菲喵，关注永雏塔菲谢谢喵8' },
    { name: 'Rquars', url: '/assets/images/Rquars.jpg', color: '#f9b000', desc: '什么时候才能长高...' }
]
</script>

<template>
    <div class="main">
        <div class="head">
            <div class="c-onpu">
                <div class="c-onpu__layer -layer1"></div>
                <div class="c-onpu__layer -layer2"></div>
                <div class="c-onpu__layer -layer3"></div>
            </div>
            <p class="label1">制作组名单</p>
            <p class="label2">Ciallo～(∠・ω< )⌒☆</p>
        </div>
        <div class="container">
            <div class="container-producer">
                <p class="producer-label">PRODUCER</p>
                <div class="producer-item" v-for="(producer, index) in producers" :key="producer.name">
                    <div class="producer-scale">
                        <img class="producer-image" :src="producer.url"></img>
                    </div>
                    <div class="producer-name" :style="{ color: producer.color }">{{ producer.name }}</div>
                    <p class="producer-drc" :style="{ color: producer.color }">{{ producer.desc }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* --- [关键修复] --- */
.main {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: url(/assets/images/pagebg.png) 100% 100% no-repeat;
    /* 在手机端，允许垂直滚动以查看所有内容 */
    overflow-y: auto; 
}
/* --- 修复结束 --- */

.head { position: relative; width: 100%; height: 30%; }
@keyframes onpuAnime1 { 0% { transform: translate(0, 0); } 100% { transform: translate(0, -10px); } }
@keyframes onpuAnime2 { 0% { transform: translate(0, 0); } 100% { transform: translate(0, 10px); } }
@keyframes onpuLineAnime { 0% { transform: scaleY(1); } 100% { transform: scaleY(0.8); } }
.c-onpu__layer { position: absolute; top: 0; left: 0; background-repeat: no-repeat; background-size: 100% auto; height: 100%; width: 50%; }
.c-onpu__layer.-layer1 { animation: onpuLineAnime 5s linear infinite alternate-reverse; opacity: 0.5; transform-origin: 0 20%; background-image: url(/assets/images/onpu_line.png); }
.c-onpu__layer.-layer2 { animation: onpuAnime1 2s linear infinite alternate-reverse; background-image: url(/assets/images/onpu_item1.png); }
.c-onpu__layer.-layer3 { animation: onpuAnime2 2s linear infinite alternate-reverse; background-image: url(/assets/images/onpu_item2.png); }
.label1 { position: absolute; font-family: '微软雅黑'; left: 7%; top: 20%; font-size: 4em; font-weight: 900; color: rgba(197, 89, 255, 0.8); }
.label2 { position: absolute; font-family: '微软雅黑'; left: 7%; top: 50%; color: yellow; font-size: 1.3em; font-weight: bold; }
.container { position: relative; display: flex; width: 100%; height: auto; /* 自动高度 */ min-height: 70%; justify-content: center; padding-bottom: 50px; }
.container-producer { position: relative; /* 改为相对定位 */ top: -15%; width: 70%; }
.producer-label { position: absolute; font-family: '微软雅黑'; top: 0; left: 0; width: 100%; font-weight: bold; font-size: 2em; text-align: left; color: rgb(197, 89, 255); border-bottom: 1px solid gray; }
@font-face { font-family: 'Note-Script-SemiBold-2'; src: url('/assets/fonts/Note-Script-SemiBold-2.ttf') format('truetype'); font-style: normal; }
.producer-item { position: absolute; width: 10%; aspect-ratio: 1/1; left: 2%; }
.producer-item:nth-child(2) { top: 15%; } .producer-item:nth-child(3) { top: 40%; } .producer-item:nth-child(4) { top: 65%; } .producer-item:nth-child(5) { top: 90%; }
.producer-scale { width: 100%; height: 100%; transform: scale(1); transition: transform 0.5s ease; }
.producer-image { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; transition: transform 0.8s ease, box-shadow 0.7s ease; transform: none; box-shadow: 0 0 0 rgba(197, 89, 255, 0); }
.producer-image:hover { transform: rotate(360deg); box-shadow: 0 0 20px rgba(197, 89, 255, 0.7); filter: brightness(1.1); }
.producer-scale:hover { transform: scale(1.2); }
.producer-name { position: absolute; top: 0; left: 70%; font-family: 'Note-Script-SemiBold-2'; font-size: 1.5em; }
.producer-drc { position: absolute; text-align: left; width: 800%; height: auto; top: 27%; left: 130%; font-size: 1.2em; font-family: '宋体'; }

@media (max-width: 768px) {
    .head { height: 25vh; /* 使用vh确保高度 */ flex-shrink: 0; }
    .label1 { font-size: 2.5em; left: 5%; top: 25%; }
    .label2 { font-size: 1em; left: 5%; top: 60%; }
    .container { top: 0; }
    .container-producer { width: 90%; top: 0; position: relative; }
    .producer-label { font-size: 1.5em; text-align: center; position: relative; }
    .producer-item { position: relative; left: auto; top: auto; width: 100%; display: flex; flex-direction: column; align-items: center; margin-top: 30px; margin-bottom: 20px; }
    .producer-item:nth-child(n) { top: auto; } /* 统一移除所有定位 */
    .producer-scale { width: 80px; height: 80px; }
    .producer-name { position: static; margin-top: 10px; font-size: 1.2em; }
    .producer-drc { position: static; width: 100%; font-size: 1em; text-align: center; margin-top: 8px; padding: 0 10px; }
}
</style>
