<!-- 
    @Author: Sudoria
-->


<script setup>
import { onMounted, ref, watch } from 'vue';

const musics = [
    { index: 1, name: 'Distortion!!', duration: '03:23', image: '/assets/albums/Distortion!!.jpg', src: '/assets/musics/Distortion!!.mp3', singer: '结束バンド' },
    { index: 2, name: 'なにが悪い', duration: '03:47', image: '/assets/albums/なにが悪い.jpg', src: '/assets/musics/なにが悪い.mp3', singer: '结束バンド' },
    { index: 3, name: '転がる岩、君に朝が降る', duration: '04:31', image: '/assets/albums/転がる岩、君に朝が降る.jpg', src: '/assets/musics/転がる岩、君に朝が降る.mp3', singer: '结束バンド' },
    { index: 4, name: '星座になれたら', duration: '04:18', image: '/assets/albums/星座になれたら.jpg', src: '/assets/musics/星座になれたら.mp3', singer: '结束バンド' },
    { index: 5, name: '青春コンプレックス', duration: '03:23', image: '/assets/albums/結束バンド.jpg', src: '/assets/musics/青春コンプレックス.mp3', singer: '结束バンド' },
    { index: 6, name: 'あのバンド', duration: '03:33', image: '/assets/albums/あのバンド.jpg', src: '/assets/musics/あのバンド.mp3', singer: '结束バンド' },
    { index: 7, name: 'ギターと孤独と蒼い惑星', duration: '03:48', image: '/assets/albums/ギターと孤独と蒼い惑星.jpg', src: '/assets/musics/ギターと孤独と蒼い惑星.mp3', singer: '结束バンド' },
    { index: 8, name: 'milky way', duration: '03:32', image: '/assets/albums/We will.png', src: '/assets/musics/milky way.mp3', singer: '结束バンド' },
    { index: 9, name: 'カラカラ', duration: '04:25', image: '/assets/albums/カラカラ.jpg', src: '/assets/musics/カラカラ.mp3', singer: '结束バンド' },
    { index: 10, name: '忘れてやらない', duration: '03:43', image: '/assets/albums/ぼっち・ざ・ろっく! vol.6 特典CD.jpg', src: '/assets/musics/忘れてやらない.mp3', singer: '结束バンド' },
    { index: 11, name: '光の中へ', duration: '04:18', image: '/assets/albums/光の中へ.jpg', src: '/assets/musics/光の中へ.mp3', singer: '结束バンド' },
    { index: 12, name: 'ひとりぼっち東京', duration: '03:52', image: '/assets/albums/ひとりぼっち東京.jpg', src: '/assets/musics/ひとりぼっち東京.mp3', singer: '结束バンド' },
    { index: 13, name: '小さな海', duration: '03:43', image: '/assets/albums/結束バンド.jpg', src: '/assets/musics/カラカラ.mp3', singer: '结束バンド' },

]

const playerIcons = [
    "/assets/images/icon_play.png",
    "/assets/images/icon_pause.png"
]

// 0: pause   1：playing
const playStatu = ref(0);
const activeItem = ref(musics[0]);
const musicProgress = ref(0);
const volumeProgress = ref(5);

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


watch(volumeProgress, (newVolume) => {
    player.value.volume = newVolume / 100;
});

// 在播放状态变化时更新音符动画
watch(playStatu, (newVal) => {
    document.documentElement.style.setProperty(
        '--animation-state',
        newVal === 1 ? 'running' : 'paused'
    );
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
    player.value.volume = percentage / 100;
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

        // 减慢滚动速度
        yourElement.scrollTop += e.deltaY * 0.5;
    });
});


</script>

<template>
    <div class="bg">
        <div class="music-note note1">♪</div>
        <div class="music-note note2">♫</div>
        <div class="music-note note3">♩</div>
        <div class="music-note note4">♬</div>
        <div class="music-note note5">♪</div>
        <div class="music-note note6">♫</div>
        <div class="music-note note7">♩</div>
        <div class="music-note note8">♬</div>

        <div class="player-container">
            <div class="player-select">
                <ul>
                    <li v-for="(music, index) in musics" :key="index"
                        :class="{ 'active': activeItem.name === music.name }"
                        @click="activeItem = music; updateProgress();">
                        <div class="music-item">
                            <img :src="music.image" :alt="music.name" />
                            <div class="music-info">
                                <span class="music-title">{{ music.name }}</span>
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
                            <span class="icon-defuse">
                                <img src="/assets/images/icon_defuse.png" />
                            </span>
                            <div class="volume-progress-box" :style="{ '--volume-progress': volumeProgress + '%' }"
                                @click="onVolumeProgressClicked($event)">
                                <div class="volume-progress-fill"></div>
                            </div>
                            <span class="icon-add">
                                <img src="/assets/images/icon_add.png" />
                            </span>
                        </div>

                        <!-- 控制面板 -->
                        <div class="control-panel">
                            <span>
                                <img src="/assets/images/icon_like.png" />
                            </span>
                            <span>
                                <img src="/assets/images/icon_mode.png" />
                            </span>
                            <span>
                                <img src="/assets/images/icon_mv.png" />
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
                                <img src="/assets/images/icon_last.png" />
                            </div>

                            <!-- 播放、暂停 -->
                            <div>
                                <img @click="switchStatu()" :src="playerIcons[playStatu]" />
                            </div>

                            <!-- 下一首 -->
                            <div @click="switchMusic(activeItem.index)">
                                <img src="/assets/images/icon_next.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
.bg {
    position: relative;
    overflow: hidden;

    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(90deg,
            #ff86be 0%,
            #ffd859 25%,
            #5ad0ff 50%,
            #ff5656 75%);
    background-size: 300% 300%;
    /* 修改为百分比值 */
    animation: gradient 15s ease infinite;
    /* 延长动画时间，移除linear */
    animation-play-state: var(--animation-state, paused);
}

.music-note {
    position: absolute;
    color: rgba(255, 255, 255, 0.7);
    font-size: 60px;
    z-index: 0;
    opacity: 0;
    animation: floatNote 8s linear infinite;
    pointer-events: none;
    user-select: none;
    z-index: 0;
}

.note1 {
    top: 20%;
    left: 10%;
    animation-delay: 1s;
}

.note2 {
    top: 70%;
    left: 15%;
    animation-delay: 1s;
}

.note3 {
    top: 40%;
    left: 85%;
    animation-delay: 1s;
}

.note4 {
    top: 80%;
    left: 90%;
    animation-delay: 1s;
}


.note5 {
    top: 70%;
    left: 20%;
    animation-delay: 1s;
}

.note6 {
    top: 20%;
    left: 55%;
    animation-delay: 1s;
}

.note7 {
    top: 60%;
    left: 2%;
    animation-delay: 1s;
}

.note8 {
    top: 80%;
    left: 30%;
    animation-delay: 1s;
}

/* 音符浮动动画 */
@keyframes floatNote {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0;
    }

    10% {
        opacity: 0.7;
    }

    90% {
        opacity: 0.7;
    }

    100% {
        transform: translateY(-100px) rotate(360deg);
        opacity: 0;
    }
}

/* 播放时音符动画更活跃 */
.bg .music-note {
    animation-play-state: var(--animation-state, paused);
}

@keyframes gradient {
    0% {
        background-position: 0% 0%;
    }

    50% {
        background-position: 100% 100%;
    }

    100% {
        background-position: 0% 0%;
    }
}

.player-container {
    display: flex;
    width: 80%;
    min-width: 900px;
    max-width: 1200px;
    height: 80vh;
    min-height: 600px;
    background-color: rgba(255, 255, 255, 0.5);
    border-right: 1px solid rgba(170, 170, 170, 0.3);

    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 5px 8px rgba(81, 81, 81, 0.5);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.player-select {
    width: 35%;
    background-color: rgba(255, 255, 255, 0.5);
    overflow-y: auto;
    border-right: 1px solid #e0e0e0;
    /* 新增滚动条样式 */
    scrollbar-width: none;

}

/* 滚动条轨道 */
.player-select::-webkit-scrollbar {
    width: 6px;
    background-color: transparent;
}

/* 滚动条滑块 */
.player-select::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 3px;
    border: none;
}

/* 滚动条轨道背景 */
.player-select::-webkit-scrollbar-track {
    background-color: transparent;
    margin: 8px 0;
}

.player-select ul {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
}

.player-select ul li {
    list-style: none;
    padding: 5px 16px;
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
}

.player-select ul li:hover {
    background-color: #f0f0f0;
}

.player-select ul li.active {
    background-color: #e8e8e8;
    border-right: 4px solid #ec407a;
}

.music-item {
    height: 60px;
    /* 增加高度确保内容完整显示 */
    display: flex;
    gap: 12px;
    /* 调整间距 */
    width: 100%;
    /* 确保宽度填满容器 */
    min-width: 0;
    /* 防止flex项目溢出 */
}


.player-select img {
    height: 95%;
    border-radius: 8px;
    object-fit: cover;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.music-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    overflow: hidden;
}

.music-title {
    font-size: 16px;
    color: #333;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
    text-align: left;

}

.music-singer {
    font-size: 13px;
    color: #777;
    text-align: left;
    line-height: 1.2;
}

.player {
    width: 65%;
    display: flex;
    flex-direction: column;
    padding: 30px;
    box-sizing: border-box;
    backdrop-filter: blur(2rem);

    box-shadow: 2px 2px 5px #666;
}

.now-playing {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: space-between;


}

.player-bg {
    width: 280px;
    height: 280px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-color: #fff;
    position: relative;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    animation: albums_rotate 15s infinite linear;
    backdrop-filter: blur(3px);
}

.album-image {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: all 0.4s ease;

}

.album-image:hover {
    width: 220px;
    height: 220px;
    animation: shiny 5s infinite linear;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); /* 添加初始阴影 */
    transition: all 0.4s ease, box-shadow 0.5s ease; /* 分开定义过渡 */
}

@keyframes shiny {
    0% {
        box-shadow: 0 0 10px rgba(255, 113, 201, 0.7);
    }
    25% {
        box-shadow: 0 0 24px #ff71c9;
    }
    50% {
        box-shadow: 0 0 34px #ffd261;
    }
    75% {
        box-shadow: 0 0 44px #47d7ff;
    }
    100% {
        box-shadow: 0 0 10px rgba(255, 101, 101, 0.7); /* 回到柔和状态 */
    }
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
    transform: translateY(-40%);
}

.volume-progress-fill {
    background: linear-gradient(90deg, rgb(167, 255, 227), #ffe047);
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
    background: linear-gradient(90deg, #ffc4da, #ff727e);
    height: 100%;
    width: var(--music-progress);
    transition: width 0.1s ease;
}

.current-time,
.duration-time {
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


/* 播放钮 */
.btn-bar div:nth-child(2) {
    width: 60px;
    height: 60px;
    background-color: #ffc6e9;
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