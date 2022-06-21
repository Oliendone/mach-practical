<template>
  <footer class="footer">
    <div class="wrapper">
      <div class="content">
        <RouterLink to="/" class="link">MOVIE BASE</RouterLink>
        <RouterLink
          :to="
            getProperMovieLink(item.internal_linkConnection.edges[0].node.url)
          "
          v-for="(item, index) in menuData"
          :key="index"
          class="link text"
        >
          {{ item.label.toUpperCase() }}
        </RouterLink>
      </div>
      <div class="after-text">Created by Nikita Lavrenyuk</div>
    </div>
  </footer>
</template>

<script setup>
import { defineProps } from "vue";

import { getProperMovieLink } from "../utils/helpers";

defineProps({
  menuData: null,
});
</script>

<style scoped lang="sass">
.footer
  background-color: #000
  padding: 3rem 0
  .wrapper
    +container
    display: flex
    flex-direction: column
    align-items: center
  .content
    width: 100%
    display: flex
    justify-content: space-between
  .links
    width: 100%
    display: flex
    justify-content: space-between
  .link
    color: #fff
  .after-text
    color: $additional-color
    margin-top: 3rem
</style>
