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
        <el-menu-item
          v-for="(item, index) in menu"
          :key="index"
          :index="item.path"
          @click="clickMenu(item.path)"
        >
          {{ item.title }}
        </el-menu-item>
      </el-menu>

      <div class="right-menu">
        <div class="right-login">
          <el-dropdown @command="moreCommand">
            <span class="el-dropdown-link">
              <div v-if="userName">
                {{ userName }}
                <span style="margin-left: 8px; cursor: pointer" @click="logout"
                  >Logout</span
                >
              </div>
              <span v-else @click="login">Login</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="setting"
                >Account Settings</el-dropdown-item
              >
              <el-dropdown-item command="logout">Sign Out</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <el-dialog
        :visible="visible"
        width="600px"
        custom-class="packets-capture"
        :append-to-body="true"
        :before-close="handleClose"
      >
        <div
          slot="title"
          style="font-family: Helvetica; font-size: 16px; color: #333333"
        >
          Change Password
        </div>
        <div class="packets-capture-container">
          <el-form
            ref="form"
            :model="formData"
            :rules="rules"
            label-width="180px"
          >
            <el-form-item label="Original password" prop="pwd">
              <el-input
                placeholder="Please enter the original password"
                v-model.trim="formData.pwd"
              />
            </el-form-item>
            <el-form-item label="New password" prop="newPwd">
              <el-input
                placeholder="Please enter a new password"
                v-model.trim="formData.newPwd"
              />
              <p
                style="
                  font-family: Helvetica;
                  font-size: 12px;
                  color: #999999;
                  line-height: 18px;
                "
              >
                The length is 8-16 characters, excluding spaces and special
                symbols
              </p>
            </el-form-item>
            <el-form-item label="Enter again" prop="confirmPwd">
              <el-input
                placeholder="Enter the password again"
                v-model.trim="formData.confirmPwd"
              />
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer">
          <el-button @click="handleClose" :disabled="pwdLoading"
            >Cancel</el-button
          >
          <el-button type="primary" :loading="pwdLoading" @click="submitPass"
            >Submit</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { changepwd } from "@/api/user";
import screenfull from "screenfull";

export default {
  components: {},
  props: {
    showNavRouter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      isFullscreen: false,
      formData: {
        uname: "",
        pwd: "",
        newPwd: "",
        confirmPwd: ""
      },
      pwdLoading: false,
      rules: {
        newPwd: [
          {
            required: true,
            message: "Please enter the original password",
            trigger: "blur"
          }
        ],
        pwd: [
          {
            required: true,
            message: "Please enter the new password",
            trigger: "blur"
          }
        ],
        confirmPwd: [
          {
            required: true,
            message: "Please enter the new password again",
            trigger: "blur"
          }
        ]
      },
      menu: [
        { title: "Home", path: "/dashboard" },
        { title: "Nodes Management", path: "/nodes" },
        { title: "ES Management", path: "/es" },
        { title: "Files Management ", path: "/files" },
        { title: "Operation Management", path: "/operate" }
      ]
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "showNavBar", "userName"]),
    activeIndex() {
      return this.$route.path;
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on("change", this.change);
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off("change", this.change);
      }
    },
    moreCommand(name) {
      if (name === "setting") {
        this.showModal();
      }
      if (name === "logout") {
        this.logout();
      }
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.visible = false;
    },
    showModal() {
      this.visible = true;
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login`);
    },
    clickMenu(path) {
      if (this.$route.path !== path) this.$router.push(path);
    },
    submitPass() {
      this.pwdLoading = true;
      this.formData.uname = this.userName;
      changepwd(this.formData).then(res => {
        if (res) {
          this.logout();
          this.$message.success("Operation succeeded");
        } else {
          this.$message.warning("operation failed");
        }
      });
    },
    login() {
      this.$router.push(`/login`);
    }
  }
};
</script>
<style lang="scss">
.navbar {
  .is-active {
    background: #2c2f35 !important;
    border: none !important;
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
  .is-active {
    background: #2c2f35;
  }
  .el-dropdown-link {
    cursor: pointer;
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
