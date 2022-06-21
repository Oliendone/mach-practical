<template>
  <main class="search-page">
    <CategoryMovies
      :header="header"
      :movies="movies"
      :search-page="true"
      @load-more-movies="loadMoreMovies"
    />
  </main>
</template>

<script setup>
import { ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

import { MoviesService } from "../services/MoviesService";
import { language } from "@/use/useLanguage";

import CategoryMovies from "../components/CategoryMovies";

const moviesService = new MoviesService();

const route = useRoute(),
  router = useRouter();

const movies = ref(null),
  page = ref(1),
  header = ref(""),
  previousPage = ref(null);

previousPage.value = router.options.history.state.back
  ? router.options.history.state.back
  : "/";

watch(
  () => route.query.q,
  (newVal) => {
    if (newVal === "") {
      router.push({ path: previousPage.value });
    }
  }
);

watchEffect(() => {
  header.value = route.query.q;

  if (route.query.q) {
    moviesService
      .getSearchedMovies(route.query.q, language.value, page.value)
      .then((data) => {
        movies.value = data;
      });
  }
});

function loadMoreMovies() {
  page.value = page.value + 1;

  moviesService
    .getSearchedMovies(route.query.q, language.value, page.value)
    .then((data) => {
      movies.value = movies.value.concat(data);
    });
}
</script>

<style scoped lang="sass">
.search-page
  padding: 8rem 0 4rem
</style>
