import { reactive } from 'vue';

// 创建一个响应式的对象，它就是我们所有组件共享的"仓库"
export const userStore = reactive({
    isLoggedIn: false,   // 是否已登录
    user: null,          // 用户信息
    accessToken: null,   // 访问令牌（短期有效）
    refreshToken: null,  // 刷新令牌（长期有效）

    /**
     * 初始化状态
     * 在应用加载时，从 localStorage 读取数据来设置初始登录状态
     */
    init() {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const userData = localStorage.getItem('currentUser');
        
        if (accessToken && userData) {
            this.isLoggedIn = true;
            this.user = JSON.parse(userData);
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            
            console.log('✅ 从本地存储恢复登录状态:', this.user);
        }
    },

    /**
     * 登录
     * @param {object} userData 用户数据 (例如 { id: 1, username: 'test' })
     * @param {string} accessToken 访问令牌（短期）
     * @param {string} refreshToken 刷新令牌（长期，可选）
     */
    login(userData, accessToken, refreshToken = null) {
        // 保存到 localStorage
        localStorage.setItem('currentUser', JSON.stringify(userData));
        localStorage.setItem('accessToken', accessToken);
        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        }
        
        // 更新状态
        this.isLoggedIn = true;
        this.user = userData;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        
        console.log('✅ 登录成功:', userData);
    },

    /**
     * 退出登录
     */
    logout() {
        // 清除 localStorage
        localStorage.removeItem('currentUser');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        
        // 清除状态
        this.isLoggedIn = false;
        this.user = null;
        this.accessToken = null;
        this.refreshToken = null;
        
        console.log('✅ 已退出登录');
    },

    /**
     * 获取认证请求头（用于 API 请求）
     * @returns {object} 包含 Authorization 头的对象
     */
    getAuthHeaders() {
        if (!this.accessToken) {
            return {};
        }
        return {
            'Authorization': `Bearer ${this.accessToken}`
        };
    },

    /**
     * 刷新访问令牌
     * @param {string} newAccessToken 新的访问令牌
     */
    updateAccessToken(newAccessToken) {
        this.accessToken = newAccessToken;
        localStorage.setItem('accessToken', newAccessToken);
        console.log('✅ AccessToken 已更新');
    }
});

// 在文件被导入时，立即执行一次初始化
userStore.init();
