import { reactive } from 'vue';

// 创建一个响应式的对象，它就是我们所有组件共享的“仓库”
export const userStore = reactive({
    isLoggedIn: false, // 是否已登录
    user: null,        // 用户信息

    /**
     * 初始化状态
     * 在应用加载时，从 localStorage 读取数据来设置初始登录状态
     */
    init() {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('currentUser');
        if (token && userData) {
            this.isLoggedIn = true;
            this.user = JSON.parse(userData);
        }
    },

    /**
     * 登录
     * @param {object} userData 用户数据 (例如 { username: 'test' })
     * @param {string} token 认证令牌
     */
    login(userData, token) {
        localStorage.setItem('currentUser', JSON.stringify(userData));
        localStorage.setItem('authToken', token);
        this.isLoggedIn = true;
        this.user = userData;
    },

    /**
     * 退出登录
     */
    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
        this.isLoggedIn = false;
        this.user = null;
    }
});

// 在文件被导入时，立即执行一次初始化
userStore.init();
