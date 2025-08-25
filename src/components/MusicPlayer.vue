<script setup>
import { onMounted, ref, watch, computed } from 'vue';

// 您的后端API地址
const API_BASE_URL = 'https://login.bocchi.us.kg';

const currentUser = ref(null);
const likedSongs = ref(new Set());

// --- [核心修改] 歌单内容更新 ---
const playlists = {
  '結束バンド': [
    // 按照官方专辑顺序排列
    { index: 1, name: '青春コンプレックス', duration: '03:23', image: '/assets/albums/結束バンド.jpg', src: '/assets/musics/青春コンプレックス.mp3', singer: '结束バンド' , bvid:'BV1HT411N7FP' },
    { index: 2, name: 'ひとりぼっち東京', duration: '03:52', image: '/assets/albums/ひとりぼっち東京.jpg', src: '/assets/musics/ひとりぼっち東京.mp3', singer: '结束バンド' , bvid:'BV1V84y1v766' },
    { index: 3, name: 'Distortion!!', duration: '03:23', image: '/assets/albums/Distortion!!.jpg', src: '/assets/musics/Distortion!!.mp3', singer: '结束バンド' , bvid:'BV1ng411h71y' },
    { index: 4, name: 'ひみつ基地', duration: '03:52', image: '/assets/albums/ひみつ基地 - 結束バンド.jpg', src: '/assets/musics/ひみつ基地 - 結束バンド.mp3', singer: '结束バンド', bvid: 'BV14wkzYPEHG' },
    { index: 5, name: 'ギターと孤独と蒼い惑星', duration: '03:48', image: '/assets/albums/ギターと孤独と蒼い惑星.jpg', src: '/assets/musics/ギターと孤独と蒼い惑星.mp3', singer: '结束バンド', bvid:'BV1sv4y1U7j6' },
    { index: 6, name: 'ラブソングが歌えない', duration: '03:09', image: '/assets/albums/ラブソングが歌えない - 結束バンド.jpg', src: '/assets/musics/ラブソングが歌えない - 結束バンド.mp3', singer: '结束バンド', bvid: 'BV1o24y1U7gR' },
    { index: 7, name: 'あのバンド', duration: '03:33', image: '/assets/albums/あのバンド.jpg', src: '/assets/musics/あのバンド.mp3', singer: '结束バンド' , bvid:'BV1v24y1C735' },
    { index: 8, name: 'カラカラ', duration: '04:25', image: '/assets/albums/カラカラ.jpg', src: '/assets/musics/カラカラ.mp3', singer: '结束バンド' , bvid:'BV1ae4y127K5' },
    { index: 9, name: '小さな海', duration: '03:43', image: '/assets/albums/結束バンド.jpg', src: '/assets/musics/小さな海.mp3', singer: '结束バンド' , bvid:'BV1UG4y1J7mg' },
    { index: 10, name: 'なにが悪い', duration: '03:47', image: '/assets/albums/なにが悪い.jpg', src: '/assets/musics/なにが悪い.mp3', singer: '结束バンド' , bvid:'BV1jK411o7Q5' },
    { index: 11, name: '忘れてやらない', duration: '03:43', image: '/assets/albums/忘れてやらない.jpg', src: '/assets/musics/忘れてやらない.mp3', singer: '结束バンド', bvid:'BV1pM41117Yr' },
    { index: 12, name: '星座になれたら', duration: '04:18', image: '/assets/albums/星座になれたら.jpg', src: '/assets/musics/星座になれたら.mp3', singer: '结束バンド' , bvid:'BV1u8411H7yA' },
    { index: 13, name: 'フラッシュバッカー', duration: '04:35', image: '/assets/albums/フラッシュバッカー - 結束バンド.jpg', src: '/assets/musics/フラッシュバッカー - 結束バンド.mp3', singer: '结束バンド', bvid: 'BV15v4y1B7ZQ' },
    { index: 14, name: '転がる岩、君に朝が降る', duration: '04:31', image: '/assets/albums/転がる岩、君に朝が降る.jpg', src: '/assets/musics/転がる岩、君に朝が降る.mp3', singer: '结束バンド' , bvid:'BV1nV4y1w74h' },
    { index: 15, name: 'milky way', duration: '03:32', image: '/assets/albums/We will.png', src: '/assets/musics/milky way.mp3', singer: '结束バンド' , bvid:'BV1mVpGewEfz' },
    { index: 16, name: '光の中へ', duration: '04:18', image: '/assets/albums/光の中へ.jpg', src: '/assets/musics/光の中へ.mp3', singer: '结束バンド' , bvid:'BV1ik4y1s7Sf' },
    { index: 17, name: '月並みに輝け', duration: '04:07', image: '/assets/albums/月並みに輝け - 結束バンド.jpg', src: '/assets/musics/月並みに輝け - 結束バンド.mp3', singer: '结束バンド' , bvid:'BV1wb421v7Mb' },
    { index: 18, name: 'ドッペルゲンガー', duration: '03:39', image: '/assets/albums/ドッペルゲンガー - 結束バンド.jpg', src: '/assets/musics/ドッペルゲンガー - 結束バンド.mp3', singer: '结束バンド' , bvid:'BV1hS411w773' },
    { index: 19, name: 'Re；Re；', duration: '05:07', image: '/assets/albums/Re；Re； - 結束バンド.jpg', src: '/assets/musics/Re；Re； - 結束バンド.mp3', singer: '结束バンド' , bvid:'BV1YDVYzeE39' },
    { index: 20, name: '僕と三原色', duration: '03:39', image: '/assets/albums/僕と三原色 - 結束バンド.jpg', src: '/assets/musics/僕と三原色 - 結束バンド.mp3', singer: '结束バンド' , bvid:'BV1xn4y1f7GJ' },
  ],
  'バンド': [
    { index: 1, name: 'Connected Sky', duration: '02:06', image: '/assets/albums/Connected Sky.jpg', src: '/assets/musics/Connected Sky.mp3', singer: 'KARUT', bvid:'BV1X64y1A71s' },
    { index: 2, name: 'Cagayake!GIRLS', duration: '04:10', image: '/assets/albums/Cagayake!GIRLS - 放課後ティータイム.jpg', src: '/assets/musics/Cagayake!GIRLS - 放課後ティータイム.mp3', singer: '放課後ティータイム', bvid: 'BV1V54y167fr' },
    { index: 3, name: '天使にふれたよ！', duration: '04:41', image: '/assets/albums/天使にふれたよ! - 放課後ティータイム.jpg', src: '/assets/musics/天使にふれたよ! - 放課後ティータイム.mp3', singer: '放課後ティータイム', bvid: 'BV1prnQebEwm' },

  ]
};

const activePlaylistName = ref('結束バンド');
const currentTracklist = computed(() => playlists[activePlaylistName.value]);

const playerIcons = ["/assets/images/icon_play.png","/assets/images/icon_pause.png"];
const playStatu = ref(0);
const activeItem = ref(playlists.結束バンド[0]);
const musicProgress = ref(0);
const volumeProgress = ref(20);
const player = ref(new Audio());
const isMvVisible = ref(false);
const defaultFavicon = '/favicon.ico';

player.value.src = activeItem.value.src;
player.value.volume = volumeProgress.value / 100;

const updatePositionState = () => { if ('mediaSession' in navigator && player.value.duration) { navigator.mediaSession.setPositionState({ duration: player.value.duration, playbackRate: player.value.playbackRate, position: player.value.currentTime, }); } };
const switchPlaylist = (playlistName) => { if (activePlaylistName.value === playlistName) return; activePlaylistName.value = playlistName; activeItem.value = playlists[playlistName][0]; playStatu.value = 1; };
const updateProgress = () => { if (player.value && player.value.duration && isFinite(player.value.duration)) { musicProgress.value = (player.value.currentTime / player.value.duration) * 100; updatePositionState(); } if (playStatu.value === 1) { requestAnimationFrame(updateProgress); } };
const switchStatu = () => { if (playStatu.value === 0) { player.value.play(); playStatu.value = 1; } else { player.value.pause(); playStatu.value = 0; } };
const switchMusic = (direction) => { if (!activeItem.value) return; const tracklist = currentTracklist.value; const currentIndex = tracklist.findIndex(music => music.name === activeItem.value.name); if (currentIndex === -1) { activeItem.value = tracklist[0]; return; } let nextIndex = (direction === 'next') ? currentIndex + 1 : currentIndex - 1; if (nextIndex >= tracklist.length) { nextIndex = 0; } if (nextIndex < 0) { nextIndex = tracklist.length - 1; } activeItem.value = tracklist[nextIndex]; };

watch(activeItem, (newItem) => { player.value.pause(); musicProgress.value = 0; player.value.currentTime = 0; player.value.src = newItem.src; updateMediaSession(newItem); player.value.addEventListener('loadedmetadata', updatePositionState, { once: true }); if (playStatu.value === 1) { player.value.play(); } });
watch(playStatu, (newVal) => { document.documentElement.style.setProperty('--animation-state', newVal === 1 ? 'running' : 'paused'); if ('mediaSession' in navigator) { navigator.mediaSession.playbackState = newVal === 1 ? 'playing' : 'paused'; } updatePositionState(); if (newVal === 1) { requestAnimationFrame(updateProgress); updateFavicon(activeItem.value.image); } else { updateFavicon(defaultFavicon); } }, { immediate: true });
watch(volumeProgress, (newVolume) => { player.value.volume = newVolume / 100; });
player.value.addEventListener('ended', () => { playStatu.value = 1; switchMusic('next'); });

const toggleLike = async () => { if (!currentUser.value) { alert('请先登录才能收藏歌曲哦！'); return; } const token = localStorage.getItem('authToken'); if (!token) { alert('登录状态失效，请重新登录！'); return; } const songName = activeItem.value.name; const newLikedSongs = new Set(likedSongs.value); if (newLikedSongs.has(songName)) { newLikedSongs.delete(songName); } else { newLikedSongs.add(songName); } likedSongs.value = newLikedSongs; try { await fetch(`${API_BASE_URL}/api/like`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ songName }), }); } catch (error) { console.error('收藏操作失败:', error); } };
const playWeightedRandom = () => { const wasPaused = playStatu.value === 0; const weightedPool = []; const likedWeight = 5; currentTracklist.value.forEach(song => { if (song.name === activeItem.value.name) return; const weight = likedSongs.value.has(song.name) ? likedWeight : 1; for (let i = 0; i < weight; i++) { weightedPool.push(song); } }); if (weightedPool.length === 0) { switchMusic('next'); } else { const randomIndex = Math.floor(Math.random() * weightedPool.length); activeItem.value = weightedPool[randomIndex]; } if (wasPaused) { playStatu.value = 1; } };
const updateFavicon = (iconUrl) => { let link = document.querySelector("link[rel~='icon']"); if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.getElementsByTagName('head')[0].appendChild(link); } link.href = iconUrl; };
const updateMediaSession = (song) => { if ('mediaSession' in navigator) { navigator.mediaSession.metadata = new MediaMetadata({ title: song.name, artist: song.singer, album: '結束バンド', artwork: [ { src: song.image, sizes: '96x96', type: 'image/jpeg' }, { src: song.image, sizes: '128x128', type: 'image/jpeg' }, { src: song.image, sizes: '192x192', type: 'image/jpeg' }, { src: song.image, sizes: '256x256', type: 'image/jpeg' }, { src: song.image, sizes: '384x384', type: 'image/jpeg' }, { src: song.image, sizes: '512x512', type: 'image/jpeg' }, ] }); } };
const showMv = () => { if (activeItem.value.bvid) isMvVisible.value = true; };
const onVolumeProgressClicked = (e) => { const p=e.currentTarget; const c=e.offsetX; const w=p.clientWidth; const pct=(c/w)*100; volumeProgress.value=pct; player.value.volume=pct/100; };
const onProgressClicked = (e) => { const p=e.currentTarget; const c=e.offsetX; const w=p.clientWidth; const pct=(c/w)*100; musicProgress.value=pct; player.value.currentTime=(pct/100)*player.value.duration; updatePositionState(); };
const secToMMSS = (sec) => { sec=sec|0; let m=(sec/60|0).toString().padStart(2, '0'); let s=(sec%60|0).toString().padStart(2, '0'); return m+':'+s };
const volumeHandle = (num)=>{ let newVol = player.value.volume+num/100; newVol = Math.max(0, Math.min(1, newVol)); player.value.volume = newVol; volumeProgress.value = newVol*100; };

onMounted(async () => { updateMediaSession(activeItem.value); player.value.addEventListener('loadedmetadata', updatePositionState, { once: true }); if ('mediaSession' in navigator) { navigator.mediaSession.setActionHandler('play', () => { switchStatu(); }); navigator.mediaSession.setActionHandler('pause', () => { switchStatu(); }); navigator.mediaSession.setActionHandler('previoustrack', () => { switchMusic('previous'); }); navigator.mediaSession.setActionHandler('nexttrack', () => { switchMusic('next'); }); navigator.mediaSession.setActionHandler('seekbackward', (details) => { const skipTime = details.seekOffset || 10; player.value.currentTime = Math.max(player.value.currentTime - skipTime, 0); updatePositionState(); }); navigator.mediaSession.setActionHandler('seekforward', (details) => { const skipTime = details.seekOffset || 10; player.value.currentTime = Math.min(player.value.currentTime + skipTime, player.value.duration); updatePositionState(); }); navigator.mediaSession.setActionHandler('seekto', (details) => { if (details.fastSeek && 'fastSeek' in player.value) { player.value.fastSeek(details.seekTime); } else { player.value.currentTime = details.seekTime; } updatePositionState(); }); } const userData = localStorage.getItem('currentUser'); const token = localStorage.getItem('authToken'); if (userData && token) { currentUser.value = JSON.parse(userData); try { const response = await fetch(`${API_BASE_URL}/api/likes`, { headers: { 'Authorization': `Bearer ${token}` } }); if (response.ok) { const songs = await response.json(); likedSongs.value = new Set(songs); } else if (response.status === 401) { localStorage.removeItem('currentUser'); localStorage.removeItem('authToken'); currentUser.value = null; } } catch (error) { console.error('获取收藏列表失败:', error); } } const el = document.querySelector('.player-select'); if (el) { el.addEventListener('wheel', (e) => { e.preventDefault(); e.stopPropagation(); el.scrollTop += e.deltaY * 0.5; }); } });
</script>

<template>
    <div class="bg">
        <div class="player-container">
            <div class="music-note note1">♪</div><div class="music-note note2">♫</div><div class="music-note note3">♩</div><div class="music-note note4">♬</div><div class="music-note note5">♪</div><div class="music-note note6">♫</div><div class="music-note note7">♩</div><div class="music-note note8">♬</div>
            <div class="player-select">
                <!-- [核心修改] 将切换器和列表包裹起来 -->
                <div class="list-content-wrapper">
                    <div class="playlist-switcher">
                        <button 
                            v-for="(_, name) in playlists" 
                            :key="name"
                            class="playlist-btn"
                            :class="{ 'active': name === activePlaylistName }"
                            @click="switchPlaylist(name)"
                        >
                            {{ name }}
                        </button>
                    </div>

                    <Transition name="playlist-fade" mode="out-in">
                        <ul :key="activePlaylistName">
                            <li v-for="(music, index) in currentTracklist" :key="index" :class="{ 'active': activeItem.name === music.name }" @click="activeItem = music">
                                <div class="music-item">
                                    <img :src="music.image" :alt="music.name" />
                                    <div class="music-info">
                                        <span class="music-title">{{ music.name }}</span>
                                        <span class="music-singer">{{ music.singer }}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </Transition>
                </div>
            </div>
            <div class="player">
                <div class="now-playing">
                    <div class="player-bg-wrapper">
                        <div class="player-bg" :style="{ 'animation-play-state': playStatu === 0 ? 'paused' : 'running' }">
                            <img :src="activeItem.image" :alt="activeItem.name" class="album-image" />
                        </div>
                    </div>
                    <div class="music-info"><h2>{{ activeItem.name }}</h2><p>{{ activeItem.singer }}</p></div>
                    <div class="player-controls">
                        <div class="volume-control"><span class="icon-defuse" @click="volumeHandle(-10)"><img src="/assets/images/icon_defuse.png" /></span><div class="volume-progress-box" :style="{ '--volume-progress': volumeProgress + '%' }" @click="onVolumeProgressClicked($event)"><div class="volume-progress-fill"></div></div><span class="icon-add" @click="volumeHandle(10)"><img src="/assets/images/icon_add.png" /></span></div>
                        <div class="control-panel">
                            <span class="like-btn" :class="{ 'liked': likedSongs.has(activeItem.name) }" @click="toggleLike"><img src="/assets/images/icon_like.png" /></span>
                            <span @click="playWeightedRandom"><img src="/assets/images/icon_mode.png" /></span>
                            <span class="mv-icon" :class="{ 'disabled': !activeItem.bvid }" @click="showMv"><img src="/assets/images/icon_mv.png" /></span>
                        </div>
                        <div class="music-progress-container"><span class="current-time">{{ secToMMSS(player.currentTime) }}</span><div class="music-progress-box" :style="{ '--music-progress': musicProgress + '%' }" @click="onProgressClicked($event)"><div class="music-progress-fill"></div></div><span class="duration-time">{{ activeItem.duration }}</span></div>
                        <div class="btn-bar">
                            <div @click="switchMusic('previous')"><img src="/assets/images/icon_last.png" /></div>
                            <div><img @click="switchStatu()" :src="playerIcons[playStatu]" /></div>
                            <div @click="switchMusic('next')"><img src="/assets/images/icon_next.png" /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isMvVisible" class="mv-modal-overlay" @click="isMvVisible = false">
            <div class="mv-modal-content" @click.stop>
                <button class="close-mv-btn" @click="isMvVisible = false">×</button>
                <iframe :src="'//player.bilibili.com/player.html?isOutside=true&bvid='+activeItem.bvid+'&page=1&autoplay=1'" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bg { position: relative; width: 100%; height: 100%; overflow: hidden; display: flex; align-items: center; justify-content: center; background: linear-gradient(90deg, #ff86be 0%, #ffd859 25%, #5ad0ff 50%, #ff5656 75%); background-size: 300% 300%; animation: gradient 15s ease infinite; animation-play-state: var(--animation-state, paused); }
.player-container { position: relative; display: flex; width: 80%; min-width: 900px; max-width: 1200px; height: 80vh; min-height: 600px; background-color: rgba(255, 255, 255, 0.65); border-right: 1px solid rgba(170, 170, 170, 0.3); border-radius: 16px; overflow: hidden; box-shadow: 0 5px 8px rgba(81, 81, 81, 0.5); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
.music-note { position: absolute; color: rgba(255, 255, 255, 0.7); font-size: 60px; opacity: 0; animation: floatNote 8s linear infinite; pointer-events: none; user-select: none; z-index: 0; }
.note1 { top: 20%; left: 40%; animation-delay: 1s; } .note2 { top: 70%; left: 45%; animation-delay: 1s; } .note3 { top: 40%; left: 85%; animation-delay: 1s; } .note4 { top: 80%; left: 90%; animation-delay: 1s; } .note5 { top: 70%; left: 50%; animation-delay: 1s; } .note6 { top: 20%; left: 75%; animation-delay: 1s; } .note7 { top: 60%; left: 38%; animation-delay: 1s; } .note8 { top: 80%; left: 60%; animation-delay: 1s; }
@keyframes floatNote { 0% { transform: translateY(0) rotate(0deg); opacity: 0; } 10% { opacity: 0.7; } 90% { opacity: 0.7; } 100% { transform: translateY(-100px) rotate(360deg); opacity: 0; } }
.bg .music-note, .player-container .music-note { animation-play-state: var(--animation-state, paused); }
@keyframes gradient { 0% { background-position: 0% 0%; } 50% { background-position: 100% 100%; } 100% { background-position: 0% 0%; } }
/* --- [核心修改] --- */
.player-select { 
  width: 35%; 
  background-color: rgba(255, 255, 255, 0.5); 
  /* [修改] 不再直接滚动自己，而是让子元素滚动 */
  overflow: hidden; 
  border-right: 1px solid #e0e0e0; 
  z-index: 1; 
  display: flex; /* 让内部wrapper能撑开 */
}
.list-content-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: auto; /* 让这个容器负责滚动 */
  scrollbar-width: none;
}
.list-content-wrapper::-webkit-scrollbar { width: 6px; }

.playlist-switcher {
  display: flex;
  padding: 8px;
  gap: 8px;
  background-color: rgba(0,0,0,0.05);
  border-bottom: 1px solid #e0e0e0;
  /* [修改] 关键的“粘性定位” */
  position: sticky;
  top: 0;
  z-index: 2;
}
.playlist-btn { flex-grow: 1; padding: 8px 12px; border: 1px solid rgba(0,0,0,0.1); background-color: rgba(255,255,255,0.4); border-radius: 6px; cursor: pointer; transition: all 0.2s ease-in-out; font-weight: 500; color: #555; }
.playlist-btn:hover { background-color: rgba(255,255,255,0.7); }
.playlist-btn.active { background-color: #ec407a; color: white; font-weight: 600; box-shadow: 0 2px 5px rgba(0,0,0,0.1); border-color: transparent; }
.playlist-fade-enter-active, .playlist-fade-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.playlist-fade-enter-from, .playlist-fade-leave-to { opacity: 0; transform: translateY(10px); }

.player-select ul { padding: 0; margin: 0; display: flex; flex-direction: column; }
.player-select ul li { list-style: none; padding: 10px 16px; border-bottom: 1px solid #e0e0e0; cursor: pointer; transition: all 0.3s ease; }
.player-select ul li:hover { background-color: #f0f0f0; }
.player-select ul li.active { background-color: #e8e8e8; border-right: 4px solid #ec407a; }
.music-item { height: auto; min-height: 60px; display: flex; gap: 12px; width: 100%; align-items: center; }
.player-select img { height: 60px; width: 60px; border-radius: 8px; object-fit: cover; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); flex-shrink: 0; }
.music-info { display: flex; flex-direction: column; justify-content: center; height: 100%; overflow: hidden; flex: 1; min-width: 0; }
.music-title { font-size: 16px; color: #333; font-weight: 600; line-height: 1.3; text-align: left; white-space: normal; word-break: break-word; }
.music-singer { font-size: 13px; color: #777; text-align: left; line-height: 1.3; white-space: normal; word-break: break-word; }

.player { width: 65%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 30px; box-sizing: border-box; background: linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.5)); box-shadow: 2px 2px 5px #666; z-index: 1; }
.player-bg-wrapper { display: flex; justify-content: center; align-items: center; }
.player-bg { width: 280px; height: 280px; border-radius: 50%; position: relative; background: radial-gradient(circle at center, #4a4a4a, #2c2c2c); box-shadow: inset 0 0 15px rgba(0,0,0,0.6), inset 0 0 5px rgba(255,255,255,0.1), 0 0 20px rgba(0, 0, 0, 0.4); animation: albums_rotate 15s infinite linear; animation-play-state: var(--animation-state, paused); flex-shrink: 0; }
.now-playing { display: flex; flex-direction: column; align-items: center; height: 100%; justify-content: space-between; }
.album-image { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 200px; height: 200px; border-radius: 50%; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35); transition: all 0.4s ease; z-index: 2; }
.music-info { text-align: center; margin-bottom: 20px; }
.player-controls { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 15px; }
.volume-control { display: flex; align-items: center; gap: 12px; width: 60%; justify-content: center; }
.volume-control img { width: 20px; opacity: 0.7; transition: opacity 0.2s; }
.volume-progress-box { flex-grow: 1; height: 4px; background-color: rgba(0, 0, 0, 0.1); border-radius: 2px; position: relative; cursor: pointer; }
.volume-progress-fill { height: 100%; background-color: #ec407a; border-radius: 2px; width: var(--volume-progress); }
.control-panel { display: flex; align-items: center; gap: 30px; }
.control-panel img { width: 24px; opacity: 0.7; cursor: pointer; transition: opacity 0.2s; }
.control-panel .mv-icon.disabled { opacity: 0.4; cursor: not-allowed; }
.control-panel .mv-icon.disabled:hover img { transform: none; }
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

@media (min-width: 769px) and (max-width: 1024px) { 
    .player-container { min-width: 95%; width: 95%; height: 85vh; min-height: 550px; } 
    .player-select { width: 40%; } 
    .player { width: 60%; padding: 20px; } 
    .player-bg { width: 220px; height: 220px; } 
    .album-image { width: 160px; height: 160px; } 
    .music-info h2 { font-size: 20px; } 
    .music-info p { font-size: 14px; } 
    .btn-bar div:nth-child(2) img { width: 45px; } 
}
@media (max-width: 768px) { 
    .player-container { flex-direction: column; width: 100%; height: 100%; min-width: unset; min-height: unset; border-radius: 0; } 
    .player-select { width: 100%; height: 40%; flex-shrink: 0; } 
    .player { width: 100%; height: 60%; padding: 15px; } 
    .now-playing { justify-content: space-around; } 
    .player-bg-wrapper { margin-top: 10px; }
    .player-bg { width: 150px; height: 150px; } 
    .album-image { width: 100px; height: 100px; } 
    .music-info { margin-bottom: 10px; }
    .music-info h2 { font-size: 16px; } 
    .music-info p { font-size: 13px; } 
    .player-controls { gap: 10px; }
    .playlist-btn { font-size: 13px; padding: 6px 10px; }
    .close-mv-btn { top: 0; right: 5px; transform: translateY(-100%); background-color: rgba(0,0,0,0.5); border-radius: 50%; width: 25px; height: 25px; line-height: 25px; text-align: center; padding: 0; font-size: 20px; } 
}

.control-panel .like-btn.liked img { filter: invert(58%) sepia(53%) saturate(4578%) hue-rotate(320deg) brightness(100%) contrast(101%); }
</style>
