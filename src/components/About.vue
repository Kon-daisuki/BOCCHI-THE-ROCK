<script setup>
const producers = [ { name: 'Sudoria', url: '/assets/images/Sudoria.jpg', color: '#d65484', desc: 'Bocchi the Rock！！！' }, { name: 'Alola', url: '/assets/images/Alola.jpg', color: '#ce2525', desc: '那我问你，有耳朵不能体现耋，没耳朵不能体现耄，那耄耋娘化是什么样子？' }, { name: 'Daxi', url: '/assets/images/Daxi.jpg', color: '#99d6f1', desc: '关注永雏塔菲喵，关注永雏塔菲谢谢喵8' }, { name: 'Rquars', url: '/assets/images/Rquars.jpg', color: '#f9b000', desc: '什么时候才能长高...' } ];
</script>

<template>
    <div class="main">
        <div class="scrollable-content">
            <div class="head">
                <div class="c-onpu"><div class="c-onpu__layer -layer1"></div><div class="c-onpu__layer -layer2"></div><div class="c-onpu__layer -layer3"></div></div>
                
                <!-- === [代码修改] START === -->
                <!-- 使用一个新的 div 包裹标题和图标, 方便布局 -->
                <div class="title-container">
                    <p class="label1">制作组名单</p>
                    <!-- 添加 GitHub 链接和 SVG 图标 -->
                    <a href="https://github.com/agtypec/BOCCHI-THE-ROCK" class="github-link" target="_blank" rel="noopener noreferrer" aria-label="View source on GitHub">
                        <svg class="github-icon" viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
                    </a>
                </div>
                <!-- === [代码修改] END === -->

                <p class="label2">Ciallo～(∠・ω< )⌒☆</p>
            </div>
            <div class="container">
                <div class="container-producer">
                    <p class="producer-label">PRODUCER</p>
                    <div class="producer-item" v-for="(producer) in producers" :key="producer.name">
                        <div class="producer-scale"><img class="producer-image" :src="producer.url"></img></div>
                        <div class="producer-name" :style="{ color: producer.color }">{{ producer.name }}</div>
                        <p class="producer-drc" :style="{ color: producer.color }">{{ producer.desc }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main { position: relative; width: 100%; height: 100%; background: url(/assets/images/pagebg.png) 100% 100% no-repeat; background-size: cover; }
.scrollable-content { width: 100%; height: 100%; overflow-y: auto; -webkit-overflow-scrolling: touch; }
.head { position: relative; width: 100%; height: 30%; min-height: 200px; }
@keyframes onpuAnime1 { 0% { transform: translate(0, 0); } 100% { transform: translate(0, -10px); } } @keyframes onpuAnime2 { 0% { transform: translate(0, 0); } 100% { transform: translate(0, 10px); } } @keyframes onpuLineAnime { 0% { transform: scaleY(1); } 100% { transform: scaleY(0.8); } }
.c-onpu__layer { position: absolute; top: 0; left: 0; background-repeat: no-repeat; background-size: 100% auto; height: 100%; width: 50%; } .c-onpu__layer.-layer1 { animation: onpuLineAnime 5s linear infinite alternate-reverse; opacity: 0.5; transform-origin: 0 20%; background-image: url(/assets/images/onpu_line.png); } .c-onpu__layer.-layer2 { animation: onpuAnime1 2s linear infinite alternate-reverse; background-image: url(/assets/images/onpu_item1.png); } .c-onpu__layer.-layer3 { animation: onpuAnime2 2s linear infinite alternate-reverse; background-image: url(/assets/images/onpu_item2.png); }

/* === [代码修改] START === */
/* 将原先 label1 的定位属性移到这个新的容器上 */
.title-container {
    position: absolute;
    left: 7%;
    top: 20%;
    display: flex; /* 使用 flex 布局让标题和图标并排显示 */
    align-items: center; /* 垂直居中对齐 */
    gap: 20px; /* 设置标题和图标之间的间距 */
}
/* 取消 label1 的绝对定位，因为它现在由父容器控制位置 */
.label1 { 
    position: static;
    font-family: '微软雅黑';
    font-size: 4em;
    font-weight: 900;
    color: rgba(197, 89, 255, 0.8);
}
.github-link {
    display: flex;
    align-items: center;
}
.github-icon {
    width: 48px;
    height: 48px;
    fill: #b0b0b0; /* 图标默认颜色 */
    transition: fill 0.3s ease, transform 0.3s ease;
}
.github-link:hover .github-icon {
    fill: #ffffff; /* 鼠标悬停时变白 */
    transform: scale(1.1); /* 鼠标悬停时放大一点 */
}
/* === [代码修改] END === */

.label2 { position: absolute; font-family: '微软雅黑'; left: 7%; top: 50%; color: yellow; font-size: 1.3em; font-weight: bold; }
.container { position: relative; display: flex; width: 100%; height: auto; min-height: 70%; justify-content: center; padding-bottom: 50px; }
.container-producer { position: relative; top: -15%; width: 70%; }

/* === [代码修改] START === */
/* 将 PRODUCER 标题从绝对定位修改为相对定位，使其能够参与文档流布局 */
.producer-label {
    position: relative; /* Change from absolute */
    font-family: '微软雅黑';
    width: 100%;
    font-weight: bold;
    font-size: 2em;
    text-align: left;
    color: rgb(197, 89, 255);
    border-bottom: 1px solid gray;
    padding-bottom: 10px; /* Add some padding for better visual */
    margin-bottom: 80px;  /* Add margin to create space for the items */
}
/* === [代码修改] END === */

@font-face { font-family: 'Note-Script-SemiBold-2'; src: url('/assets/fonts/Note-Script-SemiBold-2.ttf') format('truetype'); font-style: normal; }

/* === [代码修改] START === */
/* 将 producer-item 从绝对定位修改为相对定位，使其能够正常堆叠 */
.producer-item {
    position: relative; /* Change from absolute */
    width: 120px;
    aspect-ratio: 1/1;
    margin-left: 5%;    /* Use margin for horizontal positioning */
    margin-bottom: 80px; /* Add margin to vertically space out items */
}
/* 移除原先用于绝对定位的 nth-child 规则 */
/* .producer-item:nth-child(2) { top: 15%; } etc. are removed */
/* === [代码修改] END === */

.producer-scale { width: 100%; height: 100%; transform: scale(1); transition: transform 0.5s ease; }
.producer-image { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; transition: transform 0.8s ease, box-shadow 0.7s ease; transform: none; box-shadow: 0 0 0 rgba(197, 89, 255, 0); }
.producer-image:hover { transform: rotate(360deg); box-shadow: 0 0 20px rgba(197, 89, 255, 0.7); filter: brightness(1.1); }
.producer-scale:hover { transform: scale(1.2); }
.producer-name { position: absolute; top: 10%; left: calc(100% + 40px); font-family: 'Note-Script-SemiBold-2'; font-size: 1.5em; white-space: nowrap; }
.producer-drc { position: absolute; text-align: left; width: 400px; height: auto; top: 45%; left: calc(100% + 60px); font-size: 1.2em; font-family: '宋体'; }

@media (max-width: 1024px) {
    .head { height: 25vh; }
    /* === [代码修改] START === */
    .title-container { gap: 15px; } /* 缩小平板设备上的间距 */
    .label1 { font-size: 3em; }
    .github-icon { width: 40px; height: 40px; } /* 缩小图标尺寸 */
    /* === [代码修改] END === */
    .label2 { font-size: 1.2em; }
    .container-producer { position: relative; top: -10%; width: 85%; display: grid; grid-template-columns: repeat(2, 1fr); gap: 50px 20px; }
    
    /* === [代码修改] START === */
    /* 媒体查询内的样式覆盖，确保网格布局正常 */
    .producer-label {
        position: relative;
        text-align: center;
        grid-column: 1 / -1;
        margin-bottom: 20px; /* Adjust margin for tablet view */
        border-bottom: none;
    }
    .producer-item {
        position: relative;
        width: 100%;
        left: auto;
        top: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 0; /* Reset margin */
        margin-bottom: 0; /* Reset margin, rely on grid gap */
    }
    /* === [代码修改] END === */
    
    .producer-item:nth-child(n) { top: auto; }
    .producer-scale { width: 100px; height: 100px; }
    .producer-name { position: static; margin-top: 10px; font-size: 1.3em; }
    .producer-drc { position: static; width: 100%; font-size: 1em; text-align: center; margin-top: 8px; padding: 0 15px; }
}

@media (max-width: 768px) {
    .head { height: 20vh; min-height: 180px; }
    /* === [代码修改] START === */
    /* 在手机上，标题容器整体下移，以匹配原始设计 */
    .title-container { top: 30%; gap: 10px; }
    .label1 { font-size: 2.2em; }
    /* top: 30%;  (此样式已移动到 .title-container) */
    .github-icon { width: 32px; height: 32px; } /* 进一步缩小图标 */
    /* === [代码修改] END === */
    .label2 { font-size: 1em; top: 65%; }
    .container { top: 0; min-height: 80vh; }
    .container-producer { width: 90%; top: -5%; position: relative; display: block; }
    
    /* === [代码修改] START === */
    /* 媒体查询内的样式覆盖，确保移动端布局正常 */
    .producer-label {
        font-size: 1.5em;
        text-align: center;
        position: relative;
        margin-bottom: 0; /* Reset margin */
    }
    .producer-item {
        position: relative;
        left: auto;
        top: auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
        margin-bottom: 15px;
        margin-left: 0; /* Reset margin */
    }
    /* === [代码修改] END === */
    
    .producer-item:nth-child(n) { top: auto; }
    .producer-scale { width: 70px; height: 70px; }
    .producer-name { position: static; margin-top: 8px; font-size: 1.1em; }
    .producer-drc { position: static; width: 100%; font-size: 0.9em; text-align: center; margin-top: 5px; padding: 0 10px; }
}
</style>
