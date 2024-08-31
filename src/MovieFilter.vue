<script setup>
import { defineModel } from 'vue';

const query = defineModel({ required: true });
</script>

<template>
  <div class="box" data-cy="search">
    <div class="field">
      <label for="search-query" class="label">Search movie</label>

      <div class="control">
        <input
          data-cy="search__field"
          id="search-query"
          class="input"
          placeholder="Type search word"
          v-model.trim="query"
        />
      </div>
    </div>
  </div>
</template>
