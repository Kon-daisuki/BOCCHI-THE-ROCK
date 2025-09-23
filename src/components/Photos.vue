<script setup>
import { ref, onMounted } from 'vue';
const photo_list = [ "/assets/images/p_1.jpeg", "/assets/images/p_2.jpeg", "/assets/images/p_3.jpeg", "/assets/images/p_4.gif", "/assets/images/p_5.jpeg", "/assets/images/p_6.jpeg", "/assets/images/p_7.jpeg", "/assets/images/p_8.jpeg", "/assets/images/p_9.jpeg", "/assets/images/p_10.jpeg", "/assets/images/p_11.jpeg", "/assets/images/p_12.jpeg", "/assets/images/p_13.jpeg", "/assets/images/p_14.jpeg", "/assets/images/p_15.jpeg", "/assets/images/p_16.jpeg", "/assets/images/p_17.gif", "/assets/images/p_18.gif", "/assets/images/p_19.gif", "/assets/images/p_20.gif", "/assets/images/p_21.gif", "/assets/images/p_22.gif", "/assets/images/p_23.jpeg", ];

onMounted(() => {
    const boxesContainers = document.querySelectorAll('.boxes');
    boxesContainers.forEach(container => {
        // 重复内容以实现无缝循环滚动
        container.innerHTML += container.innerHTML;
    });
});
</script>

<template>
    <div class="bg">
        <div class="container">
            <div class="scroll-wrapper"> <!-- 新增一层wrapper来辅助scroll-container的定位和溢出隐藏 -->
                <div class="scroll-container"><ol class="boxes boxes-forward"><li class="box" v-for="(photo, i) in photo_list" :key="'forward-'+i"><img :src="photo" loading="lazy" /></li></ol></div>
            </div>
            <div class="scroll-wrapper">
                <div class="scroll-container"><ol class="boxes boxes-backward"><li class="box" v-for="(photo, i) in photo_list" :key="'backward-'+i"><img :src="photo" loading="lazy" /></li></ol></div>
            </div>
            <div class="scroll-wrapper">
                <div class="scroll-container"><ol class="boxes boxes-forward"><li class="box" v-for="(photo, i) in photo_list" :key="'forward-2-'+i"><img :src="photo" loading="lazy" /></li></ol></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 基础样式，针对默认（超大）电脑屏幕 */
.bg {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #FFF;
    z-index: 0;
    background: linear-gradient(-45deg, #ff7d996e, #ffc766, #5cb6ff, #ff6363);
    background-size: 300% 300%;
    animation: gradient 15s ease infinite;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container {
    width: 100%; /* 默认填充，以便 scroll-wrapper 可以全宽显示 */
    max-width: 1800px; /* 限制整个内容区域的最大宽度，避免在超宽屏幕上过于分散 */
    /* margin: 0 auto; 居中容器，但此处不需要，因为scroll-wrapper会延伸到100vw */
}
@keyframes gradient {
    0% { background-position: 0% 0%; }
    50% { background-position: 100% 100%; }
    100% { background-position: 0% 0%; }
}

/* 新增的包裹器，用来确保scroll-container即使在container设置了max-width时也能全屏 */
.scroll-wrapper {
    position: relative; /* 确保子元素的绝对定位参照此元素 */
    width: 100vw; /* 占据整个视口宽度，实现全屏滚动条效果 */
    left: 50%; /* 将scroll-wrapper的左边缘移动到视口中心 */
    transform: translateX(-50%); /* 再向左移动自身宽度的一半，实现居中 */
    overflow: hidden; /* 隐藏超出部分 */
    margin-top: 60px; /* 行之间的垂直间距 */
}
/* 第一行顶部不需要margin-top，通过在container上设置padding-top或调整margin来控制 */
.scroll-wrapper:first-of-type {
    margin-top: 0; /* 移除第一行的顶部外边距 */
}
/* 在container内添加padding-top来控制整体顶部间距 */
.container {
    padding-top: 60px; /* 整体内容的顶部内边距 */
    padding-bottom: 60px; /* 整体内容的底部内边距 */
}

.scroll-container {
    position: relative;
    width: 100%; /* 填充scroll-wrapper的宽度 */
    height: 320px; /* 默认超大屏幕下的行高 (box 280px + 2*20px padding) */
}
.boxes {
    position: absolute;
    display: flex;
    height: 100%; /* 填充 scroll-container 的高度 */
    animation: scroll linear infinite;
    animation-duration: 50s;
    gap: 30px; /* 默认超大屏幕下的图片间距 */
    padding-left: 0; /* 移除列表默认的左内边距 */
    align-items: center; /* 垂直居中图片 */
}
.boxes-forward { animation-name: scrollForward; }
.boxes-backward { animation-name: scrollBackward; }

@keyframes scrollForward { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
@keyframes scrollBackward { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }

.box {
    list-style: none;
    position: relative;
    width: 280px; /* 默认超大屏幕下的图片宽度 */
    height: 280px; /* 默认超大屏幕下的图片高度 */
    flex-shrink: 0; /* 防止图片缩小 */
    /* margin-right: 5px; /* REMOVE: 使用 gap 属性 */
    border: none;
    border-radius: 15px;
    transition: all 0.5s ease;
    box-shadow: 0 0px 5px rgba(0, 0, 0, 0.5);
    opacity: 0.8;
    transform: perspective(100px) rotateY(-15deg);
}
.box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 15px;
    transition: all 0.8s ease;
}
.box:hover {
    opacity: 1;
    z-index: 1;
    /* 悬停宽度为当前宽度的1.3倍 */
    width: calc(var(--box-width, 280px) * 1.3);
    height: calc(var(--box-height, 280px) * 1.3);
    transition: all 0.5s ease;
    /* 同时应用缩放和透视旋转 */
    transform: perspective(100px) rotateY(-15deg) scale(1.1);
}
/* 为 .boxes-backward 的 box 悬停效果调整 */
.boxes-backward .box:hover {
    transform: perspective(100px) rotateY(15deg) scale(1.1);
}
.boxes:hover {
    animation-play-state: paused; /* 鼠标悬停时暂停滚动 */
}
.boxes-backward .box {
    transform: perspective(100px) rotateY(15deg);
}


/* --- 电脑端优化断点 --- */

/* 1. 针对大桌面屏幕 (1441px - 1800px) */
@media (min-width: 1441px) and (max-width: 1800px) {
    .scroll-wrapper {
        margin-top: 50px;
    }
    .container {
        padding-top: 50px;
        padding-bottom: 50px;
    }
    .scroll-container {
        height: 280px; /* box 240px + 2*20px padding */
    }
    .boxes {
        gap: 25px;
    }
    .box {
        width: 240px;
        height: 240px;
        /* 使用CSS变量传递当前尺寸给 hover 效果 */
        --box-width: 240px;
        --box-height: 240px;
    }
}

/* 2. 针对中等桌面屏幕 (1201px - 1440px) */
@media (min-width: 1201px) and (max-width: 1440px) {
    .scroll-wrapper {
        margin-top: 40px;
    }
    .container {
        padding-top: 40px;
        padding-bottom: 40px;
    }
    .scroll-container {
        height: 240px; /* box 200px + 2*20px padding */
    }
    .boxes {
        gap: 20px;
    }
    .box {
        width: 200px;
        height: 200px;
        --box-width: 200px;
        --box-height: 200px;
    }
}

/* 3. 针对小桌面 / 大平板屏幕 (1025px - 1200px) */
@media (min-width: 1025px) and (max-width: 1200px) {
    .scroll-wrapper {
        margin-top: 30px;
    }
    .container {
        padding-top: 30px;
        padding-bottom: 30px;
    }
    .scroll-container {
        height: 200px; /* box 160px + 2*20px padding */
    }
    .boxes {
        gap: 18px;
    }
    .box {
        width: 160px;
        height: 160px;
        --box-width: 160px;
        --box-height: 160px;
    }
}

/* --- 原有平板样式调整 (769px - 1024px) --- */
@media (min-width: 769px) and (max-width: 1024px) {
    .scroll-wrapper {
        margin-top: 25px;
    }
    .container {
        padding-top: 25px;
        padding-bottom: 25px;
    }
    .scroll-container {
        height: 180px; /* box 140px + 2*20px padding */
    }
    .boxes {
        gap: 15px;
    }
    .box {
        width: 140px;
        height: 140px;
        --box-width: 140px;
        --box-height: 140px;
    }
}

/* --- 原有手机样式 (max-width: 768px) --- */
@media (max-width: 768px) {
    .scroll-wrapper {
        margin-top: 20px;
    }
    .container {
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .scroll-container {
        height: 150px; /* box 120px + 2*15px padding */
    }
    .boxes {
        gap: 10px;
    }
    .box {
        width: 120px;
        height: 120px;
        --box-width: 120px;
        --box-height: 120px;
    }
    .box:hover {
        /* 在移动端可能不适合太大的缩放和3D效果，简化 */
        width: calc(var(--box-width, 120px) * 1.15); /* 略微放大 */
        height: calc(var(--box-height, 120px) * 1.15);
        transform: scale(1.15); /* 保持简单的缩放 */
    }
    .boxes-backward .box:hover {
        transform: scale(1.15);
    }
}
</style>
