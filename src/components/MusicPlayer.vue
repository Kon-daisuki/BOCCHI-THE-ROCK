<!-- 
    @Author: Sudoria
    [最终功能版 - 基于您的代码精准添加自动连播]
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
    // 这里的 newIndex 是 1-based 的，所以我们用它来找数组中的下一首歌
    let nextSongIndexInArray = newIndex;
    if (nextSongIndexInArray >= musics.length) {
        nextSongIndexInArray = 0; // 循环到第一首
    }
    
    // 如果是上一首按钮触发的，newIndex 可能是 0 或负数
    if (newIndex < 0) {
        nextSongIndexInArray = musics.length - 1; // 循环到最后一首
    } else if (newIndex === 0) { // 兼容上一首按钮从第一首跳到最后一首
        nextSongIndexInArray = musics.length - 1;
    }

    activeItem.value = musics[nextSongIndexInArray];
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

// [移除] 移除了不够可靠的 watch(musicProgress, ...) 逻辑
// watch(musicProgress, () => { if (musicProgress.value >= 100) switchMusic(activeItem.value.index); });

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

onMounted(() => { 
    const el = document.querySelector('.player-select'); 
    if (el) {
        el.addEventListener('wheel', (e) => { 
            e.preventDefault(); 
            e.stopPropagation(); 
            el.scrollTop += e.deltaY * 0.5; 
        });
    }

    // [新增] 添加 'ended' 事件监听器，实现自动播放下一首
    player.value.addEventListener('ended', () => {
        // 调用我们现有的 switchMusic 函数，它已经包含了循环逻辑
        // activeItem.value.index 是 1-based 的，正好是下一首歌的索引
        switchMusic(activeItem.value.index);
    });
});
</script>

<template>
    <div class="bg">
        <div class="player-container">
            <div class="music-note note1">♪</div><div class="music-note note2">♫</div><div class="music-note note3">♩</div><div class="music-note note4">♬</div><div class="music-note note5">♪</div><div class="music-note note6">♫</div><div class="music-note note7">♩</div><div class="music-note note8">♬</div>
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
.bg { position: relative; width: 100%; height: 100%; overflow: hidden; display: flex; align-items: center; justify-content: center; background: linear-gradient(90deg, #ff86be 0%, #ffd859 25%, #5ad0ff 50%, #ff5656 75%); background-size: 300% 300%; animation: gradient 15s ease infinite; animation-play-state: var(--animation-state, paused); }
.player-container { position: relative; display: flex; width: 80%; min-width: 900px; max-width: 1200px; height: 80vh; min-height: 600px; background-color: rgba(255, 255, 255, 0.5); border-right: 1px solid rgba(170, 170, 170, 0.3); border-radius: 16px; overflow: hidden; box-shadow: 0 5px 8px rgba(81, 81, 81, 0.5); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
.music-note { position: absolute; color: rgba(255, 255, 255, 0.7); font-size: 60px; opacity: 0; animation: floatNote 8s linear infinite; pointer-events: none; user-select: none; z-index: 0; }
.note1 { top: 20%; left: 40%; animation-delay: 1s; } .note2 { top: 70%; left: 45%; animation-delay: 1s; } .note3 { top: 40%; left: 85%; animation-delay: 1s; } .note4 { top: 80%; left: 90%; animation-delay: 1s; } .note5 { top: 70%; left: 50%; animation-delay: 1s; } .note6 { top: 20%; left: 75%; animation-delay: 1s; } .note7 { top: 60%; left: 38%; animation-delay: 1s; } .note8 { top: 80%; left: 60%; animation-delay: 1s; }
@keyframes floatNote { 0% { transform: translateY(0) rotate(0deg); opacity: 0; } 10% { opacity: 0.7; } 90% { opacity: 0.7; } 100% { transform: translateY(-100px) rotate(360deg); opacity: 0; } }
.bg .music-note, .player-container .music-note { animation-play-state: var(--animation-state, paused); }
@keyframes gradient { 0% { background-position: 0% 0%; } 50% { background-position: 100% 100%; } 100% { background-position: 0% 0%; } }
.player-select { width: 35%; background-color: rgba(255, 255, 255, 0.5); overflow-y: auto; border-right: 1px solid #e0e0e0; scrollbar-width: none; z-index: 1; }
.player-select::-webkit-scrollbar { width: 6px; }
.player-select ul { padding: 0; margin: 0; display: flex; flex-direction: column; }
.player-select ul li { list-style: none; padding: 5px 16px; border-bottom: 1px solid #e0e0e0; cursor: pointer; transition: all 0.3s ease; overflow: hidden; }
.player-select ul li:hover { background-color: #f0f0f0; }
.player-select ul li.active { background-color: #e8e8e8; border-right: 4px solid #ec407a; }
.music-item { height: 60px; display: flex; gap: 12px; width: 100%; min-width: 0; }
.player-select img { height: 95%; border-radius: 8px; object-fit: cover; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
.music-info { display: flex; flex-direction: column; justify-content: center; height: 100%; overflow: hidden; }
.music-title { font-size: 16px; color: #333; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.2; text-align: left; }
.music-singer { font-size: 13px; color: #777; text-align: left; line-height: 1.2; }
.player { width: 65%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 30px; box-sizing: border-box; backdrop-filter: blur(2rem); box-shadow: 2px 2px 5px #666; z-index: 1; }
.now-playing { display: flex; flex-direction: column; align-items: center; height: 100%; justify-content: space-between; }
.player-bg { width: 280px; height: 280px; aspect-ratio: 1/1; border-radius: 50%; background-color: #fff; position: relative; box-shadow: 0 0 20px rgba(0, 0, 0, 0.3); animation: albums_rotate 15s infinite linear; backdrop-filter: blur(3px); animation-play-state: var(--animation-state, paused); }
.album-image { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 200px; height: 200px; border-radius: 50%; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); transition: all 0.4s ease; }
.music-info { text-align: center; margin-bottom: 30px; width: 100%; }
.music-info h2 { margin: 0 0 8px 0; font-size: 24px; color: #333; font-weight: 600; }
.music-info p { margin: 0; font-size: 16px; color: #777; }
.player-controls { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 20px; }
.volume-control { display: flex; align-items: center; gap: 12px; width: 60%; justify-content: center; }
.volume-control img { width: 20px; opacity: 0.7; transition: opacity 0.2s; }
.volume-progress-box { flex-grow: 1; height: 4px; background-color: rgba(0, 0, 0, 0.1); border-radius: 2px; position: relative; cursor: pointer; }
.volume-progress-fill { height: 100%; background-color: #ec407a; border-radius: 2px; width: var(--volume-progress); }
.control-panel { display: flex; align-items: center; gap: 30px; }
.control-panel img { width: 24px; opacity: 0.7; cursor: pointer; transition: opacity 0.2s; }
.music-progress-container { width: 100%; display: flex; align-items: center; gap: 12px; }
.current-time, .duration-time { font-size: 12px; color: #555; width: 40px; }
.music-progress-box { flex-grow: 1; height: 4px; background-color: rgba(0, 0, 0, 0.1); border-radius: 2px; position: relative; cursor: pointer; }
.music-progress-fill { height: 100%; background: linear-gradient(90deg, #ff8a00, #ff5252); border-radius: 2px; width: var(--music-progress); }
.btn-bar { display: flex; align-items: center; gap: 30px; }
.btn-bar div { cursor: pointer; }
.btn-bar img { width: 32px; transition: transform 0.2s; }
.btn-bar div:nth-child(2) img { width: 50px; }
.btn-bar div:hover img { transform: scale(1.1); }
@keyframes albums_rotate { from { transform: rotate(0); } to { transform: rotate(360deg); } }
.mv-modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.7); display: flex; justify-content: center; align-items: center; z-index: 2000; }
.mv-modal-content { position: relative; width: 90vw; max-width: 800px; aspect-ratio: 16/9; background-color: black; }
.mv-modal-content iframe { width: 100%; height: 100%; }
.close-mv-btn { position: absolute; top: -30px; right: -10px; background: none; border: none; font-size: 30px; color: white; cursor: pointer; }
@media (max-width: 768px) {
    .player-container { flex-direction: column; width: 100%; height: 100%; min-width: unset; min-height: unset; border-radius: 0; }
    .player-select { width: 100%; height: 30%; flex-shrink: 0; }
    .player { width: 100%; height: 70%; padding: 15px; }
    .now-playing { justify-content: space-around; }
    .player-bg { width: 180px; height: 180px; }
    .album-image { width: 120px; height: 120px; }
    .music-info h2 { font-size: 18px; }
    .music-info p { font-size: 14px; }
    .close-mv-btn { top: 0; right: 5px; transform: translateY(-100%); background-color: rgba(0,0,0,0.5); border-radius: 50%; width: 25px; height: 25px; line-height: 25px; text-align: center; padding: 0; font-size: 20px; }
}
</style>
