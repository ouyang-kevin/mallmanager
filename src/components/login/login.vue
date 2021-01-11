<template>
  <div class="login-wrap">
    <el-form
      class="login-form"
      label-position="top"
      label-width="80px"
      :model="fromdata"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="fromdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="fromdata.password"></el-input>
      </el-form-item>
      <el-button @click.prevent="handleLogin()" class="login-btn" type="primary"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fromdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // 登录请求
    async handleLogin () {
      // >希望 让异步操作的代码 看起来像同步代码
      // ES7 async + await
      const res = await this.$http.post('login', this.fromdata)
      console.log(res)
      const {
          data, // eslint-disable-line
        meta: { msg, status }
      } = res.data
      if (status === 200) {
        // 登录成功
        // 1.跳转home
        this.$router.push({name: 'home'})
        // 2.提示成功
        this.$message.success(msg)
      } else {
        // 不成功
        // 1.提示消息
        this.$message.warning(msg)
      }
    }
  }
}
</script>

<style>
.login-wrap {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}
.login-wrap .login-form .login-btn {
  width: 100%;
}
</style>
