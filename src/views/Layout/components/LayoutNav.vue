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

const handleUsernameClick = () => {
  router.push("/user");
};
</script>

<template>
  <nav class="app-topnav">
    <div class="app-container">
      <ul class="app-topnav-list">
        <div class="logo" @click="router.push('/')">
          <img src="@/assets/logo.png" alt="" class="logo-img" />
        </div>
        <template v-if="true">
          <div class="user-info">
            <li class="username-item">
              <i class="iconfont icon-user"></i>
              <span class="username-link" @click="handleUsernameClick">
                {{ username }}
              </span>
            </li>
            <li class="logout-item">
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
  background: #f0f0f0;
  ul {
    display: flex;
    height: 53px;
    justify-content: space-between;
    align-items: center;

    .logo {
      padding: 0 15px;
      color: #fff;
      cursor: pointer;
      .logo-img {
        width: 140px;
        margin-bottom: 15px;
        color: #fff;
      }
    }

    .user-info {
      display: flex;
      align-items: center;

      .username-item {
        display: flex;
        align-items: center;
        padding: 0 15px;
        color: #333;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        .username-link {
          cursor: pointer;
          &:hover {
            color: #666;
            transition: color 0.2s;
          }
        }
      }

      .logout-item {
        a {
          padding: 0 15px;
          color: #333;
          line-height: 1;
          border-left: 2px solid #ddd;

          &:hover {
            color: #666;
            transition: color 0.2s;
          }
        }
      }
    }
  }
}
</style>