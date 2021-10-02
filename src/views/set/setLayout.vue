<template>
  <el-container class="layout">
    <el-container>
      <el-aside class="left" width="330px">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical"
          @open="handleOpen"
        >
          <el-menu-item
            v-for="item in menu"
            :key="item.title"
            :index="item.path"
            @click="clickMenu(item.path)"
          >
            <div class="title">{{ item.title }}</div>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <div>
          <slot name="main" />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SetLayout',
  computed: {
    defaultActive() {
      return this.$route.path
    },
    ...mapGetters(['permissions']),
    menu() {
      const menu = []
      this.permissions.forEach(item => {
        if (item.url === 'setting/user') {
          if (item.type === 0) {
            item.children.forEach(child => {
              if (child.type === 0) {
                menu.push({
                  title: child.name,
                  path: '/' + child.url
                })
              }
            })
          }
        }
      })
      return menu
    }
  },
  methods: {
    clickMenu(path) {
      this.defaultActive = path
      this.$router.push(path)
    },
    handleOpen() {}
  }
}
</script>

<style lang="scss" scoped>
.layout {
  background: #f8f9fa;
  width: 100%;
  box-sizing: border-box;
  padding: 30px;
}
.el-menu-vertical {
  background: #fff;
  margin-right: 30px;
  min-height: 50%;
}

.main {
  background: #fff;
  margin-right: 30px;
}
</style>
