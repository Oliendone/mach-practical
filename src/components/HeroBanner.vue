<template>
  <div class="skeleton" v-if="!mainPage">
    <div class="lds-dual-ring"></div>
  </div>
  <div
    v-if="mainPage"
    class="hero-banner"
    :style="{
      'background-image': `url('${mainPage.background_imageConnection.edges[0].node.url}')`,
    }"
  >
    <div class="wrapper container">
      <h1 class="header">{{ mainPage.title }}</h1>
      <p class="text" v-if="mainPage.select_banner_variant === 'Detailed'">
        {{ mainPage.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import { language } from "@/use/useLanguage";
import { HERO_BANNER_QUERY } from "@/queries/hero-banner";

const props = defineProps({
  id: String,
});

// --- Why it does not work? ---
// const getBgImage = computed(() => {
//   return mainPage.background_imageConnection.edges[0].node.url;
// });

const { result } = useQuery(HERO_BANNER_QUERY, () => ({
  locale: language.value,
  uid: props.id,
}));

const mainPage = useResult(result, null, (data) => data.hero_banner);
</script>

<style lang="sass" scoped>
.skeleton
  min-height: 50vh
  display: flex
  justify-content: center
  align-items: center
.hero-banner
  width: 100%
  height: 50vh
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  background-size: cover
  background-repeat: no-repeat
  background-position: center
  .wrapper
    text-align: center
    color: white
    padding: 24px
    background-color: rgba(0,0,0,0.3)
    backdrop-filter: blur(10px)
    border-radius: 12px
  .header
    margin-bottom: 20px
    color: white
  .text
    color: white
@import '@/assets/style/loader.sass'
</style>
