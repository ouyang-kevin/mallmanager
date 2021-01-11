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
          clearable
          @clear="clearmethod()"
        >
          <el-button
            @click="searchUser()"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
        <el-button type="success" plain @click="showAddUserDia()"
          >添加用户</el-button
        >
      </el-col>
    </el-row>

    <!-- 3.表格 -->
    <el-table :data="userlist" style="width: 100%">
      <el-table-column label="#" width="50" type="index"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="100">
      </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="mobile" label="电话" width="120">
      </el-table-column>
      <el-table-column label="创建时间">
        <!--
          1.如果单元格内显示的内容不是字符串（文本），
          需要给被显示的内容外层包裹一个template
         -->
        <!--
           2.template内部要用数据 设置slot-scope属性
           该属性的值要用数据create_time的数据源userlist
          -->
        <!--
            3.slot-scope的值scope会自动去找el-table绑定的数据userlist
            userlist.row -> 数组中的每个对象
           -->
        <template slot-scope="scope">
          <!--差值表达式-->
          {{ scope.row.create_time | fmtdata }}
        </template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button
              size="mini"
              plain
              type="primary"
              @click="showEditUserDia(scope.row)"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button
              size="mini"
              plain
              type="danger"
              @click="deleteUser(scope.row.id)"
              icon="el-icon-delete"
              circle
            ></el-button>
            <el-button
              size="mini"
              plain
              type="success"
              icon="el-icon-check"
              circle
            ></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 4.分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 对话框 -->
    <!-- 编辑用户的对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input
            disabled
            v-model="form.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      // 表格数据的内容
      pagenum: 1,
      pagesize: 2,
      total: 2,
      userlist: [],
      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      // 添加对话框的数据
      form: {
        // username  用户名称不能为空
        // password  用户密码不能为空
        // email 邮箱可以为空
        // mobile  手机号可以为空
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
    };
  },
  created() {
    // 1.获取ajax请求
    this.getUserList();
  },
  methods: {
    // 2.获取用户列表的请求
    async getUserList() {
      // 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      // ajax获取数据
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      const {
        data: { users, pagenum, total },
        meta: { msg, status },
      } = res.data;
      if (status === 200) {
        // 获取数据
        this.userlist = users;
        this.pagenum = pagenum;
        this.total = total;
        // 提示
        this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
    },
    // 分页相关方法
    handleSizeChange(val) {
      this.pagesize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getUserList();
    },
    // 编辑用户
    // 编辑用户 - 发送请求
    async editUser() {
      const res = await this.$http.put(`users/${this.form.id}`, this.form);
      // 1.关闭对话框
      this.dialogFormVisibleEdit = false;
      if(res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg)
        // 2.更新视图
        this.getUserList();
      }
    },
    showEditUserDia(user) {
      //  编辑用户 -- 显示对话框
      this.dialogFormVisibleEdit = true;
      this.form = user;
    },
    // 删除用户
    deleteUser(userId) {
      this.$confirm("删除用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 发送删除的请求 :id------>用户id
          // 1.data中找userId
          // 2.把userId以deleteUser参数形式传进来
          const res = await this.$http.delete(`users/${userId}`);
          console.log(res);
          if (res.data.meta.status === 200) {
            this.pagenum = 1;
            // 1.更新删除之后的数据列表
            this.getUserList();
            // 2.提示
            this.$message({
              type: "success",
              message: res.data.meta.msg,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 搜索用户
    searchUser() {
      this.getUserList();
    },
    // 搜索用户为空，清空输入框时，触发clear
    clearmethod() {
      this.getUserList();
    },
    // 添加用户--对话框显示
    showAddUserDia() {
      this.form = {}
      this.dialogFormVisibleAdd = true;
    },
    // 添加用户--发送请求
    async addUser() {
      const res = await this.$http.post(`users`, this.form);
      const {
        data,
        meta: { status, msg },
      } = res.data;
      if (status === 201) {
        // 1.对话框关闭
        this.dialogFormVisibleAdd = false;
        // 2.提示成功
        this.$message.success(msg);
        // 3.更新视图
        this.getUserList();
        // 4.清空文本框
        this.form = {};
      } else {
        this.$message.warning(msg);
      }
    },
  },
};
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
