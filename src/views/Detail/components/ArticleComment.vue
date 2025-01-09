<!-- 展示评论 -->
<script setup>
</script>

<template>
  <div class="card">
    <div class="con">
      <div class="title">
        <span class="iconfont">&#xe60c;</span>
        评论
      </div>
      <div class="subCon">
        <div class="text">评论内容</div>
        <div class="tagLine">
          <div class="tag">
            <span class="iconfont">&#xe60c;</span>
            标签1
          </div>
          <div class="tag">
            <span class="iconfont">&#xe60c;</span>
            标签2
          </div>
        </div>
        <div class="tagLine">
          <div class="tag">
            <span class="iconfont">&#xe60c;</span>
            标签3
          </div>
          <div class="tag">
            <span class="iconfont">&#xe60c;</span>
            标签4
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.card {
  margin-top: 10px;
  width: 900px;
}

.con {
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  margin-bottom: 15px;
  background-color: rgb(248, 248, 248);
  border-radius: 10px;
}

.subCon {
  border-left: 4px solid rgb(217, 217, 217);
  margin-left: 20px;
  margin-top: 15px;
  padding-left: 10px;
}

.title {
  font-size: 18px;
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
</style>