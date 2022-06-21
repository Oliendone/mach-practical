<template>
  <main class="movie">
    <InfoSliderSection
      title="Popular Movies"
      link="popular"
      v-if="popularMovies"
      :data="popularMovies"
    />
    <InfoSliderSection
      title="Top Rated Movies"
      link="top_rated"
      v-if="topRatedMovies"
      :data="topRatedMovies"
    />
    <InfoSliderSection
      title="Upcoming Movies"
      link="upcoming"
      v-if="upcomingMovies"
      :data="upcomingMovies"
    />
    <InfoSliderSection
      title="Now Playing Movies"
      link="now_playing"
      v-if="nowPlayingMovies"
      :data="nowPlayingMovies"
    />
  </main>
</template>

<script setup>
import { ref } from "vue";

import { MoviesService } from "../services/MoviesService";
import { language } from "@/use/useLanguage";

import InfoSliderSection from "../components/InfoSliderSection";

const moviesService = new MoviesService();

const popularMovies = ref(null),
  topRatedMovies = ref(null),
  upcomingMovies = ref(null),
  nowPlayingMovies = ref(null);

moviesService.getTrendingMovies(language.value, 1).then((data) => {
  popularMovies.value = data;
});
moviesService.getTopRatedMovies(language.value, 1).then((data) => {
  topRatedMovies.value = data;
});
moviesService.getUpcomingMovies(language.value, 1).then((data) => {
  upcomingMovies.value = data;
});
moviesService.getNowPlayingMovies(language.value, 1).then((data) => {
  nowPlayingMovies.value = data;
});
</script>

<style scoped lang="sass">
.movie
  padding: 2rem 0 4rem
</style>
