import Vue from 'vue';
import Vuex from 'vuex';
import { getSearch } from '@/api/search';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchResultRaw: {
      data: [],
      pagination: {
        total_count: 0 //eslint-disable-line
      },
    },
  } as any,//eslint-disable-line
  mutations: {
    SET_SEARCH_RESULT: (state, result) => {
      state.searchResultRaw = result;
    },
  },
  getters: {
    searchResultCount(state) {
      return state.searchResultRaw.pagination?.total_count;
    },
    searchResult(state) {
      return state.searchResultRaw.data?.map((data: any) => ({//eslint-disable-line
        id: data.id,
        title: data.title,
        gifMoving: data.images.fixed_width.url,
        gifStill: data.images.fixed_width_still.url,
      }));
    },
  },
  actions: {
    async searchGif(context,
      payload: string) {
      const { data } = await getSearch(payload);
      console.log(data);//eslint-disable-line

      context.commit('SET_SEARCH_RESULT', data);
    },
  },
  modules: {
  },
});
