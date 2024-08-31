<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['save']);

const getEmptyValues = () => ({
  title: '',
  description: '',
  imgUrl: '',
  imdbId: '',
});

const getEmptyErrors = () => ({
  title: false,
  imgUrl: false,
  imdbId: false,
});

const values = ref(getEmptyValues());
const errors = ref(getEmptyErrors());

function handleSubmit() {
  errors.value = {
    title: !values.value.title,
    imgUrl: !values.value.imgUrl,
    imdbId: !values.value.imdbId,
  };

  if (Object.values(errors.value).some(Boolean)) {
    return;
  }

  const imdbUrl = `https://www.imdb.com/title/${values.value.imdbId}`;

  emit('save', { ...values.value, imdbUrl });
  values.value = getEmptyValues();
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h2 class="title">Add a movie</h2>

    <div class="field">
      <label class="label" for="title-20492567846734056">Title</label>
      <div class="control">
        <input
          id="title-20492567846734056"
          data-cy="movie-form__title"
          class="input"
          :class="{ 'is-danger': errors.title }"
          placeholder="Enter Title"
          v-model.trim="values.title"
          @blur="errors.title = !values.title"
        />
      </div>
      <p class="help is-danger" v-if="errors.title">Title is required</p>
    </div>

    <div class="field">
      <label class="label" for="description-07461245336845779">
        Description
      </label>
      <div class="control">
        <textarea
          id="description-07461245336845779"
          data-cy="movie-form__description"
          class="textarea"
          placeholder="Enter Description"
          v-model.trim="values.description"
        ></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label" for="imgUrl-03780931512410235">Image URL</label>
      <div class="control">
        <input
          id="imgUrl-03780931512410235"
          data-cy="movie-form__imgUrl"
          class="input"
          :class="{ 'is-danger': errors.imgUrl }"
          placeholder="Enter image URL"
          v-model.trim="values.imgUrl"
          @blur="errors.imgUrl = !values.imgUrl"
        />
      </div>
      <p class="help is-danger" v-if="errors.imgUrl">Image URL is required</p>
    </div>

    <div class="field">
      <label class="label" for="imdbId-7255654555627964">Imdb ID</label>
      <div class="control">
        <input
          id="imdbId-7255654555627964"
          data-cy="movie-form__imdbId"
          class="input"
          :class="{ 'is-danger': errors.imdbId }"
          placeholder="Enter Imdb ID"
          v-model.trim="values.imdbId"
          @blur="errors.imdbId = !values.imdbId"
        />
      </div>
      <p class="help is-danger" v-if="errors.imdbId">Imdb ID is required</p>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button
          type="submit"
          data-cy="movie-form__submit-button"
          class="button is-link"
        >
          Add
        </button>
      </div>
    </div>
  </form>
</template>
