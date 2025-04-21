<script setup>

const photo_list = [
    "/assets/images/p_1.jpeg",
    "/assets/images/p_2.jpeg",
    "/assets/images/p_3.jpeg",
    "/assets/images/p_4.jpeg",
    "/assets/images/p_5.jpeg",
    "/assets/images/p_6.jpeg",
    "/assets/images/p_7.jpeg",
    "/assets/images/p_8.jpeg",

]

</script>


<template>
    <div class="bg"></div>
    <div class="select-container">
        <div class="carousel">
            <ol class="boxes">
                <li class="box" v-for="photo, i in photo_list" :key="i">
                    <img :src='photo' />
                </li>
            </ol>
        </div>
        <div class="arrows">
            <
        </div>
    </div>



    <div class="image-container">

    </div>
</template>


<style scoped>

.bg {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(-45deg, #2c2126, #2b271f, #1f262b, #342626);
    z-index: -999;
}

.select-container {
    width: 50vw;
    height: 80vh;
    background-color: rgb(255, 255, 255, 0.3);
}

</style>