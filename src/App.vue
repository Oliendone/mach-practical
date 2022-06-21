<template>
  <Header :menu-data="movieMenu" />
  <router-view :key="route.path" />
  <Footer :menu-data="movieMenu" />
</template>

<script setup>
import { useQuery, useResult } from "@vue/apollo-composable";
import { useRoute } from "vue-router";

import { MOVIES_MENU_QUERY } from "./queries/movies-menu";
import { language } from "@/use/useLanguage";

import Header from "@/components/Header";
import Footer from "./components/Footer";

const route = useRoute();

const { result } = useQuery(MOVIES_MENU_QUERY, () => ({
  locale: language.value,
  uid: "bltfaf26acf86ea7588",
}));

const movieMenu = useResult(
  result,
  null,
  (data) => data.menu_movies.menu_items
);
</script>

<style lang="sass">
body
  color: white
  margin: 0 !important
  background-color: $main-color
</style>
