<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { adminLogin } from "@/apis/admin";

const router = useRouter();

const username = ref("");
const password = ref("");
const loading = ref(false);

const handleLogin = async () => {
  if (!username.value || !password.value) {
    ElMessage.warning("请输入用户名和密码");
    return;
  }

  loading.value = true;
  try {
    const res = await adminLogin({
      username: username.value,
      password: password.value,
    });

    localStorage.setItem("admin_name", res.data.username);

    ElMessage.success("登录成功");
    router.push("/admin");
  } catch (error) {
    console.error("登录失败", error);
    ElMessage.error(
      error.response?.data?.message || "登录失败，请检查用户名和密码"
    );
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="admin-login-container">
    <div class="login-box">
      <h2>寿司管理系统</h2>
      <div class="input-group">
        <div class="input-item">
          <label>账号</label>
          <el-input
            v-model="username"
            placeholder="请输入管理员账号"
          ></el-input>
        </div>
        <div class="input-item">
          <label>密码</label>
          <el-input
            v-model="password"
            type="password"
            placeholder="请输入密码"
            @keyup.enter="handleLogin"
          ></el-input>
        </div>
      </div>
      <el-button
        type="primary"
        :loading="loading"
        class="login-btn"
        @click="handleLogin"
      >
        登录
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.admin-login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
}

.login-box {
  width: 400px;
  padding: 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.login-box h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #303133;
}

.input-group {
  margin-bottom: 20px;
}

.input-item {
  margin-bottom: 20px;
}

.input-item label {
  display: block;
  margin-bottom: 8px;
  color: #606266;
}

.login-btn {
  width: 100%;
  margin-top: 10px;
  padding: 12px 0;
}
</style>