<template>
  <header class="header">
    <div class="wrapper">
      <RouterLink to="/" class="text"> MOVIES BASE </RouterLink>
      <RouterLink
        :to="getProperMovieLink(item.internal_linkConnection.edges[0].node.url)"
        v-for="(item, index) in menuData"
        :key="index"
        class="link text"
      >
        {{ item.label.toUpperCase() }}
      </RouterLink>
      <button class="button" @click="openSearchbar">Search</button>
      <select name="lang" id="lang" class="lang" v-model="language">
        <option value="en-us">EN</option>
        <option value="uk-ua">UA</option>
      </select>
    </div>
  </header>
  <div class="search-bar" ref="searchBar" v-if="showSearchBar">
    <form autocomplete="off" class="form-wrapper">
      <label for="search" class="visually-hidden">Search</label>
      <div class="field">
        <input
          id="search"
          name="search"
          class="input"
          v-model="searchQuery"
          @input="searchQueryChanges"
          type="text"
          placeholder="Search for a movie, tv show or person..."
        />
        <button
          type="button"
          aria-label="Close"
          class="button-close"
          @click="closeSearchBar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
          >
            <g
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width="1.5"
            >
              <path d="M.75.75l13.5 13.5M14.25.75L.75 14.25"></path>
            </g>
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";

import { language } from "@/use/useLanguage";
import { getProperMovieLink } from "../utils/helpers";

const route = useRoute(),
  router = useRouter();

defineProps({
  menuData: null
})

const showSearchBar = ref(false),
  searchQuery = ref(""),
  searchBar = ref(null);

watch(
  () => route.path,
  (newVal, oldVal) => {
    if (oldVal.includes("search") && !newVal.includes("search")) {
      closeSearchBar();
    }
  }
);

function openSearchbar() {
  showSearchBar.value = true;
  setTimeout(() => {
    searchBar.value.classList.add("search-bar--open");
  }, 0);
}

function closeSearchBar() {
  searchBar.value.classList.remove("search-bar--open");
  searchQuery.value = "";
  setTimeout(() => {
    showSearchBar.value = false;
  }, 200);
}

function searchQueryChanges() {
  router.push({ path: "/search", query: { q: searchQuery.value } });
}

</script>

<style lang="sass" scoped>
header
  position: fixed
  top: 0
  z-index: 1000
  width: 100%
  display: flex
  align-items: center
  height: 3rem
  background-color: #000
  border-bottom: 1px solid $bg-color
  .wrapper
    +container
    width: 100%
    display: flex
    align-items: center
    justify-content: space-between
  .text
    text-decoration: none
    color: white
  .lang
    background-color: transparent
    color: white
    border: none
    outline: none
.search-bar
  position: fixed
  width: 100%
  height: 3rem
  top: 0
  z-index: 10
  transition: all 200ms ease
  &--open
    top: 3rem
  .form-wrapper
    height: 100%
  .field
    width: 100%
    height: 100%
    display: flex
    background-color: $bg-color
  .input
    width: 100%
    background-color: transparent
    border: none
    color: #fff
    outline: none
    +container
  .button-close
    padding: 0 2rem
    display: flex
    align-items: center
    border: none
    background-color: $bg-color
</style>
