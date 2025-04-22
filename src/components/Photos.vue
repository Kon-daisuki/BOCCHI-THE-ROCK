<!-- 
    @Author: Sudoria
-->


<script setup>
import { ref, onMounted } from 'vue';

const photo_list = [
    "/assets/images/p_1.jpeg",
    "/assets/images/p_2.jpeg",
    "/assets/images/p_3.jpeg",
    "/assets/images/p_4.gif",
    "/assets/images/p_5.jpeg",
    "/assets/images/p_6.jpeg",
    "/assets/images/p_7.jpeg",
    "/assets/images/p_8.jpeg",
    "/assets/images/p_9.jpeg",
    "/assets/images/p_10.jpeg",
    "/assets/images/p_11.jpeg",
    "/assets/images/p_12.jpeg",
    "/assets/images/p_13.jpeg",
    "/assets/images/p_14.jpeg",
    "/assets/images/p_15.jpeg",
    "/assets/images/p_16.jpeg",
    "/assets/images/p_17.gif",
    "/assets/images/p_18.gif",
    "/assets/images/p_19.gif",
    "/assets/images/p_20.gif",
    "/assets/images/p_21.gif",
    "/assets/images/p_22.gif",
    "/assets/images/p_23.jpeg",
];

const currentIndex = ref(0);
const animationDuration = ref(photo_list.length * 5);

onMounted(() => {
  const boxesContainers = document.querySelectorAll('.boxes');
  boxesContainers.forEach(container => {
    container.innerHTML += container.innerHTML;
  });
});
</script>

<template>
    <div class="bg"></div>
    <div class="container">
        <div class="scroll-container">
        <ol class="boxes boxes-forward">
            <li class="box" :class="{ selected: i === currentIndex }" v-for="(photo, i) in photo_list" :key="'forward-'+i">
                <img :src="photo" />
            </li>
        </ol>
    </div>
    <div class="scroll-container">
        <ol class="boxes boxes-backward">
            <li class="box" :class="{ selected: i === currentIndex }" v-for="(photo, i) in photo_list" :key="'backward-'+i">
                <img :src="photo" />
            </li>
        </ol>
    </div>
    <div class="scroll-container">
        <ol class="boxes boxes-forward">
            <li class="box" :class="{ selected: i === currentIndex }" v-for="(photo, i) in photo_list" :key="'forward-'+i">
                <img :src="photo" />
            </li>
        </ol>
    </div>

    </div>
    
</template>

<style scoped>
.bg {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: #FFF;

    z-index: -999;

    background: linear-gradient(-45deg, #ff7d996e, #ffc766, #5cb6ff, #ff6363);
    background-size: 300% 300%;
    animation: gradient 15s ease infinite;
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

.scroll-container {
    position: relative;
    margin-top: 20px;
    width: 100vw;
    height: 220px;
}

.boxes {
    position: absolute;
    display: flex;
    height: 100%;
    animation: scroll linear infinite;
    animation-duration: 50s;
}

.boxes-forward {
    animation-name: scrollForward;
}

.boxes-backward {
    animation-name: scrollBackward;
}



@keyframes scrollForward {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}

@keyframes scrollBackward {
    0% {
        transform: translateX(-50%);
    }
    100% {
        transform: translateX(0);
    }
}

.box {
    list-style: none;
    position: relative;
    width: 200px;
    height: 200px;
    flex-shrink: 0;
    margin-right: 5px;
    border: none;
    border-radius: 15px;
    transition: all 0.5s ease;
    box-shadow: 0 0px 5px rgba(0, 0, 0, 0.5);
    opacity: 0.8;
}

.box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 15px;
    transition: all 0.5s ease;
}

.box:hover {
    opacity: 1;
    z-index: 1;
    width: 300px;
    transition: all 0.5s ease;
    transform: rotate(-15deg);
}

.boxes:hover {
    animation-play-state: paused;
}

.boxes-backward .box:hover {
    transform: rotate(15deg);
}
</style>