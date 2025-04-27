<script setup>
import { ref, onMounted } from "vue";
import { getCommentsList, deleteComment } from "@/apis/admin";
import { ElMessage, ElMessageBox } from "element-plus";

const tableData = ref([]);
const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

// 加载评论数据
const loadComments = async () => {
  loading.value = true;
  try {
    const res = await getCommentsList(currentPage.value, pageSize.value);
    tableData.value = res.data.comments || [];
    total.value = res.data.total || 0;
  } catch (error) {
    console.error("获取评论列表失败", error);
    ElMessage.error("获取评论列表失败");
  } finally {
    loading.value = false;
  }
};

// 分页
const handlePageChange = (page) => {
  currentPage.value = page;
  loadComments();
};

// 删除评论
const handleDelete = (id) => {
  ElMessageBox.confirm("确定要删除该评论吗?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        await deleteComment(id);
        ElMessage.success("删除成功");
        loadComments();
      } catch (error) {
        console.error("删除评论失败", error);
        ElMessage.error("删除评论失败");
      }
    })
    .catch(() => {});
};

onMounted(() => {
  loadComments();
});
</script>

<template>
  <div class="comment-manage">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>评论管理</span>
        </div>
      </template>

      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="sushi_name" label="寿司名称" width="150" />
        <el-table-column
          prop="content"
          label="评论内容"
          show-overflow-tooltip
        />
        <el-table-column prop="score" label="评分" width="80">
          <template #default="scope">
            <el-rate v-model="scope.row.score" disabled text-color="#ff9900" />
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="评论时间" width="180" />
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row.id)"
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