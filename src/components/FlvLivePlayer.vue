<template>
<!--  <video controls autoplay muted width="100%" height="100%" id="videoElement"></video>-->
  <div width="100%" height="100%" id="dplayer"></div>
</template>

<script>
import 'flv.js'
import DPlayer from 'dplayer';
import Hls from "hls.js";
export default {
  name: "flv-live-player",
  props: ["url"],
  data() {
    return {
      dp:[]
    };
  },
  watch: {
    url(v1, v2) {
      console.log(v1, "v1");
      console.log(v2, "v2");
    }
  },
  mounted() {
    if(this.url){
      this.init(this.url)
    }else{
      console.log("推流参数为空")
    }
  },
  methods:{
    // q：怎么样将十进制颜色转为#ffffff这种表示的？ https://www.zhihu.com/question/20211931
    sendDmf(data){
      this.dp.danmaku.draw(data);
    },
    sendDm(danmu){
      danmu.time = null
      console.log(danmu)
      this.$emit('senddm',danmu)
      // this.dp.danmaku.draw(danmu);
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
        },
        customType: {
          customHls: function (video) {
            const hls = new Hls();
            hls.loadSource(video.src);
            hls.attachMedia(video);
          },
        }
      });
      console.log(this.dp)
    }
  }
};
</script>

<style>
</style>
