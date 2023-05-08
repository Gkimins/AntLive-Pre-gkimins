<template>
  <el-container style="height:100%;">
    <el-header style="padding:0px">
      <Header :notIndexPage="true"/>
    </el-header>
    <el-main style="
    text-align:center;
    /*background-position: center center;*/
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('https://s2.loli.net/2023/03/25/CupAHg3oJBmUjZV.webp')">
      <div class="live-root">
        <div class="live-content-div">
          <el-card :body-style="{ padding: '0px' }" shadow="never">
            <div class="author-info-content">
              <div style="width:80px;float:left;">
                <el-image class="author-info-avatar" :src="info.userInfo.avatar" :fit="'fit'"></el-image>
              </div>
              <div class="author-info">
                <p class="author-info-title">{{ info.title }} <span
                    @click="this.$router.push({path:'/',params:info.categoryInfo})"
                    style="margin-left: 15px">{{ info.categoryInfo.name }}</span></p>
                <p class="author-info-name">{{ info.userInfo.name }}</p>
              </div>

              <div class="author-follow">
                <p style="width: 600px;font-size: 10px;width: 215px;line-height: 18px;">
                  <span class="head-text"><i class="el-icon-view">8413人看过</i></span>
                  <span @click="alarm()" class="iconfont head-text"
                        style="margin-left: 16px;font-size: 10px">&#xe652;举报</span>
                  <span @click="share()" class="iconfont head-text"
                        style="margin-left: 16px;font-size: 10px">&#xe600;分享</span>
                </p>
                <el-button
                    @click="handleBan"
                    v-if="isLiveRole"
                    round
                    style="padding:8px 20px 8px 20px;font-size:13px;"
                    type="danger"
                >封禁
                </el-button>

                <el-button
                    @click="handleFollow(false)"
                    v-if="isFollow"
                    round
                    disabled
                    style="padding:8px 20px 8px 20px;font-size:13px;"
                >已关注
                </el-button>
                <el-button
                    @click="handleFollow(true)"
                    v-else
                    round
                    style="padding:8px 20px 8px 20px;font-size:13px;"
                >关注
                </el-button>
              </div>
            </div>
            <div class="live-content">
              <div v-if="showSub" class="sub" v-bind:style="{height: sub_height + '%'}">
                <div id="scroll-container">
                  <transition-group name="scroll" tag="div">
                    <div v-for="(text, index) in texts" :key="index" class="scrolling-text"
                         v-bind:style="{fontSize: subsize + 'px'}">
                      {{ text }}
                    </div>
                  </transition-group>
                </div>

              </div>
              <LivePlayer @senddm="senddm" v-if="info.status===1" :url="spliceLiveUrl"
                          ref="maindplayer"/>
              <div class="not-live" v-else-if="info.status===0">主播正在赶来的路上...</div>
              <div class="not-live" style="color:#ff8e8e;" v-else>该直播间因违规已被封禁</div>
            </div>
            <div style="overflow: hidden;">
              <div style="float: left;margin-top: 15px;margin-left: 18px">
                <el-switch
                    v-model="showSub"
                    active-text="开启字幕"
                >
                </el-switch>
                <span v-if="showSub" style="font-size: 14px;margin-left: 18px">字幕大小</span>
                <el-input-number v-if="showSub" controls-position="right" style="width: 100px;margin-left: 18px"
                                 v-model="subsize" @change="handlesubSizeChange" :min="1" :max="999"
                                 label="字幕大小"></el-input-number>
                <span v-if="showSub" style="font-size: 14px;margin-left: 18px">字幕延迟（s）</span>
                <el-input-number v-if="showSub" controls-position="right" style="width: 100px;margin-left: 18px"
                                 v-model="default_timeout" :min="1" :max="999"
                                 label="字幕延迟"></el-input-number>
              </div>
              <div class="present-content">
                <el-popover
                    v-for="item in presents"
                    :key="item.id"
                    placement="top"
                    width="250"
                >
                  <div style="height:30px;">
                    <el-image style="width:30px;height:30px;" :src="item.icon"></el-image>
                    {{ item.name }}
                    <span>（{{ item.price }}开心果）</span>
                  </div>
                  <div style="text-align: left; margin: 20px 0 2px 0;background:666;">
                    <div
                        :class="sendCount==1?'price-item price-item-active':'price-item'"
                        @click="sendCount = 1"
                    >1
                    </div>
                    <div
                        :class="sendCount==10?'price-item price-item-active':'price-item'"
                        @click="sendCount = 10"
                    >10
                    </div>
                    <div
                        :class="sendCount==100?'price-item price-' +
                       'item-active':'price-item'"
                        @click="sendCount = 100"
                    >100
                    </div>
                    <el-button
                        style="float:right"
                        type="primary"
                        size="mini"
                        @click="handlePresent"
                    >确定
                    </el-button>
                  </div>
                  <el-image
                      class="present-item"
                      :src="item.icon"
                      slot="reference"
                      @click="handlePresentClick(item)"
                  ></el-image>
                </el-popover>
              </div>
            </div>

          </el-card>
        </div>
        <div class="live-chat-div">
          <el-card :body-style="{ padding: '0px' }" shadow="never">
            <div class="rank" style="display: grid">
              <el-image :src="require('@/assets/img/default-normal.b4c119c.png')" style="margin: 0 auto"></el-image>
              <span style="margin-top: -28px;padding-left: 68px;color: gray;font-size: 12px">快来抢占前排为主播打Call吧</span>
            </div>
            <div class="danmu">
              <ul id="danmu-list" class="infinite-list" style="overflow:auto">
                <li v-for="(i,index) in messageList" :key="index" class="infinite-list-item">
                  <div v-if="i.name==='礼物赠送'" style="display: inline-flex">
                    <el-image style="width: 60px;height: 60px" v-if="i.name==='礼物赠送'" :src="i.icon"></el-image>
                    <div style="line-height: 4;">
                      <span class="chat-content">{{ i.content }}</span>*
                      <span style="font-size: 21px;color: orange" class="chat-content">{{ i.num }}</span>个
                    </div>
                  </div>
                  <div v-else>
                    <span class="chat-name">{{ i.name }}</span>:
                    <span class="chat-content">{{ i.content }}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="send-message-content" style="display: inline-flex">
              <el-popover
                  placement="top"
                  title="颜色选择"
                  width="300"
                  trigger="click"
              >
                <el-card style="width: 300px;">
                  <el-radio-group v-model="yellow">
                    <el-radio label="#fff">白色</el-radio>
                    <el-radio label="#FF0000">红色</el-radio>
                    <el-radio label="16769331">黄色</el-radio>
                    <el-radio label="6610199">绿色</el-radio>
                    <el-radio label="3788031">蓝色</el-radio>
                    <el-radio label="13959417">紫色</el-radio>
                  </el-radio-group>
                </el-card>
                <el-image slot="reference" style="width: 32px;height: 32px;margin-top: 3px"
                          :src="require('@/assets/img/Palette.png')"/>
              </el-popover>

              <el-input @keyup.enter.native="handleSend" style="margin-left: 10px" v-model="input"
                        :disabled="this.isLogin" placeholder>
                <el-button slot="append" :disabled="this.isLogin" @click="handleSend">发送</el-button>
              </el-input>
            </div>
          </el-card>
        </div>
      </div>
      <div style="margin-top: 30px">
        <el-card style="margin-left: 69px;width: 996px">
          <el-tabs value="first">
            <el-tab-pane label="直播公告" name="first">
              <div v-html="info.notice" style="padding: 10px 20px 10px 20px">
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Api from "../api";
import Header from "../components/Header";
import LivePlayer from "../components/FlvLivePlayer";
import {getLocalUserInfo, getToken} from "../utils/auth";
import store from "../store";

export default {
  name: "index",
  data() {
    return {
      input: "",
      info: {
        id: "",
        title: "",
        userInfo: {
          nick: "",
          avatar: ""
        },
        liveUrl: "",
        status: "",
        notice: "",
      },
      isFollow: false,
      presents: [],
      socket: "",
      messageList: [],
      sendCount: 1,
      currentPresent: {},
      texts: [],
      showSub: false,
      yellow: 'white',
      direction: 'top',
      subsize: '18',
      sub_height: 8,
      default_timeout: 8,
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.userInfo == null;
    },
    spliceLiveUrl() {
      return this.info.liveUrl + this.info.id + ".flv";
    },
    isLiveRole() {
      const roleLiveId = 2;
      return (
          this.$store.state.userInfo != null &&
          this.$store.state.userInfo.roleIds.indexOf(roleLiveId) > -1
      );
    }
  },
  components: {
    Header,
    LivePlayer
  },
  mounted() {
    this.init();
  },
  methods: {
    //{message: '{",
    // "nickname":"管理员","roomId":1}', name: 'sub', time: '2023-05-08T11:25:42.844'}
    updateSubText(subtext) {
      let data = JSON.parse(subtext.message);
      let tt = this.default_timeout * 1000;
      setTimeout(() => {
        this.texts.push(data.content); // 添加一个新元素
        setTimeout(() => {
          if (this.texts.length > 2) {
            this.texts.splice(0, 1); // 移除第一个元素
          }
        }, 200)
      }, tt)
    },
    alarm() {
      //截图 并用el-pop显示， 用于举报

    },
    share() {

    },
    handleBan() {
      // eslint-disable-next-line no-unused-vars
      let rid = this.info.id;
    },
    handlePresentClick(v) {
      this.currentPresent = v;
    },
    handlePresent() {
      this.$confirm("是否赠送" + this.sendCount + "个" + this.currentPresent.name + "?", "赠送确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success ",
        lockScroll: false
      }).then(() => {
        let data = {
          rid: this.info.id,
          number: this.sendCount,
          pid: this.currentPresent.id
        };
        Api.sendPresent(data)
            .then(ret => {
              if (ret.data.code != 200) {
                console.log(ret)
                this.$notify.error({
                  title: "错误",
                  message: "赠送失败"
                });
              }
            })
            .catch(() => {
              this.$notify.error({
                title: "错误2",
                message: "赠送失败"
              });
            });
      });
    },
    //flag true的话是关注 否则是取消关注
    handleFollow(flag) {
      if (flag) {
        Api.saveWatch({
          rid: this.info.id,
          type: 1
        }).then(() => {
          this.isFollow = true;
        });
      } else {
        Api.cancelFollow(this.info.id).then(() => {
          this.isFollow = false;
        });
      }
    },
    init() {
      let rid = this.$route.params.id;
      Api.getRoomInfo(rid).then(res => {
        this.info = res.data.data;
      });
      Api.getPresentInfo().then(res => {
        this.presents = res.data.data;
      });
      this.initWebSocket(rid);
      console.log(this.$store.state, "this.$store.state.userInfo")
      if (this.$store.state.token == null) {
        console.log(this.$store.state, "this.$store.state.userInfo")
        this.input = "登录后才可以发送消息噢~";
      }
      Api.getIsWatch(rid).then(res => {
        this.isFollow = res.data.data;
      });
      Api.saveWatch({
        rid: rid,
        type: 0
      });
    },
    senddm(message) {
      let ws = store.state.webSocket.socket;
      let rid = this.$route.params.id;
      console.log(message)
      if (message == "") {
        return
      }
      console.log(getLocalUserInfo(), "getLocalUserInfo");
      ws.send(
          JSON.stringify({
            code: 1002,
            roomId: rid,
            nickname: JSON.parse(getLocalUserInfo()).nickName,
            content: message
          })
      );

    },
    sendAndReFreshList(message) {
      let ws = store.state.webSocket.socket;
      let rid = this.$route.params.id;
      console.log(getLocalUserInfo(), "getLocalUserInfo");
      let final_data = {
        text: message,
        color: this.yellow,
        type: this.direction
      };
      ws.send(
          JSON.stringify({
            code: 1002,
            roomId: rid,
            nickname: JSON.parse(getLocalUserInfo()).nickName,
            content: JSON.stringify(final_data)
          })
      );
      // this.$refs.maindplayer.sendDmf(final_data);
    },
    handleSend() {
      if (this.input == "") {
        return
      }
      console.log(this.input, "this.input");
      this.sendAndReFreshList(this.input);
      this.input = "";

      setTimeout(() => {
        var div = document.getElementById("danmu-list");
        div.scrollTop = div.scrollHeight;
      }, 0);
    },
    initWebSocket(rid) {
      let socketObj = store.state.webSocket;
      console.log(socketObj, "obj");
      if (
          socketObj.rid === rid &&
          socketObj.socket != "" &&
          socketObj.socket.readyState === 1
      ) {
        console.log("ws连接已经创建");
      } else {
        if (socketObj.socket != "") {
          socketObj.socket.close();
          console.log("wst执行手动关闭");
        }
        console.log("初始化ws");
        console.log(getToken())
        this.socket = new WebSocket(
            "ws://127.0.0.1:8222/dm"
        );
        this.socket.onopen = this.open;
        this.socket.onclose = this.onclose;
        this.socket.onerror = this.error;
        this.socket.onmessage = this.getMessage;
        store.commit("setWebSocket", {
          rid,
          socket: this.socket
        });
      }
    },
    open() {
      let ws = store.state.webSocket.socket;
      let rid = this.$route.params.id;
      ws.send(
          JSON.stringify({
                code: 1001,
                roomId: rid
              }
          ));
      console.log("ws连接成功");
    },
    error() {
      console.log("ws连接错误");
    },
    getMessage(msg) {
      console.log(msg, "msg");
      let message = JSON.parse(msg.data);
      console.log(message, "message");
      if (message.message == "与服务端建立连接成功") {
        return;
      }
      if (message.name == "警告") {
        this.$confirm('请文明用语！第二页违规将被禁言', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
        })
      }
      //{message: '{"content":"治疗关节炎","roomId":1}', name: 'sub', time: '2023-05-08T11:45:52.521'}message: "{\"content\":\"治疗关节炎\",\"roomId\":1}"name: "sub"time: "2023-05-08T11:45:52.521"[[Prototype]]: Object 'message'
      console.log(message.name, "message.nnn");
      if (message.name == "sub") {
        this.updateSubText(message);
        return;
      }
      let data = JSON.parse(message.message);
      console.log(data)
      if (data.op === "PRESENT") {
        // 礼物特效
        let p = data.p;
        this.$notify({
          title: data.u.name,
          message: "收到" + p.name + " * " + p.number,
          type: "success"
        });
        this.messageList.push({
          name: "礼物赠送",
          content: data.d,
          icon: p.icon,
          num: p.number
        });
      } else {
        let final_data = JSON.parse(data.content);
        this.messageList.push({
          name: data.nickname,
          content: final_data.text,
        });
        this.$refs.maindplayer.sendDmf(final_data);
      }
      setTimeout(() => {
        var div = document.getElementById("danmu-list");
        div.scrollTop = div.scrollHeight;
      }, 0);
      if (this.messageList.length > 20) {
        this.messageList.shift();
      }
      if (getLocalUserInfo() != null && data.nickname === JSON.parse(getLocalUserInfo()).nickName) {
        return;
      }

    },
    send() {
      this.socket.send("tt");
    },
    onclose() {
      console.log("ws已经关闭");
    },
    handlesubSizeChange(current, old) {
      var a = this.sub_height;
      if (old > current) {
        // 减去
        if (a > 5) {
          a = a - 1;
          this.sub_height = a;
        }
      } else {
        this.sub_height = a + 1;
      }
    }
  }
};
</script>

<style scoped lang="less">
.head-text {
  color: #9499a0;
}

.head-text:hover {
  color: #66ccff;
}

/* CDN 服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
/* CDN 服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: 'iconfont';  /* Project id 3976290 */
  src: url('//at.alicdn.com/t/c/font_3976290_fj009bnikk.woff2?t=1679729037716') format('woff2'),
  url('//at.alicdn.com/t/c/font_3976290_fj009bnikk.woff?t=1679729037716') format('woff'),
  url('//at.alicdn.com/t/c/font_3976290_fj009bnikk.ttf?t=1679729037716') format('truetype');
}

/* 可以自己改成自己想要的  比如yzsIconfont*/
.iconfont {
  font-family: "iconfont" !important;
  /*  样式都可以 修改  font-size: .20rem;  */
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.price-item {
  width: 45px;
  height: 25px;
  line-height: 25px;
  border: 1px solid rgb(179, 179, 179);
  border-radius: 10%;
  display: inline-block;
  text-align: center;
  margin-right: 5px;
}

.price-item-active {
  color: #fff;
  background: rgb(250, 125, 23);
  border: 1px solid rgb(255, 160, 72);
  cursor: pointer;
}

.price-item:hover {
  color: #fff;
  background: rgb(250, 125, 23);
  border: 1px solid rgb(255, 160, 72);
  cursor: pointer;
}

.infinite-list {
  height: 430px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list .infinite-list-item {
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  min-height: 20px;
  background: #f5faff;
  margin: 0px 0px 0px 0px;
  font-size: 14px;
  padding: 8px 5px 5px 10px;
}

.infinite-list .infinite-list-item:hover {
  background: #fff;
}

.infinite-list-item .chat-name {
  color: #52ad7f;
  margin-right: 3px;
}

.infinite-list-item .chat-content {
  margin-left: 5px;
}

.live-root {
  margin: 0 auto;
  //min-width: 1500px;
}

.live-content-div {
  text-align: left;
  width: 997px;
  display: inline-block;
}

.live-chat-div {
  margin-left: 10px;
  text-align: left;
  width: 330px;
  display: inline-block;
}

.bg-purple {
  background: #d3dce6;
  height: 550px;
}

.bg-purple-light {
  background: #e5e9f2;
  height: 550px;
}

.author-info-content {
  height: 80px;
  background: rgb(255, 255, 255);
  display: flex;
}

.author-info-avatar {
  width: 65px;
  height: 65px;
  border-radius: 70px;
  margin: 6px 10px 0px 10px;
}

.author-info {
  height: 80px;
  width: 700px;
  position: relative;
  display: inline-block;
}

.author-info-title {
  padding: 7px;
  margin: 0px 0 0 10px;
  color: #3a3a3a;
  font-size: 20px;
  line-height: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.author-info-name {
  padding: 7px;
  margin: 0px 0 0 10px;
  color: #636363;
  font-size: 14px;
  line-height: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.author-follow {
  height: 80px;
  //width: 200px;
  line-height: 5px;
  vertical-align: middle;
  text-align: center;
}

.live-content {
  height: 500px;
  background: rgba(44, 44, 44, 0.685);
}

.present-content {
  float: right;
  height: 60px;
  background: rgb(255, 255, 255);
}

.rank {
  height: 130px;
  background: rgb(255, 255, 255);
}

.danmu {
  height: 450px;
  background: rgb(247, 247, 247);
}

.send-message-content {
  vertical-align: middle;
  padding: 10px 10px 10px 10px;
}

.send-message-box {
  height: 45px;
  margin: 0 10px 0 10px;
}

.send-message-btn {
  float: left;
  margin-left: 5px;
  width: 20%;
  height: 45px;
  border: 1px solid rgb(90, 90, 90);
  background: none;
}

.present-item {
  width: 30px;
  height: 30px;
  margin: 7px;
  padding: 7px;
  border-radius: 4px;
  border: 1px solid rgb(221, 221, 221);
}

.present-item:hover {
  //float: right;
  border: 1px solid rgb(243, 130, 0);
  cursor: pointer;
}

.not-live {
  width: 100%;
  height: 100%;
  text-align: center;
  color: rgb(218, 218, 218);
  line-height: 500px;
}

.sub {
  border-radius: 9px;
  color: white;
  position: absolute;
  top: 78%;
  left: 23%;
  width: 33%;
  height: 6%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  font-size: 20px;
  overflow: hidden;
}

.scrolling-text {
  /*position: absolute; !* 使每个元素重叠在一起 *!*/
  /*bottom: 0; !* 从底部开始出现 *!*/
  /*left: 0;*/
  /*right: 0;*/
  margin: auto;
  text-align: center;
  margin-top: 5px;
  /*opacity: 0; !* 初始时透明度为0 *!*/
  /*animation: scroll 1s forwards; !* 持续1秒，线性动画 *!*/
}

.scroll-enter-active, .scroll-leave-active {
  transition: all 0.5s;
}

.scroll-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}

.scroll-leave {
  opacity: 1;
  transform: translateY(0px);
}

.scroll-enter {
  opacity: 0;
  transform: translateY(30px);
}

.scroll-enter-to {
  opacity: 1;
  transform: translateY(0);
  background: none;
}


</style>

