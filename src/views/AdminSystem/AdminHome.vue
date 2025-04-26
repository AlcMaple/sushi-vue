<script setup>
import { ref, onMounted } from "vue";
import { getUsers } from "@/apis/admin";
import { getShopList } from "@/apis/shop";
import { getCommentsList } from "@/apis/admin";

const userCount = ref(0);
const sushiCount = ref(0);
const commentCount = ref(0);

onMounted(async () => {
  try {
    // 获取用户统计
    const usersRes = await getUsers();
    userCount.value = usersRes.data.total || 0;

    // 获取寿司统计
    const sushiRes = await getShopList();
    sushiCount.value = sushiRes.data?.length || 0;

    // 获取评论统计
    const commentsRes = await getCommentsList();
    commentCount.value = commentsRes.data.total || 0;
  } catch (error) {
    console.error("获取统计数据失败", error);
  }
});
</script>

<template>
  <div class="admin-dashboard">
    <h2>管理系统首页</h2>
    <el-row :gutter="20" class="stats-cards">
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="stat-card">
            <div class="stat-icon user-icon">
              <i class="fas fa-user"></i>
            </div>
            <div class="stat-info">
              <div class="stat-title">用户数量</div>
              <div class="stat-value">{{ userCount }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="stat-card">
            <div class="stat-icon sushi-icon">
              <i class="fas fa-utensils"></i>
            </div>
            <div class="stat-info">
              <div class="stat-title">寿司数量</div>
              <div class="stat-value">{{ sushiCount }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="stat-card">
            <div class="stat-icon comment-icon">
              <i class="fas fa-comments"></i>
            </div>
            <div class="stat-info">
              <div class="stat-title">评论数量</div>
              <div class="stat-value">{{ commentCount }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.admin-dashboard {
  padding: 20px;
}

.stats-cards {
  margin-top: 20px;
}

.stat-card {
  display: flex;
  align-items: center;
  padding: 10px;
}

.stat-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: white;
  margin-right: 20px;
}

.user-icon {
  background-color: #409eff;
}

.sushi-icon {
  background-color: #67c23a;
}

.comment-icon {
  background-color: #e6a23c;
}

.stat-info {
  flex: 1;
}

.stat-title {
  font-size: 16px;
  color: #909399;
  margin-bottom: 10px;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
}
</style>