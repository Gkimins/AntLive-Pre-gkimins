<template>
  <el-container class="index-center">
    <el-header style="padding:0px">
      <Header :categorys="this.$store.state.categorys" @category-select="handleSelect" @search-room="handleSearchRoom"/>
    </el-header>
    <el-main>
      <div class="item-container ">
<!--        换成获取所有的推广位，然后显示-->
        <el-carousel indicator-position="outside" v-if="rmPicList" :autoplay="false" height="500px" arrow="always">
          <el-carousel-item v-for="(item,index) in rmPicList" :key="index">
<!--            <el-image :src="item.bannerUrl"/>-->
              <LivePlayer :url="item.url"
                          ref="maindplayer" style="width: 80%"/>

          </el-carousel-item>
        </el-carousel>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-crumb">
          <span>全部</span>
          <el-breadcrumb-item>
            <span style="cursor:pointer;font-weight:bold;" @click="handleAllClick">全部</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{current_category}}</el-breadcrumb-item>
        </el-breadcrumb>
        <LiveRoom v-for="item in rooms" :key="item.id" :room="item"></LiveRoom>
      </div>
    </el-main>
    <el-footer height="" style="background: #f6f9fa">
      <FooterHuYa></FooterHuYa>
    </el-footer>
  </el-container>
</template>

<script>
import Header from "../components/Header";
import LiveRoom from "../components/LiveRoom";
// import Footer from "../components/Footer";

import LivePlayer from "../components/FlvLivePlayer";
import FooterHuYa from "../components/Footer-huya";
import Api from "../api";
import store from '../store';
export default {
  components: {
    LiveRoom,
    Header,
    FooterHuYa,
    LivePlayer
  },
  data() {
    return {
      rooms: [],
      categorys: [],
      current_category: "",
      showCarousel: true,
      rmPicList: []
    };
  },
  mounted() {
    this.list();
    store.dispatch('getCategorys').then(()=>{})
  },
  methods: {
    async spliceLiveUrl(roomId) {
      var info ;
      await Api.getRoomInfo(roomId).then(res => {
        info = res.data.data;
      });
      console.log("77")
      if (roomId<9){
        return info.liveUrl;
      }
      return info.liveUrl + info.id + ".flv";
    },
    handleSearchRoom(roomName){
      Api.searchRoom(roomName).then(res=>{
        this.rooms = res.data.data;
        this.showCarousel = false;
      })
    },
    handleSelect(c) {
      if (c == null) {
        this.current_category = "";
        this.list();
        return;
      }
      this.current_category = c.name;
      this.list(c.id);
    },
    async list(cid) {
      var tt = this;
      await Api.getBanners().then(res => {
        this.rmPicList = res.data.data;
        for (let i = 0; i < this.rmPicList.length; i++) {
          tt.spliceLiveUrl(this.rmPicList[i].bannerLinkHomeId).then(res => {
            this.rmPicList[i].url = res;
          });
        }
      })
      Api.getLivingRoomInfo(cid).then(res => {
        this.rooms = res.data.data;
      });
    },
    handleAllClick() {
      this.current_category = "";
      this.list();
    },
    //点击增加访问量
    handleAddClick(bannerId){
      Api.addBannerClick(bannerId).then(res=>{
        console.log(res)
      })
    }
  }
};
</script>

<style lang="less">
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.item-container {
  width: 90%;
  margin: 0 auto;
}
.index-center {
  .bread-crumb {
    padding-left: 20px;
    margin-bottom: 10px;
  }
}
</style>
