<script setup>
import initialMovies from './data/movies.json';
import { computed, ref } from 'vue';
import MovieForm from './MovieForm.vue';
import MovieList from './MovieList.vue';
import MovieFilter from './MovieFilter.vue';

const movies = ref(initialMovies);
const query = ref('');

const normalizedQuery = computed(() => query.value.toLowerCase());
const visibleMovies = computed(() => {
  return movies.value.filter(m => {
    return `${m.title}\n${m.description}`
      .toLowerCase()
      .includes(normalizedQuery.value);
  });
});
</script>

<template>
  <div class="page">
    <div class="page-content">
      <MovieFilter v-model="query" />
      <MovieList :movies="visibleMovies" />
    </div>

    <div class="sidebar">
      <MovieForm @save="movies.push($event)" />
    </div>
  </div>
</template>
