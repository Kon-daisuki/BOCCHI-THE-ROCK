<!-- 
    @Author: Sudoria
    [最终修复版 - 修复顶部黑框]
-->

<script setup>
// Script部分无需修改
import { onMounted, ref, watch } from 'vue';
const musics = [ { index: 1, name: 'Distortion!!', duration: '03:23', image: '/assets/albums/Distortion!!.jpg', src: '/assets/musics/Distortion!!.mp3', singer: '结束バンド' , bvid:'BV1ng411h71y'}, { index: 2, name: 'なにが悪い', duration: '03:47', image: '/assets/albums/なにが悪い.jpg', src: '/assets/musics/なにが悪い.mp3', singer: '结束バンド' , bvid:''}, { index: 3, name: '転がる岩、君に朝が降る', duration: '04:31', image: '/assets/albums/転がる岩、君に朝が降る.jpg', src: '/assets/musics/転がる岩、君に朝が降る.mp3', singer: '结束バンド' , bvid:''}, { index: 4, name: '星座になれたら', duration: '04:18', image: '/assets/albums/星座になれたら.jpg', src: '/assets/musics/星座になれたら.mp3', singer: '结束バンド' , bvid:''}, { index: 5, name: '青春コンプレックス', duration: '03:23', image: '/assets/albums/結束バンド.jpg', src: '/assets/musics/青春コンプレックス.mp3', singer: '结束バンド' , bvid:'BV1HT411N7FP'}, { index: 6, name: 'あのバンド', duration: '03:33', image: '/assets/albums/あのバンド.jpg', src: '/assets/musics/あのバンド.mp3', singer: '结束バンド' , bvid:''}, { index: 7, name: 'ギターと孤独と蒼い惑星', duration: '03:48', image: '/assets/albums/ギターと孤独と蒼い惑星.jpg', src: '/assets/musics/ギターと孤独と蒼い惑星.mp3', singer: '结束バンド', bvid:'' }, { index: 8, name: 'milky way', duration: '03:32', image: '/assets/albums/We will.png', src: '/assets/musics/milky way.mp3', singer: '结束バンド' , bvid:''}, { index: 9, name: 'カラカラ', duration: '04:25', image: '/assets/albums/カラカラ.jpg', src: '/assets/musics/カラカラ.mp3', singer: '结束バンド' , bvid:''}, { index: 10, name: '忘れてやらない', duration: '03:43', image: '/assets/albums/ぼっち・ざ・ろっく! vol.6 特典CD.jpg', src: '/assets/musics/忘れてやらない.mp3', singer: '结束バンド', bvid:'' }, { index: 11, name: '光の中へ', duration: '04:18', image: '/assets/albums/光の中へ.jpg', src: '/assets/musics/光の中へ.mp3', singer: '结束バンド' , bvid:''}, { index: 12, name: 'ひとりぼっち東京', duration: '03:52', image: '/assets/albums/ひとりぼっち東京.jpg', src: '/assets/musics/ひとりぼっち東京.mp3', singer: '结束バンド' , bvid:''}, { index: 13, name: '小さな海', duration: '03:43', image: '/assets/albums/結束バンド.jpg', src: '/assets/musics/カラカラ.mp3', singer: '结束バンド' , bvid:''}, ];
const playerIcons = ["/assets/images/icon_play.png","/assets/images/icon_pause.png"]; const playStatu = ref(0); const activeItem = ref(musics[0]); const musicProgress = ref(0); const volumeProgress = ref(20); const player = ref(new Audio()); player.value.src = activeItem.value.src; player.value.volume = volumeProgress.value / 100; const switchMusic = (newIndex) => { if (newIndex >= musics.length) newIndex = 0; else if (newIndex < 0) newIndex = musics.length - 1; activeItem.value = musics[newIndex]; playStatu.value = 1; musicProgress.value = 0; updateProgress(); }; const updateProgress = () => { if (player.value.duration) musicProgress.value = (player.value.currentTime / player.value.duration) * 100; requestAnimationFrame(updateProgress); }; watch(activeItem, (newItem) => { player.value.src = newItem.src; player.value.currentTime = 0; if (playStatu.value === 1) player.value.play(); }); watch(musicProgress, () => { if (musicProgress.value >= 100) switchMusic(activeItem.value.index); }); watch(volumeProgress, (newVolume) => { player.value.volume = newVolume / 100; }); watch(playStatu, (newVal) => { document.documentElement.style.setProperty('--animation-state', newVal === 1 ? 'running' : 'paused'); }); const switchStatu = () => { if (playStatu.value === 0) { player.value.play(); playStatu.value = 1; updateProgress(); } else { player.value.pause(); playStatu.value = 0; } }; const onVolumeProgressClicked = (e) => { const progressBar = e.currentTarget; const clickPosition = e.offsetX; const progressBarWidth = progressBar.clientWidth; const percentage = (clickPosition / progressBarWidth) * 100; volumeProgress.value = percentage; player.value.volume = percentage / 100; } const onProgressClicked = (e) => { const progressBar = e.currentTarget; const clickPosition = e.offsetX; const progressBarWidth = progressBar.clientWidth; const percentage = (clickPosition / progressBarWidth) * 100; musicProgress.value = percentage; player.value.currentTime = (percentage / 100) * player.value.duration; updateProgress(); } const secToMMSS = (sec) => { sec = sec | 0; let m = sec / 60 | 0; let s = sec % 60 | 0; m = m.toString().padStart(2, '0'); s = s.toString().padStart(2, '0'); return m + ':' + s } const volumeHandle = (num)=>{ if(player.value.volume+num/100 > 1){ player.value.volume = 1; volumeProgress.value=100; return; } else if(player.value.volume+num/100 < 0){ player.value.volume = 0; volumeProgress.value=0; return; } player.value.volume+=(num/100); volumeProgress.value+=num; }
onMounted(() => { const yourElement = document.querySelector('.player-select'); if (!yourElement) return; yourElement.addEventListener('wheel', (e) => { e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation(); yourElement.scrollTop += e.deltaY * 0.5; }); });
</script>

<template>
    <div class="bg">
        <div class="music-note note1">♪</div><div class="music-note note2">♫</div><div class="music-note note3">♩</div><div class="music-note note4">♬</div><div class="music-note note5">♪</div><div class="music-note note6">♫</div><div class="music-note note7">♩</div><div class="music-note note8">♬</div>
        <div class="player-container">
            <div class="player-select">
                <ul><li v-for="(music, index) in musics" :key="index" :class="{ 'active': activeItem.name === music.name }" @click="activeItem = music; updateProgress();"><div class="music-item"><img :src="music.image" :alt="music.name" /><div class="music-info"><span class="music-title">{{ music.name }}</span><span class="music-singer">{{ music.singer }}</span></div></div></li></ul>
            </div>
            <div class="player">
                <div class="now-playing">
                    <div class="player-bg" :style="{ 'animation-play-state': playStatu === 0 ? 'paused' : 'running' }"><img :src="activeItem.image" :alt="activeItem.name" class="album-image" /></div>
                    <div class="music-info"><h2>{{ activeItem.name }}</h2><p>{{ activeItem.singer }}</p></div>
                    <div class="player-controls">
                        <div class="volume-control"><span class="icon-defuse" @click="volumeHandle(-10)"><img src="/assets/images/icon_defuse.png" /></span><div class="volume-progress-box" :style="{ '--volume-progress': volumeProgress + '%' }" @click="onVolumeProgressClicked($event)"><div class="volume-progress-fill"></div></div><span class="icon-add" @click="volumeHandle(10)"><img src="/assets/images/icon_add.png" /></span></div>
                        <div class="control-panel"><span><img src="/assets/images/icon_like.png" /></span><span><img src="/assets/images/icon_mode.png" /></span><span class="mv-icon"><img src="/assets/images/icon_mv.png" /><span class="tooltip"><iframe :src="'//player.bilibili.com/player.html?isOutside=true&aid=516452760&bvid='+activeItem.bvid+'&cid=858089909&p=1'" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe></span></span></div>
                        <div class="music-progress-container"><span class="current-time">{{ secToMMSS(player.currentTime) }}</span><div class="music-progress-box" :style="{ '--music-progress': musicProgress + '%' }" @click="onProgressClicked($event)"><div class="music-progress-fill"></div></div><span class="duration-time">{{ activeItem.duration }}</span></div>
                        <div class="btn-bar"><div @click="switchMusic(activeItem.index - 2)"><img src="/assets/images/icon_last.png" /></div><div><img @click="switchStatu()" :src="playerIcons[playStatu]" /></div><div @click="switchMusic(activeItem.index)"><img src="/assets/images/icon_next.png" /></div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* --- [最终修复] --- */
.bg {
    position: absolute; /* 改为 absolute */
    top: 0; left: 0; /* 确保从左上角开始 */
    width: 100%; height: 100%; /* 占满父容器 */
    overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(90deg, #ff86be 0%, #ffd859 25%, #5ad0ff 50%, #ff5656 75%);
    background-size: 300% 300%;
    animation: gradient 15s ease infinite;
    animation-play-state: var(--animation-state, paused);
}
.player-container { display: flex; width: 80%; min-width: 900px; max-width: 1200px; height: 80vh; min-height: 600px; background-color: rgba(255, 255, 255, 0.5); border-right: 1px solid rgba(170, 170, 170, 0.3); border-radius: 16px; overflow: hidden; box-shadow: 0 5px 8px rgba(81, 81, 81, 0.5); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
/* --- 其他桌面端样式保持不变 --- */
.music-note { position: absolute; color: rgba(255, 255, 255, 0.7); font-size: 60px; opacity: 0; animation: floatNote 8s linear infinite; pointer-events: none; user-select: none; z-index: 0; }
.note1 { top: 20%; left: 10%; animation-delay: 1s; } .note2 { top: 70%; left: 15%; animation-delay: 1s; } .note3 { top: 40%; left: 85%; animation-delay: 1s; } .note4 { top: 80%; left: 90%; animation-delay: 1s; } .note5 { top: 70%; left: 20%; animation-delay: 1s; } .note6 { top: 20%; left: 55%; animation-delay: 1s; } .note7 { top: 60%; left: 2%; animation-delay: 1s; } .note8 { top: 80%; left: 30%; animation-delay: 1s; }
@keyframes floatNote { 0% { transform: translateY(0) rotate(0deg); opacity: 0; } 10% { opacity: 0.7; } 90% { opacity: 0.7; } 100% { transform: translateY(-100px) rotate(360deg); opacity: 0; } }
.bg .music-note { animation-play-state: var(--animation-state, paused); }
@keyframes gradient { 0% { background-position: 0% 0%; } 50% { background-position: 100% 100%; } 100% { background-position: 0% 0%; } }
.player-select { width: 35%; background-color: rgba(255, 255, 255, 0.5); overflow-y: auto; border-right: 1px solid #e0e0e0; scrollbar-width: none; }
.player-select::-webkit-scrollbar { width: 6px; background-color: transparent; }
.player-select::-webkit-scrollbar-thumb { background-color: rgba(0, 0, 0, 0.3); border-radius: 3px; border: none; }
.player-select::-webkit-scrollbar-track { background-color: transparent; margin: 8px 0; }
.player-select ul { padding: 0; margin: 0; display: flex; flex-direction: column; }
.player-select ul li { list-style: none; padding: 5px 16px; border-bottom: 1px solid #e0e0e0; cursor: pointer; transition: all 0.3s ease; overflow: hidden; }
.player-select ul li:hover { background-color: #f0f0f0; }
.player-select ul li.active { background-color: #e8e8e8; border-right: 4px solid #ec407a; }
.music-item { height: 60px; display: flex; gap: 12px; width: 100%; min-width: 0; }
.player-select img { height: 95%; border-radius: 8px; object-fit: cover; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
.music-info { display: flex; flex-direction: column; justify-content: center; height: 100%; overflow: hidden; }
.music-title { font-size: 16px; color: #333; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.2; text-align: left; }
.music-singer { font-size: 13px; color: #777; text-align: left; line-height: 1.2; }
.player { width: 65%; display: flex; flex-direction: column; padding: 30px; box-sizing: border-box; backdrop-filter: blur(2rem); box-shadow: 2px 2px 5px #666; }
.now-playing { display: flex; flex-direction: column; align-items: center; height: 100%; justify-content: space-between; }
.player-bg { width: 280px; height: 280px; aspect-ratio: 1/1; border-radius: 50%; background-color: #fff; position: relative; box-shadow: 0 0 20px rgba(0, 0, 0, 0.3); animation: albums_rotate 15s infinite linear; backdrop-filter: blur(3px); }
.album-image { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 200px; height: 200px; border-radius: 50%; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); transition: all 0.4s ease; }
.album-image:hover { width: 220px; height: 220px; animation: shiny 5s infinite linear; box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); transition: all 0.4s ease, box-shadow 0.5s ease; }
@keyframes shiny { 0% { box-shadow: 0 0 10px rgba(255, 113, 201, 0.7); } 25% { box-shadow: 0 0 24px #ff71c9; } 50% { box-shadow: 0 0 34px #ffd261; } 75% { box-shadow: 0 0 44px #47d7ff; } 100% { box-shadow: 0 0 10px rgba(255, 101, 101, 0.7); } }
.icon-add, .icon-defuse { cursor: pointer; }
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
.mv-icon { position: relative; }
.tooltip { visibility: hidden; width: 320px; height: 180px; background-color: black; color: #fff; text-align: center; border-radius: 6px; padding: 5px 0; position: absolute; z-index: 1; bottom: 150%; left: 50%; margin-left: -160px; opacity: 0; transition: opacity 0.3s; }
.mv-icon:hover .tooltip { visibility: visible; opacity: 1; }
.tooltip iframe { width: 100%; height: 100%; }
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
@media (max-width: 768px) {
    .player-container { flex-direction: column; width: 100%; height: 100%; min-width: unset; min-height: unset; border-radius: 0; }
    .player-select { width: 100%; height: 40%; flex-shrink: 0; } /* 稍微增加列表高度 */
    .player { width: 100%; height: 60%; padding: 15px; }
    .now-playing { justify-content: space-around; }
    .player-bg { width: 150px; height: 150px; }
    .album-image { width: 100px; height: 100px; }
    .album-image:hover { width: 100px; height: 100px; }
    .music-info { margin-bottom: 10px; } .music-info h2 { font-size: 18px; } .music-info p { font-size: 14px; }
    .player-controls { gap: 10px; } .volume-control { width: 80%; } .control-panel { gap: 25px; } .control-panel img { width: 20px; }
    .btn-bar img { width: 28px; } .btn-bar div:nth-child(2) img { width: 45px; }
    .tooltip { display: none; }
}
</style>
