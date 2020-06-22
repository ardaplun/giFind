<template>
  <div class="home">
    <a-input-search
      placeholder="input search text"
      style="width: 200px"
      @search="onSearch"
      :loading="loading"
      :disabled="loading"
    />
    <p>{{ resultFoundText }}</p>
    <div v-for="gif in searchResult" :key="gif.id">
      <img :key="gif.id" :src="gif.gifStill" :title="gif.title" />
    </div>
  </div>
</template>

<script>
import { Input } from 'ant-design-vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    'a-input-search': Input.Search,
  },
  data() {
    return {
      search: '',
      loading: false,
    };
  },
  computed: {
    ...mapGetters(['searchResultCount', 'searchResult']),
    resultFoundText() {
      if (this.searchResultCount > 0 && this.search !== '') {
        return `Found ${this.searchResultCount} for query: ${this.search}`;
      } if (this.searchResultCount === 0 && this.search !== '') {
        return `No gifs found for query: ${this.search}`;
      } return '';
    },
  },
  methods: {
    ...mapActions(['searchGif']),
    onSearch(value) {
      this.loading = true;
      this.searchGif(value).then(() => {
        this.search = value;
        this.loading = false;
      });
    },
  },
};
</script>
