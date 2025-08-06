<!-- 
    @Author: Sudoria
    [最终交付版 - 全歌曲日中双语歌词 & UI重构]
-->
<script setup>
import { onMounted, ref, watch, computed } from 'vue';

// [最终交付] 为全部13首歌曲添加了完整的日中双语歌词
const musics = [
    { 
        index: 1, name: 'Distortion!!', duration: '03:23', image: '/assets/albums/Distortion!!.jpg', src: '/assets/musics/Distortion!!.mp3', singer: '结束バンド' , bvid:'BV1ng411h71y',
        lyrics: `
[00:13.56]歪んでるギターの音 | 失真吉他的声响
[00:16.41]カレンダーの日付も | 日历上的日期也好
[00:19.46]飛んでっちまう程のノイズ | 仿佛要飞散而去的噪音
[00:24.52]頭ん中ループしてる | 在脑海中循环往复
[00:28.16]感電してるみたいなフェイク | 如同触电般的假动作
[00:32.22]どうしようもないくらいのヘイト | 无可奈何的憎恶
[00:35.31]掻き消すための術 | 为将其抹去的方法
[00:38.25]言葉じゃ足りないくらいのイメージ | 是言语所不足以描绘的印象
[00:43.76]ああもう全部めちゃくちゃだ | 啊啊 一切都已混乱不堪
[00:49.73]だけどそれが心地良い | 但那却令人心情舒畅
[00:55.33]鳴らせ歪暴 Distortion!! | 奏响吧 扭曲的失真！！
[01:01.27]ありのままじゃいられない | 无法安于现状
[01:04.28]心の形ねじ曲げてやるんだ | 我要将心的形状扭曲
[01:07.24]感情のボリュームを上げて | 将感情的音量调大
[01:10.23]爆音で歪ませてくれ | 用爆音让其失真吧
[01:25.75]傷だらけギターの音 | 遍体鳞伤的吉他声响
[01:28.52]擦り切れたピックの跡 | 磨损不堪的拨片痕迹
[01:31.57]何もかもが僕のノイズ | 一切都是我的噪音
[01:36.65]頭ん中ループしてる | 在脑海中循环往复
[01:40.28]壊れてるみたいなエフェクト | 如同损坏般的效果器
[01:44.40]どうしようもないくらいのヘイト | 无可奈何的憎恶
[01:47.41]掻き消すための術 | 为将其抹去的方法
[01:50.39]言葉じゃ伝わんないくらいのイメージ | 是言语所无法传达的印象
[01:55.93]ああもう全部めちゃくちゃだ | 啊啊 一切都已混乱不堪
[02:01.83]だけどそれが心地良い | 但那却令人心情舒畅
[02:07.41]鳴らせ歪暴 Distortion!! | 奏响吧 扭曲的失真！！
[02:13.43]ありのままじゃいられない | 无法安于现状
[02:16.38]心の形ねじ曲げてやるんだ | 我要将心的形状扭曲
[02:19.42]感情のボリュームを上げて | 将感情的音量调大
[02:22.34]爆音で歪ませてくれ | 用爆音让其失真吧
[02:51.27]鳴らせ歪暴 Distortion!! | 奏响吧 扭曲的失真！！
[02:57.14]ありのままじゃいられない | 无法安于现状
[03:00.12]心の形ねじ曲げてやるんだ | 我要将心的形状扭曲
[03:03.18]感情のボリュームを上げて | 将感情的音量调大
[03:06.12]爆音で歪ませてくれ | 用爆音让其失真吧
[03:09.11]鳴らせ歪暴 Distortion!! | 奏响吧 扭曲的失真！！
[03:15.02]ありのままじゃいられない | 无法安于现状
[03:18.00]心の形ねじ曲げてやるんだ | 我要将心的形状扭曲
[03:21.04]感情のボリュームを上げて | 将感情的音量调大
[03:23.99]爆音で歪ませてくれ | 用爆音让其失真吧
`
    },
    { 
        index: 2, name: 'milky way', duration: '03:32', image: '/assets/albums/We will.png', src: '/assets/musics/milky way.mp3', singer: '结束バンド' , bvid:'',
        lyrics: `
[00:13.25]夏の星座に手を伸ばした | 向夏日的星座伸出手
[00:19.01]一番星 指先でなぞる | 用指尖描摹着第一颗星
[00:24.78]私の声は届きますか | 我的声音能够传达到吗
[00:30.56]あなたの元へ | 传达到你的所在之处
[00:35.39]降り注ぐ星の雨 | 倾盆而下的星之雨
[00:41.27]願いを込めて | 包含着我的心愿
[00:46.78]ああ どうか | 啊啊 无论如何
[00:52.48]消えないでいて | 请不要消失
[00:58.07]ああ どうか | 啊啊 无论如何
[01:03.92]忘れないでいて | 请不要忘记我
[01:21.01]夏の星座に手を伸ばした | 向夏日的星座伸出手
[01:26.78]一番星 指先でなぞる | 用指尖描摹着第一颗星
[01:32.55]私の声は届きますか | 我的声音能够传达到吗
[01:38.30]あなたの元へ | 传达到你的所在之处
[01:43.20]降り注ぐ星の雨 | 倾盆而下的星之雨
[01:49.03]願いを込めて | 包含着我的心愿
[01:54.51]ああ どうか | 啊啊 无论如何
[02:00.27]消えないでいて | 请不要消失
[02:05.84]ああ どうか | 啊啊 无论如何
[02:11.75]忘れないでいて | 请不要忘记我
[02:40.83]ああ どうか | 啊啊 无论如何
[02:46.46]消えないでいて | 请不要消失
[02:52.09]ああ どうか | 啊啊 无论如何
[02:57.97]忘れないでいて | 请不要忘记我
`
    },
    { 
        index: 3, name: 'あのバンド', duration: '03:33', image: '/assets/albums/あのバンド.jpg', src: '/assets/musics/あのバンド.mp3', singer: '结束バンド' , bvid:'',
        lyrics: `
[00:12.18]「馬鹿な夢」だと | 你说着「真是愚蠢的梦想」
[00:14.39]お前は言うだろう | 嗤笑着我吧
[00:17.38]どうせ いくつもの | 反正 无论多少个
[00:19.98]挫折の末の結論だろう | 终究会是挫折后的结论吧
[00:23.01]「馬鹿な夢」だと | 「真是愚蠢的梦想」
[00:25.33]お前は言うだろう | 你嗤笑着我吧
[00:28.25]違う そうじゃない | 不是的 才不是那样
[00:30.93]聴けよ 僕の歌を | 听好了 我的歌
[00:33.79]傘もささずに原付で走る | 连伞也不撑 就骑着摩托狂奔
[00:39.26]錆びたギターケースとばして | 生锈的吉他盒被甩在一旁
[00:44.75]猫の背中が丸くなる | 猫咪蜷缩起后背
[00:49.88]僕には関係ないけどさ | 虽然与我无关
[00:55.70]あのバンドに僕 | 我加入了那个乐队
[01:01.10]入れてくれなんて言えない | 请让我加入之类的话说不出口
[01:06.67]僕の歌 この声じゃ | 我的歌 用这副声音
[01:12.06]どうせ誰も救えやしない | 反正谁也拯救不了
[01:28.53]「馬鹿な夢」だと | 「真是愚蠢的梦想」
[01:30.73]お前は言うだろう | 你嗤笑着我吧
[01:33.74]どうせ 雨の中 | 反正 在雨中
[01:36.32]ずぶ濡れのまま鳴らすんだろう | 就会浑身湿透地鸣响吧
[01:39.38]「馬鹿な夢」だと | 「真是愚蠢的梦想」
[01:41.69]お前は言うだろう | 你嗤笑着我吧
[01:44.60]違う そうじゃない | 不是的 才不是那样
[01:47.30]聴けよ 僕の歌を | 听好了 我的歌
[01:50.14]天気予報じゃ雨だって言ってた | 天气预报说会下雨
[01:55.61]別に信じたわけじゃないけど | 虽然我并没有相信
[02:01.07]雷が鳴って光って | 雷声轰鸣电光闪烁
[02:06.26]世界がわっと色を変えた | 世界哗地一下改变了颜色
[02:12.10]あのバンドに僕 | 我加入了那个乐队
// =================== 請從這裡開始複製 ===================
    { 
        index: 4, name: 'なにが悪い', duration: '03:47', image: '/assets/albums/なにが悪い.jpg', src: '/assets/musics/なにが悪い.mp3', singer: '结束バンド' , bvid:'',
        lyrics: `
[00:13.91]くだらないことばかりさ | 净是些鸡毛蒜皮的小事
[00:17.38]人生はいつだって | 人生无论何时
[00:20.61]なのにどうして | 但又是为何
[00:23.10]僕らはいつまでも | 我们无论何时
[00:25.99]悩んでるんだろうな | 都在烦恼着呢
[00:29.62]普通の女の子になりたかった | 我想成为普通的女孩
[00:33.37]そんなこと言ったって | 就算那么说
[00:35.88]普通がどんなもんか知らないや | 我也不知道普通是什么样
[00:40.80]今日もまた雑踏に | 今天也再次在人潮中
[00:44.20]息を潜めている | 屏住呼吸
[00:47.33]どうしたって僕は僕でしかない | 无论如何我只是我
[00:52.41]君だって君でしかないんだぜ | 你也只是你而已
[00:58.20]僕ら必死に生きてるだけ | 我们只是在拼命地活着
[01:03.95]なにが悪い | 有什么错
[01:09.64]今日も必死に生きてるだけ | 今天也只是拼命地活着
[01:15.38]なにが悪い | 有什么错
[01:32.49]言いたいことなんてないさ | 我没有什么想说的话
[01:36.00]本当はいつだって | 其实无论何时
[01:39.13]なのにどうして | 但又是为何
[01:41.67]喉の奥の方 | 喉咙深处
[01:44.47]つっかえてるんだろうな | 像被什么哽住了呢
[01:48.24]明るい人になろうとした | 我曾想成为开朗的人
[01:51.90]無理だってわかってた | 我知道那是不可能的
[01:54.38]日陰で咲く花だってあるだろう | 也有在阴影中绽放的花吧
[01:59.39]今日もまた劣等感 | 今天也再次与自卑感
[02:02.82]引きずって歩いてる | 一同拖着沉重的步伐
[02:05.90]どうしたって僕は僕でしかない | 无论如何我只是我
[02:10.97]君だって君でしかないんだぜ | 你也只是你而已
[02:16.74]僕ら必死に生きてるだけ | 我们只是在拼命地活着
[02:22.50]なにが悪い | 有什么错
[02:28.18]今日も必死に生きてるだけ | 今天也只是拼命地活着
[02:33.95]なにが悪い | 有什么错
[02:51.27]僕ら必死に生きてるだけ | 我们只是在拼命地活着
[02:56.97]なにが悪い | 有什么错
[03:02.72]今日も必死に生きてるだけ | 今天也只是拼命地活着
[03:08.41]なにが悪い | 有什么错
[03:14.15]僕ら必死に生きてるだけ | 我们只是在拼命地活着
[03:19.89]なにが悪い | 有什么错
[03:25.61]今日も必死に生きてるだけ | 今天也只是拼命地活着
[03:31.33]なにが悪い | 有什么错
`
    },
    { 
        index: 5, name: 'ひとりぼっち東京', duration: '03:52', image: '/assets/albums/ひとりぼっち東京.jpg', src: '/assets/musics/ひとりぼっち東京.mp3', singer: '结束バンド' , bvid:'',
        lyrics: `
[00:15.18]かき鳴らせ | 尽情地弹奏吧
[00:16.82]光の残像よ | 光之残像啊
[00:20.70]焼き尽くせ | 燃烧殆尽吧
[00:22.37]何もかも | 一切的一切
[00:26.40]かき鳴らせ | 尽情地弹奏吧
[00:28.05]明日も昨日の僕らも | 无论是明天 还是昨天的我们
[00:32.74]ぶっ飛ばしていくんだよ | 都要一并击飞啊
[00:36.56]東京の喧騒に | 在东京的喧嚣中
[00:40.09]心拍数が上がっていく | 心跳数不断上升
[00:45.38]押し寄せる人の波に | 在汹涌的人潮中
[00:48.86]溺れそうになる | 仿佛就要溺水
[00:52.41]いつか描いた地平線は | 曾几何时描绘的地平线
[00:57.19]コンクリートの壁に塞がれて | 被混凝土的墙壁所阻挡
[01:03.58]それでも僕らは | 即使如此我们
[01:05.91]息を吸って吐いて | 仍旧呼吸着
[01:09.11]どうにかこうにか生きている | 想方设法地活下去
[01:13.06]かき鳴らせ | 尽情地弹奏吧
[01:14.61]光の残像よ | 光之残像啊
[01:18.52]焼き尽くせ | 燃烧殆尽吧
[01:20.21]何もかも | 一切的一切
[01:24.23]かき鳴らせ | 尽情地弹奏吧
[01:25.86]明日も昨日の僕らも | 无论是明天 还是昨天的我们
[01:30.58]ぶっ飛ばしていくんだよ | 都要一并击飞啊
[01:45.69]東京の星空は | 东京的星空
[01:49.19]全然これっぽっちも見えない | 完全一点也看不见
[01:54.51]押し殺したため息で | 因强忍住的叹息
[01:57.94]街が全部滲んで見える | 整条街道都变得模糊
[02:01.53]いつか夢見たステージは | 曾几何时梦想的舞台
[02:06.33]満員電車に揺られて | 在满员电车中摇晃
[02:12.75]それでも僕らは | 即使如此我们
[02:15.11]音を鳴らして吐いて | 仍旧鸣响着音符
[02:18.25]どうにかこうにか生きている | 想方设法地活下去
[02:45.54]かき鳴らせ | 尽情地弹奏吧
[02:47.19]光の残像よ | 光之残像啊
[02:51.10]焼き尽くせ | 燃烧殆尽吧
[02:52.79]何もかも | 一切的一切
[02:56.84]かき鳴らせ | 尽情地弹奏吧
[02:58.46]明日も昨日の僕らも | 无论是明天 还是昨天的我们
[03:03.14]ぶっ飛ばしていくんだよ | 都要一并击飞啊
`
    },
    { 
        index: 6, name: 'カラカラ', duration: '04:25', image: '/assets/albums/カラカラ.jpg', src: '/assets/musics/カラカラ.mp3', singer: '结束バンド' , bvid:'',
        lyrics: `
[00:15.55]カラカラに乾いてる | 干涸得一干二净
[00:21.28]何もかもが歪んで見える | 一切都看起来扭曲了
[00:27.10]偽物の花が咲いてる | 虚伪的花朵正在绽放
[00:32.83]メッキの蝶が舞ってる | 镀金的蝴蝶正在飞舞
[00:38.64]嫌になるぜ | 真是令人讨厌啊
[00:44.38]僕という存在も | 我这个存在也是
[00:50.19]簡単なもんだな | 真是简单的东西啊
[00:55.90]騙されてしまうぜ | 就这样被欺骗了啊
[01:01.69]僕らみんな | 我们大家
[01:07.45]馬鹿ばっかだぜ | 全是笨蛋啊
[01:16.89]君と見たあの天の川も | 和你一起看的那条银河
[01:22.61]本当は存在しないかも | 说不定其实并不存在
[01:28.40]僕が生きてるこの世界も | 我活着的这个世界
[01:34.12]誰かが作った偽物かも | 说不定也是谁制造的赝品
[01:39.95]嫌になるぜ | 真是令人讨厌啊
[01:45.65]明日という未来も | 名为未来的明天也是
[01:51.42]簡単なもんだな | 真是简单的东西啊
[01:57.18]書き換えられてしまうぜ | 就这样被改写了啊
[02:02.94]僕らみんな | 我们大家
[02:08.70]無力なんだぜ | 真是无力啊
[02:41.13]嫌になるぜ | 真是令人讨厌啊
[02:46.85]僕という存在も | 我这个存在也是
[02:52.62]簡単なもんだな | 真是简单的东西啊
[02:58.37]騙されてしまうぜ | 就这样被欺骗了啊
[03:04.14]僕らみんな | 我们大家
[03:09.90]馬鹿ばっかだぜ | 全是笨蛋啊
[03:15.65]どうしようもないぜ | 真是没办法啊
[03:21.41]どうしようもない僕ら | 无可奈何的我们
`
    },
    { 
        index: 7, name: 'ギターと孤独と蒼い惑星', duration: '03:48', image: '/assets/albums/ギターと孤独と蒼い惑星.jpg', src: '/assets/musics/ギターと孤独と蒼い惑星.mp3', singer: '结束バンド', bvid:'',
        lyrics: `
[00:15.09]突然降ってきた | 突然间倾盆而下
[00:16.92]悲しみの雨に | 悲伤的雨
[00:18.67]ずぶ濡れになった | 将我淋得湿透
[00:20.45]僕は一人きりで | 我独自一人
[00:22.31]空を見上げてた | 仰望着天空
[00:25.75]何か言いたげな | 仿佛想说什么
[00:27.56]君の口元が | 你的嘴角
[00:29.35]動くのが見えたけど | 我看见它动了
[00:31.20]音にはならなかった | 却没有发出声音
[00:34.93]うるさいくらいの心臓が | 吵闹的心脏
[00:38.38]僕に叫んでるんだ | 对我呼喊着
[00:40.48]「まだ消えるな」って | 「还不要消失啊」
[00:42.50]ああ | 啊啊
[00:43.76]眩しい | 好耀眼
[00:45.54]鳴り響いた音 | 鸣响的声音
[00:49.03]僕の形のまま | 保持着我的形状
[00:52.54]蒼い惑星 | 苍蓝的行星
[00:56.24]ひとりぼっち | 孤身一人
[00:57.87]息も出来ない | 无法呼吸
[01:01.37]閉ざした何かが | 封闭的什么
[01:04.88]弾けそうだ | 仿佛就要迸发
[01:13.79]退屈な日々を | 无聊的日子
[01:15.61]蹴散らしたいなら | 如果想要一脚踢开
[01:17.41]僕がその役目を | 我来担任那个角色
[01:19.16]背負ってやるからさ | 为你背负一切
[01:21.03]全部聴いて欲しい | 我想让你全部听见
[01:24.49]こんな六等星じゃ | 这样的六等星
[01:26.31]君にバレないまま | 无法被你发现
[01:28.09]いつかいなくなってしまう | 总有一天会消失不见
[01:29.96]どうしよう | 怎么办才好
[01:33.68]うるさいくらいの感情が | 吵闹的感情
[01:37.07]僕を狂わせてるんだ | 让我发狂
[01:39.23]「まだ足りない」って | 「还不够啊」
[01:41.22]ああ | 啊啊
[01:42.54]くだらない | 真无聊
[01:44.27]エゴをぶつけ合って | 互相碰撞着无聊的自我
[01:47.78]できた傷の数だけ | 留下的伤痕越多
[01:51.27]強くなれる | 就能变得越强
[01:55.00]君の背中を | 你的背影
[01:56.61]押すための歌 | 是为了推你一把的歌
[02:00.08]もうちょっとだけ | 再稍微一下
[02:01.83]ここにいて | 留在这里吧
[02:26.55]バカな音でもいい | 愚蠢的声音也好
[02:29.96]君に届け | 传达给你吧
[02:33.48]届け | 传达给你吧
[02:40.95]眩しい | 好耀眼
[02:42.66]なりそこないの音 | 未能成为的声音
[02:46.19]僕の形のまま | 保持着我的形状
[02:49.69]蒼い惑星 | 苍蓝的行星
[02:53.41]ひとりぼっち | 孤身一人
[02:55.01]息も出来ない | 无法呼吸
[02:58.55]閉ざした何かが | 封闭的什么
[03:02.04]弾けそうだ | 仿佛就要迸发
[03:05.80]君の背中を | 你的背影
[03:07.38]押すための歌 | 是为了推你一把的歌
[03:10.87]もうちょっとだけ | 再稍微一下
[03:12.63]ここにいて | 留在这里吧
`
    },
// =================== 請從這裡開始複製 ===================
    { 
        index: 8, name: '光の中へ', duration: '04:18', image: '/assets/albums/光の中へ.jpg', src: '/assets/musics/光の中へ.mp3', singer: '结束バンド' , bvid:'',
        lyrics: `
[00:13.91]いつだって暗がり | 无论何时都在黑暗中
[00:17.38]手探りで夢中 | 摸索着前行
[00:20.61]もがいてばかりだ | 总是不断挣扎
[00:25.99]どうせ僕のことだから | 反正是我这种人
[00:29.62]またすぐ転んで | 肯定马上又会摔倒
[00:33.37]泥だらけになるんだろうな | 变得满身泥泞吧
[00:40.80]君はいつでも | 你总是
[00:44.20]眩しいくらいの光で | 用耀眼的光芒
[00:52.41]僕のこと誘うんだ | 邀请着我
[00:58.20]出口のないような迷路 | 像是没有出口的迷宫
[01:03.95]出口のないような夜も | 像是没有出口的夜晚
[01:09.64]君が照らしてくれたから | 因为有你为我照亮
[01:15.38]歩き出せたんだ | 我才能迈出脚步
[01:21.18]光の中へ | 向着光芒之中
[01:32.49]どうして君はそんなに | 为何你如此
[01:36.00]優しい目をするの | 用温柔的眼神看着我
[01:39.13]僕の全部が | 我的一切
[01:44.47]暴かれてくようだ | 仿佛都被揭露
[01:59.39]僕はいつでも | 我总是
[02:02.82]みっともないくらいに | 狼狈不堪地
[02:10.97]君のことばかりなんだ | 心里想的全是你
[02:16.74]明日のないような世界も | 像是没有明天的世界
[02:22.50]夢の見れないような夜も | 像是无法做梦的夜晚
[02:28.18]君が笑ってくれるなら | 只要你对我微笑
[02:33.95]僕は生きていける | 我就能活下去
[02:39.75]光の中へ | 向着光芒之中
[03:02.72]明日のないような世界も | 像是没有明天的世界
[03:08.41]夢の見れないような夜も | 像是无法做梦的夜晚
[03:14.15]君が笑ってくれるなら | 只要你对我微笑
[03:19.89]僕は生きていける | 我就能活下去
[03:25.61]出口のないような迷路 | 像是没有出口的迷宫
[03:31.33]出口のないような夜も | 像是没有出口的夜晚
[03:37.06]君が照らしてくれたから | 因为有你为我照亮
[03:42.79]歩き出せたんだ | 我才能迈出脚步
[03:48.55]光の中へ | 向着光芒之中
`
    },
    { 
        index: 9, name: '小さな海', duration: '03:43', image: '/assets/albums/結束バンド.jpg', src: '/assets/musics/小さな海.mp3', singer: '结束バンド' , bvid:'',
        lyrics: `
[00:15.54]大きな川のそばで | 在大河的旁边
[00:21.54]育ったわけじゃない | 我并非在此长大
[00:27.75]だけど僕の心には | 但我的心中
[00:33.98]小さな海がある | 有一片小小的海
[00:40.23]君がくれたんだ | 是你给予我的
[00:46.46]何の変哲もない僕に | 给平平无奇的我
[00:52.68]君がくれたんだ | 是你给予我的
[00:58.91]だからこの海は | 所以这片海
[01:05.15]君のものなんだよ | 是属于你的啊
[01:17.65]僕の海を君にあげる | 我把我的海送给你
[01:23.90]この小さな海を | 这片小小的海
[01:30.13]君にあげるから | 我送给你
[01:36.36]君の涙をここに注いで | 请将你的眼泪倾注于此
[01:42.61]僕の海を君にあげる | 我把我的海送给你
[01:48.83]この小さな海を | 这片小小的海
[01:55.06]君にあげるから | 我送给你
[02:01.32]君の涙をここに注いで | 请将你的眼泪倾注于此
[02:07.54]この小さな海に | 在这片小小的海里
[02:13.77]注いでほしい | 希望你能倾注
[02:32.48]僕の海を君にあげる | 我把我的海送给你
[02:38.74]この小さな海を | 这片小小的海
[02:44.96]君にあげるから | 我送给你
[02:51.20]君の涙をここに注いで | 请将你的眼泪倾注于此
[02:57.43]この小さな海に | 在这片小小的海里
[03:03.66]注いでほしい | 希望你能倾注
`
    },
    { 
        index: 10, name: '忘れてやらない', duration: '03:43', image: '/assets/albums/ぼっち・ざ・ろっく! vol.6 特典CD.jpg', src: '/assets/musics/忘れてやらない.mp3', singer: '结束バンド', bvid:'',
        lyrics: `
[00:12.75]どうしたんだい？ | 怎么了？
[00:14.37]そんな顔しちゃってさ | 露出那样的表情
[00:18.91]らしくないぜ | 一点也不像你啊
[00:21.01]笑ってくれよ | 笑一笑吧
[00:24.78]いつものようにさ | 像往常一样
[00:30.34]君がいないと | 你不在的话
[00:33.42]退屈なんだ | 我会很无聊的
[00:36.52]バカな話で | 用愚蠢的话题
[00:39.46]笑い合いたいんだ | 我想和你一起欢笑
[00:42.49]君はいつでも | 你总是
[00:48.06]僕のヒーローだった | 是我的英雄
[00:53.68]くだらない毎日を | 把无聊的每一天
[00:59.34]蹴飛ばしてくれた | 一脚踢开的英雄
[01:05.79]忘れてやらない | 我不会忘记的
[01:11.45]忘れてやらないぜ | 我绝对不会忘记的
[01:17.18]君が僕にくれた全部を | 你给予我的一切
[01:28.67]どうしたんだい？ | 怎么了？
[01:30.27]そんな顔しちゃってさ | 露出那样的表情
[01:34.80]らしくないぜ | 一点也不像你啊
[01:36.88]笑ってくれよ | 笑一笑吧
[01:39.70]いつものようにさ | 像往常一样
[01:46.22]君がいないと | 你不在的话
[01:49.29]退屈なんだ | 我会很无聊的
[01:52.37]バカな話で | 用愚蠢的话题
[01:55.33]笑い合いたいんだ | 我想和你一起欢笑
[02:21.32]忘れてやらない | 我不会忘记的
[02:26.96]忘れてやらないぜ | 我绝对不会忘记的
[02:32.65]君が僕にくれた全部を | 你给予我的一切
[02:38.35]忘れてやらない | 我不会忘记的
[02:44.02]忘れてやらないぜ | 我绝对不会忘记的
[02:49.71]君が僕にくれた全部を | 你给予我的一切
[02:55.40]忘れてやらない | 我不会忘记的
`
    },
    { 
        index: 11, name: '星座になれたら', duration: '04:18', image: '/assets/albums/星座になれたら.jpg', src: '/assets/musics/星座になれたら.mp3', singer: '结束バンド' , bvid:'',
        lyrics: `
[00:15.54]君と集まって星座になれたら | 若能与你汇集而成星座
[00:21.54]星降る夜 ⼀瞬の願い事 | 在星降之夜 许下瞬间的愿望
[00:27.75]きらめいて ゆらめいて 震えてるシグナル | 闪烁着 摇曳着 颤抖的信号
[00:33.95]今すぐ気づいて | 现在就立刻察觉到吧
[00:36.95]こんなに țișiteru | 我是如此地爱你
[00:40.23]空に満点の星 | 天空中满是繁星
[00:42.84]君と僕のようだね | 就像是你和我呢
[00:46.40]繋がってたいな | 好想连结在一起啊
[00:49.00]君と僕、線になって | 你和我，连成一线
[00:52.61]どんな暗い空だって | 无论多么漆黑的夜空
[00:55.70]二人でなら、きっと | 只要两个人在一起，一定
[00:58.74]輝けるはず | 能够闪耀光芒
[01:01.35]流れ星を探した | 寻找着流星
[01:04.42]空に名前をつけてくれた | 你为天空取了名字
[01:10.13]君と集まって星座になれたら | 若能与你汇集而成星座
[01:16.14]夜空を駆けるほうき星になる | 我会成为划过夜空的彗星
[01:22.36]君と二人で | 和你两个人一起
[01:25.43]追いかけてく光 | 追逐着光芒
[01:28.53]今すぐ気づいて | 现在就立刻察觉到吧
[01:31.54]こんなに țișiteru | 我是如此地爱你
[01:59.40]君と僕、線になって | 你和我，连成一线
[02:02.48]どんな暗い空だって | 无论多么漆黑的夜空
[02:05.54]二人でなら、きっと | 只要两个人在一起，一定
[02:08.56]輝けるはず | 能够闪耀光芒
[02:11.16]神様、どうか | 神啊，求求你
[02:14.24]声を聞かせて | 让我听到你的声音
[02:17.34]少しでいいから | 只要一下下就好
[02:19.95]君と集まって星座になれたら | 若能与你汇集而成星座
[02:25.96]夜空を駆けるほうき星になる | 我会成为划过夜空的彗星
[02:32.18]君と二人で | 和你两个人一起
[02:35.25]追いかけてく光 | 追逐着光芒
[02:38.35]今すぐ気づいて | 现在就立刻察觉到吧
[02:41.33]こんなに țișiteru | 我是如此地爱你
[03:07.41]赤い糸なんかじゃなくたって | 就算不是红线
[03:10.45]君と繋がりたいんだ | 我也想与你连结
[03:13.56]何億光年離れたって | 就算相隔数亿光年
[03:16.63]見つけ出すから | 我也会找到你
[03:22.15]君と集まって星座になれたら | 若能与你汇集而成星座
[03:28.18]星降る夜 ⼀瞬の願い事 | 在星降之夜 许下瞬间的愿望
[03:34.39]きらめいて ゆらめいて 震えてるシグナル | 闪烁着 摇曳着 颤抖的信号
[03:40.59]今すぐ気づいて | 现在就立刻察觉到吧
[03:43.60]こんなに țișiteru | 我是如此地爱你
`
    },
    { 
        index: 12, name: '転がる岩、君に朝が降る', duration: '04:31', image: '/assets/albums/転がる岩、君に朝が降る.jpg', src: '/assets/musics/転がる岩、君に朝が降る.mp3', singer: '结束バンド' , bvid:'',
        lyrics: `
[00:16.89]出来れば世界を | 如果可以的话 我想把这个世界
[00:19.98]僕は塗り変えたい | 重新涂上颜色
[00:22.95]戦争をなくすような | 像是消除战争之类的
[00:26.15]大それたことじゃない | 并非什么了不起的大事
[00:29.42]だけど ちょっと | 但是 只是稍微
[00:31.95]それもあるよな | 也有那么一点关系吧
[00:35.34]俳優や映画スターには | 我成不了演员或电影明星
[00:38.72]なれない それどころか | 别说那个了
[00:41.74]君の前でさえも | 就连在你面前
[00:44.60]上手に笑えない | 我都无法好好地微笑
[00:47.88]そんな僕に | 这样的我
[00:50.56]術はないよな | 毫无办法啊
[00:54.21]何を間違った？ | 我做错了什么？
[00:57.26]それさえもわからないんだ | 就连那个也不知道
[01:00.67]ローリング ローリング | Rolling Rolling
[01:03.96]初めから持ってないのに | 明明从一开始就一无所有
[01:06.96]胸が痛んだ | 心却痛了起来
[01:10.04]僕らはきっと | 我们一定
[01:13.06]このままさ | 就会是这样了
[01:16.38]意味もなく だがしかし | 毫无意义 但是
[01:19.64]意味もなく叫ぶのさ | 毫无意义地呐喊着
[01:22.68]ローリング ローリング | Rolling Rolling
[01:25.86]凍てつく地面を | 在冰冻的地面上
[01:28.91]転がるように走り出したんだ | 像翻滚一样奔跑起来
[01:48.33]理由(わけ)もないのに何だか | 明明没有理由 却不知为何
[01:51.34]悲しい | 感到悲伤
[01:54.33]泣けやしないから | 因为哭不出来
[01:57.38]余計に惨めだ | 所以更加凄惨
[02:00.65]そんな僕を | 这样的我
[02:03.31]誰も知らない | 谁也不知道
[02:06.94]何をなくした？ | 我失去了什么？
[02:09.96]それさえもわからないんだ | 就连那个也不知道
[02:13.41]ローリング ローリング | Rolling Rolling
[02:16.63]初めから持ってないのに | 明明从一开始就一无所有
[02:19.65]胸が痛んだ | 心却痛了起来
[02:22.75]僕らはきっと | 我们一定
[02:25.75]このままさ | 就会是这样了
[02:29.11]意味もなく だがしかし | 毫无意义 但是
[02:32.32]意味もなく叫ぶのさ | 毫无意义地呐喊着
[02:35.39]ローリング ローリング | Rolling Rolling
[02:38.58]凍てつく地面を | 在冰冻的地面上
[02:41.60]転がるように走り出したんだ | 像翻滚一样奔跑起来
[03:17.50]何を間違った？ | 我做错了什么？
[03:20.57]それさえもわからないんだ | 就连那个也不知道
[03:23.95]ローリング ローリング | Rolling Rolling
[03:27.18]初めから持ってないのに | 明明从一开始就一无所有
[03:30.22]胸が痛んだ | 心却痛了起来
[03:33.30]僕らはきっと | 我们一定
[03:36.33]このままさ | 就会是这样了
[03:39.63]意味もなく だがしかし | 毫无意义 但是
[03:42.84]意味もなく叫ぶのさ | 毫无意义地呐喊着
[03:45.92]ローリング ローリング | Rolling Rolling
[03:49.12]凍てつく地面を | 在冰冻的地面上
[03:52.16]転がるように走り出したんだ | 像翻滚一样奔跑起来
`
    },
    { 
        index: 13, name: '青春コンプレックス', duration: '03:23', image: '/assets/albums/結束バンド.jpg', src: '/assets/musics/青春コンプレックス.mp3', singer: '结束バンド' , bvid:'BV1HT411N7FP',
        lyrics: `
[00:14.38]暗く狭いのが好きだった | 曾喜欢阴暗狭窄的地方
[00:17.38]深く被るフードの中 | 在深深戴着的兜帽之中
[00:20.40]顔を隠し呼吸してた | 隐藏着脸庞呼吸着
[00:25.17]だけど知ってしまった | 但我却知晓了
[00:28.18]眩しさとその影を | 光芒以及它的影子
[00:31.20]この手で触れてみたいと | 我想用这双手去触摸
[00:34.20]思ってしまった | 不禁这么想了
[00:36.42]ああ | 啊啊
[00:38.08]雷鳴が僕を撃ち | 雷鸣将我击中
[00:41.13]衝動が突き動かす | 冲动驱使着我
[00:44.15]「どうだい？」って胸張って | 「怎么样？」地挺起胸膛
[00:47.16]見せびらかしたいんだ | 我想向你炫耀
[00:50.19]自意識過剰な僕の | 过度自我意识的我
[00:53.22]か細いこの喉から | 从这纤细的喉咙里
[00:56.24]絞り出す獣の叫び | 挤出的野兽的呐喊
[01:02.32]響かせたい | 我想让它回响
[01:04.22]叫びたいんだ | 我想呐喊
[01:16.19]君に届くように | 为了传达给你
[01:19.20]僕の全部を | 我的全部
[01:22.22]君に見せるから | 都会展现给你看
[01:26.01]本当はもっと | 其实我更想
[01:29.00]君と話したいんだ | 和你说话
[01:32.02]だけど上手くできない | 但我做不好
[01:35.03]臆病風に吹かれ | 被胆怯之风吹拂
[01:37.26]ああ | 啊啊
[01:38.89]劣等感 僕を刺す | 自卑感刺痛着我
[01:41.93]逃げ込んだって無駄 | 就算逃跑也是徒劳
[01:44.96]「どうだい？」って問いかけて | 「怎么样？」地质问着
[01:47.96]化けの皮剥がしたいんだ | 我想剥下这层伪装
[01:51.00]自意識過剰な僕の | 过度自我意识的我
[01:54.01]この爪が牙がもし | 这爪牙如果
[01:57.02]君のこと傷つけたら | 伤害了你的话
[02:03.11]どうしようか | 该怎么办才好
[02:05.00]わからないんだ | 我不知道啊
[02:29.11]かき鳴らせ | 尽情地弹奏吧
[02:32.12]心の叫びを | 心中的呐喊
[02:35.15]ぶっ放せ | 发射出去吧
[02:38.16]僕の衝動 | 我的冲动
[02:40.40]ああ | 啊啊
[02:41.97]雷鳴が僕を撃ち | 雷鸣将我击中
[02:45.00]衝動が突き動かす | 冲动驱使着我
[02:48.01]「どうだい？」って胸張って | 「怎么样？」地挺起胸膛
[02:51.02]見せびらかしたいんだ | 我想向你炫耀
[02:54.06]自意識過剰な僕の | 过度自我意识的我
[02:57.08]か細いこの喉から | 从这纤细的喉咙里
[03:00.08]絞り出す獣の叫び | 挤出的野兽的呐喊
[03:06.19]響かせたい | 我想让它回响
[03:08.06]叫びたいんだ | 我想呐喊
`
    }
]

const playerIcons = ["/assets/images/icon_play.png","/assets/images/icon_pause.png"];
const playStatu = ref(0);
const activeItem = ref(musics[0]);
const musicProgress = ref(0);
const volumeProgress = ref(20);
const player = ref(new Audio());
const isMvVisible = ref(false);
const currentLyricIndex = ref(-1);
const lyricsContainerRef = ref(null);
const lineRefs = ref([]);

// [重构] 解析器现在可以处理 `|` 分隔符，生成双语对象
const parsedLyrics = computed(() => {
    if (!activeItem.value.lyrics) return [];
    const lines = activeItem.value.lyrics.split('\n');
    const result = [];
    const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
    for (const line of lines) {
        const match = line.match(timeRegex);
        if (match) {
            const time = parseInt(match[1])*60 + parseInt(match[2]) + parseInt(match[3])/1000;
            const text = line.replace(timeRegex, '').trim();
            if (text) {
                const [japanese, chinese = ''] = text.split('|').map(s => s.trim());
                result.push({ time, japanese, chinese });
            }
        }
    }
    return result;
});

player.value.src = activeItem.value.src;
player.value.volume = volumeProgress.value / 100;

const switchMusic = (newIndex) => {
    if (newIndex >= musics.length) newIndex = 0;
    else if (newIndex < 0) newIndex = musics.length - 1;
    activeItem.value = musics[newIndex];
    playStatu.value = 1;
    musicProgress.value = 0;
};

const updateProgress = () => {
    if (player.value.duration) {
        const currentTime = player.value.currentTime;
        musicProgress.value = (currentTime / player.value.duration) * 100;
        let newLyricIndex = -1;
        for (let i = parsedLyrics.value.length - 1; i >= 0; i--) {
            if (currentTime >= parsedLyrics.value[i].time) { newLyricIndex = i; break; }
        }
        currentLyricIndex.value = newLyricIndex;
    }
    if (playStatu.value === 1) requestAnimationFrame(updateProgress);
};

watch(currentLyricIndex, (newIndex) => {
    if (newIndex < 0 || !lyricsContainerRef.value || !lineRefs.value[newIndex]) return;
    const container = lyricsContainerRef.value;
    const activeLine = lineRefs.value[newIndex];
    const top = activeLine.offsetTop - (container.clientHeight / 2) + (activeLine.clientHeight / 2);
    container.scrollTo({ top: top, behavior: 'smooth' });
});

watch(activeItem, (newItem) => {
    player.value.src = newItem.src;
    player.value.currentTime = 0;
    currentLyricIndex.value = -1;
    if (lyricsContainerRef.value) lyricsContainerRef.value.scrollTop = 0;
    if (playStatu.value === 1) { player.value.play(); requestAnimationFrame(updateProgress); }
});

watch(musicProgress, () => { if (musicProgress.value >= 100) switchMusic(activeItem.value.index); });
watch(volumeProgress, (newVolume) => { player.value.volume = newVolume / 100; });
watch(playStatu, (newVal) => { document.documentElement.style.setProperty('--animation-state', newVal === 1 ? 'running' : 'paused'); });

const switchStatu = () => {
    if (playStatu.value === 0) { player.value.play(); playStatu.value = 1; requestAnimationFrame(updateProgress); } 
    else { player.value.pause(); playStatu.value = 0; }
};

const onVolumeProgressClicked = (e) => { const p=e.currentTarget; const c=e.offsetX; const w=p.clientWidth; const pct=(c/w)*100; volumeProgress.value=pct; player.value.volume=pct/100; }
const onProgressClicked = (e) => { const p=e.currentTarget; const c=e.offsetX; const w=p.clientWidth; const pct=(c/w)*100; musicProgress.value=pct; player.value.currentTime=(pct/100)*player.value.duration; }
const secToMMSS = (sec) => { sec=sec|0; let m=(sec/60|0).toString().padStart(2, '0'); let s=(sec%60|0).toString().padStart(2, '0'); return m+':'+s }
const volumeHandle = (num)=>{ let newVol = player.value.volume+num/100; newVol = Math.max(0, Math.min(1, newVol)); player.value.volume = newVol; volumeProgress.value = newVol*100; }

onMounted(() => { const el = document.querySelector('.player-select'); if (!el) return; el.addEventListener('wheel', (e) => { e.preventDefault(); e.stopPropagation(); el.scrollTop += e.deltaY * 0.5; }); });
</script>

<template>
    <div class="bg">
        <div class="music-note note1">♪</div><div class="music-note note2">♫</div><div class="music-note note3">♩</div><div class="music-note note4">♬</div><div class="music-note note5">♪</div><div class="music-note note6">♫</div><div class="music-note note7">♩</div><div class="music-note note8">♬</div>
        <div class="player-container">
            <div class="left-panel">
                <div class="player-select">
                    <ul><li v-for="(music, index) in musics" :key="index" :class="{ 'active': activeItem.name === music.name }" @click="activeItem = music"><div class="music-item"><img :src="music.image" :alt="music.name" /><div class="music-info"><span class="music-title">{{ music.name }}</span><span class="music-singer">{{ music.singer }}</span></div></div></li></ul>
                </div>
                <div class="lyrics-container" ref="lyricsContainerRef">
                    <!-- [重构] UI现在渲染双语歌词 -->
                    <div v-for="(line, index) in parsedLyrics" :key="index" class="lyrics-line" :class="{ active: index === currentLyricIndex }" :ref="el => { if (el) lineRefs[index] = el }">
                        <p class="lyric-jp">{{ line.japanese }}</p>
                        <p class="lyric-cn" v-if="line.chinese">{{ line.chinese }}</p>
                    </div>
                    <div v-if="!parsedLyrics.length || parsedLyrics.every(l => !l.japanese)" class="lyrics-line"><p>暂无歌词</p></div>
                </div>
            </div>
            <div class="player">
                <div class="now-playing">
                    <div class="player-bg" :style="{ 'animation-play-state': playStatu === 0 ? 'paused' : 'running' }"><img :src="activeItem.image" :alt="activeItem.name" class="album-image" /></div>
                    <div class="music-info"><h2>{{ activeItem.name }}</h2><p>{{ activeItem.singer }}</p></div>
                    <div class="player-controls">
                        <div class="volume-control"><span class="icon-defuse" @click="volumeHandle(-10)"><img src="/assets/images/icon_defuse.png" /></span><div class="volume-progress-box" :style="{ '--volume-progress': volumeProgress + '%' }" @click="onVolumeProgressClicked($event)"><div class="volume-progress-fill"></div></div><span class="icon-add" @click="volumeHandle(10)"><img src="/assets/images/icon_add.png" /></span></div>
                        <div class="control-panel"><span><img src="/assets/images/icon_like.png" /></span><span><img src="/assets/images/icon_mode.png" /></span><span class="mv-icon" @click="isMvVisible = true"><img src="/assets/images/icon_mv.png" /></span></div>
                        <div class="music-progress-container"><span class="current-time">{{ secToMMSS(player.currentTime) }}</span><div class="music-progress-box" :style="{ '--music-progress': musicProgress + '%' }" @click="onProgressClicked($event)"><div class="music-progress-fill"></div></div><span class="duration-time">{{ activeItem.duration }}</span></div>
                        <div class="btn-bar"><div @click="switchMusic(activeItem.index - 2)"><img src="/assets/images/icon_last.png" /></div><div><img @click="switchStatu()" :src="playerIcons[playStatu]" /></div><div @click="switchMusic(activeItem.index)"><img src="/assets/images/icon_next.png" /></div></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isMvVisible" class="mv-modal-overlay" @click="isMvVisible = false">
            <div class="mv-modal-content" @click.stop>
                <button class="close-mv-btn" @click="isMvVisible = false">&times;</button>
                <iframe :src="'//player.bilibili.com/player.html?isOutside=true&aid=516452760&bvid='+activeItem.bvid+'&cid=858089909&p=1&autoplay=1'" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; display: flex; align-items: center; justify-content: center; background: linear-gradient(90deg, #ff86be 0%, #ffd859 25%, #5ad0ff 50%, #ff5656 75%); background-size: 300% 300%; animation: gradient 15s ease infinite; animation-play-state: var(--animation-state, paused); }
.player-container { display: flex; width: 80%; min-width: 900px; max-width: 1200px; height: 80vh; min-height: 600px; background-color: rgba(255, 255, 255, 0.5); border-right: 1px solid rgba(170, 170, 170, 0.3); border-radius: 16px; overflow: hidden; box-shadow: 0 5px 8px rgba(81, 81, 81, 0.5); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
.left-panel { width: 35%; display: flex; flex-direction: column; background-color: rgba(255, 255, 255, 0.5); border-right: 1px solid #e0e0e0; }
.player-select { height: 50%; overflow-y: auto; border-bottom: 1px solid #e0e0e0; scrollbar-width: none; }
.player-select::-webkit-scrollbar { width: 6px; }
.player-select ul { padding: 0; margin: 0; display: flex; flex-direction: column; }
.player-select ul li { list-style: none; padding: 5px 16px; border-bottom: 1px solid #e0e0e0; cursor: pointer; transition: all 0.3s ease; overflow: hidden; }
.player-select ul li:hover { background-color: #f0f0f0; }
.player-select ul li.active { background-color: #e8e8e8; border-right: 4px solid #ec407a; }
.music-item { height: 60px; display: flex; gap: 12px; width: 100%; min-width: 0; }
.player-select img { height: 95%; border-radius: 8px; object-fit: cover; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
.music-info { display: flex; flex-direction: column; justify-content: center; height: 100%; overflow: hidden; }
.music-title { font-size: 16px; color: #333; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.2; text-align: left; }
.music-singer { font-size: 13px; color: #777; text-align: left; line-height: 1.2; }
.lyrics-container { height: 50%; overflow-y: auto; padding: 20px; text-align: center; scrollbar-width: none; }
.lyrics-container::-webkit-scrollbar { display: none; }
/* --- [新增] 双语歌词样式 --- */
.lyrics-line { margin: 0; padding: 10px 0; transition: all 0.3s ease; opacity: 0.5; }
.lyrics-line.active { opacity: 1; transform: scale(1.05); }
.lyrics-line p { margin: 0; line-height: 1.4; }
.lyric-jp { font-size: 16px; color: #333; font-weight: 500; }
.lyric-cn { font-size: 14px; color: #666; }
.lyrics-line.active .lyric-jp { color: #ec407a; font-weight: bold; }
.lyrics-line.active .lyric-cn { color: #333; }
.player { width: 65%; display: flex; flex-direction: column; padding: 30px; box-sizing: border-box; backdrop-filter: blur(2rem); box-shadow: 2px 2px 5px #666; }
.now-playing { display: flex; flex-direction: column; align-items: center; height: 100%; justify-content: space-between; }
.player-bg { width: 280px; height: 280px; aspect-ratio: 1/1; border-radius: 50%; background-color: #fff; position: relative; box-shadow: 0 0 20px rgba(0, 0, 0, 0.3); animation: albums_rotate 15s infinite linear; backdrop-filter: blur(3px); animation-play-state: var(--animation-state, paused); }
.album-image { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 200px; height: 200px; border-radius: 50%; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); transition: all 0.4s ease; }
.music-info { text-align: center; margin-bottom: 30px; width: 100%; }
.music-info h2 { margin: 0 0 8px 0; font-size: 24px; color: #333; font-weight: 600; }
.music-info p { margin: 0; font-size: 16px; color: #777; }
.player-controls { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 20px; }
.volume-control { display: flex; align-items: center; gap: 12px; width: 60%; justify-content: center; }
.volume-control img { width: 20px; opacity: 0.7; transition: opacity 0.2s; }
.volume-progress-box { flex-grow: 1; height: 4px; background-color: rgba(0, 0, 0, 0.1); border-radius: 2px; position: relative; cursor: pointer; }
.volume-progress-fill { height: 100%; background-color: #ec407a; border-radius: 2px; width: var(--volume-progress); }
.control-panel { display: flex; align-items: center; gap: 30px; }
.control-panel img { width: 24px; opacity: 0.7; cursor: pointer; transition: opacity 0.2s; }
.music-progress-container { width: 100%; display: flex; align-items: center; gap: 12px; }
.current-time, .duration-time { font-size: 12px; color: #555; width: 40px; }
.music-progress-box { flex-grow: 1; height: 4px; background-color: rgba(0, 0, 0, 0.1); border-radius: 2px; position: relative; cursor: pointer; }
.music-progress-fill { height: 100%; background: linear-gradient(90deg, #ff8a00, #ff5252); border-radius: 2px; width: var(--music-progress); }
.btn-bar { display: flex; align-items: center; gap: 30px; }
.btn-bar div { cursor: pointer; }
.btn-bar img { width: 32px; transition: transform 0.2s; }
.btn-bar div:nth-child(2) img { width: 50px; }
.btn-bar div:hover img { transform: scale(1.1); }
@keyframes albums_rotate { from { transform: rotate(0); } to { transform: rotate(360deg); } }
.mv-modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.7); display: flex; justify-content: center; align-items: center; z-index: 2000; }
.mv-modal-content { position: relative; width: 90vw; max-width: 800px; aspect-ratio: 16/9; background-color: black; }
.mv-modal-content iframe { width: 100%; height: 100%; }
.close-mv-btn { position: absolute; top: -30px; right: -10px; background: none; border: none; font-size: 30px; color: white; cursor: pointer; }
@media (max-width: 768px) {
    .player-container { flex-direction: column; width: 100%; height: 100%; min-width: unset; min-height: unset; border-radius: 0; }
    .left-panel { display: none; }
    .player { width: 100%; height: 100%; padding: 15px; }
    .now-playing { justify-content: space-around; }
    .player-bg { width: 220px; height: 220px; }
    .album-image { width: 150px; height: 150px; }
    .music-info h2 { font-size: 20px
