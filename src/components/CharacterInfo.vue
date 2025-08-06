<!-- 
    @Author: Sudoria
    [最终修复版 - 修复切换器割裂感]
-->
<script setup>
import { ref } from 'vue';
const characters = [ { name: '后藤一里', romaji: 'GOTOU  HITORI  ', instrument: 'Gt.', cv: '青山吉能', cv_romaji: 'Yoshino Aoyama', color: '#d65484', line: ['​绝对不要！','​不想工作！！','好可怕！社会好可怕！！'], desc: '极度怕生、性格内向的高中一年级学生。是结束乐队的吉他主奏。虽然性格内向，却因憧憬能在乐队活动中闪闪发光而开始学习吉他。实力是货真价实的，但无法在乐队演出或人前好好发挥。每次开口说话前必定会先冒出一声“啊…”。' }, { name: '伊地知虹夏', romaji: 'IJICHI  NIJIKA  ', instrument: 'Dr.', cv: '铃代纱弓', cv_romaji: 'Sayumi Sazushiro', color: '#f9b000', line: ['我的梦想','或许在不远的将来','就能实现...'], desc: '活力满满、开朗的高中二年级学生，结束乐队的鼓手。作为乐队核心成员，总是热心地照顾每位新加入的伙伴。她是Livehouse「STARRY」店长星歌的妹妹，对这家Livehouse怀有特殊的感情。' }, { name: '山田凉', romaji: 'YAMADA  RYO  ', instrument: 'Ba.', cv: '水野朔', cv_romaji: 'Saku Mizuno', color: '#99d6f1', line: ['分散各异的人类个性','汇聚在一起','便成为了一种音乐'], desc: '孤高冷静的高中二年级学生，结束乐队的贝斯手。虹夏的挚友。兴趣爱好脱离世俗，被人称作“怪人”反而会开心。虽然家境优渥，但在乐器上挥霍无度，总是陷入经济危机。偶尔会靠吃杂草充饥' }, { name: '喜多郁代', romaji: 'KITA  IKUYO  ', instrument: 'Gt.Vo.', cv: '长谷川育美', cv_romaji: 'Ikumi Hasegawa', color: '#ce2525', line: ['如果这么厉害的后藤同学','愿意教导我的话','或许就能提起干劲了…'], desc: '开朗受欢迎的高中一年级学生，结束乐队的主唱兼吉他手。天生擅长交际，即使初次见面也能毫不怯场地笑着搭话，是典型的现充。对凉抱有憧憬之情，偶尔会因这份感情过度热情。经常给伊地知星歌（イソスタ）发送照片。' } ];
const getCharacterImage = (name) => `/assets/images/立绘_${name}.png`; const getPostImage = (name) => `/assets/images/海报_${name}.png`; const activeItem = ref(characters[0]); const lastItem = ref(activeItem); const switchItem = (index) => { lastItem.value = activeItem; activeItem.value = characters[index]; };
</script>

<template>
    <div class="bg"></div>
    <div class="info-container">
        <div class="left-part" :style="{ '--highlight-color': activeItem.color, '--last-highlight-color': lastItem.color }"><Transition name="wait" mode="out-in"><img :key="activeItem.name" :src="getPostImage(activeItem.name)"></Transition><transition name="slip" mode="out-in"><div class="box-cover" :key="activeItem.name"></div></transition></div>
        <div class="right-part">
            <div class="character-line" :style="{ '--highlight-color': activeItem.color }"><p v-for="(e, index) in activeItem.line" :key="index">{{ e }}</p></div>
            <div class="character-head"><img :src="'/assets/images/大头_' + activeItem.name + '.webp'" /></div>
            <div class="instrument-content" :style="{ left: activeItem.name === '喜多郁代' ? '10%' : '60%' }">{{ activeItem.instrument }}</div>
            <div class="line-container"><div class="romaji-line" :style="{ '--highlight-color': activeItem.color }"><div class="scroll-wrapper"><div class="scroll-romaji" v-for="i in 2" :key="i"><span v-for="i in 16">{{ activeItem.romaji }}</span></div></div></div><span class="name-line" :style="{ '--highlight-color': activeItem.color }">{{ activeItem.name }}</span></div>
            <div class="character-desc" :style="{ '--highlight-color': activeItem.color }">
                <div><span class="cv-logo">CV</span><span class="cv-name">{{ activeItem.cv }}</span></div><span class="cv-instrument">{{ activeItem.instrument }}</span>
                <div class="cv-info"><div class="cv-romaji">{{ activeItem.romaji }} / CV {{ activeItem.cv_romaji }}</div></div>
                <div class="desc-content">{{ activeItem.desc }}</div>
            </div>
            <transition name="fade" appear><div :key="activeItem.name" class="character-image"><img :src="getCharacterImage(activeItem.name)" /></div></transition>
            <div class="logo"><img src="/assets/images/logo_movie.svg" /></div>
        </div>
        <div class="select-part"><ul><li v-for="(character, i) in characters" :key="character.name" @click="switchItem(i)" :class="{ 'selected': activeItem.name === character.name }" :style="{ '--highlight-color': character.color }"><img :src="getPostImage(character.name)" /></li></ul></div>
    </div>
</template>

<style scoped>
.bg { position: absolute; width: 100vw; height: 100vh; }
.info-container { width: 100%; height: 100%; position: absolute; overflow: hidden; display: flex; }
.left-part { position: relative; overflow: hidden; }
.left-part img { height: 100%; }
.box-cover { position: absolute; left: -100%; top: 0; height: 100%; width: 100%; background-color: var(--highlight-color); }
.select-part { position: absolute; bottom: 20px; left: 20px; z-index: 20; }
.select-part ul { display: flex; padding-left: 0; }
.select-part li { position: relative; list-style: none; width: 80px; height: 80px; align-self: flex-end; transition: all 0.3s; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.5); }
.select-part li.selected, .select-part li:hover { width: 100px; height: 100px; }
.select-part img { height: 100%; width: 100%; object-fit: cover; object-position: top; }
.select-part li::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; transition: all 0.3s; pointer-events: none; }
.select-part li.selected::before, .select-part li:hover::before { box-shadow: inset 0 0 0 5px var(--highlight-color); }
.right-part { display: flex; flex: 1; position: relative; }
.instrument-content { font-size: 20em; font-family: '黑体'; font-weight: bolder; color: #141414; text-shadow: 0 0 1px #fff; position: absolute; top: 5%; z-index: -3; }
.character-line { left: 5%; top: 15%; padding: 30px; font-size: 1.5em; position: absolute; display: flex; flex-direction: column; justify-items: center; align-items: flex-start; color: var(--highlight-color); font-family: '宋体'; transition: color 1.5s; }
.character-line::before, .character-line::after { content: ""; position: absolute; width: 55px; height: 55px; } .character-line::before { top: 0; left: 0; border-top: 2px solid var(--highlight-color); border-left: 2px solid var(--highlight-color); transition: border 1.5s; } .character-line::after { bottom: 0; right: 0; border-right: 2px solid var(--highlight-color); border-bottom: 2px solid var(--highlight-color); transition: border 1.5s; }
.line-container { position: absolute; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; width: 100%; height: 20vh; overflow: hidden; }
.romaji-line { font-size: 1.4em; white-space: nowrap; color: var(--highlight-color); font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; transition: color 1.5s; } .romaji-line:hover .scroll-wrapper { animation-play-state: paused; } .scroll-wrapper { display: inline-block; animation: scrollRomaji 25s linear infinite; } .scroll-romaji { display: inline-block; padding-right: 2em; }
@keyframes scrollRomaji { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
.name-line { display: flex; justify-content: flex-start; background-color: var(--highlight-color); color: #000; font-size: 3rem; z-index: -1; text-indent: 2em; font-family: 'Aa幻梦空间像素体'; transition: background-color 1.5s; }
.character-head { justify-self: flex-start; align-self: flex-start; z-index: 0; }
.character-head img { height: 50vh; margin-left: 10%; opacity: 0.25; }
.character-image { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); }
.character-image img { height: 90vh; transition: all 0.3s; }
.character-image img:hover { transform: scale(1.1); transition: all 0.3s ease; }
.character-desc { z-index: 2; position: absolute; top: 60%; left: 5%; align-items: center; width: 30%; display: flex; flex-wrap: wrap; justify-content: space-between; color: #fff; }
.cv-logo { background-color: var(--highlight-color); border-radius: 100%; padding: 0.4em; transition: background-color 1.5s; }
.cv-name { margin-left: 20px; font-size: 1.2em; } .cv-instrument { color: var(--highlight-color); transition: color 1.5s; } .cv-info { margin-top: 10px; color: #fff; font-size: 0.5em; border-bottom: 1px solid #fff; width: 100%; text-align: left; font-weight: bold; } .desc-content { margin-top: 15px; text-align: left; font-family: '宋体'; font-size: 1.2em; }
.logo { position: absolute; left: 60%; top: 70%; z-index: 5; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease, transform 0.5s ease; } .fade-enter-from { opacity: 0; transform: translateY(20px); } .fade-leave-to { opacity: 0; transform: translateY(-20px); }
.slip-enter-active, .slip-leave-active { transition: left 0.5s ease, background-color 0.4s ease; } .slip-leave-to { left: 0; } .slip-leave-from { left: -100%; background-color: var(--last-hightlight-color); } .slip-enter-from { left: 0; background-color: var(--highlight-color); } .slip-enter-to { left: 100%; }
.wait-enter-active, .wait-leave-active { transition: all 0.5s ease; }

/* --- [最终修复] --- */
@media (max-width: 768px) {
    .info-container {
        /* [关键] 给整个容器一个底部内边距，确保最下方的元素不会被裁切 */
        padding-bottom: 10px;
    }
    .left-part { display: none; }
    .right-part { width: 100%; }
    .character-image { 
        /* [关键] 将立绘置于最底层，防止遮挡文字和切换器 */
        z-index: 1;
    }
    .character-image img { height: 75vh; object-fit: contain; }
    .character-line, .instrument-content { display: none; }
    .line-container { top: auto; bottom: 85px; /* 向上移动，为切换器留出更多空间 */ transform: none; height: auto; z-index: 10; }
    .name-line { font-size: 1.8rem; text-indent: 1em; } /* 缩小字体 */
    .romaji-line { font-size: 0.9em; }
    .character-desc { top: auto; bottom: 155px; /* 向上移动 */ width: 90%; left: 5%; font-size: 0.8em; /* 缩小字体 */ background-color: rgba(0,0,0,0.6); padding: 8px; border-radius: 8px; z-index: 10; }
    .character-head, .logo { display: none; }
    .select-part {
        left: 0;
        bottom: 10px;
        width: 100%;
        background-color: transparent;
    }
    .select-part ul { justify-content: center; gap: 8px; }
    .select-part li { width: 55px; height: 55px; }
    .select-part li.selected, .select-part li:hover { width: 70px; height: 70px; }
}
</style>
