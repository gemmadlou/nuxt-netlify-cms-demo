import {getImport} from '../utils/utils';

export const state = () => ({
    template: '',
    currentPost: {},
    isLoading: true
})

export const mutations = {
    setCurrentPost(state, payload) {
        state.currentPost = payload;
        state.template = 'post';
    },
    setCurrentCategory(state, payload) {
        state.currentPost = payload;
        state.template = 'category';
    },
    setLoading(state, payload) {
        state.isLoading = payload;
    }
}

export const actions = {
    async getDynamicPageBySlug({commit}, slug) {
        let post = getImport('../content/post/' + slug + '.json');
        let category = getImport('../content/category/' + slug + '.json');

        if (post instanceof Error === false) {
            commit('setCurrentPost', JSON.parse(post));
        } else if (category instanceof Error === false) {
            commit('setCurrentCategory', JSON.parse(category));
        }
       
        commit('setLoading', false);
    }
}
