<!-- src/components/Header.vue (带测试按钮的临时版本) -->
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentUser = ref(null);

onMounted(() => {
  const userData = localStorage.getItem('currentUser');
  if (userData) {
    currentUser.value = JSON.parse(userData);
  }
});

const goToLogin = () => {
  router.push('/login');
};

const handleLogout = () => {
  localStorage.removeItem('currentUser');
  window.location.reload();
};

// --- [新增] 专门用于测试的函数 ---
const testLikeApi = async () => {
    alert('开始测试收藏API...');
    try {
        const response = await fetch('https://login.kessoku.dpdns.org/api/like', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ songName: 'TEST_SONG' }), // 我们用一个特殊的测试名字
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(`API返回错误: ${JSON.stringify(data)}`);
        }
        
        alert(`测试成功！API返回: ${JSON.stringify(data)}。请立即去D1后台检查数据！`);

    } catch (error) {
        alert(`测试失败！错误信息: ${error.message}`);
    }
};

</script>

<template>
  <header class="site-header">
    <div class="logo">
      <router-link to="/">Bocchi The Rock!</router-link>
    </div>
    <nav class="user-nav">
      <!-- [新增] 这是一个临时的测试按钮 -->
      <button @click="testLikeApi" class="nav-button test-btn">【点我测试收藏API】</button>

      <button v-if="!currentUser" @click="goToLogin" class="nav-button">
        登录/注册
      </button>
      <div v-else class="user-info">
        <span>欢迎, {{ currentUser.username }}</span>
        <button @click="handleLogout" class="nav-button logout">
          退出
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
/* ... (您的样式保持不变) ... */
.test-btn {
    background-color: #ffc107 !important;
    color: black !important;
    border-color: black !important;
    margin-right: 15px;
}
/* ... */
</style>
