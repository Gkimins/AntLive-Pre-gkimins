<template>
  <div >
    <div class="sub">
      <div id="scroll-container">
        <transition-group name="scroll" tag="div">
          <div v-for="(text, index) in texts" :key="index" class="scrolling-text">
            {{ text }}
          </div>
        </transition-group>
      </div>

    </div>
    <div style="width: 100%;height: 500px" id="dplayer"></div>
  </div>

</template>

<script>
// import FlvJs from 'flv.js'
import flvjs from 'flv.js';
import DPlayer from 'dplayer';
import Hls from "hls.js";
export default {
  name: "flv-live-player",
  props: ["url","texts"],
  data() {
    return {
      dp:[],
      b:true
    };
  },
  watch: {
    url(v1, v2) {
      console.log(v1, "v1");
      console.log(v2, "v2");
    },
  },
  mounted() {
    if(this.url){
      this.init(this.url)
    }else{
      console.log("推流参数为空")
    }
  },
  methods:{
    sendDmf(data){
      console.log(data)
      this.dp.danmaku.draw(data);
    },
    sendDm(danmu){
      danmu.time = null
      console.log(danmu)
      this.updateText(danmu)
      this.$emit('senddm',danmu)
    },
    updateText(danmu) {
      if (this.b){
        this.texts.push(danmu); // 添加一个新元素
        this.b=false
      }else {
        this.texts.push(danmu); // 添加一个新元素
        setTimeout(()=>{
          if (this.texts.length>2){
            this.texts.splice(0,1); // 移除第一个元素
          }
        },200)
      }
    },
    init(v){
      console.log(v);
      const vue = this;
      this.dp = new DPlayer({
        container: document.getElementById('dplayer'),
        live: true,
        autoplay: true,
        danmaku: true,
        apiBackend: {
          read: function (options) {
            console.log('Pretend to connect WebSocket');
            options.success([]);
          },
          send: function (options) {
            console.log('Pretend to send danmaku via WebSocket', options.data);
            vue.sendDm(options.data)
            // options.success();
          },
        },
        video: {
          url: this.url,
          type: "customFlv",
          customType: {
            customHls: function (video) {
              const hls = new Hls();
              hls.loadSource(video.src);
              hls.attachMedia(video);
            },
            customFlv: function (video, player) {
              console.log(video.src)
              console.log(player)
              console.log(video)
              const flvPlayer = flvjs.createPlayer({
                type: 'flv',
                url: video.src,
              });
              flvPlayer.attachMediaElement(video);
              flvPlayer.load();
            },
          }
        },
        contextmenu: [
          {
            text: 'custom1',
            link: 'https://github.com/DIYgod/DPlayer',
          },
          {
            text: 'custom2',
            click: (player) => {
              console.log(player);
            },
          },
        ],
      });
      console.log(this.dp)
    }
  }
};
</script>

<style>
.sub {
  color: white;
  position: absolute;
  top: 78%;
  left: 23%;
  width: 33%;
  height: 6%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
.scrolling-text {
  /*position: absolute; !* 使每个元素重叠在一起 *!*/
  /*bottom: 0; !* 从底部开始出现 *!*/
  /*left: 0;*/
  /*right: 0;*/
  margin: auto;
  /*opacity: 0; !* 初始时透明度为0 *!*/
  /*animation: scroll 1s forwards; !* 持续1秒，线性动画 *!*/
}
.scroll-enter-active, .scroll-leave-active {
  transition: all 0.5s;
}
.scroll-leave-to{
  opacity: 0;
  transform: translateY(-60px);
}

.scroll-leave{
  opacity: 1;
  transform: translateY(0px);
}

.scroll-enter{
  opacity: 0;
  transform: translateY(30px);
}

.scroll-enter-to{
  opacity: 1;
  transform: translateY(0);
}


</style>
