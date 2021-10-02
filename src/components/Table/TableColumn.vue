<template>
  <el-table-column
    :prop="column.key || column.title"
    :label="column.title"
    :sortable="column.sortable"
    :width="column.width"
    :min-width="column.minWidth"
    :formatter="column.formatter"
    :align="column.align"
    :fixed="column.fixed"
    :class-name="column.className"
  >
    <!--    <template v-if="column.headerSlot">
      <template slot-scope="scope" slot="header">
        <slot :name="column.headerSlot"></slot>
      </template>
    </template>-->
    <template v-for="(col, index) in column.children">
      <table-column :key="index" :column="col" />
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'TableColumn',
  props: {
    column: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped></style>
