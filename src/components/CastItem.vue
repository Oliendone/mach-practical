<template>
  <div class="cast-item">
    <div class="image-box">
      <ImageItem :source="image" :alt="castName" v-if="image"/>
    </div>
    <div class="title">
      {{ castName }}
    </div>
    <div class="subtitle">{{ characterName }}</div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import ImageItem from "./ImageItem";

defineProps({
  castName: String,
  image: String,
  characterName: String,
});
</script>

<style lang="sass" scoped>
.cast-item
  display: flex
  flex-direction: column
  max-width: 250px
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
  .subtitle
    color: $additional-color
</style>
