import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home";
import MovieLanding from "@/views/MovieLanding";
import MoviesPage from "@/views/MoviesPage";
import CategoryMoviesPage from "@/views/CategoryMoviesPage";
import SearchPage from "@/views/SearchPage"
import ArticlePage from "@/views/ArticlePage"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/movie",
    name: "Movie",
    component: MoviesPage,
  },
  {
    path: "/movie/category/:category",
    component: CategoryMoviesPage,
  },
  {
    path: "/movie/:id",
    component: MovieLanding,
  },
  {
    path: "/search",
    component: SearchPage,
  },
  {
    path: "/article/:uid/:link",
    component: ArticlePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
