<template>
  <div class="video" id="video">
    <iframe
        :src="`https://www.youtube.com/embed/${videoId}?&autoplay=1`"
        allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "YouTubeEmbedVideo",
  props: {
    videoId: {
      type: String,
      default: ''
    },
  },
}
</script>

<style lang="sass" scoped>
.video
  width: 100%
  height: 80vh
  iframe
    width: 100%
    height: 100%
    border: 0
</style>
