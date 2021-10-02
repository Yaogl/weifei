<template>
  <div class="dashboard-container">
    <!-- <SpeadChart style="height: 362px;" :chartData="devicesData" /> -->
    <div class="left">
      <div class="protocol-distribution">
        <h3 class="title">Protocol distribution</h3>
      </div>
      <div class="global-distribution">
        <h3 class="title">Global distribution</h3>
      </div>
    </div>
    <div class="center">1111</div>
    <div class="right">
      <div class="top">
        <h3 class="title">Top 10 of domainame across</h3>
      </div>
      <div class="brand-spreading">
        <h3 class="title">Brand spreading</h3>
      </div>
    </div>
  </div>
</template>

<script>
import SpeadChart from './components/spead-chart'
import ProcessChart from './components/process-chart.vue'

export default {
  name: 'Dashboard',
  components: {
    SpeadChart,
    ProcessChart
  },
  data() {
    return {}
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #15181F;
  .center{
    flex: 1;
  }
  .title{
    font-family: Helvetica-Bold;
    font-size: 24px;
    color: #FFFFFF;
    line-height: 24px;
    font-weight: 700;
  }
  .protocol-distribution, .global-distribution, .top, .brand-spreading{
    background: #212631;
    border-radius: 2px;
    padding: 20px;
  }
  .protocol-distribution{
    width: 440px;
    height: 403px;
    margin: 20px 0 10px 20px;
  }
  .global-distribution{
    width: 440px;
    height: 544px;
    margin: 20px 0 10px 20px;
  }
  .top{
    width: 466px;
    height: 568px;
    margin: 20px 20px 10px 0;
  }
  .brand-spreading{
    width: 466px;
    height: 365px;
    margin: 20px 20px 10px 0;
  }
}
</style>
