<template>
  <el-card>
    <div style="height:500px;box-sizing: border-box;max-width:900px;padding:20px;position:relative;">
      <el-row :gutter="12">
        <div
            v-if="watchList.length==0"
            class="identify"
            style="height:445px;text-align:center;font-size:17px;color:#3f74a8"
        >
          <div style="/* line-height: 400px; */display: inline-grid; margin-top: 80px">
            <el-image :src="require('@/assets/img/waiting.png')" style="width: 200px;height: 200px"/>
            <br>
            <span>暂时没有观看记录</span>
          </div>
        </div>
        <FollowItem v-for="item in watchList" :key="item.id" :item="item" />
      </el-row>
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="limit"
          layout="prev, pager, next"
          :total="total"
          style="float:left;width:850px;"
          hide-on-single-page
      ></el-pagination>
    </div>
  </el-card>
</template>

<script>
import Api from "../../api";
import FollowItem from "../../components/FollowItem";
export default {
  name: "history",
  components: {
    FollowItem
  },
  data() {
    return {
      watchList: [],
      total: 0,
      limit: 10,
      currentPage: 1
    };
  },
  methods: {
    handleDateRangeChange() {
      this.page();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.page();
    },
    page() {
      Api.getWatctList(0, this.currentPage, this.limit).then(res => {
        let ret = res.data.data;
        this.watchList = ret.records;
        this.total = ret.total;
      });
    }
  },
  mounted() {
    this.page();
  }
};
</script>

<style>
</style>
