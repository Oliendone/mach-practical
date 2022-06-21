<template>
  <RouterLink :to="`/article/${uid}/${link}`" class="article-item">
    <div class="image-box">
      <img :src="image" :alt="`${title} poster`" class="image"/>
    </div>
    <h3 class="title">{{ title }}</h3>
  </RouterLink>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  image: String,
  title: String,
  link: String,
  uid: String
});
</script>

<style scoped lang="sass">
.article-item
  width: 100%
  .image-box
    width: 100%
    height: 200px
  .image
    width: 100%
    height: 100%
    object-fit: cover
  .title
    color: #fff
    margin-top: 1rem
</style>
