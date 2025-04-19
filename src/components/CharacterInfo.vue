<script setup>
import { ref } from 'vue';
const characters = [
    { name: '后藤一里', color: '#d65484', desc: '' },
    { name: '伊地知虹夏', color: '#feea93', desc: '' },
    { name: '山田凉', color: '#99d6f1', desc: '' },
    { name: '喜多郁代', color: '#ce2525', desc: '' }
]



const activeItem = ref(characters[0]);

const switchItem = (index) => {
    activeItem.value = characters[index];
};
</script>


<template>
    <div class="info-container">
        <div class="left-part">
            <img :src="'src/assets/images/海报_'+activeItem.name+'.png'">
        </div>



        <div class="select-part">
            <ul>
                <li v-for="(character, i) in characters" :key="character.name" @click="switchItem(i)" :class="{'selected':activeItem.name === character.name}"  :style="{'--highlight-color' :character.color}" >
                <img :src="'src/assets/images/海报_'+character.name+'.png'" /></li>
            </ul>
        </div>


        <div class="right-part">
            <div class="character-head">
                <img :src="'src/assets/images/大头_'+activeItem.name+'.webp'"/>
            </div>
            <span class="name-line" :style="{'--highlight-color' :activeItem.color}">{{ activeItem.name }}</span>
            <div class="character-image">
                <img :src="'src/assets/images/立绘_'+activeItem.name+'.webp'"/>
            </div>
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


/* 角色列表被选中时的样式 */
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

.right-part {
    display: flex;
    flex: 1;
    position: relative;
}

.name-line {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    display: flex;
    justify-content: flex-start;
    background-color: var(--highlight-color);
    color: #000;
    font-size: 3em;
    transform: translate(0, -50%);
    z-index: -1;
    text-indent: 2em;
    font-family: 'Xiangsu';
    
}

.character-head {
    justify-self: flex-start;
    align-self: flex-start;
    z-index: -2;

}

.character-head img{
    height: 50vh;
    margin-left: 10%;
    opacity: 0.3;
}

.character-image {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.character-image img{
    height: 90vh;
}

/* 定义字体 */
@font-face {
  font-family: 'Xiangsu'; /* 自定义字体名称 */
  src: url('src/assets/fonts/AaHuanMengKongJianXiangSuTi-2.ttf') format('truetype');
  font-weight: bold;
  font-display: swap; /* 优化加载时的显示行为 */
}
</style>