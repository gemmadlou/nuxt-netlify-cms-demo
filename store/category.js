export const state = () => ({
    currentCategory: {},
    isLoading: true
})

export const mutations = {
    setCurrentCategory(state, payload) {
        state.currentCategory = payload;
    },
    setLoading(state, payload) {
        state.isLoading = payload;
    }
}

export const actions = {
    async getCategoryBySlug({commit}, slug) {
        let postData = await import('../content/category/' + slug + '.json');
        commit('setCurrentCategory', postData);
        commit('setLoading', false);
    }
}