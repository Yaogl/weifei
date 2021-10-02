<template>
  <div class="global-footer">
    <div class="left">
      <i class="el-icon-message" />
      <div class="company">
        <p class="email">官方邮箱</p>
        <p class="address">iisec@360.cn</p>
      </div>
    </div>
    <div class="right">
      <p>Copyright©2005-2019 360.cn 版权所有 360互联网安全中心</p>
      <p>
        京ICP证080047号[京ICP备08010314号-6] 文网文[2009]024号
        新出网证（京）字069号 工商营业执照
      </p>
      <p>京公网安备 11000002000006号</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.global-footer {
  height: 140px;
  padding: 0 370px;
  background: #1d253e;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    color: #fff;
    display: flex;
    height: 36px;
    i {
      font-size: 40px;
    }
    .company {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .email {
        font-size: 12px;
      }
      .address {
        font-size: 20px;
      }
    }
  }
  .right {
    color: #888888;
    font-size: 12px;
    line-height: 16px;
  }
}
</style>
