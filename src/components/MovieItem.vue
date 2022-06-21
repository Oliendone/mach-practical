<template>
  <RouterLink :to="`/movie/${link}`" class="box">
    <div class="image-box">
      <ImageItem :source="image" :alt="title" v-if="image"/>
    </div>
    <h2 class="title">
      {{ title }}
    </h2>
    <StarsRating :rating="rating" v-if="rating"/>
  </RouterLink>
</template>

<script setup>
import { defineProps } from "vue";
import StarsRating from "./StarsRating";
import ImageItem from "./ImageItem";

defineProps({
  title: String,
  image: String,
  link: Number,
  rating: Number,
});
</script>

<style lang="sass" scoped>
.box
  display: flex
  flex-direction: column
  align-items: flex-start
  max-width: 240px
  min-width: 150px
  width: 100%
  text-decoration: none
  .image-box
    width: 100%
    height: 350px
    background-color: $bg-color
  .image
    width: 100%
    height: 100%
    object-fit: cover
  .title
    width: 100%
    margin-top: 1rem
    color: white
    margin-bottom: 0.5rem
    display: block
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
</style>
