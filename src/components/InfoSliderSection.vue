<template>
  <div class="section">
    <div class="header-box">
      <h2 class="title">{{ title }}</h2>
      <RouterLink
        v-if="link && !castSlider && !articlesSlider"
        class="link"
        :to="`/movie/category/${link}`"
        >Explore All</RouterLink
      >
    </div>
    <Swiper slides-per-view="auto" :space-between="10" class="slider">
      <SwiperSlide v-for="item in data" :key="item.id">
        <CastItem
          v-if="castSlider"
          :cast-name="item.name"
          :image="item.image"
          :character-name="item.character"
        />
        <MovieItem
          v-if="!castSlider && !articlesSlider"
          :title="item.title"
          :link="item.id"
          :image="item.image"
          :rating="item.rating"
        />
        <ArticleItem
          v-if="articlesSlider"
          :title="item.title"
          :link="item.url.toLowerCase()"
          :uid="item.system.uid"
          :image="item.imageConnection.edges[0].node.url"
        />
      </SwiperSlide>
    </Swiper>
    <div class="slider"></div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue";
import MovieItem from "@/components/MovieItem";
import { defineProps } from "vue";
import "swiper/swiper-bundle.css";
import CastItem from "./CastItem";
import ArticleItem from "./ArticleItem";

defineProps({
  title: String,
  link: String,
  data: Array,
  castSlider: Boolean,
  articlesSlider: Boolean,
});
</script>

<style scoped lang="sass">
.section
  +container
  min-height: 470px
  margin-right: 0
  padding: 3rem 0 0
  .header-box
    display: flex
    padding: 0 5rem
    margin-bottom: 1.5rem
  .title
    align-items: baseline
    margin-right: 1rem
  .link
    word-wrap: initial
  .swiper-slide
    max-width: 250px
    &:first-of-type
      margin-left: 5rem
</style>
