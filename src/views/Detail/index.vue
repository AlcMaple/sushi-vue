<!-- 普通文章详情页 -->
<script setup>
import { useRoute } from "vue-router";
import ArticleComment from "./components/ArticleComment.vue";
import ArticlePreview from "./components/ArticlePreview.vue";
import { onMounted, ref } from "vue";
import { getShopDetail } from "@/apis/shop";
import { getShopInteraction } from "@/apis/shopInteraction";

// 模拟文章数据
const article = ref({
  content:
    "# Linux\n" +
    "***vue :*** [vue3](https://cn.vuejs.org/)\n" +
    "***CSDN :*** [CSDN官网](https://www.csdn.net/)\n" +
    "***LeetCode :*** [力扣刷题](https://leetcode.cn/problems/)\n" +
    "[linux](http://linux.vbird.org/linux_basic/)\n" +
    "## 前端\n" +
    "***vue :*** [vue3](https://cn.vuejs.org/)\n" +
    "***CSDN :*** [CSDN官网](https://www.csdn.net/)\n" +
    "***LeetCode :*** [力扣刷题](https://leetcode.cn/problems/)\n" +
    "## 后端\n" +
    "***Java :*** [Java教程](https://www.runoob.com/java/java-tutorial.html)\n" +
    "***Spring :*** [Spring教程](https://spring.io/guides)\n" +
    "***SpringBoot :*** [SpringBoot教程](https://spring.io/projects/spring-boot)\n" +
    "***SpringCloud :*** [SpringCloud教程](https://spring.io/projects/spring-cloud)\n",
  // // 开启文章评论
  // commentabled: true,
});
// 接收参数
const route = useRoute();
const name = ref(route.params.name);
const contentment = ref([]);
// 发送请求接收数据
onMounted: {
  //接收参数
  getShopDetail({ sushi_name: name.value }).then((res) => {
    console.log("获取文章信息", res.data);
    article.value = res.data;
  });
  // 接收文章评论
  // console.log("这些哪里？", route.query.aid);
  //   getPublicContentment(route.query.aid).then((res) => {
  //     // console.log("文章评论", res);
  //     contentment.value = res.data;

  //     // 评论头像处理
  //     for (let i = 0; i < contentment.value.length; i++) {
  //       const img = `data:image/jpg;base64,${res.data[i].uavator}`;
  //       contentment.value[i].uavator = img;

  //       // 评论子头像处理
  //       for (let j = 0; j < contentment.value[i].subReply.length; j++) {
  //         const img2 = `data:image/jpg;base64,${res.data[i].subReply[j].uavator}`;
  //         contentment.value[i].subReply[j].uavator = img2;
  //       }
  //     }
  //   });

  // 模拟评论数据
  contentment.value = [
    //     {
    //     uid: 1,
    //     nickname: '我会用vue3',
    //     createTime: '2023-6-3 19:22',
    //     content: '我的 uid 是 \'1\' 😎与模拟 ( 这条评论我发的 ) 的一样,因此我会有 -删除- 按钮🐔',
    //     uavator: 'https://img0.baidu.com/it/u=1091210682,206783907&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1684602000&t=1813754cb45a25a646263c4b3a711514',
    //     // 子评论
    //     subReply: [{
    //         uid: 2,
    //         nickname: '我在学pinia',
    //         createTime: '2023-6-4 12:32',
    //         content: '我的 uid 是 \'2\' 我来玩了🥳',
    //         uavator: 'src/assets/imgs/uid2.png'
    //     },
    //     {
    //         uid: 1,
    //         nickname: '我会用vue3',
    //         createTime: '2023-6-4 12:39',
    //         content: '我的 uid 是 \'1\' 欢迎欢迎 泰库辣🥳',
    //         uavator: 'https://img0.baidu.com/it/u=1091210682,206783907&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1684602000&t=1813754cb45a25a646263c4b3a711514'
    //     }]
    // }, {
    //     uid: 2,
    //     nickname: '我在学pinia',
    //     createTime: '2023-6-3 22:32',
    //     content: '我的 uid 是 \'2\' 我没有 -删除- 按钮🐔 因为上面的评论不是我发的',
    //     uavator: 'src/assets/imgs/uid2.png',
    // },
    // {
    //     uid: 2,
    //     nickname: '我在学pinia',
    //     createTime: '2023-6-3 22:32',
    //     content: '忘记告诉你们了！因为是模拟数据所以这些按钮也就成为摆设了😘',
    //     uavator: 'src/assets/imgs/uid2.png',
    // }
  ];

  let username = localStorage.getItem("user_name");

  // 获取点赞和收藏、评论状态
  getShopInteraction(name.value, username).then((res) => {
    // 获取用户名

    console.log("获取点赞和收藏、评论状态", res);
    // isLiked.value = res.data.isLiked;
    // isFavorited.value = res.data.isFavorited;
  });
}

// 设置点赞和收藏的状态
const isLiked = ref(false);
const isFavorited = ref(false);

// 点击处理函数
const toggleLike = () => {
  isLiked.value = !isLiked.value;
};

const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value;
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
    <ArticleComment />

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