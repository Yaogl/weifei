<template>
  <div class="login-container">
    <div class="login-form">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">SIGN IN</h3>
        </div>

        <el-form-item prop="uname">
          <el-input
            v-model="loginForm.uname"
            ref="uname"
            placeholder="Account"
            name="uname"
            type="text"
            tabindex="1"
            auto-complete="on"
          >
            <span slot="prefix">
              <img src="../../assets/img/account.png" alt="">
            </span>
          </el-input>
        </el-form-item>

        <el-form-item prop="pwd">
          <el-input
            v-model="loginForm.pwd"
            :key="passwordType"
            ref="pwd"
            :type="passwordType"
            placeholder="Password"
            name="pwd"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          >
            <span slot="prefix">
              <img src="../../assets/img/password.png" alt="">
            </span>
          </el-input>
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          class="loginBtn"
          @click.native.prevent="handleLogin"
        >Enter</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter the user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        uname: 'user',
        pwd: '123456'
      },
      loginRules: {
        uname: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        pwd: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.login-container {
  .el-form-item .el-input__inner{
    height: 56px;
  }
  .el-input__prefix{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 6px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100vh;
  width: 100%;
  background: url('../../assets/img/bg.png');
  background-size: 100% 100%;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: end;
  .login-form {
    width: 400px;
    min-height: 400px;
    padding: 0 40px;
    background: #fff;
    overflow: hidden;
    margin-right: 16vw;
    box-shadow: 0px 2px 22px 0px rgba(0, 8, 71, 0.18);
    border-radius: 8px;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    font-size: 30px;
    text-align: center;
    margin: 40px 0 30px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 600;
  }
  .title-container:after{
    display: inline-block;
    background: #36B447;
    height: 3px;
    border-radius: 1px;
    width: 38px;
    margin-top: 15px;
    content: '';
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .loginBtn{
    width:100%;
    margin: 30px 0;
    height: 56px;
  }
}
</style>
