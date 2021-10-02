<template>
  <div ref="tables" class="tables">
    <div
      ref="tableHeader"
      class="table-header"
      :style="{ background: headerBg }"
    >
      <slot name="table-header" />
    </div>
    <div :class="[{ 'table-padding': tablePadding }]">
      <el-table
        ref="myTable"
        row-key="key1"
        :row-class-name="rowClassName"
        :data="data"
        :max-height="maxHeight || tableHeight"
        :stripe="stripe"
        :cell-style="cellStyle"
        :row-style="rowStyle"
        :header-cell-style="headerCellStyle"
        :header-cell-class-name="headerCellClassName"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :border="border"
        :span-method="spanMethod"
        :show-header="showHeader"
        @row-click="rowClick"
        @expand-change="expandChange"
      >
        <template v-for="col in columns">
          <el-table-column
            v-if="col.type == 'index'"
            type="index"
            :index="indexMethod"
            :label="col.title || '序号'"
            :width="col.width"
            :sortable="col.sortable"
          >
            <template slot-scope="$index">
              {{ expand === true ? $index + 1 : scope.row.key0 }}
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="col.slot"
            :label="col.title"
            :sortable="col.sortable"
            :width="col.width"
            :min-width="col.minWidth"
            :fixed="col.fixed"
          >
            <template slot-scope="scope">
              <slot :name="col.slot" :row="scope.row" />
            </template>
          </el-table-column>
          <tableColumn v-else :column="col" />
        </template>
      </el-table>
    </div>
    <div ref="tableFooter" class="table-footer">
      <el-pagination
        style=" margin-top: 15px;"
        background
        layout="prev, pager, next"
        :hide-on-single-page="true"
        :total="total"
        :page-size="pageSize"
        @current-change="pageChange"
      />
    </div>
  </div>
</template>

<script>
import tableColumn from './TableColumn'

export default {
  components: { tableColumn },
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    maxHeight: {
      type: Number,
      default: 950
    },
    stripe: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    curRow: {
      type: Object
    },
    cellStyle: {
      type: Function
    },
    rowStyle: {
      type: Function
    },
    headerBg: {
      type: String,
      default: () => ''
    },
    headerCellClassName: {
      type: String
    },
    headerCellStyle: {
      type: Object
    },
    border: {
      type: Boolean,
      default: false
    },
    tablePadding: {
      type: Boolean
    },
    spanMethod: {
      type: Function
    },
    showHeader: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      expand: false,
      tableHeight: undefined
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setTableHeight()
      let touchFixedBody = false
      const myTable = this.$refs.myTable
      const bodyWrapper = this.$refs.myTable.bodyWrapper
      const {
        headerWrapper,
        footerWrapper,
        fixedBodyWrapper,
        rightFixedBodyWrapper
      } = myTable.$refs

      const touchFixedBodyEvent = e => {
        touchFixedBody = true
      }
      const syncPostion = e => {
        if (touchFixedBody) {
          // bodyWrapper.removeEventListener('scroll', myTable.syncPostion, { passive: true });
          if (fixedBodyWrapper) {
            bodyWrapper.scrollTop = fixedBodyWrapper.scrollTop
          }
          if (rightFixedBodyWrapper) {
            bodyWrapper.scrollTop = rightFixedBodyWrapper.scrollTop
          }
          // bodyWrapper.addEventListener('scroll', myTable.syncPostion, { passive: true });
        }
      }

      bodyWrapper.removeEventListener('scroll', myTable.syncPostion, {
        passive: true
      })
      const touchBodyEvent = e => {
        touchFixedBody = false
      }
      myTable.syncPostion = e => {
        const { scrollLeft, scrollTop, offsetWidth, scrollWidth } = bodyWrapper
        // if (fixedBodyWrapper){
        //   fixedBodyWrapper.removeEventListener('scroll', syncPostion, { passive: true });
        // }
        // if (rightFixedBodyWrapper){
        //   rightFixedBodyWrapper.removeEventListener('scroll', syncPostion, { passive: true });
        // }
        if (headerWrapper) headerWrapper.scrollLeft = scrollLeft
        if (footerWrapper) footerWrapper.scrollLeft = scrollLeft
        if (fixedBodyWrapper && !touchFixedBody) {
          fixedBodyWrapper.scrollTop = scrollTop
        }
        if (rightFixedBodyWrapper && !touchFixedBody) {
          rightFixedBodyWrapper.scrollTop = scrollTop
        }
        const maxScrollLeftPosition = scrollWidth - offsetWidth - 1
        if (scrollLeft >= maxScrollLeftPosition) {
          myTable.scrollPosition = 'right'
        } else if (scrollLeft === 0) {
          myTable.scrollPosition = 'left'
        } else {
          myTable.scrollPosition = 'middle'
        }

        // if (fixedBodyWrapper){
        //   fixedBodyWrapper.addEventListener('scroll', syncPostion, { passive: true });
        // }
        // if (rightFixedBodyWrapper){
        //   rightFixedBodyWrapper.addEventListener('scroll', syncPostion, { passive: true });
        // }
      }

      bodyWrapper.addEventListener('scroll', myTable.syncPostion, {
        passive: true
      })
      bodyWrapper.addEventListener('touchstart', touchBodyEvent, false)

      if (fixedBodyWrapper) {
        fixedBodyWrapper.addEventListener('scroll', syncPostion, {
          passive: true
        })
        fixedBodyWrapper.addEventListener(
          'touchstart',
          touchFixedBodyEvent,
          false
        )
      }

      if (rightFixedBodyWrapper) {
        rightFixedBodyWrapper.addEventListener('scroll', syncPostion, {
          passive: true
        })
        rightFixedBodyWrapper.addEventListener(
          'touchstart',
          touchFixedBodyEvent,
          false
        )
      }

      const { unbindEvents } = myTable
      myTable.unbindEvents = () => {
        unbindEvents()
        bodyWrapper.removeEventListener('touchstart', touchBodyEvent, false)

        if (fixedBodyWrapper) {
          fixedBodyWrapper.removeEventListener('scroll', syncPostion, {
            passive: true
          })
          fixedBodyWrapper.removeEventListener(
            'touchstart',
            touchFixedBodyEvent,
            false
          )
        }

        if (rightFixedBodyWrapper) {
          rightFixedBodyWrapper.removeEventListener('scroll', syncPostion, {
            passive: true
          })
          rightFixedBodyWrapper.removeEventListener(
            'touchstart',
            touchFixedBodyEvent,
            false
          )
        }
      }
    })
  },
  methods: {
    rowClick(row) {
      this.$emit('rowClick', row)
    },
    indexMethod(index) {
      return index + 1
    },
    expandChange(a, b) {
      this.expand = b
    },
    rowClassName(row) {
      if (!this.curRow) return
      return row.row.key1 === this.curRow.key1 ? 'check' : ''
    },
    setTableHeight() {
      if (!this.maxHeight) {
        this.tableHeight =
          document.body.offsetHeight -
          this.$refs.tables.getBoundingClientRect().top -
          this.$refs.tableHeader.offsetHeight -
          this.$refs.tableFooter.offsetHeight -
          8
        this.tablePadding && (this.tableHeight -= 30)
      }
    },
    getSpanArr(data, keysArr) {
      const mergeData = {}
      const mergePos = {}
      keysArr.forEach(key => {
        data.forEach((row, i) => {
          if (i === 0) {
            mergeData[key] = mergeData[key] || []
            mergeData[key].push(1)
            mergePos[key] = 0
          } else {
            // 判断当前元素与上一个元素是否相同
            if (row[key] === data[i - 1][key]) {
              mergeData[key][mergePos[key]] += 1
              mergeData[key].push(0)
            } else {
              mergeData[key].push(1)
              mergePos[key] = i
            }
          }
        })
      })

      return mergeData
    },
    pageChange(num) {
      this.$emit('getData', num)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'global';
.tables {
  width: 100%;
}
::v-deep.el-table {
  th {
    font-size: 18px;
    .cell {
      white-space: pre;
      text-overflow: clip;
    }
  }
}

.table-header {
  text-align: left;
  color: #7b8ea2;
  line-height: 26px;
  padding-right: 10px;
}
.check {
  background-color: #dadfe7 !important;
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #dadfe7 !important;
}

::v-deep.el-table {
  td,
  th {
    padding: 4px 0;
  }
  th {
    color: #162b41;
  }
}

::v-deep.el-table .el-table__header {
  border: 1px solid #f9f9f9;
}

::v-deep.el-table th,
.el-table tr {
  background: #f7f9fb;
}
::v-deep.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #dadfe7;
}

::v-deep.el-table__fixed-body-wrapper {
  overflow: auto;
}

.table-padding {
  padding: 20px 10px 10px;
}
::v-deep.el-table th .cell {
  color: #8c8c8c;
  font-size: 14px;
  line-height: 54px;
}

::v-deep.el-table td .cell {
  font-size: 14px;
  line-height: 53px;
}

.table-footer {
  float: right;
}
::v-deep.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: $color-success;
}
::v-deep.el-table .el-table__row:hover {
  box-shadow: 1px 2px 1px #dadfe7;
  transform: scale(1.001);
}
</style>
