<script setup>
import { ref, watch, onMounted } from "vue";
import Search from "./components/Search.vue";
import ShopList from "./components/ShopList.vue";
import ShopFooter from "./components/ShopFooter.vue";
// import { getShopList } from "@/apis/shop";

const selectedItems = ref([]);

const updateSelectedItems = (items) => {
  selectedItems.value = items;
};

const products = ref([]);

// 接收Search组件传递过来的数据
const searchData = (data) => {
  console.log("searchData", data);
  // 将数据传递给ShopList组件
  products.value = data;
};
</script>

<template>
  <Search @search-data="searchData" />
  <ShopList @update:selected="updateSelectedItems" :products="products" />
  <ShopFooter :selectedItems="selectedItems" />
</template>