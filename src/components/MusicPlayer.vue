<script setup>
import { onMounted, ref, watch } from 'vue';




const musics = [
    { index: 1, name: 'Distortion!!', duration: '03:23', image: '/src/assets/albums/Distortion!!.jpg', src: '/src/assets/musics/Distortion!!.mp3', singer: '结束バンド' },
    { index: 2, name: 'なにが悪い', duration: '03:47', image: '/src/assets/albums/なにが悪い.jpg', src: '/src/assets/musics/なにが悪い.mp3', singer: '结束バンド' },
    { index: 3, name: '転がる岩、君に朝が降る', duration: '04:31', image: '/src/assets/albums/転がる岩、君に朝が降る.jpg', src: '/src/assets/musics/転がる岩、君に朝が降る.mp3', singer: '结束バンド' },
    { index: 4, name: '星座になれたら', duration: '04:18', image: '/src/assets/albums/星座になれたら.jpg', src: '/src/assets/musics/星座になれたら.mp3', singer: '结束バンド' },
    { index: 5, name: '青春コンプレックス', duration: '03:23', image: '/src/assets/albums/結束バンド.jpg', src: '/src/assets/musics/青春コンプレックス.mp3', singer: '结束バンド' },
    { index: 6, name: 'あのバンド', duration: '03:33', image: '/src/assets/albums/あのバンド.jpg', src: '/src/assets/musics/あのバンド.mp3', singer: '结束バンド' },
    { index: 7, name: 'ギターと孤独と蒼い惑星', duration: '03:48', image: '/src/assets/albums/ギターと孤独と蒼い惑星.jpg', src: '/src/assets/musics/ギターと孤独と蒼い惑星.mp3', singer: '结束バンド' },
    { index: 8, name: 'milky way', duration: '03:32', image: '/src/assets/albums/We will.png', src: '/src/assets/musics/milky way.mp3', singer: '结束バンド' },
    { index: 9, name: 'カラカラ', duration: '04:25', image: '/src/assets/albums/カラカラ.jpg', src: '/src/assets/musics/カラカラ.mp3', singer: '结束バンド' },
]

const playerIcons = [
    "/src/assets/images/icon_play.png",
    "/src/assets/images/icon_pause.png"
]

// 0: pause   1：playing
const playStatu = ref(0);
const activeItem = ref(musics[0]);
const musicProgress = ref(0);
const volumeProgress = ref(5);

// Create audio element
const player = ref(new Audio());
player.value.src = activeItem.value.src;
player.value.volume = volumeProgress.value / 100;

const switchMusic = (newIndex) => {
    if (newIndex >= musics.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = musics.length - 1;
    }

    activeItem.value = musics[newIndex];
    playStatu.value = 1;
    musicProgress.value = 0;
    updateProgress();
};

const updateProgress = () => {
    if (player.value.duration) {
        musicProgress.value = (player.value.currentTime / player.value.duration) * 100;
    }
    requestAnimationFrame(updateProgress);
};

// Watch for activeItem changes
watch(activeItem, (newItem) => {
    player.value.src = newItem.src;
    player.value.currentTime = 0;
    if (playStatu.value === 1) {
        player.value.play();
    }
});


watch(musicProgress, (newProgress) => {
    if (musicProgress.value >= 100) {
        switchMusic(activeItem.value.index);
    }
})

// Watch for volume changes
watch(volumeProgress, (newVolume) => {
    player.value.volume = newVolume / 100;
});


const switchStatu = () => {
    if (playStatu.value === 0) {
        player.value.play();
        playStatu.value = 1;
        updateProgress();
    } else {
        player.value.pause();
        playStatu.value = 0;
    }
};

const onVolumeProgressClicked = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.offsetX;
    const progressBarWidth = progressBar.clientWidth;
    const percentage = (clickPosition / progressBarWidth) * 100;
    volumeProgress.value = percentage;
    player.value.volume = percentage/100;
}

const onProgressClicked = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.offsetX;
    const progressBarWidth = progressBar.clientWidth;
    const percentage = (clickPosition / progressBarWidth) * 100;
    musicProgress.value = percentage;
    player.value.currentTime = (percentage / 100) * player.value.duration;

    updateProgress();
}

const secToMMSS = (sec) => {
    sec = sec | 0;
    let m = sec / 60 | 0;
    let s = sec % 60 | 0;
    m = m.toString().padStart(2, '0');
    s = s.toString().padStart(2, '0');
    return m + ':' + s
}




onMounted(() => {
    const yourElement = document.querySelector('.player-select');

    if (!yourElement) return;

    // 阻止滚轮事件冒泡和默认行为
    yourElement.addEventListener('wheel', (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        // 示例：自定义滚动逻辑
        yourElement.scrollTop += e.deltaY * 0.5; // 减慢滚动速度
    });
});
</script>

<template>
    <div class="player-container">
        <div class="player-select">
            <ul>
                <li v-for="(music, index) in musics" :key="index" :class="{ 'active': activeItem.name === music.name }"
                    @click="activeItem = music; updateProgress();">
                    <div class="music-item">
                        <img :src="music.image" :alt="music.name" />
                        <div class="music-info">
                            <h2 class="music-title">{{ music.name }}</h2>
                            <span class="music-singer">{{ music.singer }}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="player">
            <div class="now-playing">
                <div class="player-bg" :style="{ 'animation-play-state': playStatu === 0 ? 'paused' : 'running' }">
                    <img :src="activeItem.image" :alt="activeItem.name" class="album-image" />
                </div>

                <div class="music-info">
                    <h2>{{ activeItem.name }}</h2>
                    <p>{{ activeItem.singer }}</p>
                </div>
                
                <div class="player-controls">
                    <!-- 音量控制 -->
                    <div class="volume-control">
                        <span class="icon-add">
                            <img src="@/assets/images/icon_add.png" />
                        </span>
                        <div class="volume-progress-box" :style="{ '--volume-progress': volumeProgress + '%' }"
                            @click="onVolumeProgressClicked($event)">
                            <div class="volume-progress-fill"></div>
                        </div>
                        <span class="icon-defuse">
                            <img src="@/assets/images/icon_defuse.png" />
                        </span>
                    </div>

                    <!-- 控制面板 -->
                    <div class="control-panel">
                        <span class="icon-like">
                            <img src="@/assets/images/icon_like.png" />
                        </span>
                        <span class="icon-mode">
                            <img src="@/assets/images/icon_mode.png" />
                        </span>
                        <span class="icon-volume">
                            <img src="@/assets/images/icon_volume_forbidden.png" />
                        </span>
                    </div>

                    <!-- 音乐进度条 -->
                    <div class="music-progress-container">
                        <span class="current-time">
                            {{ secToMMSS(player.currentTime) }}
                        </span>
                        <div class="music-progress-box" :style="{ '--music-progress': musicProgress + '%' }"
                            @click="onProgressClicked($event)">
                            <div class="music-progress-fill"></div>
                        </div>
                        <span class="duration-time">
                            {{ activeItem.duration }}
                        </span>
                    </div>

                    <!-- 按钮栏 -->
                    <div class="btn-bar">
                        <!-- 上一首 -->
                        <div @click="switchMusic(activeItem.index - 2)">
                            <img src="@/assets/images/icon_last.png" />
                        </div>

                        <!-- 播放、暂停 -->
                        <div>
                            <img @click="switchStatu()" :src="playerIcons[playStatu]" />
                        </div>

                        <!-- 下一首 -->
                        <div @click="switchMusic(activeItem.index)">
                            <img src="@/assets/images/icon_next.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.player-container {
    display: flex;
    width: 80%;
    min-width: 900px;
    max-width: 1200px;
    height: 80vh;
    min-height: 600px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.player-select {
    width: 35%;
    background-color: #f8f8f8;
    overflow-y: auto;
    border-right: 1px solid #e0e0e0;
}

.player-select ul {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
}

.player-select ul li {
    list-style: none;
    padding: 16px 20px;
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;
    transition: all 0.3s ease;
}

.player-select ul li:hover {
    background-color: #f0f0f0;
}

.player-select ul li.active {
    background-color: #e8e8e8;
    border-left: 4px solid #ec407a;
}

.music-item {
    display: flex;
    align-items: center;
    gap: 16px;
}

.player-select img {
    width: 56px;
    height: 56px;
    border-radius: 8px;
    object-fit: cover;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.music-info {
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.music-title {
    margin: 0;
    font-size: 15px;
    color: #333;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.music-singer {
    font-size: 13px;
    color: #777;
    margin-top: 4px;
}

.player {
    width: 65%;
    display: flex;
    flex-direction: column;
    padding: 30px;
    box-sizing: border-box;
}

.now-playing {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: space-between;
}

.player-bg {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.6);
    position: relative;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    animation: albums_rotate 15s infinite linear;
    margin-bottom: 30px;
}

.player-bg::before {
    content: '';
    width: 240px;
    height: 240px;
    border-radius: 50%;
    background-color: #ffffff;
    filter: blur(8px);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.8;
}

.album-image {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.music-info {
    text-align: center;
    margin-bottom: 30px;
    width: 100%;
}

.music-info h2 {
    margin: 0 0 8px 0;
    font-size: 24px;
    color: #333;
    font-weight: 600;
}

.music-info p {
    margin: 0;
    font-size: 16px;
    color: #777;
}

.player-controls {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.volume-control {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 60%;
    justify-content: center;
}

.volume-control img {
    width: 20px;
    opacity: 0.7;
    transition: opacity 0.2s;
}

.volume-control img:hover {
    opacity: 1;
}

.volume-progress-box {
    width: 200px;
    background: #e0e0e0;
    border-radius: 10px;
    height: 6px;
    cursor: pointer;
    overflow: hidden;
}

.volume-progress-fill {
    background: linear-gradient(90deg, #90e0ff, #90fff4, #3dfff5);
    height: 100%;
    width: var(--volume-progress);
    transition: width 0.1s ease;
}

.control-panel {
    display: flex;
    gap: 24px;
    margin: 10px 0;
}

.control-panel span {
    background-color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
    cursor: pointer;
}

.control-panel span:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.control-panel img {
    width: 20px;
    height: 20px;
    opacity: 0.8;
}

.music-progress-container {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    margin: 10px 0;
}

.music-progress-box {
    flex-grow: 1;
    background: #e0e0e0;
    border-radius: 10px;
    height: 6px;
    cursor: pointer;
    overflow: hidden;
}

.music-progress-fill {
    background: linear-gradient(90deg, #ff9eb5, #f06292, #ec407a);
    height: 100%;
    width: var(--music-progress);
    transition: width 0.1s ease;
}

.current-time, .duration-time {
    color: #777;
    font-size: 13px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    min-width: 40px;
    text-align: center;
}

.btn-bar {
    display: flex;
    gap: 40px;
    align-items: center;
    margin-top: 20px;
}

.btn-bar div {
    background-color: #fff;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
}

.btn-bar div:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.btn-bar div:nth-child(2) {
    width: 60px;
    height: 60px;
    background-color: #ec407a;
}

.btn-bar img {
    width: 50%;
    height: 50%;
}

@keyframes albums_rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>