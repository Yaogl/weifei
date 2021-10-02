<template>
  <div class="process-components">
  </div>
</template>
<script>

export default {
  props: {
    chartData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      instance: '',
      colors: ['#FF4141', '#FF8B00', '#F7D300', '#EDEC36', '#64EF2C', '#37D095', '#2FACDE', '#4370DB', '#7D4DF3', '#A236E5']
    }
  },
}
</script>
