<template>
  <main class="home">
    <HeroBanner id="blt8efccc6cb5552902" />
    <InfoSliderSection
      title="Trending Movies"
      link="popular"
      v-if="trendingMovies"
      :data="trendingMovies"
    />
    <InfoSliderSection
      title="Articles"
      v-if="articles"
      :data="articles"
      :articles-slider="true"
    />
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import "swiper/swiper-bundle.css";

import { MoviesService } from "../services/MoviesService";
import { MOVIE_ARTICLES_QUERY } from "../queries/movie-articles";

import InfoSliderSection from "@/components/InfoSliderSection";
import HeroBanner from "@/components/HeroBanner";

const moviesService = new MoviesService();

const trendingMovies = ref(null),
  page = ref(1);

moviesService.getTrendingMovies("en-us", page.value).then((data) => {
  trendingMovies.value = data;
});

const { result } = useQuery(MOVIE_ARTICLES_QUERY);

const articles = useResult(
  result,
  null,
  (data) => data.all_movie_article.items
);
</script>

<style lang="sass" scoped>
.home
  padding-bottom: 3rem
.wrapper
  padding-bottom: 40px
  min-height: 1000px
  display: flex
  flex-direction: column
  align-items: center
.articles
  +container
  margin-top: 3rem
  .wrapper
    margin-top: 1.5rem
    flex-direction: row
    display: flex
    flex-wrap: wrap
    align-content: flex-start
    align-items: flex-start
    gap: 10px
.buttons
  display: grid
  grid-template-columns: 1fr 1fr
  margin: 0 auto
.skeleton
  min-height: 1000px
  display: flex
  justify-content: center
  align-items: center
@import '@/assets/style/loader.sass'
</style>
