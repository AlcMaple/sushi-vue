<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  selectedItems: {
    type: Array,
    default: () => [],
  },
});

// 计算选中商品的总价和总数量
const totalPrice = computed(() => {
  return props.selectedItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);
});

const totalQuantity = computed(() => {
  return props.selectedItems.reduce((sum, item) => sum + item.quantity, 0);
});

// 点击支付按钮时的逻辑
const handlePayment = () => {
  console.log("支付操作", totalPrice.value, totalQuantity.value);
};
</script>

<template>
  <div class="shop-footer">
    <div class="summary">
      <span>选中商品：{{ totalQuantity }}件</span>
      <span>总价：${{ totalPrice }}</span>
    </div>
    <button class="pay-button" @click="handlePayment">支付</button>
  </div>
</template>

<style scoped>
.shop-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
}

.summary {
  font-size: 14px;
  color: #333;
}

.pay-button {
  background-color: #ff5722;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pay-button:hover {
  background-color: #e64a19;
}
</style>
