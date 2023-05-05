<template>
  <div style="background: #fff;padding: 10px">
    <!-- 搜索表单 -->
    <el-form :inline="true" class="search-form" style="float: left;margin-left: 30px;">
      <el-form-item label="推广位名称">
        <el-input v-model="searchKeyword" placeholder="请输入关键字" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="loadTableData">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="showAddDialog">新增推广位</el-button>
      </el-form-item>
    </el-form>

    <!-- 推广位列表 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="bannerName" label="推广位名称"></el-table-column>
      <el-table-column prop="bannerUrl" label="图片">
        <template slot-scope="scope">
          <el-image style="width: 30px; height: 30px" :src="scope.row.bannerUrl" fit="fit"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="bannerLinkHomeId" label="关联房间"></el-table-column>
      <el-table-column prop="bannerShowStartTime" label="开始时间"></el-table-column>
      <el-table-column prop="bannerShowEndTime" label="结束时间"></el-table-column>
      <el-table-column label="点击量">
        <template slot-scope="scope">
          <span v-if="scope.row.bannerClick">{{ scope.row.bannerClick }}</span>
          <span v-else>暂无数据</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="{ row }">
          <el-switch v-model="row.enable" active-color="#13ce66" inactive-color="#ff4949"
                     @change="toggleStatus(row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button type="text" @click="showEditDialog(row)">编辑</el-button>
          <el-button type="text" @click="deleteItem(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增或编辑对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
      <el-form :model="dialogForm" :rules="dialogRules" ref="dialogForm">
        <el-form-item label="推广位名称" prop="bannerName">
          <el-input v-model="dialogForm.bannerName" placeholder="请输入推广位名称"></el-input>
        </el-form-item>
        <el-form-item label="推广图片">
          <el-upload
              class="avatar-uploader"
              action="/api/live/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
            <img style="width: 100px;height: 50px" v-if="dialogForm.bannerUrl" :src="dialogForm.bannerUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="关联房间" prop="bannerLinkHomeId">
          <el-input v-model="dialogForm.bannerLinkHomeId" placeholder="请输入关联房间ID"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="bannerShowStartTime">
          <el-date-picker v-model="dialogForm.bannerShowStartTime" type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="bannerShowEndTime">
          <el-date-picker v-model="dialogForm.bannerShowEndTime" type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Api from "../../api";

export default {
  data() {
    return {
      searchKeyword: '', // 搜索关键字
      tableData: [], // 推广位数据
      dialogTitle: '', // 对话框标题
      dialogVisible: false, // 对话框是否可见
      dialogForm: { // 对话框表单数据
        id: '',
        bannerName: '',
        bannerUrl: '',
        bannerLinkHomeId: '',
        bannerShowStartTime: null,
        bannerShowEndTime: null
      },
      dialogRules: { // 对话框表单校验规则
        bannerName: [
          {required: true, message: '请输入推广位名称', trigger: 'blur'}
        ],
        bannerUrl: [
          {required: true, message: '请输入图片链接', trigger: 'blur'}
        ],
        bannerLinkHomeId: [
          {required: true, message: '请输入关联房间ID', trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    // 加载推广位列表
    this.loadTableData()
  },
  methods: {
    // 加载推广位列表
    loadTableData() {
      // 调用API获取推广位数据，并将结果赋值到tableData中
      // 这里假设您的API接口为 getBanners
      Api.getBanners({keyword: this.searchKeyword}).then(res => {
        this.tableData = res.data.data
      })
    },
    // 显示新增对话框
    showAddDialog() {
      this.dialogTitle = '新增推广位'
      this.dialogForm = {
        id: '',
        bannerName: '',
        bannerUrl: '',
        bannerLinkHomeId: '',
        bannerShowStartTime: null,
        bannerShowEndTime: null
      }
      this.dialogVisible = true
    },
    // 显示编辑对话框
    showEditDialog(item) {
      this.dialogTitle = '编辑推广位'
      this.dialogForm = {
        id: item.id,
        bannerName: item.bannerName,
        bannerUrl: item.bannerUrl,
        bannerLinkHomeId: item.bannerLinkHomeId,
        bannerShowStartTime: item.bannerShowStartTime ? new Date(item.bannerShowStartTime) : null,
        bannerShowEndTime: item.bannerShowEndTime ? new Date(item.bannerShowEndTime) : null
      }
      this.dialogVisible = true
    },
    // 提交对话框表单
    submitForm() {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          // 校验通过，提交表单数据到API进行保存
          console.log('提交表单：', this.dialogForm)
          this.dialogVisible = false
          Api.saveOrUpdateBanner(this.dialogForm).then(() => {
            this.$message({
              type: 'success',
              message: '保存成功!'
            })
            this.loadTableData() // 刷新列表数据
          })
        } else {
          // 校验失败
          console.log('校验未通过')
        }
      })
    },
    // 删除推荐位
    deleteItem(item) {
      this.$confirm('确定要删除该推荐位吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用API删除指定推荐位
        console.log('删除推荐位：', item)
        Api.deleteRecommandItem(item.id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadTableData() // 刷新列表数据
        })
      }).catch(() => {
        // 取消删除操作
      });
    },
    // 切换推荐位状态
    toggleStatus(row) {
      // 调用API更新推荐位状态
      var st = 0;
      debugger
      if (row.enable) {
        st = 1;
      } else {
        st = 0;
      }
      Api.updateRecommandStatus(row.id,st)
      console.log('切换状态：', row.id, st)
    },
    handleAvatarSuccess(res) {
      this.dialogForm.bannerUrl = res.data;
    },
    beforeAvatarUpload(file) {
      console.log(file.type)
      const isJPG = file.type === "image/png";
      const isJPEG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        if (!isJPEG) {
          this.$message.error("上传图片只能是 JPG 格式!");
        }
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return (isJPG || isJPEG) && isLt2M;
    },
  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
