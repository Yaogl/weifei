<template>
  <div class="page">
    <div class="header">
      <div @click="jump('a')">a</div>
      <div style="background: yellow" @click="jump('b')">b</div>
      <div @click="jump('c')">c</div>
    </div>
    <div ref="a">1</div>
    <div ref="b" style="background: red">2</div>
    <div ref="c">3</div>
  </div>
</template>

<script>
export default {
  name: 'Test',
  methods: {
    jump(tag) {
      console.log(this.$refs[tag])
      this.$refs[tag].scrollIntoView({
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.page {
  & > div {
    height: 100vh;
  }
  .header {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    & * {
      flex: 1;
    }
  }
}
</style>
