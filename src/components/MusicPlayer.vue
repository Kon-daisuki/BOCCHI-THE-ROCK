<script>
// [新增] 添加这个 <script> 块来命名组件，以便 KeepAlive 生效
export default {
  name: 'MusicPlayer'
}
</script>

<script setup>
import { onMounted, ref, watch, computed } from 'vue';

// 您的后端API地址
const API_BASE_URL = 'https://login.bocchi.us.kg';

const currentUser = ref(null);
const likedSongs = ref(new Set());

const playlists = {
  '結束バンド': [
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

const switchPlaylist = (playlistName) => { 
  if (activePlaylistName.value === playlistName) return; 
  activePlaylistName.value = playlistName; 
  activeItem.value = playlists[playlistName][0];
  playStatu.value = 1; 
};

const playlistNames = Object.keys(playlists);
const switchPlaylistVertical = (direction) => {
    const currentIndex = playlistNames.indexOf(activePlaylistName.value);
    const total = playlistNames.length;
    let nextIndex;
    if (direction === 'next') {
        nextIndex = (currentIndex + 1) % total;
    } else {
        nextIndex = (currentIndex - 1 + total) % total;
    }
    const nextPlaylistName = playlistNames[nextIndex];
    switchPlaylist(nextPlaylistName);
};

const fetchUserDataAndLikes = async () => {
    const userData = localStorage.getItem('currentUser');
    const token = localStorage.getItem('authToken');

    if (userData && token) {
        currentUser.value = JSON.parse(userData);
        try {
            const response = await fetch(`${API_BASE_URL}/api/likes`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const songs = await response.json();
                likedSongs.value = new Set(songs);
            } else if (response.status === 401) {
                // 登录状态失效，清除本地存储
                localStorage.removeItem('currentUser');
                localStorage.removeItem('authToken');
                currentUser.value = null;
            }
        } catch (error) {
            console.error('获取收藏列表失败:', error);
        }
    } else {
        // 用户未登录，清除状态
        currentUser.value = null;
        likedSongs.value = new Set();
    }
};

const updatePositionState = () => { if ('mediaSession' in navigator && player.value.duration) { navigator.mediaSession.setPositionState({ duration: player.value.duration, playbackRate: player.value.playbackRate, position: player.value.currentTime, }); } };
const updateProgress = () => { if (player.value && player.value.duration && isFinite(player.value.duration)) { musicProgress.value = (player.value.currentTime / player.value.duration) * 100; updatePositionState(); } if (playStatu.value === 1) { requestAnimationFrame(updateProgress); } };
const switchStatu = () => { if (playStatu.value === 0) { player.value.play(); playStatu.value = 1; } else { player.value.pause(); playStatu.value = 0; } };
const switchMusic = (direction) => { if (!activeItem.value) return; const tracklist = currentTracklist.value; const currentIndex = tracklist.findIndex(music => music.name === activeItem.value.name); if (currentIndex === -1) { activeItem.value = tracklist[0]; return; } let nextIndex = (direction === 'next') ? currentIndex + 1 : currentIndex - 1; if (nextIndex >= tracklist.length) { nextIndex = 0; } if (nextIndex < 0) { nextIndex = tracklist.length - 1; } activeItem.value = tracklist[nextIndex]; };

watch(activeItem, (newItem) => { player.value.pause(); musicProgress.value = 0; player.value.currentTime = 0; player.value.src = newItem.src; updateMediaSession(newItem); player.value.addEventListener('loadedmetadata', updatePositionState, { once: true }); if (playStatu.value === 1) { player.value.play(); } });
watch(playStatu, (newVal) => { document.documentElement.style.setProperty('--animation-state', newVal === 1 ? 'running' : 'paused'); if ('mediaSession' in navigator) { navigator.mediaSession.playbackState = newVal === 1 ? 'playing' : 'paused'; } updatePositionState(); if (newVal === 1) { requestAnimationFrame(updateProgress); updateFavicon(activeItem.value.image); } else { updateFavicon(defaultFavicon); } }, { immediate: true });
watch(volumeProgress, (newVolume) => { player.value.volume = newVolume / 100; });
player.value.addEventListener('ended', () => { playStatu.value = 1; switchMusic('next'); });

const toggleLike = async () => { 
  if (!currentUser.value) { 
    alert('请先登录才能收藏歌曲哦！'); 
    return; 
  } 
  const token = localStorage.getItem('authToken');
  if (!token) { 
    alert('登录状态失效，请重新登录！'); 
    return; 
  } 
  const songName = activeItem.value.name; 
  const newLikedSongs = new Set(likedSongs.value); 
  if (newLikedSongs.has(songName)) { 
    newLikedSongs.delete(songName);
  } else { 
    newLikedSongs.add(songName); 
  } 
  likedSongs.value = newLikedSongs; 
  try { 
    await fetch(`${API_BASE_URL}/api/like`, { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, 
      body: JSON.stringify({ songName }), 
    });
  } catch (error) { 
    console.error('收藏操作失败:', error); 
  } 
};
const playWeightedRandom = () => { 
  const wasPaused = playStatu.value === 0;
  const weightedPool = []; 
  const likedWeight = 5; 
  currentTracklist.value.forEach(song => { 
    if (song.name === activeItem.value.name) return; 
    const weight = likedSongs.value.has(song.name) ? likedWeight : 1; 
    for (let i = 0; i < weight; i++) { 
      weightedPool.push(song); 
    } 
  });
  if (weightedPool.length === 0) { 
    switchMusic('next'); 
  } else { 
    const randomIndex = Math.floor(Math.random() * weightedPool.length); 
    activeItem.value = weightedPool[randomIndex];
  } 
  if (wasPaused) { 
    playStatu.value = 1; 
  } 
};
const updateFavicon = (iconUrl) => { 
  let link = document.querySelector("link[rel~='icon']");
  if (!link) { 
    link = document.createElement('link'); 
    link.rel = 'icon'; 
    document.getElementsByTagName('head')[0].appendChild(link); 
  } 
  link.href = iconUrl; 
};
const updateMediaSession = (song) => { 
  if ('mediaSession' in navigator) { 
    navigator.mediaSession.metadata = new MediaMetadata({ 
      title: song.name, 
      artist: song.singer, 
      album: '結束バンド', 
      artwork: [ 
        { src: song.image, sizes: '96x96', type: 'image/jpeg' }, 
        { src: song.image, sizes: '128x128', type: 'image/jpeg' }, 
        { src: song.image, sizes: '192x192', type: 'image/jpeg' }, 
        { src: song.image, sizes: '256x256', type: 'image/jpeg' }, 
        { src: song.image, sizes: '384x384', type: 'image/jpeg' }, 
        { src: song.image, sizes: '512x512', type: 'image/jpeg' }, 
      ] 
    });
  } 
};
const showMv = () => { if (activeItem.value.bvid) isMvVisible.value = true; };
const onVolumeProgressClicked = (e) => { const p=e.currentTarget; const c=e.offsetX; const w=p.clientWidth; const pct=(c/w)*100; volumeProgress.value=pct; player.value.volume=pct/100; };
const onProgressClicked = (e) => { const p=e.currentTarget; const c=e.offsetX; const w=p.clientWidth; const pct=(c/w)*100; musicProgress.value=pct; player.value.currentTime=(pct/100)*player.value.duration; updatePositionState(); };
const secToMMSS = (sec) => { sec=sec|0; let m=(sec/60|0).toString().padStart(2, '0'); let s=(sec%60|0).toString().padStart(2, '0'); return m+':'+s };
const volumeHandle = (num)=>{ let newVol = player.value.volume+num/100; newVol = Math.max(0, Math.min(1, newVol)); player.value.volume = newVol; volumeProgress.value = newVol*100; };

onMounted(() => {
    updateMediaSession(activeItem.value);
    player.value.addEventListener('loadedmetadata', updatePositionState, { once: true });
    
    if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler('play', () => { switchStatu(); });
        navigator.mediaSession.setActionHandler('pause', () => { switchStatu(); });
        navigator.mediaSession.setActionHandler('previoustrack', () => { switchMusic('previous'); });
        navigator.mediaSession.setActionHandler('nexttrack', () => { switchMusic('next'); });
        navigator.mediaSession.setActionHandler('seekbackward', (details) => { 
            const skipTime = details.seekOffset || 10; 
            player.value.currentTime = Math.max(player.value.currentTime - skipTime, 0); 
            updatePositionState(); 
        });
        navigator.mediaSession.setActionHandler('seekforward', (details) => { 
            const skipTime = details.seekOffset || 10; 
            player.value.currentTime = Math.min(player.value.currentTime + skipTime, player.value.duration); 
            updatePositionState(); 
        });
        navigator.mediaSession.setActionHandler('seekto', (details) => { 
            if (details.fastSeek && 'fastSeek' in player.value) { 
                player.value.fastSeek(details.seekTime);
            } else { 
                player.value.currentTime = details.seekTime; 
            } 
            updatePositionState(); 
        });
    }

    window.addEventListener('storage', (event) => {
        if (event.key === 'authToken') {
            // 根据音乐的实际状态更新播放按钮的UI状态
            playStatu.value = player.value.paused ? 0 : 1;
            fetchUserDataAndLikes();
        }
    });

    // 在组件挂载时首次加载用户数据
    fetchUserDataAndLikes();

    const el = document.querySelector('.player-select');
    if (el) { 
      el.addEventListener('wheel', (e) => { 
        e.preventDefault(); 
        e.stopPropagation(); 
        el.scrollTop += e.deltaY * 0.5; 
      }); 
    }
});
</script>

<template>
    <div class="main" ref="mainRef">
        <div class="background-container"
            :style="{ left: `-${currentImageIndex * 100}%`, '--background-width': extendedImages.length * 100 + '%' }"
            ref="containerRef">
            <div v-for="(img, index) in extendedImages" :key="index" class="main-background" :style="{
                backgroundImage: `url('${img.url}')`
            }"></div>
        </div>

        <Icon class="left" icon="material-symbols:arrow-back-ios-new-rounded" @click="LeftImage" />
        <Icon class="right" icon="material-symbols:arrow-forward-ios-rounded" @click="RightImage" />
        <div class="box">
            <div class="target">
                <Transition name="fade">
                    <div class="slide-image-container" :class="{ 'slide': isRegister }" :key="currentImageIndex">
                        <img class="slide-image" :src="extendedImages[currentImageIndex].url" :key="currentImageIndex">
                    </div>
                </Transition>
                <Transition name="fade">
                    <img class="target-image-1" :src="targetImage[targetImageIndex].url" alt="">
                </Transition>
                <Transition name="fade">
                    <img class="target-image-2" :src="targetImage[targetImageIndex + 1].url" alt="">
                </Transition>
            </div>
            <div class="targetbox"></div>

            <div class="loginbox">
                <form @submit.prevent="submitForm">
                    <Transition name="form-fade" mode="out-in">
                        <h2 :key="!isRegister">{{ !isRegister ? 'Log In' : 'Join Us' }}</h2>
                    </Transition>

                    <label class="input-name">Username:</label>
                    <input v-model="FormModel.username" required></input>
                    <label class="input-name">Password:</label>
                    <input type="password" v-model="FormModel.password" required></input>
                    
                    <div class="repassword-container">
                        <Transition name="form-fade" mode="out-in">
                            <div v-if="isRegister" class="repassword-content">
                                <label class="input-name">RePassword:</label>
                                <input type="password" v-model="FormModel.RePassword" required></input>
                            </div>
                        </Transition>
                    </div>
                    
                    <Transition name="form-fade" mode="out-in">
                        <button type="submit" :key="!isRegister">{{ !isRegister ? 'Login' : 'Register' }}</button>
                    </Transition>
                </form>

                <div class="switch-prompt" @click="Switch">
                    <Transition name="form-fade" mode="out-in">
                        <p v-if="!isRegister" key="to-register">还没有账户？<span class="link">立即注册</span></p>
                        <p v-else key="to-login">已有账户？<span class="link">立即登录</span></p>
                    </Transition>
                </div>
            </div>
            
            <img class="switch-login" src="/assets/images/电吉他.svg" alt="切换模式" @click="Switch"></img>
            
            <div class="ribbons"></div>
        </div>
        <Icon class="close-login" icon="material-symbols:close-rounded" @click="goHome" />
    </div>
</template>

<style scoped>
.main {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    opacity: 0;
    transition: opacity 1s ease;
}

.background-container {
    will-change: left;
    position: absolute;
    display: flex;
    width: var(--background-width);
    height: 100%;
    transition: left 0.5s ease-in-out;
    z-index: 0;
}

.background-container.no-transition {
    transition: none;
}

.main-background {
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: center bottom; 
    flex-shrink: 0;
}

.main-background::before {
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    position: fixed;
    content: '';
    background: linear-gradient(-10deg, rgba(255, 130, 130, 0.05) 50%, rgba(255, 212, 112, 0.05) 100%);
    backdrop-filter: blur(3px);
}

.left,
.right {
    position: fixed;
    width: 5%;
    height: 10%;
    cursor: pointer;
    transform: scale(1);
    transition: transform 0.5s ease;
    color: #ffffff61;
}

.left:hover,
.right:hover {
    transform: scale(1.3);
}

.left { left: 30px; }
.right { right: 30px; }

.box {
    position: relative;
    display: flex;
    align-items: center;
    width: 50%;
    height: 60%;
    z-index: 1;
    outline: 1.5px dashed #000;
    outline-offset: -20px;
}

.target {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
    align-items: center;
    /* [修改] 增加底部 padding，让滑块有空间停靠 */
    padding: 10px 0;
    box-sizing: border-box;
    height: 100%;
    left: 10px;
    top: 0;
    width: 30%;
    z-index: 2;
    background-color: #ffecd7;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
    border-radius: 5px;
}

.targetbox {
    width: 25%;
    height: 95%;
    background-color: white;
    outline: 1.5px dashed #000;
    outline-offset: -8px;
}

.slide-image-container {
    will-change: opacity;
    position: absolute;
    width: 100%;
    height: 50%;
    top: 10px; /* 初始位置紧贴顶部 padding */
    transition: all 0.8s ease-in-out;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
    z-index: 5;
}

.slide-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* --- [核心修复] --- */
.slide {
    /* 使用 calc() 动态计算最终位置，确保精准停靠 */
    top: calc(100% - 10px - 50%);
}
/* --- [修复结束] --- */


.target-image-1 {
    width: 70%;
    transition: all 0.8s ease;
}

.target-image-2 {
    width: 70%;
    transition: all 0.8s ease;
}

.loginbox {
    width: 73.5%;
    height: 95%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.7);
    position: relative;
}

@font-face {
    font-family: 'Note-Script-SemiBold-2';
    src: url('/assets/fonts/Note-Script-SemiBold-2.ttf') format('truetype');
    font-style: normal;
}
@font-face {
    font-family: 'Brush-Script-MT';
    src: url('/assets/fonts/Brush-Script-MT-Italic.ttf') format('truetype');
    font-style: normal;
}

form { display: flex; flex-direction: column; align-items: center; width: 100%; }
h2 { font-family: 'Brush-Script-MT'; font-size: 3em; font-weight: bolder; margin-bottom: 20px; }
input { width: 60%; border: none; border-bottom: 1px solid black; font-size: 1.2em; background: transparent; margin-bottom: 10px; }
input:focus { outline: none; box-shadow: none; }
button:focus { outline: none; box-shadow: none; }
.input-name { font-family: 'Note-Script-SemiBold-2'; width: 60%; text-align: left; font-size: 20px; }
.repassword-container { height: 70px; width: 100%; display: flex; justify-content: center; flex-direction: column; align-items: center; }
.repassword-content { width: 100%; display: flex; flex-direction: column; align-items: center; }
button { background: none; border: none; font-size: 1.4em; width: auto; height: auto; font-family: 'Note-Script-SemiBold-2'; cursor: pointer; margin-top: 20px; }
.switch-prompt { font-size: 14px; color: #888; margin-top: 15px; cursor: pointer; text-align: center; }
.switch-prompt .link { color: #ec407a; text-decoration: underline; font-weight: bold; }
.switch-login { position: absolute; top: 5%; right: 25px; width: 60px; height: auto; z-index: 2; cursor: pointer; transform: scale(1); transition: transform 0.5s ease; }
.switch-login:hover { transform: scale(1.3); }
.close-login { position: absolute; top: 0; right: 0; width: 5%; height: auto; z-index: 4; cursor: pointer; color: #ff3aa0bc; }
.form-fade-enter-active, .form-fade-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.form-fade-enter-from, .form-fade-leave-to { opacity: 0; transform: translateY(10px); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 768px) {
    .left, .right, .target, .targetbox, .switch-login, .ribbons { display: none; }
    .box { width: 90vw; height: 70vh; flex-direction: column; outline: none; box-shadow: 0 4px 15px rgba(0,0,0,0.2); border-radius: 10px; }
    .loginbox { width: 100%; height: 100%; box-shadow: none; border-radius: 10px; }
    form { justify-content: center; height: auto; }
    input, .input-name { width: 80%; }
    h2 { font-size: 2.5em; position: static; margin-bottom: 20px; }
    button { position: static; margin-top: 20px; padding: 12px 30px; background-color: #ff3aa0bc; color: white; border-radius: 8px; font-size: 1.2em; }
    .switch-prompt { display: block; margin-top: 30px; }
    .close-login { width: 10%; top: 10px; right: 10px; }
}
</style>
