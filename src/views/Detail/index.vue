<!-- 普通文章详情页 -->
<script setup>
import { useRoute } from "vue-router";
import ArticleComment from "./components/ArticleComment.vue";
import ArticlePreview from "./components/ArticlePreview.vue";
import { onMounted, ref, watch } from "vue";
import { getShopDetail } from "@/apis/shop";
import {
  getShopInteraction,
  likeShopInteraction,
  cancelLikeShopInteraction,
  collectShopInteraction,
  cancelCollectShopInteraction,
  getShopComments,
} from "@/apis/shopInteraction";
import { ElMessage } from "element-plus";

// 模拟文章数据
const article = ref({});
// 接收参数
const route = useRoute();
const name = ref("");
const image = ref("");
const contentment = ref([
  // {
  //   id: 1,
  //   username: "暮辞雨下",
  //   avatar: "/api/placeholder/40/40",
  //   content:
  //     "随着时间的推移，宝可梦系列越来越多了，但在我心中，无印仍是永恒不变的经典",
  //   date: "2022年2月19日",
  //   likes: 264,
  //   isFemale: true,
  // },
  // {
  //   id: 2,
  //   username: "九阳炎",
  //   avatar: "/api/placeholder/40/40",
  //   content: "童年回忆",
  //   date: "1月8日",
  //   likes: 0,
  //   isFemale: false,
  // },
  // {
  //   id: 3,
  //   username: "Old_Yan",
  //   avatar: "/api/placeholder/40/40",
  //   content: "666",
  //   date: "1月2日",
  //   likes: 0,
  //   isFemale: false,
  // },
  // {
  //   id: 4,
  //   username: "isK耶",
  //   avatar: "/api/placeholder/40/40",
  //   content: "为了童年",
  //   date: "2024年12月30日",
  //   likes: 0,
  //   isFemale: true,
  // },
]);

const isLoading = ref(true);

// 发送请求接收数据
onMounted: {
  name.value = route.query.name;
  image.value = route.query.image;
  //接收参数
  getShopDetail({ sushi_name: name.value }).then((res) => {
    // console.log("获取文章信息", res.data);
    article.value = res.data;
  });

  let username = localStorage.getItem("user_name");

  // 获取点赞和收藏、评论状态
  getShopInteraction(name.value, username).then((res) => {
    // 获取用户名
    // console.log("获取点赞和收藏、评论状态", res);
    isLiked.value = res.user_status.has_liked;
    isFavorited.value = res.user_status.has_favorited;
  });

  // 获取评论
  getShopComments(name.value).then((res) => {
    console.log("获取评论", res);
    contentment.value = res.comments;
    isLoading.value = false;
  });

  console.log("name", name.value);
  console.log("image", image.value);
}

// 设置点赞和收藏的状态
const isLiked = ref(false);
const isFavorited = ref(false);

const toggleLike = async () => {
  try {
    const username = localStorage.getItem("user_name");
    if (!username) {
      ElMessage.warning("请先登录");
      return;
    }
    if (isLiked.value) {
      const res = await cancelLikeShopInteraction(name.value, username);
      // console.log("res", res);

      if (res.message === "取消点赞成功") {
        console.log("test");

        isLiked.value = false;
        ElMessage.success("取消点赞成功");
      }
    } else {
      const res = await likeShopInteraction(name.value, username);
      console.log("res", res);

      if (res.message === "点赞成功") {
        isLiked.value = true;
        ElMessage.success("点赞成功");
      }
    }
  } catch (error) {
    console.error("点赞操作失败:", error);
    ElMessage.error("操作失败，请稍后重试");
  }
};

const toggleFavorite = async () => {
  try {
    const username = localStorage.getItem("user_name");
    if (!username) {
      ElMessage.warning("请先登录");
      return;
    }

    if (isFavorited.value) {
      const res = await cancelCollectShopInteraction(name.value, username);
      console.log("Res", res);

      if (res.message === "取消收藏成功") {
        isFavorited.value = false;
        ElMessage.success("取消收藏成功");
      }
    } else {
      const res = await collectShopInteraction(name.value, username);
      if (res.message === "收藏成功") {
        isFavorited.value = true;
        ElMessage.success("收藏成功");
      }
    }
  } catch (error) {
    console.error("收藏操作失败:", error);
    ElMessage.error("操作失败，请稍后重试");
  }
};

// 监听子组件的更新
const updateCommentList = () => {
  // 更新评论列表
  isLoading.value = true;
  getShopComments(name.value).then((res) => {
    console.log("获取评论", res);
    contentment.value = res.comments;
    isLoading.value = false;
  });
};
</script>

<template>
  <div class="detail-container">
    <el-card class="card">
      <!-- 标签栏 -->
      <!-- <div style="margin-bottom: 10px">
        <el-text class="title">{{ article.title }}</el-text>
      </div> -->
      <!-- <div class="tagLine">
        <el-text class="text">文章标签:</el-text>
        <el-tag class="tag" v-for="tag in article.tags">{{ tag.name }}</el-tag>
      </div> -->
      <!-- <ArticlePreview :content="article.content" /> -->
      <ArticlePreview :content="article.content" />
    </el-card>
    <!-- 评论区 传入评论参数 -->
    <ArticleComment
      v-if="!isLoading"
      :image="image.value"
      :name="name.value"
      :contentment="contentment"
      @updateCommentList="updateCommentList"
    />

    <!-- 点赞和收藏按钮区域 -->
    <div class="raise-container">
      <!-- 点赞按钮 -->
      <button @click="toggleLike" class="icon-btn">
        <i :class="isLiked ? 'fas fa-thumbs-up' : 'far fa-thumbs-up'"></i>
      </button>

      <!-- 收藏按钮 -->
      <button @click="toggleFavorite" class="icon-btn">
        <i :class="isFavorited ? 'fas fa-star' : 'far fa-star'"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.detail-container {
  padding: 20px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f7f7f7;
}

.card {
  width: 950px;
  border-radius: 9px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 24px;
  font-weight: bolder;
  color: #000;
  padding-left: 16px;
}

.text {
  font-size: 14px;
  color: #000;
  margin-right: 10px;
}

.iconfont {
  font-size: 25px;
}

.raise-container {
  position: fixed;
  margin-left: 1010px;
  margin-top: 180px;
  background: #eef1f4;
  width: 40px;
  height: 140px;
  padding: 12px 6px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.raise-container button {
  background: none;
  border: none;
  color: #4e9df1;
  font-size: 28px;
  margin-bottom: 30px;
  transition: color 0.3s ease, transform 0.3s ease;
}

.raise-container button:hover {
  color: #007acc;
  transform: scale(1.1);
}

.raise-container button.active {
  color: #007acc;
}

.raise-container button.active:hover {
  color: #005b99;
}

.tagLine {
  margin-left: 16px;
  margin-bottom: 10px;
}

.tag {
  margin-right: 5px;
  margin-bottom: 5px;
}

/* .raise-container {
  position: fixed;
  margin-left: 1010px;
  margin-top: 180px;
  background: green;
  width: 29px;
  height: 108px;
  padding: 12px 6px;
  border-radius: 6px;
} */

/* 手机端 */
@media (max-width: 768px) {
  .card {
    width: 100%;
  }
}

/* ipad端 */
@media (max-width: 1024px) {
  .card {
    width: 100%;
  }
}
</style>