<template>
  <div>
    <div class="navbar">
      <el-menu
        :default-active="activeIndex"
        active-text-color="#ffffff"
        background-color="#191919"
        class="el-menu-top"
        mode="horizontal"
        text-color="#A1A2A5"
      >
        <el-menu-item v-for="(item, index) in menu" :key="index" :index="item.path" @click="clickMenu(item.path)">
          {{ item.title }}
        </el-menu-item>
      </el-menu>

      <div class="right-menu">
        <div class="right-login">
          <div v-if="name">
            {{ name }}
            <span
              style="margin-left: 8px;cursor: pointer"
              @click="logout"
            >退出</span>
          </div>
          <span v-else @click="login">登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},
  props: {
    showNavRouter: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      menu: [
        { title: 'Home', path: '/dashboard' },
        { title: 'Nodes Management', path: '' },
        { title: 'ES Management', path: '' },
        { title: 'Files Management ', path: '' },
        { title: 'Operation Management', path: '' }
      ]
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'showNavBar', 'name', 'permissions']),
    activeIndex() {
      return this.$route.path
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    clickMenu(path) {
      if (this.$route.path !== path) this.$router.push(path)
    },
    login() {
      const data = {
        username: 'user',
        password: '123456'
      }

      this.$store
        .dispatch('user/login', data)
        .then(() => {
          this.$router.push({ path: this.redirect || '/' })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss">
.navbar {
  .is-active{
    background: #2C2F35!important;
    border: none!important;
  }
}
</style>
<style lang="scss" scoped>
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #191919;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  padding: 0 26px 0 10px;
  .is-active{
    background: #2C2F35;
  }
  font-family: Helvetica;
  .el-menu-top {
    .el-menu-item {
      background: #1d253e;
      font-size: 18px;
    }
    ::v-deep.el-submenu__title {
      font-size: 18px;
    }
  }
  .right-menu {
    flex: 1;
    height: 100%;
    line-height: 50px;
    display: flex;
    justify-content: flex-end;

    .right-login {
      display: flex;
      align-items: center;
      color: #eee;
      justify-content: space-between;
      & > div {
        white-space: nowrap;
      }
    }

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
