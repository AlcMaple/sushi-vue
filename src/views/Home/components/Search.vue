<script setup>
import { ref, defineEmits } from "vue";
import { searchShopList } from "@/apis/shop";
import { ElMessage } from "element-plus";

const searchText = ref("");
const emit = defineEmits();

const handleSearch = () => {
  console.log("Search for:", searchText.value);
  searchShopList({ keyword: searchText.value }).then((res) => {
    console.log(res);
    emit("search-data", res.data);
  });
};
</script>

<template>
  <div class="Search">
    <div class="InputContainer">
      <input
        v-model="searchText"
        placeholder="Search.."
        id="input"
        class="input"
        name="text"
        type="text"
      />
      <i class="fas fa-search search-icon" @click="handleSearch"></i>
    </div>
  </div>
</template>

<style scoped>
.Search {
  margin: 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: rgb(255, 255, 255);
}

.InputContainer {
  width: 450px;
  height: 50px;
  position: relative;
  background: linear-gradient(
    to bottom,
    rgb(227, 213, 255),
    rgb(255, 231, 231)
  );
  border-radius: 30px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.075);
}

.input {
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  caret-color: rgb(255, 81, 0);
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  padding-left: 15px;
  padding-right: 40px;
  letter-spacing: 0.8px;
  color: rgb(19, 19, 19);
  font-size: 13.4px;
  margin-top: 5px;
}

.search-icon {
  font-size: 20px;
  color: rgb(19, 19, 19);
  position: absolute;
  right: 15px;
  cursor: pointer;
  margin-top: 15px;
}
</style>
