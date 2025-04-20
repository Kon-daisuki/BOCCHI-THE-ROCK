<script setup>
import { ref, watch } from 'vue';

const musics = [
    { index: 1, name: 'Distortion!!', image: '/src/assets/albums/Distortion!!.jpg', src: '/src/assets/musics/Distortion!!.mp3', singer: '结束バンド' },
    { index: 2, name: 'なにが悪い', image: '/src/assets/albums/なにが悪い.jpg', src: '/src/assets/musics/なにが悪い.mp3', singer: '结束バンド' },
    { index: 3, name: '転がる岩、君に朝が降る', image: '/src/assets/albums/転がる岩、君に朝が降る.jpg', src: '/src/assets/musics/転がる岩、君に朝が降る.mp3', singer: '结束バンド' },
    { index: 4, name: '星座になれたら', image: '/src/assets/albums/星座になれたら.jpg', src: '/src/assets/musics/星座になれたら.mp3', singer: '结束バンド' },
    { index: 5, name: '青春コンプレックス', image: '/src/assets/albums/結束バンド.jpg', src: '/src/assets/musics/青春コンプレックス.mp3', singer: '结束バンド' },
    { index: 6, name: 'あのバンド', image: '/src/assets/albums/あのバンド.jpg', src: '/src/assets/musics/あのバンド.mp3', singer: '结束バンド' },
    { index: 7, name: 'ギターと孤独と蒼い惑星', image: '/src/assets/albums/ギターと孤独と蒼い惑星.jpg', src: '/src/assets/musics/ギターと孤独と蒼い惑星.mp3', singer: '结束バンド' },
    { index: 8, name: 'milky way', image: '/src/assets/albums/We will.png', src: '/src/assets/musics/milky way.mp3', singer: '结束バンド' },
    { index: 9, name: 'カラカラ', image: '/src/assets/albums/カラカラ.jpg', src: '/src/assets/musics/カラカラ.mp3', singer: '结束バンド' },
]

const playerIcons = [
    "/src/assets/images/icon_play.png",
    "/src/assets/images/icon_pause.png"
]

// 0: pause   1：playing
const playStatu = ref(0);
const activeItem = ref(musics[0]);
const musicProgress = ref(0);
const volumeProgress = ref(50);

// Create audio element
const player = ref(new Audio());
player.value.volume = volumeProgress.value / 100;

const switchMusic = (direction) => {
    let currentIndex = activeItem.value.index - 1;
    let newIndex;
    
    if (direction === 'prev') {
        newIndex = currentIndex - 1 < 0 ? musics.length - 1 : currentIndex - 1;
    } else {
        newIndex = currentIndex + 1 >= musics.length ? 0 : currentIndex + 1;
    }
    
    activeItem.value = musics[newIndex];
    playStatu.value = 1;
    musicProgress.value = 0;
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

// Watch for volume changes
watch(volumeProgress, (newVolume) => {
    player.value.volume = newVolume / 100;
});


const setProgress = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.offsetX;
    const progressBarWidth = progressBar.clientWidth;
    const percentage = (clickPosition / progressBarWidth) * 100;
    musicProgress.value = percentage;
    player.value.currentTime = (percentage / 100) * player.value.duration;
};

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




</script>

<template>
    <div class="player-container">
        <div class="player-select">
            <ul>
                <li v-for="(music, index) in musics" :key="index" :class="{ 'active': activeItem.name === music.name }"
                    @click="activeItem = music">
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
                <div class="volume-bar">
                    <input type="range" v-model="volumeProgress" min="0" max="100" step="1" value="50"
                        oninput="music.volume = this.value/100">
                </div>

                <!-- 音乐进度条 -->
                <div class="music-progress-box" :style="{'--music-progress': musicProgress +'%'}">
                    <div class="progress-fill"></div>
                </div>


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
</template>

<style scoped>
.player-container {
    display: flex;
    width: 80%;
    height: 70vh;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.player-select {
    width: 30%;
    background-color: #f5f5f5;
    overflow-y: auto;
}

.player-select ul {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
}

.player-select ul li {
    list-style: none;
    padding: 15px;
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;
    transition: background-color 0.2s;
}

.player-select ul li:hover {
    background-color: #ebebeb;
}

.player-select ul li.active {
    background-color: #e0e0e0;
}

.music-item {
    display: flex;
    align-items: center;
    gap: 15px;
}

.player-select img {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    object-fit: cover;
}

.music-info {
    display: flex;
    flex-direction: column;
}

.music-title {
    margin: 0;
    font-size: 16px;
    color: #333;
}

.music-singer {
    font-size: 14px;
    color: #666;
}

.player {
    width: 70%;
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.now-playing {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
}

.player-bg {
    width: 350px;
    height: 350px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.6);

    position: relative;
    box-shadow: 0 0 5px #000;
    animation: albums_rotate 10s infinite linear;
}

.player-bg::before {
    content: '';
    width: 270px;
    height: 270px;
    border-radius: 50%;
    background-color: #ffffff93;
    filter: blur(5px);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}


.album-image {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    border-radius: 10px;


}

.player-info h2 {
    margin: 0 0 10px 0;
    font-size: 24px;
    color: #333;
}

.player-info p {
    margin: 0;
    font-size: 16px;
    color: #666;
}

.volume-bar {
    margin-top: 20px;
}

.volume-bar input {
    width: 120px;
}

.music-progress-box {
    width: 500px;
    background: #ddd;
    border-radius: 8px;
    overflow: hidden;
    height: 8px;
    position: relative;
    cursor: pointer;
}

.progress-fill {
    background: linear-gradient(90deg, #ff9eb5, #f06292, #ec407a);
    height: 100%;
    width: var(--music-progress);
    transition: width 0.1s ease;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}

.btn-bar {
    display: flex;
    gap: 80px;
}

.btn-bar div {
    border-radius: 50%;
    background-color: #fff;
    width: 45px;
    height: 45px;
    cursor: pointer;
    margin-top: 20px;
    position: relative;
}

.btn-bar div:hover {
    background-color: #e7e7e7;
}

.btn-bar img {
    position: absolute;
    width: 60%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

input[type=range] {
    /* 清除默认样式 */
    -webkit-appearance: none !important;
    height: 7px;
    /* 轨道高度 */
    background-color: #2b2b2b;
    /* 轨道背景色 */
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    overflow: hidden;
}

input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    height: 7px;
    background-color: #2b2b2b;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    overflow: hidden;
}

input[type=range]::-moz-range-thumb {
    height: 7px;
    background-color: #2b2b2b;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    overflow: hidden;
}

input[type=range]::-webkit-range-progress {
    -webkit-appearance: none;
    background: #ffbebe;
    height: 7px;
    border-radius: 5px;
}




@keyframes albums_rotate {
    from {
        rotate: 0deg;
    }

    to {
        rotate: 360deg;
    }
}
</style>