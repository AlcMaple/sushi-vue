<!-- 预览文章 -->
<script setup>
import { defineProps } from "vue";

const props = defineProps({
  content: String,
});

// console.log(props.content);
</script>

<template>
  <v-md-preview :text="content"></v-md-preview>
</template>

  
