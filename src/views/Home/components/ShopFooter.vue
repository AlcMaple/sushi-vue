<script setup>
import { ref, computed } from "vue";
import { ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();
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

const isDialogVisible = ref(false);

const handlePayment = () => {
  console.log("支付操作", totalPrice.value, totalQuantity.value);
  if (totalQuantity.value === 0) {
    ElMessageBox.alert("请选择商品后再支付！", "提示", {
      confirmButtonText: "确定",
    });
    return;
  }
  isDialogVisible.value = true;
};

const confirmPayment = () => {
  isDialogVisible.value = false;
  router.push({
    name: "payment",
    query: {
      totalPrice: totalPrice.value,
      totalQuantity: totalQuantity.value,
    },
  });
};

const cancelPayment = () => {
  isDialogVisible.value = false;
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

  <el-dialog
    v-model="isDialogVisible"
    title="确认支付"
    width="400px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    custom-class="payment-dialog"
  >
    <p>
      您即将支付 <strong>${{ totalPrice }}</strong> 购买
      <strong>{{ totalQuantity }}</strong> 件商品。
    </p>
    <p>确认继续支付吗？</p>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelPayment">取消</el-button>
        <el-button type="primary" @click="confirmPayment">确认支付</el-button>
      </div>
    </template>
  </el-dialog>
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

.payment-dialog {
  border-radius: 10px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.dialog-footer .el-button {
  padding: 6px 20px;
}
</style>
