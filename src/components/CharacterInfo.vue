<script setup>
import { ref } from 'vue';
const characters = [
    { name: '后藤一里', avatar: 'src/assets/images/海报_一里.png', color: '#d65484', desc: '' },
    { name: '伊地知虹夏', avatar: 'src/assets/images/海报_虹夏.png', color: '#feea93', desc: '' },
    { name: '山田凉', avatar: 'src/assets/images/海报_凉.png', color: '#99d6f1', desc: '' },
    { name: '喜多郁代', avatar: 'src/assets/images/海报_喜多.png', color: '#ce2525', desc: '' }
]



const activeItem = ref(characters[0]);

const switchItem = (index) => {
    activeItem.value = characters[index];
};
</script>


<template>
    <div class="info-container">
        <div class="left-part">
            <img :src="activeItem.avatar">
        </div>

        <div class="right-part">
            <span class="info-name">{{ activeItem.name }}</span>
            <div class="info-desc">
                {{ activeItem.desc }}
            </div>
        </div>

        <div class="select-part">
            <ul>
                <li v-for="(character, i) in characters" :key="character.name" @click="switchItem(i)" :class="{'selected':activeItem.name === character.name}"  :style="{'--highlight-color' :character.color}" >
                <img :src="character.avatar" /></li>
            </ul>
        </div>
    </div>

</template>


<style scoped>
.info-container {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    display: flex;
}

.left-part img {
    height: 100%;
}

.select-part {
    position: absolute;
    bottom: 0;
}

.select-part ul {
    display: flex;
}


.select-part li {
    position: relative;
    list-style: none;
    width: 80px;
    height: 80px;
    align-self: flex-end; /* 新增：让所有li贴紧底部 */
    transition: all 0.3s;
}
.select-part li.selected,.select-part li:hover {
    width: 100px;
    height: 100px;
    transition: all 0.3s;
    
}

.select-part img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: top; /* 从顶部开始裁剪 */
    
}



/* 使用伪元素方式来实现边框以及边框动画效果 */
/* 伪元素放边框，防止被li标签内部的img覆盖内嵌边框效果 */
.select-part li::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.3s;
    pointer-events: none; /* 防止伪元素拦截点击 */
}

.select-part li.selected::before,
.select-part li:hover::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 0 5px var(--highlight-color);
    pointer-events: none; /* 防止伪元素拦截点击事件 */
}
</style>