<template>
  <div class="wrapper">
    <h1 class="title">{{setHeader}}</h1>
    <div class="items" v-if="props.movies">
      <MovieItem v-for="item in props.movies" :key="item.id" :title="item.title" :link="item.id" :image="item.image" :rating="item.rating"/>
    </div>
    <button v-if="props.movies" class="button" @click="emit('loadMoreMovies')">Load More</button>
  </div>
</template>

<script setup>
import {defineProps, defineEmits, computed} from "vue";
import MovieItem from "@/components/MovieItem"

const props = defineProps({
  header: String,
  movies: Array,
  searchPage: Boolean
})

const setHeader = computed(() => {
  if(props.searchPage) {
    return `Results For: ${props.header}`
  } else {
    return props.header

  }
})

const emit = defineEmits(['loadMoreMovies'])

</script>

<style scoped lang="sass">
.wrapper
  +container
  .title
    margin-bottom: 1.5rem
  .items
    display: flex
    flex-wrap: wrap
    gap: 10px
  .button
    margin: 2rem auto 0
</style>
