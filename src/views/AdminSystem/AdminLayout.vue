<script setup>
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";
import { ref } from "vue";

const router = useRouter();
const adminName = ref(localStorage.getItem("admin_name") || "管理员");

const handleLogout = () => {
  ElMessageBox.confirm("确定要退出登录吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      localStorage.removeItem("admin_name");
      router.push("/admin-login");
    })
    .catch(() => {});
};
</script>

<template>
  <div class="admin-layout">
    <el-container>
      <el-aside width="200px">
        <div class="sidebar">
          <div class="logo">寿司管理系统</div>
          <el-menu
            router
            :default-active="$route.path"
            background-color="#304156"
            text-color="#bfcbd9"
            active-text-color="#409EFF"
          >
            <el-menu-item index="/admin">
              <i class="fas fa-home"></i>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/admin/users">
              <i class="fas fa-user"></i>
              <span>用户管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/sushi">
              <i class="fas fa-utensils"></i>
              <span>寿司管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/comments">
              <i class="fas fa-comments"></i>
              <span>评论管理</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header-right">
            <span>欢迎，{{ adminName }}</span>
            <el-button type="text" @click="handleLogout">退出登录</el-button>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.admin-layout {
  height: 100vh;
}

.sidebar {
  height: 100%;
  background-color: #304156;
}

.logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
}

.el-header {
  background-color: white;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.header-right {
  display: flex;
  align-items: center;
}

.header-right span {
  margin-right: 15px;
  color: #606266;
}

.el-main {
  background-color: #f0f2f5;
  padding: 20px;
}
</style>