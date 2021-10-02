<template>
  <div class="select-form">
    <el-select
      placeholder="请选择"
      :value="value"
      clearable
      @change="changeItem"
    >
      <el-option v-for="item in list" :key="item" :label="item" :value="item" />
    </el-select>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    parentKey: {
      type: String,
      default: ''
    },
    curData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      list: []
    }
  },
  created() {},
  methods: {
    changeItem(val) {
      this.$emit('input', val)
    }
  }
}
</script>
