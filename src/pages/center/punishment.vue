<template>
  <el-card>
<!--    todo 没有违规记录的信息？-->
    <div class="punishment-container">
      暂无违规记录，请继续保持~
    </div>
  </el-card>

</template>

<script>
export default {
    name:'punishment'
}
</script>

<style lang="less">
    .punishment-container{
        height:500px;
        line-height: 500px;
        font-size: 13px;
        color:#666;
    }
</style>
