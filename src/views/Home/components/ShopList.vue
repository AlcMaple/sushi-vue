<script setup>
import { ref, watch, onMounted } from "vue";
import { getShopList } from "@/apis/shop";
import { useRouter } from "vue-router";
import { defineProps } from "vue";

const router = useRouter();
const emit = defineEmits();

const props = defineProps({
  products: {
    type: Array,
    default: () => [],
  },
});

const BASE_URL = "http://127.0.0.1:5001";

const getFullImageUrl = (path) => {
  return `${BASE_URL}/${path}`;
};

const pageData = ref([]);
const products = ref([]);
const ITEMS_PER_ROW = 3;

const calculateDisplayCount = (total, increment) => {
  const newCount = Math.min(total, products.value.length + increment);
  return Math.ceil(newCount / ITEMS_PER_ROW) * ITEMS_PER_ROW;
};

const getSelectedItems = () => {
  return products.value
    ? products.value.filter((product) => product.selected)
    : [];
};

watch(
  () => getSelectedItems(),
  (newSelectedItems) => {
    emit("update:selected", newSelectedItems);
  },
  { deep: true }
);

watch(
  () => props.products,
  (newProducts) => {
    if (newProducts && newProducts.length > 0) {
      const processedData = newProducts.map((item) => ({
        ...item,
        image: getFullImageUrl(item.image),
        quantity: 1,
        selected: false,
      }));

      pageData.value = processedData;
      products.value = pageData.value;
      noMore.value = true;
    }
  }
);

const loading = ref(false);
const noMore = ref(false);
const containerRef = ref(null);

const load = () => {
  if (loading.value || noMore.value) return;
  loading.value = true;

  setTimeout(() => {
    const currentCount = products.value.length;
    let increment = 5;

    const targetCount = calculateDisplayCount(pageData.value.length, increment);

    if (targetCount >= pageData.value.length) {
      products.value = pageData.value;
      noMore.value = true;
    } else {
      products.value = pageData.value.slice(0, targetCount);
    }

    loading.value = false;
  }, 1000);
};

const goToDetail = (name) => {
  console.log("go to detail", name);
  router.push({ name: "detail", params: { name } });
};

onMounted(() => {
  console.log("get shop list...");
  getShopList().then((res) => {
    const processedData = res.data.map((item) => ({
      ...item,
      image: getFullImageUrl(item.image),
      quantity: 1,
      selected: false,
    }));

    const copyProcessedData = [
      ...processedData,
      ...processedData,
      ...processedData,
    ];
    pageData.value = copyProcessedData;

    const initialCount = calculateDisplayCount(pageData.value.length, 10);
    products.value = pageData.value.slice(0, initialCount);

    noMore.value = products.value.length >= pageData.value.length;
  });
});
</script>

<template>
  <el-scrollbar height="calc(100vh - 100px)" ref="containerRef">
    <div class="shop-list-container">
      <div
        v-infinite-scroll="load"
        :infinite-scroll-disabled="loading || noMore"
        :infinite-scroll-immediate="false"
        :infinite-scroll-distance="10"
        :infinite-scroll-delay="200"
        class="scroll-container"
      >
        <div
          class="shop-list"
          v-for="product in products"
          :key="product.id"
          @click="goToDetail(product.name)"
        >
          <div class="card">
            <label class="checkbox-container" @click.stop>
              <input type="checkbox" v-model="product.selected" />
              <span class="checkmark"></span>
            </label>
            <img :src="product.image" alt="Product Image" class="card-image" />
            <h3 class="card-title">{{ product.name }}</h3>
            <p class="card-price">${{ product.price }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loading" class="loading-indicator">加载中...</div>
    <div v-if="noMore" class="loading-indicator">没有更多数据了</div>
    <div class="shop-list-footer"></div>
  </el-scrollbar>
</template>

<style scoped>
/* 容器样式 */
.shop-list-container {
  display: flex;
  padding: 18px;
  box-sizing: border-box;
}

.scroll-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
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

.card {
  position: relative;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

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
}

.card-price {
  padding: 0 12px;
  font-size: 1rem;
  color: #888;
  margin-bottom: 12px;
}

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

.loading-indicator {
  text-align: center;
  width: 100%;
  margin-top: 20px;
  color: #888;
}
</style>