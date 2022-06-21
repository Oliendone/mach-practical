<template>
  <main class="movie-category">
    <CategoryMovies :header="header" :movies="movies" @load-more-movies="loadMoreMovies"/>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

import { MoviesService } from "../services/MoviesService"
import { language } from "@/use/useLanguage";

import CategoryMovies from "../components/CategoryMovies";

const moviesService = new MoviesService();

const route = useRoute();


const movies = ref(null),
  page = ref(1),
  header = ref("");

switch (route.params.category) {
  case "popular":
    moviesService.getTrendingMovies(language, page.value).then((data) => {
      movies.value = data;
    });
    header.value = 'Popular Movies'
    break;
  case "top_rated":
    moviesService.getTopRatedMovies(language, page.value).then((data) => {
      movies.value = data;
    });
    header.value = 'Top Rated Movies'
    break;
  case "upcoming":
    moviesService.getUpcomingMovies(language, page.value).then((data) => {
      movies.value = data;
    });
    header.value = 'Upcoming Movies'
    break;
  case "now_playing":
    moviesService.getNowPlayingMovies(language, page.value).then((data) => {
      movies.value = data;
    });
    header.value = 'Now Playing Movies'
    break;
  default:
    break;
}

function loadMoreMovies() {
  page.value = page.value + 1

  switch (route.params.category) {
    case "popular":
      moviesService.getTrendingMovies(language, page.value).then((data) => {
        movies.value = movies.value.concat(data);
      });
      break;
    case "top_rated":
      moviesService.getTopRatedMovies(language, page.value).then((data) => {
        movies.value = movies.value.concat(data);
      });
      break;
    case "upcoming":
      moviesService.getUpcomingMovies(language, page.value).then((data) => {
        movies.value = movies.value.concat(data);
      });
      break;
    case "now_playing":
      moviesService.getNowPlayingMovies(language, page.value).then((data) => {
        movies.value = movies.value.concat(data);
      });
      break;
    default:
      break;
  }
}

</script>

<style scoped lang="sass">
.movie-category
  min-height: 100vh
  padding: 6rem 0 4rem
</style>
