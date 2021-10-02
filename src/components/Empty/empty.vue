<template>
  <div class="empty">
    <img :src="img" alt="">
    <span v-if="text">{{ text }}</span>
    <el-button v-if="showBtn" class="btn" @click="clickBtn">{{
      btnText
    }}</el-button>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: '/static/img/empty.994b129b.png'
    },
    text: {
      type: String,
      default: '暂无数据'
    },
    btnText: {
      type: String,
      default: '填写问卷'
    },
    showBtn: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    clickBtn() {
      this.$emit('clickBtn')
    }
  }
}
</script>

<style lang="scss" scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;

  font-size: 20px;
  font-weight: 400;
  color: #383838;

  img {
    width: 200px;
    height: auto;
  }

  .btn {
    color: #fff;
    width: 179px;
    height: 50px;
    background: #02bb50;
    border-radius: 3px;
    margin-top: 30px;
  }
}
</style>
