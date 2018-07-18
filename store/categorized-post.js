/**
 * global window
 */
export const state = () => ({
    currentPost: {},
    isLoading: true
})

export const mutations = {
    setCategorizedPost(state, payload) {
        state.currentPost = payload;
    },
    setLoading(state, payload) {
        state.isLoading = payload;
    }
}

export const actions = {
    async getPage({commit}, params = {}) {
        try {
            let category = await import(`../content/category/${params.category}.json`);
            let post = await import(`../content/post/${params.post}.json`);
            
            if (category.title === post.rel) {
                commit('setCategorizedPost', {...post});
            }
        } catch(e) {
            // Not proper implementation but good enough for now
            // Redirect to 404 or to homepage wherever 
            if (typeof window !== 'undefined') window.location.href = '/';
        }
        
        commit('setLoading', false);
    }
}