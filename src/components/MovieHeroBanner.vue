<template>
  <div class="hero">
    <div class="content" v-if="data">
      <div>
        <h1 class="title">{{ data.title }}</h1>
        <div class="meta">
          <div class="rating">
            <StarsRating :rating="data.rating" :landingPage="true"/>
            <div class="reviews">{{ data.votes }} Reviews</div>
          </div>
          <div class="info">
            <span>{{ getProperYear(data.release) }}</span>
            <span>{{ data.runtime }}</span>
          </div>
        </div>
        <div class="desc">
          {{ data.overview }}
        </div>
      </div>
    </div>
    <div class="backdrop" v-if="data">
      <ImageItem :source="data.backdrop" :alt="data.title"/>
    </div>
  </div>
</template>

<script setup>

import { defineProps } from "vue";
import StarsRating from "./StarsRating";
import ImageItem from "./ImageItem";

defineProps({
  data: Object,
});

function getProperYear (data) {
  return data.split('-')[0]
}

</script>

<style scoped lang="sass">
.hero
  display: flex
  flex-direction: column
  position: relative
  padding-bottom: 40%
  background-color: #000
  .content
    padding: 4rem
    width: 40%
    display: flex
    align-items: center
    position: absolute
    height: -webkit-fill-available
    left: 0
    top: 0
    z-index: 3
  .title
    margin-bottom: 1rem
  .meta
    margin-bottom: 1.3rem
    display: flex
    color: $additional_color
  .rating
    margin-right: 1rem
    display: flex
    align-items: baseline
  .info
    span + span
      margin-left: 0.7rem
  .backdrop
    position: absolute
    right: 0
    height: 100%
    z-index: 2
    &:after
      position: absolute
      top: 0
      right: 0
      bottom: -1px
      left: -1px
      display: block
      content: ""
      background-image: linear-gradient(90deg,#000 0,transparent 50%,transparent)
  .image
    height: 100%
</style>
