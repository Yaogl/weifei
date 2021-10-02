<template>
  <div v-if="message" class="advert-top">
    <!-- 滚动文字区域 -->
    <div class="marquee-wrap">
      <ul class="marquee-box" name="marquee-box">
        <li
          v-for="i in 3"
          :key="i"
          v-html="message"
          :name="i == 1 ? 'marquee' : ''"
          class="marquee-list"
        />
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      timer: null
    }
  },
  watch: {
    message () {
      this.runMarquee()
    }
  },
  mounted () {
    // 延时滚动
    setTimeout(() => {
      this.runMarquee()
    }, 1000)
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    runMarquee() {
      if (this.timer) {
        clearInterval(this.timer)
      }
      // 获取文字 计算后宽度
      const width = this.$el.querySelector('[name="marquee"]').getBoundingClientRect().width
      const marquee = this.$el.querySelector('[name="marquee-box"]')
      let disx = 0
      // 设置位移
      this.timer = setInterval(() => {
        disx--
        if (-disx >= width) {
          disx = 10
        }
        marquee.style.left = disx + 'px'
      }, 30)
    }
  }
}
</script>
<style lang="scss" scoped>
.advert-top {
  position: relative;
  display: flex;
  width: 100%;
  font-size: 14px;
  align-items: center;
  /* 以下代码与滚动相关 */
  .marquee-wrap {
    position: relative;
    display: flex;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  .marquee-box {
    position: absolute;
    top: 50%;
    display: flex;
    white-space: nowrap;
    transform: translateY(-50%);
  }
  .marquee-list span {
    padding: 0 0.04rem;
    color: #ffe17b;
    font-weight: 700;
  }
}
</style>
