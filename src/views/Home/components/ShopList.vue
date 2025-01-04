<script setup>
import { ref, watch } from "vue";

// 定义 emit
const emit = defineEmits();

// 确保初始数据结构正确
const products = ref(
  Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Product Name ${i + 1}`,
    price: (Math.random() * 100).toFixed(2),
    quantity: 1,
    selected: false,
  }))
);

// // 切换商品的选择状态
// const toggleSelection = (product) => {
//   product.selected = !product.selected;
// };

// 获取选中的商品列表
const getSelectedItems = () => {
  return products.value
    ? products.value.filter((product) => product.selected)
    : [];
};

// 监听商品数据的变化，更新父组件
watch(
  () => getSelectedItems(),
  (newSelectedItems) => {
    // 使用 emit 来触发父组件的事件
    emit("update:selected", newSelectedItems);
  },
  { deep: true }
);
</script>

<template>
  <div class="shop-list-container">
    <div class="shop-list" v-for="product in products" :key="product.id">
      <div class="card">
        <!-- 复选框 -->
        <label class="checkbox-container">
          <input type="checkbox" v-model="product.selected" />
          <span class="checkmark"></span>
        </label>
        <!-- 图片 -->
        <img
          src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
          alt="Product Image"
          class="card-image"
        />
        <!-- 标题 -->
        <h3 class="card-title">{{ product.name }}</h3>
        <!-- 价格 -->
        <p class="card-price">${{ product.price }}</p>
      </div>
    </div>
  </div>
  <div class="shop-list-footer"></div>
</template>

<style scoped>
/* 容器样式 */
.shop-list-container {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  padding: 18px;
  box-sizing: border-box;
}

.shop-list {
  width: calc((100% - 36px) / 3);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin: 0;
}

.shop-list-footer {
  height: 64px;
}

/* 卡片样式 */
.card {
  position: relative;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

/* .card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
} */

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-title {
  padding: 8px 12px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  /* text-align: center; */
}

.card-price {
  /* text-align: center; */
  padding: 0 12px;
  font-size: 1rem;
  color: #888;
  margin-bottom: 12px;
}

/* 复选框样式 */
.checkbox-container {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-container input[type="checkbox"] {
  display: none;
}

.checkbox-container .checkmark {
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.checkbox-container input[type="checkbox"]:checked + .checkmark {
  background-color: #007bff;
  border-color: #007bff;
}

.checkbox-container .checkmark::after {
  content: "";
  display: none;
  position: absolute;
  left: 5px;
  top: 1px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-container input[type="checkbox"]:checked + .checkmark::after {
  display: block;
}
</style>
