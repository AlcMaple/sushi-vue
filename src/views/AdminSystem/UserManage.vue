<script setup>
import { ref, onMounted } from "vue";
import { getUsers, deleteUser, updateUser } from "@/apis/admin";
import { ElMessage, ElMessageBox } from "element-plus";

const tableData = ref([]);
const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

// 对话框
const dialogVisible = ref(false);
const editForm = ref({
  username: "",
  password: "",
});
const formTitle = ref("");

// 加载用户数据
const loadUsers = async () => {
  loading.value = true;
  try {
    const res = await getUsers(currentPage.value, pageSize.value);
    tableData.value = res.data.users || [];
    total.value = res.data.total || 0;
  } catch (error) {
    console.error("获取用户列表失败", error);
    ElMessage.error("获取用户列表失败");
  } finally {
    loading.value = false;
  }
};

// 分页变化
const handlePageChange = (page) => {
  currentPage.value = page;
  loadUsers();
};

// 删除用户
const handleDelete = (username) => {
  ElMessageBox.confirm(`确定要删除用户 "${username}" 吗?`, "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        await deleteUser(username);
        ElMessage.success("删除成功");
        loadUsers();
      } catch (error) {
        console.error("删除用户失败", error);
        ElMessage.error("删除用户失败");
      }
    })
    .catch(() => {});
};

// 编辑用户
const handleEdit = (row) => {
  editForm.value = {
    username: row.username,
    password: "",
  };
  formTitle.value = "修改用户密码";
  dialogVisible.value = true;
};

// 提交表单
const submitForm = async () => {
  if (!editForm.value.password) {
    ElMessage.warning("请输入新密码");
    return;
  }

  try {
    await updateUser(editForm.value.username, {
      password: editForm.value.password,
    });
    ElMessage.success("更新成功");
    dialogVisible.value = false;
    loadUsers();
  } catch (error) {
    console.error("更新用户失败", error);
    ElMessage.error("更新用户失败");
  }
};

onMounted(() => {
  loadUsers();
});
</script>

<template>
  <div class="user-manage">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
        </div>
      </template>

      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click="handleEdit(scope.row)"
              >修改密码</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row.username)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="currentPage"
          :page-size="pageSize"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>

    <!-- 编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="formTitle" width="30%">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled />
        </el-form-item>
        <el-form-item label="新密码">
          <el-input
            v-model="editForm.password"
            type="password"
            placeholder="请输入新密码"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>