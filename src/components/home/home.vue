<template>
  <el-container class="container">
    <el-header class="header">
      <!-- 头部  -->
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="@/assets/img/logo.png" alt="无法显示图片" />
          </div>
        </el-col>
        <el-col :span="18" class="middle">
          <h3>电商后台管理系统</h3>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple"></div>
          <a class="loginout" @click.prevent="handleSignout()" href="#">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <!-- 侧边栏导航 el-menu -->
        <!-- 开启路由模式 -->
        <el-menu
        active-text-color
        :router="true"
        :unique-opened = "true"
        >
          <!-- 1 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="user">
                <i class="el-icon-menu"></i>
                用户列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 2 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">
                <i class="el-icon-menu"></i>
                角色列表
              </el-menu-item>
            </el-menu-item-group>
              <el-menu-item index="2-2">
                <i class="el-icon-menu"></i>
                权限列表
              </el-menu-item>
          </el-submenu>
          <!-- 3 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>
                商品列表
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>
                分类参数
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>
                商品分类
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 4 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>
                订单列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 5 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>
                数据报表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
      <!-- main -->
      <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  // newVue之前自动触发
  beforeCreate () {
    // 获取token
    const token = localStorage.getItem('token')

    if (!token) {
      // 没有token -> 返回登录页面
      this.$router.push({name: 'login'})
    }
    // if token 有 -> 继续渲染组件
  },
  methods: {
    handleSignout () {
      // 1.清除token
      localStorage.clear()
      // 2.返回登录页面
      this.$router.push({name: 'login'})
      // 3.提示"安全退出"
      this.$message.success('已安全退出，欢迎再次使用！')
    }
  }
}
</script>
<style>
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}
.aside {
  background-color: #d3dce6;
}
.main {
  background-color: #e9eef3;
  height: 100%;
}

/* 头部样式 */
.middle {
  text-align: center;
}
.loginout {
  text-decoration: none;
  line-height: 60px;
}
</style>
