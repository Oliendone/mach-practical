<template>
  <div class="rating">
    <div class="stars">
      <div :style="{ width: `${rating * 10}%` }" />
    </div>
    <span v-if="!landingPage">{{rating.toFixed(1)}}</span>
  </div>
</template>

<script setup>
import {defineProps} from "vue";

defineProps({
  rating: Number,
  landingPage: Boolean
})
</script>

<style scoped lang="sass">
.rating
  display: flex
  align-items: baseline
  .stars
    width: 100px
    height: 15px
    background-image: url("~@/assets/images/empty-stars.png")
    background-repeat: no-repeat
    background-size: auto 100%
    div
      height: 100%
      background-image: url("~@/assets/images/stars.png")
      background-repeat: no-repeat
      background-size: auto 100%
</style>
