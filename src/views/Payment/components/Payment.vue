<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const totalPrice = route.query.totalPrice || 0;
const totalQuantity = route.query.totalQuantity || 0;

const router = useRouter();

const navigateToShopList = () => {
  router.push({ name: "home" });
};
</script>

<template>
  <div class="payment-complete">
    <div class="icon-container">
      <img
        src="https://img.icons8.com/ios-filled/100/4CAF50/checked.png"
        alt="支付成功"
      />
    </div>
    <div class="payment-info">
      <h1>支付成功！</h1>
      <p>
        您成功支付了<strong>${{ totalPrice }}</strong
        >，共购买了<strong>{{ totalQuantity }}件商品</strong>。
      </p>
    </div>
    <!-- <div class="button-container">
      <el-button class="back-button" type="primary" @click="navigateToShopList"
        >返回</el-button
      >
    </div> -->
    <div class="button-container">
      <button class="back-button" @click="navigateToShopList">
        <svg
          height="16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 1024 1024"
        >
          <path
            fill="#fff"
            d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"
          ></path>
        </svg>
        <span>Back</span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.payment-complete {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #a1c4fd, #c2e9fb);
  color: #fff;
  font-family: "Arial", sans-serif;
}

.icon-container img {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
}

.payment-info {
  text-align: center;
}

.payment-info h1 {
  font-size: 36px;
  margin-bottom: 10px;
}

.payment-info p {
  font-size: 18px;
  margin-bottom: 30px;
}

// .button-container {
//   width: 100%;
//   display: flex;
//   justify-content: center;
// }

// .back-button {
//   padding: 12px 30px;
//   font-size: 16px;
//   background-color: #ff5722;
//   border: none;
//   border-radius: 5px;
//   color: #fff;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
// }

// .back-button:hover {
//   background-color: #e64a19;
// }
.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.back-button {
  padding: 12px 30px;
  font-size: 16px;
  background-color: #ff5722;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-button:hover {
  background-color: #e64a19;
}

button > svg {
  margin-right: 5px;
  margin-left: 5px;
  font-size: 20px;
  transition: all 0.4s ease-in;
}

button:hover > svg {
  font-size: 1.2em;
  transform: translateX(-5px);
}

button:hover {
  box-shadow: 9px 9px 33px #d1d1d1, -9px -9px 33px #ffffff;
  transform: translateY(-2px);
}
</style>
