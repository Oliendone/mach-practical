<template>
  <div class="overlay" v-if="openPopUp" @click.exact="emit('close-pop-up')">
    <div class="modal-wrapper">
      <div class="modal-body" :class="{'modal-body--video': mediaType === 'videos'}">
        <button class="button-close" @click="emit('close-pop-up')">
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
        <img
            v-if="mediaType === 'photos'"
            class="modal-image"
            :src="mediaUrl"
            alt=""
        />
        <YouTubeEmbedVideo v-if="mediaType === 'videos'" :video-id="mediaUrl"/>
        <div class="modal-nav">
          <button
            class="modal-arrow modal-arrow--prev"
            @click.stop="emit('media-navigate', 'prev')">
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="#fff"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                d="M17.9 23.2L6.1 12 17.9.8"
              ></path>
            </svg>
          </button>
<!--          <div class="modal-count">{{`${currentItemIndex}/${numberOfItems}`}}</div>-->
          <button
              class="modal-arrow modal-arrow--next"
              @click.stop="emit('media-navigate', 'next')">
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
            >
              <path
                  fill="none"
                  stroke="#fff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  d="M17.9 23.2L6.1 12 17.9.8"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import YouTubeEmbedVideo from "./YouTubeEmbedVideo";

defineProps({
  openPopUp: Boolean,
  mediaUrl: String,
  mediaType: String,
  numberOfItems: Number,
  currentItemIndex: Number,
});

// eslint-disable-next-line no-unused-vars
const emit = defineEmits(['media-navigate', 'close-pop-up'])
</script>

<style scoped lang="sass">
.overlay
  padding: 5rem 5rem
  position: fixed
  width: auto
  height: auto
  overflow-x: hidden
  overflow-y: auto
  background-color: #000
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 100
  .modal-image
    max-height: calc(100vh - 8.8rem)
    width: 100%
  .modal-wrapper
    display: flex
    flex-direction: column
    min-height: 100%
  .modal-body
    position: relative
    margin: auto
    &--video
      width: 100%
  .button-close
    position: absolute
    top: -3rem
    right: 0
    z-index: 101
    display: flex
    align-items: center
    justify-content: center
    width: 3rem
    height: 3rem
    padding: 0
    border: none
    background: none
  .modal-nav
    position: absolute
    right: 0
    bottom: -4.4rem
    left: 0
    display: flex
    align-items: center
    height: 4.4rem
    z-index: 101
  .modal-arrow
    +flex-centered
    position: fixed
    top: 50%
    background-color: transparent
    border: none
    width: 5rem
    height: 5rem
    margin-top: -5rem
    transform: translateY(50%)
    z-index: 101
    &--prev
      left: 0
    &--next
      right: 0
      transform: rotate(180deg) translateY(-50%)
</style>
