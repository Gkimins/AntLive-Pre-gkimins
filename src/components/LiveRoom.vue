<template>
  <el-card @click.native="handleClick" class="card" :body-style="{ padding: '0px' }" shadow="hover"
           style="position:relative">
    <el-image fit="cover" class="image-cover" :src="room.cover">
    </el-image>
    <el-tag style="position:absolute;left:7px;top:7px;height:24px;line-height:24px;background-color: #ffffff6b;"
            type="success" effect="plain">直播
    </el-tag>
    <div style="display: inline-flex">
      <div style="padding: 14px;width: 150px">
        <span class="title">{{ room.title }}</span>
        <div class="bottom clearfix">
          <img class="avatar" :src="room.userInfo.avatar"/>
          <time class="time">{{ room.userInfo.name }}</time>
        </div>
      </div>
      <span class="head-text time" style="margin: 36px 0px 0px 40px;"><i class="el-icon-view">15人看过</i></span></div>
  </el-card>
</template>

<script>
export default {
  name: "live-room",
  props: ["room"],
  data() {
    return {
      currentDate: new Date()
    };
  },
  methods: {
    handleClick() {
      this.$router.push({
        path: "/live/" + this.room.id
      });
    }
  }
};
</script>

<style lang="less">
.avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
}

.card {
  width: 300px;
  height: 230px;
  float: left;
  cursor: pointer;
  margin: 10px;
}

.image-cover {
  width: 300px;
  height: 160px;
  display: block;
}

.bottom {
  margin-top: 5px;
  line-height: 20px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.time {
  font-size: 13px;
  color: #999;
  vertical-align: top;
  line-height: 22px;
}
</style>
