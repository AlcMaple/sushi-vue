<script setup>
import { ref, watch } from "vue";
import Search from "./components/Search.vue";
import ShopList from "./components/ShopList.vue";
import ShopFooter from "./components/ShopFooter.vue";

const selectedItems = ref([]);

const updateSelectedItems = (items) => {
  selectedItems.value = items;
};
</script>

<template>
  <Search />
  <ShopList @update:selected="updateSelectedItems"/>
  <ShopFooter :selectedItems="selectedItems"/>
</template>