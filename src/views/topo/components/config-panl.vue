<template>
  <div class="config">
    <config-node v-show="curCellType === 'node' && canEdit" />
    <config-edge v-show="curCellType === 'edge' && canEdit" />
  </div>
</template>
<script>
import ConfigNode from './ConfigPanel/ConfigNode'
import ConfigEdge from './ConfigPanel/ConfigEdge'
import { mapGetters } from 'vuex'

export default {
  components: {
    ConfigNode,
    ConfigEdge
  },
  computed: {
    ...mapGetters(['curCellType', 'canEdit'])
  }
}
</script>

<style lang="scss" scoped>
.config {
  height: 100%;
}
</style>
