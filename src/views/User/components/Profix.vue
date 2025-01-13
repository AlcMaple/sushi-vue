<script setup>
import { onMounted, ref } from "vue";
import { getUserComments, getUserFavorites } from "@/apis/shopInteraction";

const activeTab = ref("favorites");

// 模拟数据
const userInfo = {
  name: localStorage.getItem("user_name") || "匿名用户",
  //   joinDate: "2023-06-01",
  //   bio: "寿司爱好者，最爱三文鱼",
};

const stats = ref({
  favorites: 12,
  reviews: 28,
});

const favorites = ref([
  { id: 1, name: "三文鱼握寿司", rating: 4.8, price: "RM 15" },
  { id: 2, name: "金枪鱼腹握寿司", rating: 4.9, price: "RM 22" },
  { id: 3, name: "炙烤鳗鱼握寿司", rating: 4.7, price: "RM 18" },
]);

const reviews = ref([]);

onMounted(async () => {
  let name = localStorage.getItem("user_name");
  // 获取收藏的寿司
  await getUserFavorites(name).then((res) => {
    favorites.value = res.favorites;
  });

  // 收藏数
  stats.value.favorites = favorites.value.length;

  // 获取我的点评
  await getUserComments(name).then((res) => {
    reviews.value = res.comments;
  });

  // 点评数
  stats.value.reviews = reviews.value.length;

  console.log("favorites", favorites.value);
  console.log("reviews", reviews.value);
  console.log("stats", stats.value);
});
</script>

<template>
  <div class="profile-container">
    <!-- 个人信息卡片 -->
    <div class="info-card">
      <div class="info-content">
        <h2 class="username">{{ userInfo.name }}</h2>
        <!-- <p class="join-date">加入于 {{ userInfo.joinDate }}</p> -->
        <!-- <p class="bio">{{ userInfo.bio }}</p> -->
      </div>
    </div>

    <div class="stats-container">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-heart"></i>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ stats.favorites }}</span>
          <span class="stat-label">收藏数</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-comment"></i>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ stats.reviews }}</span>
          <span class="stat-label">点评数</span>
        </div>
      </div>
    </div>

    <div class="tabs-container">
      <div class="tabs-header">
        <button
          :class="['tab-button', { active: activeTab === 'favorites' }]"
          @click="activeTab = 'favorites'"
        >
          收藏的寿司
        </button>
        <button
          :class="['tab-button', { active: activeTab === 'reviews' }]"
          @click="activeTab = 'reviews'"
        >
          我的点评
        </button>
      </div>

      <div v-if="activeTab === 'favorites'" class="tab-content">
        <div v-for="item in favorites" :key="item.id" class="sushi-card">
          <div class="sushi-info">
            <h3 class="sushi-name">{{ item.name }}</h3>
            <p class="sushi-rating">评分: {{ item.rating }}</p>
          </div>
          <div class="sushi-price">{{ item.price }}</div>
        </div>
      </div>

      <div v-if="activeTab === 'reviews'" class="tab-content">
        <div v-for="review in reviews" :key="review.id" class="review-card">
          <div class="review-header">
            <div class="review-header-left">
              <h3 class="sushi-name">{{ review.sushi_name }}</h3>
              <div class="stars">
                <span v-for="n in review.score" :key="n.id" class="star active"
                  >★</span
                >
              </div>
            </div>
            <span class="review-date">{{ review.created_at }}</span>
          </div>
          <p class="review-content">{{ review.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.info-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.username {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.join-date {
  color: #666;
  font-size: 14px;
  margin-bottom: 12px;
}

.bio {
  color: #444;
  line-height: 1.5;
}

.stats-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-icon {
  font-size: 24px;
  color: #ff4757;
  margin-bottom: 12px;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.stat-label {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}

.tabs-container {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.tabs-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid #eee;
}

.tab-button {
  padding: 16px;
  border: none;
  background: none;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-button.active {
  color: #ff4757;
  border-bottom: 2px solid #ff4757;
}

.tab-content {
  padding: 20px;
}

.sushi-card,
.review-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
}

.sushi-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sushi-info h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.sushi-rating {
  font-size: 14px;
  color: #666;
}

.sushi-price {
  font-weight: 600;
  color: #ff4757;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.review-header-left {
  display: flex;
  align-items: center;
}

.sushi-name {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-right: 8px;
}

.star {
  font-size: 18px;
  color: #ddd;
  cursor: default;
}

.star.active {
  color: #fbbf24;
}

.review-date {
  font-size: 14px;
  color: #666;
}

.review-content {
  color: #444;
  line-height: 1.5;
}

@media (max-width: 640px) {
  .stats-container {
    grid-template-columns: 1fr;
  }

  .profile-container {
    padding: 16px;
  }

  .username {
    font-size: 20px;
  }

  .stat-value {
    font-size: 20px;
  }
}
</style>