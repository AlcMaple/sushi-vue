<!-- 展示评论 -->
<script setup>
import {
  ref,
  defineProps,
  onMounted,
  watch,
  watchEffect,
  defineEmits,
} from "vue";
import { useRoute } from "vue-router";
import { postShopComment } from "@/apis/shopInteraction";
import { async } from "@kangc/v-md-editor";
import { ElMessage } from "element-plus";

const route = useRoute();
const emit = defineEmits();

const commentList = ref([]);

// 控制弹窗
const showCommentDialog = ref(false);
// 评分
const rating = ref(0);
// 评论内容
const commentContent = ref("");
const username = localStorage.getItem("user_name");

const props = defineProps({
  name: {
    type: String,
    default: "",
    required: true,
  },
  image: {
    type: String,
    default: "",
    required: true,
  },
  contentment: {
    type: Array,
    default: () => [],
  },
});

const currentWork = ref({
  title: "",
  image: "",
});

const openCommentDialog = () => {
  showCommentDialog.value = true;
};

// 关闭弹窗
const closeCommentDialog = () => {
  showCommentDialog.value = false;
  rating.value = 0;
  commentContent.value = "";
};

// 提交评论
const submitComment = async () => {
  const result = await postShopComment(
    currentWork.value.title,
    username,
    commentContent.value,
    rating.value
  );

  console.log(result, "result");
  if (result.message == "评论成功") {
    ElMessage.success("评论成功");
    // 告诉父组件，评论数据要更新
    emit("updateCommentList");
    closeCommentDialog();
  } else {
    ElMessage.error("评论失败");
  }
};

// 设置评分
const setRating = (value) => {
  rating.value = value;
};

onMounted(() => {
  currentWork.value.title = route.query.name || "";
  currentWork.value.image = route.query.image || "";
  commentList.value = props.contentment;
  console.log("coommentList", props.contentment);
});
</script>

<template>
  <div class="card">
    <div class="con write-comment">
      <div class="title">
        点评
        <span class="write-btn" @click="openCommentDialog">✨ 去写点评</span>
      </div>
    </div>

    <!-- 评论列表 -->
    <div class="comment-list">
      <div v-for="comment in commentList" :key="comment.id" class="con">
        <div class="comment-content">
          <!-- <img :src="comment.avatar" :alt="comment.username" class="avatar" /> -->
          <div class="comment-main">
            <div class="comment-header">
              <span class="username" :class="{ female: comment.isFemale }">
                {{ comment.username }}
              </span>
              <div class="stars">
                <span v-for="n in comment.score" :key="n" class="star active"
                  >★</span
                >
              </div>
              <!-- <span class="date">{{ comment.date }}</span> -->
            </div>
            <p class="comment-text">{{ comment.content }}</p>
            <!-- <div class="actions">
              <button class="action-btn">
                👍 <span v-if="comment.likes">{{ comment.likes }}</span>
              </button>
              <button class="action-btn">👎</button>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <!-- 评论弹窗 -->
    <div v-if="showCommentDialog" class="dialog-overlay">
      <div class="dialog-content">
        <!-- 关闭 -->
        <div class="dialog-header">
          <!-- <span class="dialog-title">宝可梦</span> -->
          <button class="close-btn" @click="closeCommentDialog">×</button>
        </div>

        <div class="dialog-body">
          <div class="work-info">
            <img
              :src="currentWork.image"
              :alt="currentWork.title"
              class="work-image"
            />
            <h2 class="work-title">{{ currentWork.title }}</h2>
          </div>

          <h3 class="rating-title">请发表你对这部作品的评分</h3>

          <!-- 评分星星 -->
          <div class="rating-stars">
            <span
              v-for="n in 5"
              :key="n"
              class="star"
              :class="{ active: n <= rating }"
              @click="setRating(n)"
            >
              ★
            </span>
          </div>

          <!-- 评论输入框 -->
          <textarea
            v-model="commentContent"
            class="comment-input"
            placeholder="写下你的评价..."
            maxlength="100"
          ></textarea>
          <div class="word-count">{{ commentContent.length }}/100</div>
        </div>

        <!-- 提交按钮 -->
        <div class="dialog-footer">
          <button
            class="submit-btn"
            @click="submitComment"
            :disabled="!rating || !commentContent"
            :class="{ 'submit-btn-active': rating && commentContent }"
          >
            发表短评
          </button>
          <!-- <button class="long-review-btn">想写长评，点这里 ></button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin-top: 10px;
  width: 900px;
}

.con {
  padding: 12px;
  margin-bottom: 15px;
  background-color: rgb(248, 248, 248);
  border-radius: 10px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  display: flex;
  align-items: center;
  gap: 8px;
}

.write-btn {
  color: #3b82f6;
  cursor: pointer;
  font-weight: normal;
}

.write-btn:hover {
  color: #2563eb;
}

.comment-content {
  display: flex;
  gap: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.comment-main {
  flex: 1;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.username {
  font-weight: 500;
  color: #3b82f6;
}

.username.female {
  color: #ec4899;
}

.stars {
  display: flex;
  color: #fbbf24;
}

.date {
  margin-left: auto;
  color: #6b7280;
  font-size: 14px;
}

.comment-text {
  margin-bottom: 12px;
  color: #1f2937;
}

.actions {
  display: flex;
  gap: 16px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.action-btn:hover {
  color: #3b82f6;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-content {
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 560px;
  max-width: 90vw;
  position: relative;
}

.dialog-header {
  position: absolute;
  right: 10px;
  top: 10px;
}

.dialog-title {
  font-size: 20px;
  font-weight: bold;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 4px 8px;
}

.work-info {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.work-image {
  width: 158px;
  height: 158px;
  object-fit: cover;
  border-radius: 4px;
}

.work-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.rating-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 15px;
}

.rating-stars {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.star {
  font-size: 18px;
  color: #ddd;
  cursor: default;
}

.star.active {
  color: #fbbf24;
}

.comment-input {
  width: 100%;
  height: 120px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
  margin-bottom: 5px;
  font-size: 14px;
  color: black;
}

.word-count {
  text-align: right;
  color: #666;
  font-size: 12px;
  margin-bottom: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.submit-btn {
  padding: 8px 24px;
  background-color: #e5e7eb;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.submit-btn-active {
  background-color: #3b82f6;
  color: white;
}

.long-review-btn {
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  font-size: 14px;
}

.long-review-btn:hover {
  text-decoration: underline;
}
</style>