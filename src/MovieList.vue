<script setup>
defineProps(['movies']);
</script>

<template>
  <div class="movies">
    <div
      v-for="movie of movies"
      :key="movie.imdbId"
      class="card"
      data-cy="movie"
    >
      <div class="card-image">
        <figure class="image is-4by3">
          <img data-cy="movie__image" :src="movie.imgUrl" :alt="movie.title" />
        </figure>
      </div>

      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img src="/images/imdb-logo.jpeg" alt="imdb" />
            </figure>
          </div>
          <div class="media-content">
            <p data-cy="movie__title" class="title is-8">
              {{ movie.title }}
            </p>
          </div>
        </div>

        <div data-cy="movie__description" class="content">
          {{ movie.description }}
          <br />
          <a data-cy="movie__link" :href="movie.imdbUrl"> IMDB </a>
        </div>
      </div>
    </div>
  </div>
</template>
