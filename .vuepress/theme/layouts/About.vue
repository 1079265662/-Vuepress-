<template>
  <div @scroll="scrollGet($event)">
    <!-- 第一次盒子 -->
    <div class="arrowRe">
      <Common :sidebar="false">
        <div class="container">

          <div class="author-social">
            <ModuleTransition delay="0.04" duration="0.5">
              <div class="personal-img">
                <img class="personal-radius" v-if="recoShowModule || $themeConfig.authorAvatar" :src="$withBase($themeConfig.authorAvatar)" alt="author-avatar">
              </div>
            </ModuleTransition>

            <ModuleTransition delay="0.04" duration="0.5">
              <div v-if="recoShowModule" class="socials">
                <a v-if="socials.github" :href="socials.github" title="github" target="_blank"><i class="iconfont big reco-github black"></i></a>
                <a v-if="socials.gitlab" :href="socials.gitlab" title="gitlab" target="_blank"><i class="iconfont big reco-gitlab coral"></i></a>
                <a v-if="socials.gitee" :href="socials.gitee" title="gitee" target="_blank"><i class="iconfont big reco-mayun crimson"></i></a>
                <a v-if="socials.jianshu" :href="socials.jianshu" title="简书" target="_blank"><i class="iconfont big reco-jianshu indianred"></i></a>
                <a v-if="socials.zhihu" :href="socials.zhihu" title="知乎" target="_blank"><i class="iconfont big reco-zhihu lightskyblue"></i></a>
                <a v-if="socials.toutiao" :href="socials.toutiao" title="头条" target="_blank"><i class="iconfont big reco-toutiao lightsalmon"></i></a>
                <a v-if="socials.juejin" :href="socials.juejin" title="掘金" target="_blank"><i class="iconfont big reco-juejin dodgerblue"></i></a>
                <a v-if="socials.segmentfault" :href="socials.segmentfault" title="思否" target="_blank"><i class="iconfont big reco-sf forestgreen"></i></a>
                <a v-if="socials.csdn" :href="socials.csdn" title="CSDN" target="_blank"><i class="iconfont big reco-csdn indianred"></i></a>
                <a v-if="socials.wechat" :href="socials.wechat" title="微信" target="_blank"><i class="iconfont big reco-wechat forestgreen"></i></a>
                <a v-if="socials.qq" :href="socials.qq" title="QQ" target="_blank"><i class="iconfont big reco-qq lightskyblue"></i></a>
                <h1 class="longcang">{{ $themeConfig.info }}</h1>
              </div>
            </ModuleTransition>
          </div>
        </div>
      </Common>
      <!-- 底部跳转 -->
      <div class="arrowSS">
        <a href="#anchorSS" class="arrowSS_style"></a>
      </div>
    </div>
    <!-- 第二层盒子 -->
    <div id="anchorSS" class="secondClass">
      <div id="box">
        <!-- 个人资料卡片 -->
        <div class="meBox">
          <!-- 头像 -->
          <div class="headPhoto">
            <img style="border-radius: 50%;" v-if="recoShowModule || $themeConfig.authorAvatar" :src="$withBase($themeConfig.authorAvatar)">
          </div>
          <!-- 介绍 -->
          <div class="meBox-title">
            <p>I'm liukaili</p>
            <div class="fg"></div>
          </div>
          <div class="meBox-text">
            <p>干这种无聊的事情我最拿手了</p>
            <p>播客的大部分内容很基础</p>
            <p>错别字也很多谨慎阅读</p>
            <p>希望对你有用!</p>
            <a href="https://gitee.com/n0ts" target="_blank">此页面借鉴</a>
          </div>
          <!-- 两个按钮 -->
          <div class="meBox-Button">
            <a href="#">返回上层</a>
            <a @click="remaKe" :style="this.removeFirstDiv || this.removeSecondDiv ? 'cursor: pointer;' : 'cursor:wait'">重新显示</a>
          </div>
        </div>
        <!-- 伪终端介绍 -->
        <div id="cmdBox">
          <!-- 第一个终端 -->
          <div :class="!removeFirstDiv ? 'cmd' : 'cmd opDiv'" :style="!toppingFirst ? 'z-index: 1;' : '  z-index: 4;'">
            <!-- 三个按钮 -->
            <div class="click">
              <div class="red" @click="greenClick(1)"></div>
              <div class="yellow" @click="yellowClick(1)"></div>
              <div class="green" @click="redClick(1)"></div>
            </div>
            <!-- 顶部标题 -->
            <div class="title">
              <span>liukaili - bash</span>
            </div>
            <!-- 终端内文字 -->
            <div class="cmdText">
              <span style="color: rgb(0, 190, 0);">root@liukaili</span>
              <span style="color: blue;">~</span>
              <span style="color: rgb(39, 39, 39);">./tianqi.sh</span>
              <br />
              <p>北京🌞晴 -7℃~3℃ 东北风 3级 <span style="margin: 0;padding: 1px 2px;border-radius: 3px;line-height: 16px;color: #fff;background-color: #eec50b;">良</span></p>
              <span style="color: rgb(0, 190, 0);">root@liukaili</span>
              <span style="color: blue;">~</span>
              <span style="color: rgb(39, 39, 39);">cat /me.txt</span>
              <p>爱好计算机 职业前端 喜欢Vue</p>
              <p>喜欢开源 希望做出有用的组件开源出去</p>
              <p>正在学前端动画 想制作一个前端个人简历</p>
              <p>歪比歪比 歪比巴布</p>
              <span style="color: rgb(0, 190, 0);">root@liukaili</span>
              <span style="color: blue;">~</span>
              <span style="color: rgb(39, 39, 39);">sudo rm -rf /过去的自己/*</span>
              <br />
              <span style="color: rgb(0, 190, 0);">root@liukaili</span>
              <span style="color: blue;">~</span>
              <span v-if="this.boxFirstDown" class="line" style="color: rgb(39, 39, 39);">
                shutdown -r now
              </span>
            </div>
          </div>
          <!-- 第二个终端 -->
          <div :class="!removeSecondDiv ? 'cmd cmd2' : 'cmd cmd2 opDiv'" :style="!toppingSecond ? 'z-index: 2;' : '  z-index: 5;'">
            <!-- 三个按钮 -->
            <div class="click">
              <div class="red" @click="greenClick(2)"></div>
              <div class="yellow" @click="yellowClick(2)"></div>
              <div class="green" @click="redClick(2)"></div>
            </div>
            <!-- 顶部标题 -->
            <div class="title">
              <span>liukaili - bash</span>
            </div>
            <!-- 终端内文字 -->
            <div class="cmdText">
              <span style="color: rgb(0, 190, 0);">root@liukaili</span>
              <span style="color: blue;">~</span>
              <span style="color: rgb(39, 39, 39);">./links.sh</span>
              <p>我的其他站点：</p>
              <ul class="ul">
                <li><a href="https://gitee.com/liu_kaili" target="_blank">gitee</a></li>
                <li><a href="https://github.com/1079265662" target="_blank">github</a></li>
                <li><a href="#">简历🚫</a></li>
              </ul>
              <span style="color: rgb(0, 190, 0);">root@liukaili</span>
              <span style="color: blue;">~</span>
              <span v-if="this.boxSecondDown" class="line" style="color: rgb(39, 39, 39);">
                shutdown -r now
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Common from '@theme/components/Common'
import ModuleTransition from '@theme/components/ModuleTransition'
import moduleTransitonMixin from '@theme/mixins/moduleTransiton'
//导入字体效果
import './font/FiraCode.css'
export default {
  name: 'About',
  data () {
    return {
      // 删除第一个盒子
      removeFirstDiv: false,
      // 删除第二个盒子
      removeSecondDiv: false,
      // 置顶第一个盒子
      toppingFirst: false,
      // 置顶第二个盒子
      toppingSecond: false,
      // 第一个盒子启动关机
      boxFirstDown: false,
      // 第二个盒子启动关机
      boxSecondDown: false,
    }
  },
  mixins: [moduleTransitonMixin],
  components: { Common, ModuleTransition },
  computed: {
    socials () {
      return this.$themeConfig.socials
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    // 红色按钮
    redClick (e) {
      // 判断是否是第一个盒子
      if (e === 1) {
        this.removeFirstDiv = true
      } else {
        this.removeSecondDiv = true
      }

    },
    // 黄色按钮
    yellowClick (e) {
      // 判断是否是第一个盒子
      if (e === 1) {
        this.toppingFirst = !this.toppingFirst
      } else {
        this.toppingSecond = !this.toppingSecond
      }
    },
    // 绿色按钮
    greenClick (e) {
      // 判断是否是第一个盒子
      if (e === 1) {
        this.boxFirstDown = true
        setTimeout(() => {
          this.removeFirstDiv = true
        }, 2500);

      } else {
        this.boxSecondDown = true
        setTimeout(() => {
          this.removeSecondDiv = true
        }, 2500);
      }
    },
    // 重置
    remaKe () {
      if (this.removeFirstDiv || this.removeSecondDiv) {
        // 删除第一个盒子
        this.removeFirstDiv = false,
          // 删除第二个盒子
          this.removeSecondDiv = false,
          // 置顶第一个盒子
          this.toppingFirst = false,
          // 置顶第二个盒子
          this.toppingSecond = false,
          // 第一个盒子启动关机
          this.boxFirstDown = false,
          // 第二个盒子启动关机
          this.boxSecondDown = false
      }
    }
  },
  watch: {}
}
</script>

<style src="../styles/theme.styl" lang="stylus"></style>
<style src="./css/aboutSecond.css" scoped></style>
<style lang="stylus" scoped>
.arrowRe {
  position: relative;
  height: 100vh;
}

/* 包裹箭头效果的盒子 */
.arrowSS {
  animation: bounce-inSS 2s infinite; /* 启动动画特效 */
}

/* 箭头效果的盒子 */
.arrowSS_style {
  margin: 0 auto;
  display: block;
  width: 25px;
  height: 25px;
  border-right: 3px solid $textColor;
  border-top: 3px solid $textColor;
  -webkit-transform: rotate(135deg); /* 箭头方向可以自由切换角度 */
  transform: rotate(135deg);
  cursor: pointer;
}

.personal-radius {
  border-radius: 50%;
  transition: all 1.35s;
  cursor: pointer;
}

.personal-radius:hover {
  transform: rotate(360deg);
}

@require '../styles/mode.styl';

.grey {
  color: grey;
}

.orange {
  color: orange;
}

.green {
  color: green;
}

.blue {
  color: deepskyblue;
}

.pink {
  color: pink;
}

.dgreen {
  color: forestgreen;
}

.black {
  color: black;
}

.coral {
  color: coral;
}

.crimson {
  color: crimson;
}

.indianred {
  color: indianred;
}

.lightskyblue {
  color: lightskyblue;
}

.lightsalmon {
  color: lightsalmon;
}

.dodgerblue {
  color: dodgerblue;
}

.forestgreen {
  color: forestgreen;
}

.author-social {
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: -23rem;

  .personal-img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    margin: 8rem auto;
  }

  .socials {
    margin: 3rem 0;

    h1 {
      margin: 3rem 0;
    }

    .big {
      font-size: x-large;
      margin: 0 0.5rem;
    }
  }
}

.scroll-down {
  display: block;
  margin: 0 auto;
  bottom: 45px;
  width: 34px;
  height: 34px;
  font-size: 34px;
  text-align: center;
}

.bounce-enter-active {
  animation: bounce-in 5s 3s infinite;
}

/* .bounce-leave-active { */
/* animation: bounce-in 4s 2s reverse; */
/* } */
@keyframes bounce-in {
  0% {
    transform: translateY(0);
  }

  20% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }

  80% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(0);
  }
}

.down-arrow {
  width: 20px;
  height: 20px;
}

.down-arrow:after {
  content: '';
  display: block;
  width: 20px;
  height: 20px;
  border-right: 3px solid #3eaf7c;
  border-top: 3px solid #3eaf7c;
  -webkit-transform: rotate(135deg); /* 箭头方向可以自由切换角度 */
  transform: rotate(135deg);
}

.body {
  overflow: hidden;
  margin: 0;
  padding: 0;
  background: linear-gradient(90deg, #addfff, #fff9e8);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: relative;
}

.body::after {
  position: absolute;
  width: 100%;
  content: '';
  height: calc(100% - 600px);
  z-index: 0;
  background: #efefef;
  bottom: 0;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes off {
  to {
    transform: rotate(380deg);
  }
}

@keyframes off2 {
  to {
    transform: rotate(880deg);
  }
}

@keyframes fly {
  to {
    margin-top: 50px;
  }
}

span {
  display: block;
}

.windows {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

.window {
  flex: 1 20%;
  box-sizing: border-box;
  height: 300px;
  position: relative;
  border: 10px inset rgba(51, 51, 51, 0.2);
}

.window::after {
  position: absolute;
  height: 60%;
  width: 1px;
  border-radius: 10px;
  background: linear-gradient(
    to top,
    #0f80c7 20%,
    transparent 30%,
    transparent 50%,
    #3f7ba0 100%
  );
  opacity: 1;
  z-index: 5;
  top: 30px;
  left: 50%;
  transform: rotate(45deg);
  display: block;
  content: '';
}

.window::before {
  position: absolute;
  height: 40%;
  width: 1px;
  border-radius: 10px;
  background: linear-gradient(
    to top,
    #0f80c7 20%,
    transparent 10%,
    transparent 50%,
    #addfff 100%
  );
  opacity: 1;
  z-index: 5;
  top: 100px;
  left: 60%;
  transform: rotate(45deg);
  display: block;
  content: '';
}

.window:nth-child(5n - 3)::after, .window:nth-child(5n - 3)::before {
  opacity: 0.8 !important;
}

.window:nth-child(5n - 2)::after, .window:nth-child(5n - 2)::before {
  opacity: 0.4 !important;
}

.window:nth-child(5n - 1)::after, .window:nth-child(5n -1)::before {
  opacity: 0.3 !important;
}

.window:nth-child(5n)::after, .window:nth-child(5n)::before {
  opacity: 0.2 !important;
}

.fly {
  transition: 0.5s all cubic-bezier(0.04, 0.06, 0, 1.18), 1s transform;
  width: 10px;
  height: 6px;
  background: green;
  border-radius: 50%;
  position: absolute;
  animation: fly 5s alternate infinite ease-in-out;
}

.fly:nth-of-type(1) {
  top: -78px;
  left: -200px;
}

.fly:nth-of-type(2) {
  transform: translateY(-10px);
  animation-delay: 4s;
  top: 5px;
  right: -250px;
}

.fly:nth-of-type(3) {
  transform: translateY(0px);
  top: 400px;
  animation-delay: 2s;
  right: -400px;
}

.fly::after, .fly::before {
  content: '';
  position: absolute;
  width: 7px;
  height: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  display: block;
  border-radius: 50%;
}

.fly::before {
  bottom: 4px;
  transform: rotate(325deg);
  left: 3px;
}

.fly::after {
  transform: rotate(45deg);
  bottom: 6px;
}

.fan {
  width: 500px;
  height: 500px;
  position: relative;
  z-index: 1;
  margin-top: 75px;
  perspective: 500px;
}

.fan::after {
  content: '';
  display: block;
  position: absolute;
  height: 364px;
  width: 200px;
  background: rgba(0, 0, 0, 0.08);
  top: calc(100% - 24px);
  left: calc(50% - 100px);
  z-index: -1;
  transform: rotateX(104deg) rotateY(-1deg) rotate(25deg);
  transform-origin: top;
}

.fan__root {
  width: 200px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.fan__root .top {
  overflow: hidden;
  width: 200px;
  height: 25px;
  position: relative;
}

.fan__root .top::after {
  content: '';
  display: block;
  width: 200px;
  height: 50px;
  background: #2f423f;
  border-radius: 50%;
}

.fan__root .top .red {
  position: absolute;
  width: 30px;
  height: 15px;
  border-radius: 15px;
  display: block;
  right: 30px;
  background: #f15249;
  cursor: pointer;
  overflow: hidden;
}

.fan__root .top .green {
  position: absolute;
  width: 30px;
  height: 15px;
  border-radius: 15px;
  display: block;
  right: 85px;
  background: #32ba7c;
  cursor: pointer;
  overflow: hidden;
}

.fan__root .top .green::after {
  content: '';
  display: block;
  width: 100%;
  height: 50%;
  position: absolute;
  bottom: 0;
  background: #0aa06e;
}

.fan__root .top .red::after {
  content: '';
  display: block;
  width: 100%;
  height: 50%;
  position: absolute;
  bottom: 0;
  background: #a00000;
}

.fan__root .top .blue {
  position: absolute;
  cursor: pointer;
  width: 30px;
  height: 15px;
  border-radius: 15px;
  display: block;
  left: 30px;
  background: #3ac2f2;
  overflow: hidden;
}

.fan__root .top .blue::after {
  content: '';
  display: block;
  width: 100%;
  height: 50%;
  position: absolute;
  bottom: 0;
  background: #009cc6;
}

.fan__root .bottom {
  overflow: hidden;
  width: 200px;
  height: 20px;
}

.fan__root .bottom::after {
  content: '';
  display: block;
  width: 200px;
  height: 40px;
  background: #2f423f;
  border-radius: 18%;
  transform: translateY(-30px);
}

.fan__staddle {
  z-index: -1;
  position: absolute;
  bottom: 45px;
  background: #2f423f;
  height: 270px;
  width: 13px;
  left: 50%;
  transform: translateX(-50%);
}

.fan__engine {
  z-index: -1;
  position: absolute;
  bottom: 0px;
  width: 130px;
  height: 130px;
  background: #2f423f;
  border-radius: 50%;
  left: 50%;
  transform: translateX(-50%);
}

.fan__engine::after {
  content: '';
  background: #2f423f;
  display: block;
  width: 25px;
  height: 50px;
  position: absolute;
  top: 105px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 0 0 5px 5px;
}

.fan__blades {
  z-index: -1;
  width: 230px;
  height: 230px;
  position: absolute;
  bottom: -50px;
  transition: 2s;
  transform-origin: center center;
  left: calc(50% - 115px);
  z-index: 1;
  animation: spin infinite 0.38s linear forwards;
}

.fan__blades .fan__blades {
  bottom: 0;
  animation: spin infinite 0.5s linear forwards;
}

.fan__blades .blade {
  position: absolute;
  width: 50px;
  height: 100%;
  left: 50%;
  transform: translateX(-50%) skewY(25deg);
  perspective: 500px;
  transform-style: preserve-3d;
}

.fan__blades .blade:nth-child(2) {
  transform: translateX(-50%) rotate(90deg) skewY(25deg);
}

.fan__blades .blade:nth-child(3) {
  transform: translateX(-50%) rotate(180deg) skewY(25deg);
}

.fan__blades .blade:nth-child(4) {
  transform: translateX(-50%) rotate(270deg) skewY(25deg);
}

.fan__blades .blade span {
  width: 100%;
  height: 200%;
  border-radius: 44px;
  background: #ffc114;
  position: absolute;
  top: -66px;
  display: block;
  transform-style: preserve-3d;
  transform: rotateX(81deg);
  overflow: hidden;
}

.fan__blades .blade span::after {
  width: 50%;
  height: 100%;
  content: '';
  display: block;
  background: #fca12a;
  transform: rotate(0deg);
}

.fan__blades .center {
  position: absolute;
  overflow: hidden;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  background: #32ba7c;
  z-index: 2;
}

.fan__blades .center::after {
  display: block;
  content: '';
  width: 40px;
  height: 20px;
  background: #0aa06e;
}

.head {
  transition: 1s transform;
  height: auto;
  width: auto;
  position: absolute;
  width: 300px;
  height: 300px;
  bottom: 195px;
  left: calc(50% - 150px);
  /* transform: translateX(-50%);
   */
}

#engine:checked + div > div {
  animation: off2 1s ease-out forwards;
}

#engine:checked + div > span:nth-child(1) {
  transition: 5s all ease-in-out, 1s transform;
  left: 0px;
  top: 0px;
}

#engine:checked + div > span:nth-child(2) {
  transition: 5s all ease-in-out, 1s transform;
  right: 0px;
  top: 0px;
}

#engine:checked + div > span:nth-child(3) {
  transition: 7s all ease-in-out, 1s transform;
  right: -50px;
  top: 200px;
}

#engine2:checked + div {
  animation: off 1s ease-out forwards;
}

#jack:checked + div {
  transform: translateY(-115px);
}

#jack:checked + div > div:nth-child(3) > span {
  transform: translateY(115px);
}

@media screen and (max-width: 900px) {
  .window {
    flex: 1 25% !important;
  }
}

@media screen and (max-width: 800px) {
  .window {
    flex: 1 33.3333333% !important;
  }
}

@media screen and (max-width: 700px) {
  .window {
    flex: 1 50% !important;
  }
}

@media (max-width: $MQMobile) {
  .tag-wrapper {
    padding: 4.6rem 1rem 0;
  }

  .body {
    display: none;
  }

  .scroll-down {
    display: none;
  }
}

/* 箭头动画 */
@keyframes bounce-inSS {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-30px);
  }

  60% {
    transform: translateY(-15px);
  }
}
</style>
