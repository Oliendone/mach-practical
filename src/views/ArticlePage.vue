<template>
  <div class="wrapper">
    <div v-if="!entry" class="skeleton">
      <div class="loader"></div>
    </div>
    <div class="content" v-if="entry">
      <div class="image-box">
        <img :src="landingImage" class="image" />
      </div>
      <div class="main-info">
        <div class="info">
          <h1 class="title">{{ entry.title }}</h1>
          <div class="text" v-html="entry.text"></div>
        </div>
        <div class="related" v-if="relatedArticles">
          <h2>Related Articles:</h2>
          <ArticleItem
            v-for="item in relatedArticles"
            :key="item.uid"
            :title="item.title"
            :image="item.image.url"
            :uid="item.uid"
            :link="item.url.toLowerCase()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

import { fetchArticleImage } from "@/queries/article-image";
import { getEntry } from "@/queries/article-page";

import ArticleItem from "../components/ArticleItem";

const route = useRoute();

const entry = ref(null),
  relatedArticles = ref([]),
  landingImage = ref(null);

const getArticleData = async (uid) => {
  entry.value = await getEntry(uid);
  landingImage.value = await fetchArticleImage(entry.value.image.url);
  await getRelatedArticles(entry.value.related_articles);
  // relatedArticles.value = entry.value.related_articles;
};

const getRelatedArticles = async (articles) => {
  articles.forEach((article) => {
    getEntry(article.uid).then((data) =>
      relatedArticles.value.push(data)
    );
  });
};

getArticleData(route.params.uid);
</script>

<style lang="sass" scoped>
.wrapper
  +container
  padding-top: 5rem
  padding-bottom: 5rem
  .content
    display: flex
    flex-direction: column
  .main-info
    display: grid
    grid-template-columns: 0.8fr 0.2fr
    padding-top: 1rem
    gap: 1rem
  .title
    margin-bottom: 1.5rem
  .text
    color: #fff
  .image
    width: 100%
    height: 100%
    object-fit: contain
  .related
    display: flex
    flex-direction: column
    gap: 10px
.skeleton
  min-height: 100vh
  display: flex
  justify-content: center
  align-items: center
@import '@/assets/style/loader.sass'
</style>
