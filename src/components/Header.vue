<script setup>
const props = defineProps({
  activeSection: String
});

const emit = defineEmits(['nav-click']);

const nav = [
  {title: '主页', to: '#section1'},
  {title: '角色', to: '#section2'},
  {title: '音乐', to: '#section3'},
  {title: '相册', to: '#section4'},
  {title: '关于', to: '#section5'},
];

const handleClick = (e, to) => {
  e.preventDefault();
  emit('nav-click', to);
};
</script>

<template>
  <div class="header">
    <img class="logo" src="@/assets/images/logo_movie_cn.png"/>
    <div class="nav">
      <ul>
        <li 
          v-for="i in nav" 
          :key="i.title" 
          :class="{ active: i.to === `#${activeSection}` }"
        >
          <a 
            :href="i.to" 
            @click="(e) => handleClick(e, i.to)"
          >
            {{ i.title }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.35);
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px; 
}

.logo{
  height: 35px;

}

.nav {
  position: absolute; /* 关键改动 */
  left: 50%;
  transform: translateX(-50%);
}


.nav ul {
  display: flex;
  margin: 0;
  padding: 0;
  height: 100%;
  gap: 20px; 
  justify-self: center;
}

.nav li {
  list-style: none;
  color: white; 
  cursor: pointer;
  
  transition: all 0.3s ease;
}

.nav li:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

.nav li a {
  text-decoration: none;
  color: #fff;
}

.nav li.active a {
  font-weight: 700;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}
</style>