<template>
  <div class="info">
    <div class="portrait">
      <el-image :src="portrait" style="width: 120px; height: 120px"  />
    </div>

    <div class="user-info">
      <div class="nick-level">
        <div class="nick" v-text="nick"></div>
        <div :class="'level level'+levelClass">
          <i :class="'icons icon_level_'+levelClass"></i>
          <span v-text="level"></span>
        </div>
      </div>

      <div class="uid" v-text="'ID:'+uid"></div>
      <div style="margin: 10px 0px 0px 0px">
        <span style="font-size: 15px" >直播间ID:</span>
        <span style="color: #66ccff; margin-left: 15px" v-text="1125"></span>
        <span style="color: #66ccff; margin-left: 15px; font-size: 15px" >点击复制</span>
      </div>
      <div style="margin: 10px 0px 0px 0px">
        <span style="font-size: 15px" >直播间链接:</span>
        <span style="color: #66ccff; margin-left: 15px">http://live.bilibili.com/904881</span>
        <span style="color: #66ccff; margin-left: 15px; font-size: 15px" >点击复制</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
    };
  },
  props: ["nick", "level", "uid", "starNumber", "roomId", "roomUrl"],
  computed: {
    levelClass() {
      var level = this.level;
      if (1 <= level && level <= 7) {
        return 1;
      } else if (8 <= level && level <= 16) {
        return 2;
      } else if (16 <= level && level <= 31) {
        return 3;
      } else if (32 <= level && level <= 63) {
        return 4;
      } else if (64 <= level && level <= 127) {
        return 5;
      } else if (128 <= level && level <= 254) {
        return 6;
      } else {
        return 6;
      }
    }
  }
};
</script>

<style scoped>
.info {
  font-size: 20px;
  background: #fff;
  height: 180px;
  text-align: left;
}
.portrait {
  width: 110px;
  height: 110px;
  overflow: hidden;
  -webkit-border-radius: 40px;
  -moz-border-radius: 40px;
  -ms-border-radius: 40px;
  -o-border-radius: 40px;
  border-radius: 40px;
  background-color: #cccccc;
  margin: 30px 18px 0 22px;
}
.user-info {
  margin: 18px 0 0 10px;
  vertical-align: top;
}
.portrait,
.user-info,
.w-star,
.w-diamond,
.nick,
.level {
  display: inline-block;
}
.nick {
  font-size: 25px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 110px;
}
.nick,
.level {
  vertical-align: middle;
}
.cut {
  padding: 0 10px;
  color: #e9e9e9;
  font-size: 15px;
}
.uid,
.wealth {
  margin-top: 14px;
}
.uid {
  font-size: 15px;
}
.nick-level {
}
.level {
  padding: 0 6px;
  color: #fff;
  font-size: 13px;
  margin-left: 5px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
  border-radius: 10px;
  height: 20px;
  line-height: 20px;
}
.level .icons {
  display: inline-block;
}
.level1 {
  background: #50e4ce;
}
.level2 {
  background: #4a87f6;
}
.level3 {
  background: #fa9f47;
}
.level4 {
  background: #fad247;
}
.level5 {
  background: #5061e4;
}
.level6 {
  background: #ac47fa;
}
.level .num {
  display: inline-block;
}
.wealth {
  font-size: 12px;
  white-space: nowrap;
}
.wealth .icons {
  margin-top: -3px;
  vertical-align: middle;
}
</style>
