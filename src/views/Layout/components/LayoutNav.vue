<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

// 获取用户名
const username = ref();

const handleLogout = () => {
  console.log("logout");
  localStorage.removeItem("user_name");
  router.push("/auth");
};

onMounted(() => {
  username.value = localStorage.getItem("user_name");
});
</script>

<template>
  <nav class="app-topnav">
    <div class="app-container">
      <ul class="app-topnav-list">
        <div class="logo">logo</div>
        <template v-if="true">
          <div class="user-info">
            <li>
              <a href="javascript:;"
                ><i class="iconfont icon-user"></i>{{ username }}</a
              >
            </li>
            <li>
              <el-popconfirm
                title="确认退出吗?"
                confirm-button-text="确认"
                cancel-button-text="取消"
                @confirm="handleLogout"
              >
                <template #reference>
                  <a href="javascript:;">退出登录</a>
                </template>
              </el-popconfirm>
            </li>
          </div>
        </template>
        <template v-else>
          <li><a href="javascript:;">请先登录</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<style scoped lang="scss">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: space-between;
    align-items: center;
    .logo {
      padding: 0 15px;
      color: #cdcdcd;
    }
    .user-info {
      display: flex;
    }
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }

      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>