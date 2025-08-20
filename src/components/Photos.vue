<style scoped>
.bg { position: relative; width: 100%; height: 100%; background-color: #FFF; z-index: 0; background: linear-gradient(-45deg, #ff7d996e, #ffc766, #5cb6ff, #ff6363); background-size: 300% 300%; animation: gradient 15s ease infinite; display: flex; justify-content: center; align-items: center; }
.container { width: 100%; }
@keyframes gradient { 0% { background-position: 0% 0%; } 50% { background-position: 100% 100%; } 100% { background-position: 0% 0%; } }

/* 这是默认的桌面端样式 */
.scroll-container { position: relative; margin-top: 20px; width: 100vw; height: 250px; }
.boxes { position: absolute; display: flex; height: 100%; animation: scroll linear infinite; animation-duration: 50s; gap: 20px ; margin-top: 60px; padding-left: 0; }
.box { list-style: none; position: relative; width: 200px; height: 200px; flex-shrink: 0; margin-right: 5px; border: none; border-radius: 15px; transition: all 0.5s ease; box-shadow: 0 0px 5px rgba(0, 0, 0, 0.5); opacity: 0.8; transform: perspective(100px) rotateY(-15deg); }

.boxes-forward { animation-name: scrollForward; }
.boxes-backward { animation-name: scrollBackward; }
@keyframes scrollForward { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
@keyframes scrollBackward { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }

.box img { width: 100%; height: 100%; object-fit: cover; object-position: center; border-radius: 15px; transition: all 0.8s ease; }
.box:hover { opacity: 1; z-index: 1; width: 300px; transition: all 0.5s ease; transform: scale(1.1); }
.boxes:hover { animation-play-state: paused; }
.boxes-backward .box { transform: perspective(100px) rotateY(15deg); }
.boxes-backward .box:hover { transform: scale(1.1); }


/* --- 新增平板样式 --- */
/* 适用于屏幕宽度在 769px 到 1024px 之间的设备 */
@media (min-width: 769px) and (max-width: 1024px) {
    .scroll-container {
        height: 200px; /* 行高调整为中间值 */
        margin-top: 15px;
    }
    .boxes {
        margin-top: 30px; /* 顶部边距调整 */
        gap: 15px; /* 间距调整 */
    }
    .box {
        width: 160px; /* 图片尺寸调整为中间值 */
        height: 160px;
    }
    .box:hover {
        width: 240px; /* 悬停时放大尺寸也相应调整 */
    }
}
/* --- 平板样式结束 --- */


/* 这是您的手机端样式 (保持不变) */
@media (max-width: 768px) {
    .container { padding-top: 0; }
    .scroll-container { height: 150px; margin-top: 10px; }
    .boxes { margin-top: 15px; gap: 10px; }
    .box { width: 120px; height: 120px; }
    .box:hover {
        width: 200px;
        transform: scale(1.05) rotateY(0);
    }
    .boxes-backward .box:hover {
        transform: scale(1.05) rotateY(0);
    }
}
</style>
