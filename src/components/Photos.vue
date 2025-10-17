<script setup>
import { ref, computed } from 'vue'; // 【修改点 1】引入 computed

const photo_list = [ "/assets/images/p_1.jpeg", "/assets/images/p_2.jpeg", "/assets/images/p_3.jpeg", "/assets/images/p_4.gif", "/assets/images/p_5.jpeg", "/assets/images/p_6.jpeg", "/assets/images/p_7.jpeg", "/assets/images/p_8.jpeg", "/assets/images/p_9.jpeg", "/assets/images/p_10.jpeg", "/assets/images/p_11.jpeg", "/assets/images/p_12.jpeg", "/assets/images/p_13.jpeg", "/assets/images/p_14.jpeg", "/assets/images/p_15.jpeg", "/assets/images/p_16.jpeg", "/assets/images/p_17.gif", "/assets/images/p_18.gif", "/assets/images/p_19.gif", "/assets/images/p_20.gif", "/assets/images/p_21.gif", "/assets/images/p_22.gif", "/assets/images/p_23.jpeg", ];

// 【修改点 2】移除 onMounted 钩子

// 【修改点 3】使用 computed 属性将 photo_list 复制一份，用于 v-for 循环
const duplicated_photo_list = computed(() => {
    // 将原列表重复一次，以实现无限滚动所需的双倍内容
    return [...photo_list, ...photo_list];
});
</script>

<template>
    <div class="bg">
        <div class="container">
            <div class="scroll-container">
                <ol class="boxes boxes-forward">
                    <li class="box" v-for="(photo, i) in duplicated_photo_list" :key="'forward-'+i">
                        <img :src="photo" loading="lazy" />
                    </li>
                </ol>
            </div>
            <div class="scroll-container">
                <ol class="boxes boxes-backward">
                    <li class="box" v-for="(photo, i) in duplicated_photo_list" :key="'backward-'+i">
                        <img :src="photo" loading="lazy" />
                    </li>
                </ol>
            </div>
            <div class="scroll-container">
                <ol class="boxes boxes-forward">
                    <li class="box" v-for="(photo, i) in duplicated_photo_list" :key="'forward-2-'+i">
                        <img :src="photo" loading="lazy" />
                    </li>
                </ol>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bg 
[span_0](start_span){ position: relative; width: 100%; height: 100%; background-color: #FFF; z-index: 0; background: linear-gradient(-45deg, #ff7d996e, #ffc766, #5cb6ff, #ff6363); background-size: 300% 300%;[span_0](end_span)
animation: gradient 15s ease infinite; display: flex; justify-content: center; align-items: center; [span_1](start_span)}
.container { width: 100%;
}[span_1](end_span)
@keyframes gradient { 0% { background-position: 0% 0%; } 50% { background-position: 100% 100%; } 100% { background-position: 0% 0%;
[span_2](start_span)} }[span_2](end_span)
.scroll-container { position: relative; margin-top: 20px; width: 100vw; height: 250px; }
.boxes { position: absolute; display: flex; height: 100%;
animation: scroll linear infinite; animation-duration: 50s; gap: 20px ; margin-top: 60px; padding-left: 0; [span_3](start_span)}
.boxes-forward { animation-name: scrollForward;
}[span_3](end_span)
.boxes-backward { animation-name: scrollBackward; }
@keyframes scrollForward { 0% { transform: translateX(0); } 100% { transform: translateX(-50%);
[span_4](start_span)} }[span_4](end_span)
@keyframes scrollBackward { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
.box { list-style: none; position: relative;
width: 200px; height: 200px; flex-shrink: 0; margin-right: 5px; border: none; border-radius: 15px; transition: all 0.5s ease;
box-shadow: 0 0px 5px rgba(0, 0, 0, 0.5); opacity: 0.8; transform: perspective(100px) rotateY(-15deg); [span_5](start_span)}
.box img { width: 100%; height: 100%;
object-fit: cover; object-position: center; border-radius: 15px; transition: all 0.8s ease; }[span_5](end_span)
.box:hover { opacity: 1; z-index: 1; width: 300px;
transition: all 0.5s ease; transform: scale(1.1); [span_6](start_span)}
.boxes:hover { animation-play-state: paused; }
.boxes-backward .box { transform: perspective(100px) rotateY(15deg);
}[span_6](end_span)
.boxes-backward .box:hover { transform: scale(1.1); }

/* --- 新增平板样式 --- */
@media (min-width: 769px) and (max-width: 1024px) {
    .scroll-container {
        height: 200px;
        [span_7](start_span)margin-top: 15px;[span_7](end_span)
    }
    .boxes {
        margin-top: 30px;
        [span_8](start_span)gap: 15px;[span_8](end_span)
    }
    .box {
        width: 160px;
        [span_9](start_span)height: 160px;[span_9](end_span)
    }
    .box:hover {
        [span_10](start_span)width: 240px;[span_10](end_span)
    }
}
/* --- 平板样式结束 --- */

@media (max-width: 768px) {
    .container { padding-top: 0;
    [span_11](start_span)}
    .scroll-container { height: 150px; margin-top: 10px; }
    .boxes { margin-top: 15px; gap: 10px;
    }[span_11](end_span)
    .box { width: 120px; height: 120px;
    [span_12](start_span)}
    .box:hover {
        width: 200px;
        transform: scale(1.05) rotateY(0);[span_12](end_span)
    }
    .boxes-backward .box:hover {
        transform: scale(1.05) rotateY(0);
    }
}
</style>
