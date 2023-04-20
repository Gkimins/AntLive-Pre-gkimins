<template>
  <div class="user-manage-container">
    <div class="header-operator">
      <span>房间号</span>
    <el-input placeholder="请输入房间号" v-model="roomId" style="width:200px" size="small">
        <el-button slot="append" @click="handleSearchButton" icon="el-icon-search"></el-button>
      </el-input>
       <span>直播状态</span>
      <el-select v-model="liveStatus" placeholder="直播状态" size="small" @change="handleSelectChange" :clearable="true">
        <el-option key="0" label="未开播" value="0"></el-option>
        <el-option key="1" label="直播中" value="1"></el-option>
      </el-select>
       <span>封禁状态</span>
      <el-select v-model="liveDisabled" placeholder="封禁状态" size="small" @change="handleSelectChange" :clearable="true">
        <el-option key="0" label="未封禁" value="0"></el-option>
        <el-option key="1" label="封禁中" value="1"></el-option>
      </el-select>
    </div>
    <el-table :data="tableData" style="width: 100%" class="room-table">
      <!-- <el-table-column label type="index" show-overflow-tooltip width="50" align="center"></el-table-column> -->
      <el-table-column type="expand">
      <template slot-scope="props">
        <el-card style="">
          <el-tabs value="first">
            <el-tab-pane label="直播信息" name="first">
              <p>直播封面:</p>
              <el-image style="width: 60px;height: 60px" :src="props.row.cover">
              </el-image>
              <p>直播公告:</p>
              <div v-html="props.row.notice" style="padding: 10px 20px 10px 20px">
              </div>
              <el-form-item label="推流地址:">
                <span>{{ props.row.rtmpUrl }}</span>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </template>
      </el-table-column>
      <el-table-column prop="id" label="房间号" align="center"></el-table-column>
      <el-table-column prop="title" label="标题" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="categoryId" label="分类" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="user.nickName" label="用户名称" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="status" label="直播状态" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">未直播</span>
          <span v-if="scope.row.status == 1">直播中</span>
        </template>
      </el-table-column>
      <el-table-column prop="disabled" label="封禁状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.disabled===0" type="success" size="mini" effect="plain">正常</el-tag>
          <el-tag v-else type="success" effect="plain" size="mini">已封禁</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <el-button type="danger" size="mini">封禁</el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="limit"
      layout="prev, pager, next, jumper"
      :total="total"
      style="margin-top:10px;"
    ></el-pagination>
  </div>
</template>

<script>
import Api from "../../api";
export default {
  name: "live-room-manage",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      limit: 8,
      total: 0,
      liveStatus:null,
      liveDisabled:null,
      roomId:null
    };
  },
  mounted() {
    this.page();
  },
  methods: {
    handleSearchButton(){

    },
    handleSelectChange(){

    },
    handleSizeChange(val) {
      this.limit = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.page();
    },
    page() {
      Api.adminGetRoomList(this.currentPage, this.limit).then(res => {
        let ret = res.data.data;
        this.tableData = ret.records;
        this.total = ret.total;
      });
    }
  }
};
</script>

<style lang="less">
.user-manage-container {
  background: #fff;
    padding:20px;

  .header-operator {
    text-align: left;
    padding: 10px 0px 5px 0px;
    height: 40px;
    background: rgba(255, 255, 255, 0.315);
    span {
      font-size: 13px;
      color: rgb(100, 100, 100);
      margin: 0px 5px 0px 20px;
    }
  }
}
.room-table .cell {
  max-height: 53px !important;
}
</style>
