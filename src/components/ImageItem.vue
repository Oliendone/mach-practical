<template>
  <figure v-lazyload class="image-wrapper">
    <img class="image" :data-url="source" :alt="`${alt} image`" />
  </figure>
</template>

<script>
export default {
  name: "ImageItem",
  props: {
    source: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped lang="sass">
.image-wrapper, .image
  width: 100%
  height: 100%
  object-fit: cover
</style>
