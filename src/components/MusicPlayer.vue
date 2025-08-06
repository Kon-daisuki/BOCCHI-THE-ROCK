<!-- 
    @Author: Sudoria
    [最终完美交付版 - 根治布局问题]
-->
<script setup>
import { onMounted, ref, watch } from 'vue';

const musics = [
    { index: 1, name: 'Distortion!!', duration: '03:23', image: '/assets/albums/Distortion!!.jpg', src: '/assets/musics/Distortion!!.mp3', singer: '结束バンド' , bvid:'BV1ng411h71y' },
    { index: 2, name: 'milky way', duration: '03:32', image: '/assets/albums/We will.png', src: '/assets/musics/milky way.mp3', singer: '结束バンド' , bvid:'' },
    { index: 3, name: 'あのバンド', duration: '03:33', image: '/assets/albums/あのバンド.jpg', src: '/assets/musics/あのバンド.mp3', singer: '结束バンド' , bvid:'' },
    { index: 4, name: 'なにが悪い', duration: '03:47', image: '/assets/albums/なにが悪い.jpg', src: '/assets/musics/なにが悪い.mp3', singer: '结束バンド' , bvid:'' },
    { index: 5, name: 'ひとりぼっち東京', duration: '03:52', image: '/assets/albums/ひとりぼっち東京.jpg', src: '/assets/musics/ひとりぼっち東京.mp3', singer: '结束バンド' , bvid:'' },
    { index: 6, name: 'カラカラ', duration: '04:25', image: '/assets/albums/カラカラ.jpg', src: '/assets/musics/カラカラ.mp3', singer: '结束バンド' , bvid:'' },
    { index: 7, name: 'ギターと孤独と蒼い惑星', duration: '03:48', image: '/assets/albums/ギターと孤独と蒼い惑星.jpg', src: '/assets/musics/ギターと孤独と蒼い惑星.mp3', singer: '结束バンド', bvid:'' },
    { index: 8, name: '光の中へ', duration: '04:18', image: '/assets/albums/光の中へ.jpg', src: '/assets/musics/光の中へ.mp3', singer: '结束バンド' , bvid:'' },
    { index: 9, name: '小さな海', duration: '03:43', image: '/assets/albums/結束バンド.jpg', src: '/assets/musics/小さな海.mp3', singer: '结束バンド' , bvid:'' },
    { index: 10, name: '忘れてやらない', duration: '03:43', image: '/assets/albums/忘れてやらない.jpg', src: '/assets/musics/忘れてやらない.mp3', singer: '结束バンド', bvid:'' },
    { index: 11, name: '星座になれたら', duration: '04:18', image: '/assets/albums/星座になれたら.jpg', src: '/assets/musics/星座になれたら.mp3', singer: '结束バンド' , bvid:'' },
    { index: 12, name: '転がる岩、君に朝が降る', duration: '04:31', image: '/assets/albums/転がる岩、君に朝が降る.jpg', src: '/assets/musics/転がる岩、君に朝が降る.mp3', singer: '结束バンド' , bvid:'' },
    { index: 13, name: '青春コンプレックス', duration: '03:23', image: '/assets/albums/結束バンド.jpg', src: '/assets/musics/青春コンプレックス.mp3', singer: '结束バンド' , bvid:'BV1HT411N7FP' },
];

const playerIcons = ["/assets/images/icon_play.png","/assets/images/icon_pause.png"];
const playStatu = ref(0);
const activeItem = ref(musics[0]);
const musicProgress = ref(0);
const volumeProgress = ref(20);
const player = ref(new Audio());
const isMvVisible = ref(false);

player.value.src = activeItem.value.src;
player.value.volume = volumeProgress.value / 100;

const switchMusic = (newIndex) => {
    if (newIndex >= musics.length) newIndex = 0;
    else if (newIndex < 0) newIndex = musics.length - 1;
    activeItem.value = musics[newIndex];
    playStatu.value = 1;
    musicProgress.value = 0;
};

const updateProgress = () => {
    if (player.value.duration) { musicProgress.value = (player.value.currentTime / player.value.duration) * 100; }
    if (playStatu.value === 1) requestAnimationFrame(updateProgress);
};

watch(activeItem, (newItem) => {
    player.value.src = newItem.src;
    player.value.currentTime = 0;
    if (playStatu.value === 1) { player.value.play(); requestAnimationFrame(updateProgress); }
});

watch(musicProgress, () => { if (musicProgress.value >= 100) switchMusic(activeItem.value.index); });
watch(volumeProgress, (newVolume) => { player.value.volume = newVolume / 100; });
watch(playStatu, (newVal) => { document.documentElement.style.setProperty('--animation-state', newVal === 1 ? 'running' : 'paused'); });

const switchStatu = () => {
    if (playStatu.value === 0) { player.value.play(); playStatu.value = 1; requestAnimationFrame(updateProgress); } 
    else { player.value.pause(); playStatu.value = 0; }
};

const onVolumeProgressClicked = (e) => { const p=e.currentTarget; const c=e.offsetX; const w=p.clientWidth; const pct=(c/w)*100; volumeProgress.value=pct; player.value.volume=pct/100; }
const onProgressClicked = (e) => { const p=e.currentTarget; const c=e.offsetX; const w=p.clientWidth; const pct=(c/w)*100; musicProgress.value=pct; player.value.currentTime=(pct/100)*player.value.duration; }
const secToMMSS = (sec) => { sec=sec|0; let m=(sec/60|0).toString().padStart(2, '0'); let s=(sec%60|0).toString().padStart(2, '0'); return m+':'+s }
const volumeHandle = (num)=>{ let newVol = player.value.volume+num/100; newVol = Math.max(0, Math.min(1, newVol)); player.value.volume = newVol; volumeProgress.value = newVol*100; }

onMounted(() => { const el = document.querySelector('.player-select'); if (!el) return; el.addEventListener('wheel', (e) => { e.preventDefault(); e.stopPropagation(); el.scrollTop += e.deltaY * 0.5; }); });
</script>

<template>
    <div class="bg">
        <div class="music-note note1">♪</div><div class="music-note note2">♫</div><div class="music-note note3">♩</div><div class="music-note note4">♬</div><div class="music-note note5">♪</div><div class="music-note note6">♫</div><div class="music-note note7">♩</div><div class="music-note note8">♬</div>
        <div class="player-container">
            <div class="player-select">
                <ul><li v-for="(music, index) in musics" :key="index" :class="{ 'active': activeItem.name === music.name }" @click="activeItem = music"><div class="music-item"><img :src="music.image" :alt="music.name" /><div class="music-info"><span class="music-title">{{ music.name }}</span><span class="music-singer">{{ music.singer }}</span></div></div></li></ul>
            </div>
            <div class="player">
                <div class="now-playing">
                    <div class="player-bg" :style="{ 'animation-play-state': playStatu === 0 ? 'paused' : 'running' }"><img :src="activeItem.image" :alt="activeItem.name" class="album-image" /></div>
                    <div class="music-info"><h2>{{ activeItem.name }}</h2><p>{{ activeItem.singer }}</p></div>
                    <div class="player-controls">
                        <div class="volume-control"><span class="icon-defuse" @click="volumeHandle(-10)"><img src="/assets/images/icon_defuse.png" /></span><div class="volume-progress-box" :style="{ '--volume-progress': volumeProgress + '%' }" @click="onVolumeProgressClicked($event)"><div class="volume-progress-fill"></div></div><span class="icon-add" @click="volumeHandle(10)"><img src="/assets/images/icon_add.png" /></span></div>
                        <div class="control-panel"><span><img src="/assets/images/icon_like.png" /></span><span><img src="/assets/images/icon_mode.png" /></span><span class="mv-icon" @click="isMvVisible = true"><img src="/assets/images/icon_mv.png" /></span></div>
                        <div class="music-progress-container"><span class="current-time">{{ secToMMSS(player.currentTime) }}</span><div class="music-progress-box" :style="{ '--music-progress': musicProgress + '%' }" @click="onProgressClicked($event)"><div class="music-progress-fill"></div></div><span class="duration-time">{{ activeItem.duration }}</span></div>
                        <div class="btn-bar"><div @click="switchMusic(activeItem.index - 2)"><img src="/assets/images/icon_last.png" /></div><div><img @click="switchStatu()" :src="playerIcons[playStatu]" /></div><div @click="switchMusic(activeItem.index)"><img src="/assets/images/icon_next.png" /></div></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isMvVisible" class="mv-modal-overlay" @click="isMvVisible = false">
            <div class="mv-modal-content" @click.stop>
                <button class="close-mv-btn" @click="isMvVisible = false">&times;</button>
                <iframe :src="'//player.bilibili.com/player.html?isOutside=true&aid=516452760&bvid='+activeItem.bvid+'&cid=858089909&p=1&autoplay=1'" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* --- [最终完美收官] --- */
.bg { 
    /* 1. 移除 position: absolute，让它成为一个正常的块级元素 */
    width: 100%; 
    height: 100%; 
    overflow: hidden; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    background: linear-gradient(90deg, #ff86be 0%, #ffd859 25%, #5ad0ff 50%, #ff5656 75%); 
    background-size: 300% 300%; 
    animation: gradient 15s ease infinite; 
    animation-play-state: var(--animation-state, paused); 
    position: relative; /* 2. 添加 relative，作为音符定位的基准 */
}
.player-container { display: flex; width: 80%; min-width: 900px; max-width: 1200px; height: 80vh; min-height: 600px; background-color: rgba(255, 255, 255, 0.5); border-right: 1px solid rgba(170, 170, 170, 0.3); border-radius: 16px; overflow: hidden; box-shadow: 0 5px 8px rgba(81, 81, 81, 0.5); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
.player-select { width: 35%; background-color: rgba(255, 255, 255, 0.5); overflow-y: auto; border-right: 1px solid #e0e0e0; scrollbar
