<template>
  <main class="movie-landing" v-if="movie">
    <MovieHeroBanner :data="movie" />
    <nav class="nav">
      <button
        class="button-nav"
        :class="{ 'button-nav--active': currentMovieSection === 'overview' }"
        @click="toggleMovieSection('overview')"
      >
        Overview
      </button>
      <button
        class="button-nav"
        :class="{ 'button-nav--active': currentMovieSection === 'videos' }"
        @click="toggleMovieSection('videos')"
      >
        Videos
      </button>
      <button
        class="button-nav"
        :class="{ 'button-nav--active': currentMovieSection === 'photos' }"
        @click="toggleMovieSection('photos')"
      >
        Photos
      </button>
    </nav>
    <div class="info-section" v-if="currentMovieSection === 'overview'">
      <div class="image-box">
        <ImageItem :source="movie.poster" :alt="movie.title" />
      </div>
      <div class="info">
        <div class="overview">
          <h2 class="title">Storyline</h2>
          <p class="desc">{{ movie.overview }}</p>
        </div>
        <div class="stats">
          <ul class="stats-list">
            <li class="item">
              <div class="label">Released</div>
              <div class="value">{{ movie.release }}</div>
            </li>
            <li class="item">
              <div class="label">Runtime</div>
              <div class="value">{{ movie.runtime }}</div>
            </li>
            <!--            <li class="item">-->
            <!--              <div class="label">Director</div>-->
            <!--              <div class="value">{{}}</div>-->
            <!--            </li>-->
            <li class="item">
              <div class="label">Budget</div>
              <div class="value">{{ movie.budget }}</div>
            </li>
            <li class="item">
              <div class="label">Revenue</div>
              <div class="value">{{ movie.revenue }}</div>
            </li>
            <li class="item">
              <div class="label">Genre</div>
              <div class="value">
                <span v-for="(item, index) in movie.genres" :key="item.id"
                  >{{ item.name
                  }}<template v-if="index + 1 !== movie.genres.length"
                    >,
                  </template>
                </span>
              </div>
            </li>
            <li class="item">
              <div class="label">Status</div>
              <div class="value">{{ movie.status }}</div>
            </li>
            <li class="item">
              <div class="label">Production</div>
              <div class="value">
                <span v-for="(item, index) in movie.production" :key="item.id"
                  >{{ item.name
                  }}<template v-if="index + 1 !== movie.production.length"
                    >,
                  </template>
                </span>
              </div>
            </li>
          </ul>
        </div>
        <!--        <div class="exernal">-->
        <!--          <ul class="list">-->
        <!--            <li class="link">-->
        <!--              <a href="" target="_blank"></a>-->
        <!--            </li>-->
        <!--          </ul>-->
        <!--        </div>-->
      </div>
    </div>
    <div class="videos-section" v-if="currentMovieSection === 'videos'">
      <div class="header">
        {{ videos.length }}
        {{ videos.length === 1 ? "Video" : "Videos" }}
      </div>
      <div class="items">
        <div
          class="item"
          v-for="(item, index) in videos"
          :key="index"
          @click.exact="openModalWithSelectedVideo(index)"
        >
          <div class="image-box">
            <ImageItem :source="item.image" />
            <div
              class="play-button"
              @click.exact="openModalWithSelectedVideo(index)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 55 55"
              >
                <circle
                  cx="27.5"
                  cy="27.5"
                  r="26.75"
                  fill="none"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                ></circle>
                <path
                  fill="none"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M20.97 40.81L40.64 27.5 20.97 14.19v26.62z"
                ></path>
              </svg>
            </div>
          </div>
          <h2 class="title">{{ item.name }}</h2>
          <div class="subtitle">{{ item.type }}</div>
        </div>
      </div>
    </div>
    <div class="photos-section" v-if="currentMovieSection === 'photos'">
      <div class="photos-wrapper">
        <div class="header">
          <h2 class="title">Backdrops</h2>
          <span class="subtitle"
            >{{ photos.backdrops.length }}
            {{ photos.backdrops.length === 1 ? "Image" : "Images" }}</span
          >
        </div>
        <div class="items">
          <div
            class="item"
            v-for="(item, index) in photos.backdrops"
            :key="index"
            @click.exact="openModalWithSelectedPhoto(index, 'backdrops')"
          >
            <ImageItem :source="item.imageSmall" />
          </div>
        </div>
      </div>
      <div class="photos-wrapper">
        <div class="header">
          <h2 class="title">Posters</h2>
          <span class="subtitle"
            >{{ photos.posters.length }}
            {{ photos.posters.length === 1 ? "Image" : "Images" }}</span
          >
        </div>
        <div class="items">
          <div
            class="item item--posters"
            v-for="(item, index) in photos.posters"
            :key="index"
            @click.exact="openModalWithSelectedPhoto(index, 'posters')"
          >
            <ImageItem :source="item.imageSmall" />
          </div>
        </div>
      </div>
    </div>
    <InfoSliderSection
      title="Cast"
      v-if="cast && currentMovieSection === 'overview'"
      :data="cast"
      :cast-slider="true"
    />
    <InfoSliderSection
      title="More Like This"
      v-if="relevantMovies"
      :data="relevantMovies"
    />
    <MediaModal
      :open-pop-up="showPopUp"
      :media-url="getMediaUrl"
      :media-type="currentMovieSection"
      @close-pop-up="showPopUp = false"
      @media-navigate="mediaNavigate"
    />
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

import { MoviesService } from "../services/MoviesService";
import { language } from "@/use/useLanguage";

import MovieHeroBanner from "../components/MovieHeroBanner";
import InfoSliderSection from "../components/InfoSliderSection";
import ImageItem from "../components/ImageItem";
import MediaModal from "../components/MediaModal";

const route = useRoute();

const movieService = new MoviesService(route.params.id);

console.log(language.value)

const movie = ref(null),
  currentMovieSection = ref("overview"),
  photos = ref(null),
  selectedPhoto = ref({
    type: "backdrops",
    index: 0,
  }),
  selectedVideo = ref(0),
  showPopUp = ref(false),
  videos = ref(null),
  cast = ref(null),
  relevantMovies = ref(null);

movieService
  .getMovieDetails(language.value )
  .then((data) => (movie.value = data));
movieService
  .getMovieCast(language.value)
  .then((data) => (cast.value = data));
movieService
  .getMovieRecommendations(language.value)
  .then((data) => (relevantMovies.value = data));

// eslint-disable-next-line vue/return-in-computed-property
const getMediaUrl = computed(() => {
  if (currentMovieSection.value === "photos") {
    return photos.value[selectedPhoto.value.type][selectedPhoto.value.index]
      .imageOrigin;
  }
  if (currentMovieSection.value === "videos") {
    return videos.value[selectedVideo.value].id;
  }
});

function openModalWithSelectedPhoto(index, imageType) {
  selectedPhoto.value.type = imageType;
  selectedPhoto.value.index = index;
  showPopUp.value = true;
}

function openModalWithSelectedVideo(index) {
  selectedVideo.value = index;
  showPopUp.value = true;
}

function mediaNavigate(value) {
  switch (value) {
    case "prev":
      if (currentMovieSection.value === "photos") {
        selectedPhoto.value.index - 1 >= 0
          ? (selectedPhoto.value.index = selectedPhoto.value.index - 1)
          : (selectedPhoto.value.index =
              photos.value[selectedPhoto.value.type].length - 1);
      } else {
        selectedVideo.value - 1 >= 0
          ? (selectedVideo.value = selectedVideo.value - 1)
          : (selectedVideo.value = videos.value.length - 1);
      }
      break;
    case "next":
      if (currentMovieSection.value === "photos") {
        selectedPhoto.value.index + 1 <
        photos.value[selectedPhoto.value.type].length
          ? (selectedPhoto.value.index = selectedPhoto.value.index + 1)
          : (selectedPhoto.value.index = 0);
      } else {
        selectedVideo.value + 1 <
        videos.value.length
          ? (selectedVideo.value = selectedVideo.value + 1)
          : (selectedVideo.value = 0);
      }
      break;
    default:
      break;
  }
}

function toggleMovieSection(section) {
  currentMovieSection.value = section;

  switch (section) {
    case "videos":
      if (!videos.value) {
        movieService
          .getMovieVideo("en-us")
          .then((data) => (videos.value = data));
      }
      break;
    case "photos":
      if (!photos.value) {
        movieService
          .getMovieImages("en-us")
          .then((data) => (photos.value = data));
      }
      break;
    default:
      break;
  }
}
</script>

<style lang="sass" scoped>
.movie-landing
  padding-top: 40px
  padding-bottom: 60px
  .nav
    display: flex
    justify-content: center
    margin-top: 2rem
  .button-nav
    display: block
    width: auto
    margin: 0 2rem
    border: none
    padding: 0
    font-weight: 500
    color: #585858
    text-transform: uppercase
    letter-spacing: .4px
    background: none
    border-bottom: 2px solid $main-color
    outline: none
    transition: color .2s
    &--active
      border-bottom: 2px solid transparent
      color: #fff
      border-bottom-color: #fff
  .info-section, .photos-section, .videos-section
    +container
    display: flex
    margin-top: 3rem
  .info-section
    .image-box
      width: 25%
      margin-right: 3rem
      background-color: $bg-color
      img
        width: 100%
    .title
      margin-bottom: 0.5rem
    .desc
      margin-bottom: 1.5rem
    .stats
      margin-top: 2rem
    .info
      flex: 1
    .stats-list
      list-style: none
      padding: 0
    .item
      display: flex
      padding: 0.3rem 0
    .label
      max-width: 110px
      flex: 1
    .value
      flex: 2
  .videos-section
    flex-direction: column
    .header
      color: $additional-color
    .title
      margin: 0.5rem 0 0.25rem
    .subtitle
      color: $additional-color
    .image-box
      height: 0
      padding-bottom: 50%
      position: relative
      background-color: $bg-color
      &::v-deep .image-wrapper
        position: absolute
    .play-button
      position: absolute
      +absolute-xy-centered
      z-index: 99
    .items
      display: flex
      flex-wrap: wrap
      gap: 15px
      margin-top: 2rem
    .item
      width: 32%
      padding: 0.2rem
  .photos-section
    flex-direction: column
    .photos-wrapper + .photos-wrapper
      margin-top: 3rem
    .header
      display: flex
      align-items: baseline
      color: $additional-color
    .subtitle
      margin-left: 1rem
    .items
      display: flex
      flex-wrap: wrap
      margin-top: 2rem
      gap: 15px
    .item
      width: 24%
      &--posters
        width: 19%
    .image
      width: 100%
      height: 100%
      object-fit: cover
.skeleton
  min-height: 100vh
  display: flex
  justify-content: center
  align-items: center
@import '@/assets/style/loader.sass'
</style>
