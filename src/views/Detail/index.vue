<!-- 普通文章详情页 -->
<script setup>
import { useRoute } from "vue-router";
import ArticleComment from "./components/ArticleComment.vue";
import ArticlePreview from "./components/ArticlePreview.vue";
import { onMounted, ref } from "vue";

// 模拟文章数据
const article = ref({
  title: "前端vue入门(模拟数据 组件复用 :-))",
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
    "***SpringCloud :*** [SpringCloud教程](https://spring.io/projects/spring-cloud)\n" +
    "## 数据库\n" +
    "***MySQL :*** [MySQL教程](https://www.runoob.com/mysql/mysql-tutorial.html)\n" +
    "***Redis :*** [Redis教程](https://www.runoob.com/redis/redis-tutorial.html)\n" +
    "## 工具\n" +
    "***Git :*** [Git教程](https://www.runoob.com/git/git-tutorial.html)\n" +
    "***VSCode :*** [VSCode教程](https://code.visualstudio.com/docs)\n" +
    "***Postman :*** [Postman教程](https://www.postman.com/downloads/)\n" +
    "## 其他\n" +
    "***Linux :*** [Linux教程](http://linux.vbird.org/linux_basic/)\n" +
    "***Markdown :*** [Markdown教程](https://www.runoob.com/markdown/markdown-tutorial.html)\n" +
    "***正则表达式 :*** [正则表达式教程](https://www.runoob.com/regexp/regexp-tutorial.html)\n" +
    "***计算机网络 :*** [计算机网络教程](https://www.runoob.com/computer-network/computer-network-tutorial.html)\n" +
    "***计算机组成原理 :*** [计算机组成原理教程](https://www.runoob.com/w3cnote/computer-organization-tutorial.html)\n" +
    "***操作系统 :*** [操作系统教程](https://www.runoob.com/os/os-tutorial.html)\n" +
    "***计算机系统结构 :*** [计算机系统结构教程](https://www.runoob.com/w3cnote/computer-system-structure-tutorial.html)\n" +
    "***计算机安全 :*** [计算机安全教程](https://www.runoob.com/w3cnote/computer-security-tutorial.html)\n" +
    "***计算机网络 :*** [计算机网络教程](https://www.runoob.com/w3cnote/computer-network-tutorial.html)\n" +
    "***计算机应用 :*** [计算机应用教程](https://www.runoob.com/w3cnote/computer-applications-tutorial.html)\n" +
    "***软件工程 :*** [软件工程教程](https://www.runoob.com/w3cnote/software-engineering-tutorial.html)\n" +
    "***数据结构与算法 :*** [数据结构与算法教程](https://www.runoob.com/w3cnote/data-structure-and-algorithm-tutorial.html)\n" +
    "***计算机视觉 :*** [计算机视觉教程](https://www.runoob.com/w3cnote/computer-vision-tutorial.html)\n" +
    "***机器学习 :*** [机器学习教程](https://www.runoob.com/w3cnote/machine-learning-tutorial.html)\n" +
    "***深度学习 :*** [深度学习教程](https://www.runoob.com/w3cnote/deep-learning-tutorial.html)\n" +
    "***人工智能 :*** [人工智能教程](https://www.runoob.com/w3cnote/artificial-intelligence-tutorial.html)\n" +
    "***云计算 :*** [云计算教程](https://www.runoob.com/w3cnote/cloud-computing-tutorial.html)\n" +
    "***区块链 :*** [区块链教程](https://www.runoob.com/w3cnote/blockchain-tutorial.html)\n" +
    "***物联网 :*** [物联网教程](https://www.runoob.com/w3cnote/internet-of-things-tutorial.html)\n" +
    "***云计算 :*** [云计算教程](https://www.runoob.com/w3cnote/cloud-computing-tutorial.html)\n" +
    "***大数据 :*** [大数据教程](https://www.runoob.com/w3cnote/big-data-tutorial.html)\n" +
    "***云计算 :*** [云计算教程](https://www.runoob.com/w3cnote/cloud-computing-tutorial.html)\n" +
    "***区块链 :*** [区块链教程](https://www.runoob.com/w3cnote/blockchain-tutorial.html)\n" +
    "***物联网 :*** [物联网教程](https://www.runoob.com/w3cnote/internet-of-things-tutorial.html)\n" +
    "***云计算 :*** [云计算教程](https://www.runoob.com/w3cnote/cloud-computing-tutorial.html)\n" +
    "***大数据 :*** [大数据教程](https://www.runoob.com/w3cnote/big-data-tutorial.html)\n" +
    "***云计算 :*** [云计算教程](https://www.runoob.com/w3cnote/cloud-computing-tutorial.html)\n" +
    "***区块链 :*** [区块链教程](https://www.runoob.com/w3cnote/blockchain-tutorial.html)\n" +
    "***物联网 :*** [物联网教程](https://www.runoob.com/w3cnote/internet-of-things-tutorial.html)\n" +
    "***云计算 :*** [云计算教程](https://www.runoob.com/w3cnote/cloud-computing-tutorial.html)\n" +
    "***大数据 :*** [大数据教程](https://www.runoob.com/w3cnote/big-data-tutorial.html)\n" +
    "***云计算 :*** [云计算教程](https://www.runoob.com/w3cnote/cloud-computing-tutorial.html)\n" +
    "***区块链 :*** [区块链教程](https://www.runoob.com/w3cnote/blockchain-tutorial.html)\n" +
    "***物联网 :*** [物联网教程](https://www.runoob.com/w3cnote/internet-of-things-tutorial.html)\n" +
    "***云计算 :*** [云计算教程](https://www.runoob.com/w3cnote/cloud-computing-tutorial.html)\n" +
    "***大数据 :*** [大数据教程](https://www.runoob.com/w3cnote/big-data-tutorial.html)\n" +
    "***云计算 :*** [云计算教程](https://www.runoob.com/w3cnote/cloud-computing-tutorial.html)\n" +
    "***区块链 :*** [区块链教程](https://www.runoob.com/w3cnote/blockchain-tutorial.html)\n" +
    "***物联网 :*** [物联网教程](https://www.runoob.com/w3cnote/internet-of-things-tutorial.html)\n" +
    "***云计算 :*** [云计算教程](https://www.runoob.com/w3cnote/cloud-computing-tutorial.html)\n" +
    "***大数据 :*** [大数据教程](https://www.runoob.com/w3cnote/big-data-tutorial.html)\n" +
    "***云计算 :*** [云计算教程](https://www.runoob.com/w3cnote/cloud-computing-tutorial.html)\n" +
    "***区块链 :*** [区块链教程](https://www.runoob.com/w3cnote/blockchain-tutorial.html)\n" +
    "***物联网 :*** [物联网教程](https://www.runoob.com/w3cnote/internet-of-things-tutorial.html)\n" +
    "***云计算 :*** [云计算教程](https://www.runoob.com/w3cnote/cloud-computing-tutorial.html)\n" +
    "***大数据 :*** [大数据教程](https://www.runoob.com/w3cnote/big-data-tutorial.html)\n",
  tags: [
    {
      name: "Linux",
    },
    {
      name: "入门",
    },
  ],
  // 开启文章评论
  commentabled: true,
});
// 接收参数
const route = useRoute();
const contentment = ref([]);
// 发送请求接收数据
onMounted: {
  //接收参数
  //   getHomeArticleDetails(route.query.aid).then((res) => {
  //     // console.log("获取文章信息", res.data);
  //     article.value = res.data;
  //   });
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
}

//判断权限
</script>

<template>
  <div class="detail-container">
    <el-card class="card">
      <!-- 标签栏 -->
      <div style="margin-bottom: 10px">
        <el-text class="title">{{ article.title }}</el-text>
      </div>
      <!-- <div class="tagLine">
        <el-text class="text">文章标签:</el-text>
        <el-tag class="tag" v-for="tag in article.tags">{{ tag.name }}</el-tag>
      </div> -->
      <ArticlePreview :content="article.content" />
    </el-card>
    <!-- 评论区 传入评论参数 -->
    <!-- <ArticleComment
    v-if="article.commentabled"
    :contentments="contentment"
    :aid="article.aid"
  /> -->

    <div class="raise-container"></div>
  </div>
</template>

<style scoped>
.detail-container {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  width: 950px;
  border-radius: 9px;
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

.tagLine {
  margin-left: 16px;
  margin-bottom: 10px;
}

.tag {
  margin-right: 5px;
  margin-bottom: 5px;
}

.raise-container {
  position: fixed;
  margin-left: 1010px;
  margin-top: 180px;
  background: green;
  width: 29px;
  height: 108px;
  padding: 12px 6px;
  border-radius: 6px;
}

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