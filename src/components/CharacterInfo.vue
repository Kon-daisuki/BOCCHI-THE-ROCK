<style scoped>
.bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #141414; }
.info-container { width: 100%; height: 100%; position: relative; overflow: hidden; display: flex; }

/* --- 默认桌面端样式 --- */
.left-part { position: relative; overflow: hidden; }
.left-part img { height: 100%; }
.box-cover { position: absolute; left: -100%; top: 0; height: 100%; width: 100%; background-color: var(--highlight-color); }
.select-part { position: absolute; bottom: 20px; left: 20px; z-index: 20; }
.select-part ul { display: flex; padding-left: 0; }
.select-part li { position: relative; list-style: none; width: 80px; height: 80px; align-self: flex-end; transition: all 0.3s; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.5); }
.select-part li.selected, .select-part li:hover { width: 100px; height: 100px; }
.select-part img { height: 100%; width: 100%; object-fit: cover; object-position: top; }
.select-part li::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; transition: all 0.3s; pointer-events: none; }
.select-part li.selected::before, .select-part li:hover::before { box-shadow: inset 0 0 0 5px var(--highlight-color); }
.right-part { display: flex; flex: 1; position: relative; }
.instrument-content { font-size: 20em; font-family: '黑体'; font-weight: bolder; color: #141414; text-shadow: 0 0 1px #fff; position: absolute; top: 5%; z-index: -3; }
.character-line { left: 5%; top: 15%; padding: 30px; font-size: 1.5em; position: absolute; display: flex; flex-direction: column; justify-items: center; align-items: flex-start; color: var(--highlight-color); font-family: '宋体'; transition: color 1.5s; }
.character-line::before, .character-line::after { content: ""; position: absolute; width: 55px; height: 55px; } .character-line::before { top: 0; left: 0; border-top: 2px solid var(--highlight-color); border-left: 2px solid var(--highlight-color); transition: border 1.5s; } .character-line::after { bottom: 0; right: 0; border-right: 2px solid var(--highlight-color); border-bottom: 2px solid var(--highlight-color); transition: border 1.5s; }
.line-container { position: absolute; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; width: 100%; height: 20vh; overflow: hidden; }
.romaji-line { font-size: 1.4em; white-space: nowrap; color: var(--highlight-color); font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; transition: color 1.5s; } .romaji-line:hover .scroll-wrapper { animation-play-state: paused; } .scroll-wrapper { display: inline-block; animation: scrollRomaji 25s linear infinite; } .scroll-romaji { display: inline-block; padding-right: 2em; }
@keyframes scrollRomaji { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
.name-line { display: flex; justify-content: flex-start; background-color: var(--highlight-color); color: #000; font-size: 3rem; z-index: -1; text-indent: 2em; font-family: 'Aa幻梦空间像素体'; transition: background-color 1.5s; }
.character-head { justify-self: flex-start; align-self: flex-start; z-index: 0; }
.character-head img { height: 50vh; margin-left: 10%; opacity: 0.25; }
.character-image { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); }
.character-image img { height: 90vh; transition: all 0.3s; }
.character-image img:hover { transform: scale(1.1); transition: all 0.3s ease; }
.character-desc { z-index: 2; position: absolute; top: 60%; left: 5%; align-items: center; width: 30%; display: flex; flex-wrap: wrap; justify-content: space-between; color: #fff; }
.cv-logo { background-color: var(--highlight-color); border-radius: 100%; padding: 0.4em; transition: background-color 1.5s; }
.cv-name { margin-left: 20px; font-size: 1.2em; } .cv-instrument { color: var(--highlight-color); transition: color 1.5s; } .cv-info { margin-top: 10px; color: #fff; font-size: 0.5em; border-bottom: 1px solid #fff; width: 100%; text-align: left; font-weight: bold; } .desc-content { margin-top: 15px; text-align: left; font-family: '宋体'; font-size: 1.2em; }
.logo { position: absolute; left: 60%; top: 70%; z-index: 5; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease, transform 0.5s ease; } .fade-enter-from { opacity: 0; transform: translateY(20px); } .fade-leave-to { opacity: 0; transform: translateY(-20px); }
.slip-enter-active, .slip-leave-active { transition: left 0.5s ease, background-color 0.4s ease; } .slip-leave-to { left: 0; } .slip-leave-from { left: -100%; background-color: var(--last-hightlight-color); } .slip-enter-from { left: 0; background-color: var(--highlight-color); } .slip-enter-to { left: 100%; }
.wait-enter-active, .wait-leave-active { transition: all 0.5s ease; }

/* --- 新增平板样式 --- */
/* 适用于屏幕宽度在 769px 到 1024px 之间的设备 */
@media (min-width: 769px) and (max-width: 1024px) {
    .left-part {
        display: none; /* 在平板上隐藏左侧海报图，为右侧内容腾出空间 */
    }
    .right-part {
        flex-basis: 100%; /* 让右侧部分占据全部宽度 */
    }
    .character-image img {
        height: 85vh; /* 稍微缩小人物立绘 */
        left: 45%; /* 调整立绘位置，使其更居中 */
    }
    .character-desc {
        width: 45%; /* 增加描述文字区域的宽度 */
        left: 2%; /* 调整位置 */
        top: 55%;
        font-size: 0.9em; /* 适当缩小字体 */
    }
    .character-line {
        font-size: 1.2em; /* 缩小台词字体 */
        padding: 20px;
        left: 2%;
    }
    .line-container {
        height: 18vh; /* 调整滚动文字容器高度 */
    }
    .name-line {
        font-size: 2.5rem; /* 调整名字大小 */
    }
    .instrument-content, .character-head, .logo {
        display: none; /* 隐藏一些装饰性元素，避免拥挤 */
    }
    .select-part {
        left: 50%;
        transform: translateX(-50%); /* 将选择器移动到中间 */
        bottom: 10px;
    }
    .select-part li { width: 60px; height: 60px; }
    .select-part li.selected, .select-part li:hover { width: 75px; height: 75px; }
}
/* --- 平板样式结束 --- */


/* --- 您的手机端样式 (保持不变) --- */
@media (max-width: 768px) {
    .bg { position: relative; z-index: 0; }
    .bg::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--highlight-color) 25%, transparent), transparent 70%); z-index: -1; transition: background 0.5s ease; }
    .info-container { padding-bottom: 10px; }
    .left-part { display: none; }
    .right-part { width: 100%; }
    .character-image { z-index: 2; }
    .character-image img { height: 70vh; object-fit: contain; }
    .character-head, .character-line, .instrument-content, .logo { display: none; }
    .line-container { top: auto; bottom: 95px; transform: none; height: auto; z-index: 10; }
    .name-line { font-size: 1.8rem; text-indent: 1em; }
    .romaji-line { font-size: 0.9em; }
    .character-desc { top: auto; bottom: 170px; width: 90%; left: 5%; font-size: 0.8em; background-color: rgba(0,0,0,0.6); padding: 10px; border-radius: 8px; z-index: 10; }
    .select-part { left: 0; bottom: 15px; width: 100%; background-color: transparent; z-index: 10; }
    .select-part ul { justify-content: center; gap: 8px; }
    .select-part li { width: 55px; height: 55px; }
    .select-part li.selected, .select-part li:hover { width: 70px; height: 70px; }
}
</style>
