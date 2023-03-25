<template>
  <div class="live-settings">
    <el-card v-if="verifyStatus==-1" class="live-settings-card" shadow="hover">
      <el-empty
          description="请先进行实名认证后再试"
          :src="require('@/assets/img/fail.png')"/>
      <el-divider></el-divider>
      <router-link to="/center/identify">
        <el-button type="primary" plain>去认证</el-button>
      </router-link>
    </el-card>
    <el-card
        v-else
        class="live-settings-card"
        :body-style="{ padding: '0 0 10px 0' }"
        shadow="hover"
    >
      <div v-if="this.liveStatusObj.liveStatus != 1">
        <p>开播</p>
        <el-divider></el-divider>
        <span>推流地址：</span
        ><span style="font-size: 14px; color: #666">{{
          liveStatusObj.livePushUrl
        }}</span>
        <p></p>
        <span>密钥：</span
        ><span style="font-size: 14px; color: #666">{{
          liveStatusObj.livePushSecret
        }}</span>
        <el-divider></el-divider>
        <el-button plain @click="handleLiveOpen">我要直播</el-button>
      </div>
      <div v-else>
        <p><i class="el-icon-loading"></i> 直播中</p>
        <el-divider></el-divider>
        <span>推流地址：</span
        ><span style="font-size: 14px; color: #666">{{
          liveStatusObj.livePushUrl
        }}</span>
        <p></p>
        <span>密钥：</span
        ><span style="font-size: 14px; color: #666">{{
          liveStatusObj.livePushSecret
        }}</span>
        <p></p>
        <span>直播开始时间：</span
        ><span style="font-size: 14px; color: #666">{{
          liveStatusObj.liveStartTime
        }}</span>
        <p></p>
        <el-popconfirm
            icon="el-icon-info"
            icon-color="red"
            title="直播流将会被中断噢～"
            @onConfirm="handleLiveStop"
        >
          <el-button slot="reference" type="danger" plain
          >停止直播
          </el-button
          >
        </el-popconfirm>
      </div>
    </el-card>
  </div>
</template>

<script>
import Api from "../../api";

export default {
  name: "live-settings",
  data() {
    return {
      liveStatusObj: {
        liveStatus: "",
        liveStartTime: "",
        livePushUrl: "--",
        livePushSecret: "点击下面我要直播申请密钥",
      },
      verifyStatus: 0
    };
  },
  mounted() {
    this.initGetStatus();
  },
  methods: {
    initGetStatus() {
      Api.getRoomSettingInfo().then(res => {
        let ret = res.data.data;

        this.verifyStatus = ret.status;
      });
      Api.getLiveStatus().then((r) => {
        if (r.data.code == 0) {
          this.liveStatusObj = r.data.data;
        }
      });
    },
    handleLiveOpen() {
      this.openLive();
    },
    handleLiveStop() {
      Api.stopLive().then((r) => {
        if (r.data.code == 0) {
          this.initGetStatus();
        }
      });
    },
    openLive() {
      Api.openLive().then(res => {
        let ret = res.data.data;
        this.liveStatusObj.livePushUrl = ret.pushUrl;
        this.liveStatusObj.livePushSecret = ret.secret;
      })
    }
  }
};
</script>

<style>
.live-settings {
  /* min-height: 500px; */
  height: 500px;
  padding: 0 20px 0 20px;
}

.live-settings-card {
  /* margin: 20px; */
  height: 440px;
  position: relative;
  top: 20px;
}
</style>
