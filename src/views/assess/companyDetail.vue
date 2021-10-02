<template>
  <div class="page">
    <bread />
    <div class="container">
      <el-card class="box-card" style="margin-top: 30px">
        <div slot="header">
          <div class="header">
            基本资料
          </div>
        </div>
        <div class="flex-y box">
          <div class="flex-x">
            <div>
              <span class="label">公司名称:</span>
              江苏省苏州市工业有限公司
            </div>
            <div>
              <span class="label">上市情况:</span>
              以上市
            </div>
            <div>
              <span class="label">联系人:</span>
              王浩
            </div>
          </div>
          <div class="flex-x">
            <div>
              <span class="label">企业所在城市:</span>
              江苏省苏州市工业园区
            </div>
            <div>
              <span class="label">产业领域:</span>
              工业互联网
            </div>
            <div>
              <span class="label">联系电话:</span>
              199-2-33355
            </div>
          </div>
          <div>
            <span class="label">企业详细地址:</span>
            江苏省苏州市工业园区金鸡湖大道9999号G3-2222
          </div>
          <div>
            <span class="label">描述:</span>
            福建省大立科技发圣诞节分福建省大立科技发圣诞节分福建省大立科技发圣诞节分
          </div>
        </div>
        <el-button
          type="success"
          style="float: right;margin: 20px 0 30px 0;width: 100px"
          @click="
            $router.push(`/assess/company-edit?id=${$route.query.id || ''}`)
          "
        >
          编辑
        </el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompanyDetail'
}
</script>

<style lang="scss" scoped>
@import 'global';

.header {
  border-left: 6px solid $color-success;
  padding-left: 10px;
}
.flex-x {
  display: flex;
  flex-direction: row;
  & > div {
    flex: 1;
  }
}
.flex-y {
  display: flex;
  flex-direction: column;
}
.label {
  width: 100px;
  text-align: right;
  display: inline-block;
  color: $color-text-secondry;
}
.box {
  font-size: $font-base;
  line-height: 36px;
  padding: 8px;

  border: 1px solid $color-line;
}
</style>
