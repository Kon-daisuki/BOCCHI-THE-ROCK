<script setup>
import { ref } from 'vue';
const characters = [
    {
        name: '后藤一里', romaji: 'GOTOU  HITORI  ', instrument: 'Gt.', color: '#d65484', line: [
            '​绝对不要！',
            '​不想工作！！',
            '好可怕！社会好可怕！！'
        ], desc: ''
    },
    {
        name: '伊地知虹夏', romaji: 'IJICHI  NIJIKA  ',instrument: 'Dr.', color: '#f9b000', line: [
            '我的梦想',
            '或许在不远的将来',
            '就能实现...'
        ], desc: ''
    },
    {
        name: '山田凉', romaji: 'YAMADA  RYO  ', instrument: 'Ba.',color: '#99d6f1', line: [
            '分散各异的人类个性',
            '汇聚在一起',
            '便成为了一种音乐'
        ], desc: ''
    },
    {
        name: '喜多郁代', romaji: 'KITA  IKUYO  ', instrument: 'Gt.Vo.',color: '#ce2525', line: [
            '如果这么厉害的后藤同学',
            '愿意教导我的话',
            '或许就能提起干劲了…'
        ], desc: ''
    }
]



const activeItem = ref(characters[0]);

const switchItem = (index) => {
    activeItem.value = characters[index];
};
</script>


<template>
    <div class="info-container">
        <div class="left-part">
            <img :src="'src/assets/images/海报_' + activeItem.name + '.png'">
        </div>



        <div class="select-part">
            <ul>
                <li v-for="(character, i) in characters" :key="character.name" @click="switchItem(i)"
                    :class="{ 'selected': activeItem.name === character.name }"
                    :style="{ '--highlight-color': character.color }">
                    <img :src="'src/assets/images/海报_' + character.name + '.png'" />
                </li>
            </ul>
        </div>


        <div class="right-part">

            <div class="character-line" :style="{ '--highlight-color': activeItem.color }">
                <p v-for="(e, index) in activeItem.line" :key="index">{{ e }}</p>
            </div>

            <div class="character-head">
                <img :src="'src/assets/images/大头_' + activeItem.name + '.webp'" />
            </div>


            <div class="instrument-content" :style="{ left: activeItem.name === '喜多郁代' ? '10%' : '60%' }">
                {{ activeItem.instrument }}
            </div>
            
            <div class="romaji-line" :style="{ '--highlight-color': activeItem.color }">
                <span v-for="i in 10">{{ activeItem.romaji }}</span>
            </div>

            <span class="name-line" :style="{ '--highlight-color': activeItem.color }">{{ activeItem.name }}</span>
            <div class="character-image">
                <img :src="'src/assets/images/立绘_' + activeItem.name + '.png'" />
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
    align-self: flex-end;
    /* 新增：让所有li贴紧底部 */
    transition: all 0.3s;
}

.select-part li.selected,
.select-part li:hover {
    width: 100px;
    height: 100px;
    transition: all 0.3s;

}


.select-part img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: top;
    /* 从顶部开始裁剪 */

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
    pointer-events: none;
    /* 防止伪元素拦截点击 */
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
    pointer-events: none;
    /* 防止伪元素拦截点击事件 */
}

.right-part {
    display: flex;
    flex: 1;
    position: relative;
}





.instrument-content {
    font-size: 20em;
    font-family: '黑体';
    font-weight: bolder;
    color: #2b2b2b;
    text-shadow: 0 0 1px #fff;
    position: absolute;
    top: 5%;
    z-index: -3;
}

.character-line {
    left: 5%;
    top: 20%;
    padding: 30px;
    font-size: 1.5em;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: flex-start;
    color: var(--highlight-color);
    font-family: '宋体';
}


.character-line::before,
.character-line::after {
    content: "";
    position: absolute;
    width: 55px;
    height: 55px;
}

.character-line::before {
    top: 0;
    left: 0;
    border-top: 2px solid var(--highlight-color);
    border-left: 2px solid var(--highlight-color);
}

.character-line::after {
    bottom: 0;
    right: 0;
    border-right: 2px solid var(--highlight-color);
    border-bottom: 2px solid var(--highlight-color);
}


.romaji-line {
    position: absolute;
    top: 43.25%;
    font-size: 1.4em;
    overflow: hidden;
    white-space: nowrap;
    color: var(--highlight-color);
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
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
    font-family: 'Aa幻梦空间像素体';

}

.character-head {
    justify-self: flex-start;
    align-self: flex-start;
    z-index: -2;

}

.character-head img {
    height: 50vh;
    margin-left: 10%;
    opacity: 0.1;
}

.character-image {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.character-image img {
    height: 90vh;
}
</style>