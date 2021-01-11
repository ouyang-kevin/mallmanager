<template>
  <el-card class="box-card">
    <!-- 1.面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 2.搜索 -->
    <el-row class="search-row">
      <el-col>
        <el-input
          placeholder="请输入内容"
          v-model="query"
          class="input-search"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 3.表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="#" width="50" type="index"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
      <el-table-column prop="phone" label="电话" width="180"> </el-table-column>
      <el-table-column prop="date" label="创建日期"> </el-table-column>
      <el-table-column prop="status" label="用户状态"> </el-table-column>
      <el-table-column prop="action" label="操作"> </el-table-column>
    </el-table>
    <!-- 4.分页 -->
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 2,
      // 表格数据的内容
      tableData: [
        {
          num: '',
          name: '王小虎',
          email: '',
          phone: '',
          date: '2016-05-02',
          status: '',
          action: ''
        },
        {
          num: '',
          name: '王小虎',
          email: '',
          phone: '',
          date: '2016-05-02',
          status: '',
          action: ''
        }
      ]
    }
  },
  created () {
    // 1.获取ajax请求
    this.getUserList()
  },
  methods: {
    // 2.获取用户列表的请求
    async getUserList () {
      // 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN

      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      console.log(res)
    }
  }
}
</script>

<style>
.box-card {
  height: 100%;
}
.input-search {
  width: 300px;
}
.search-row {
  margin-top: 20px;
}
</style>
