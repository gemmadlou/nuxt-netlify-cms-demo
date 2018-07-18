import {slugify} from '../utils/utils'

export const state = () => ({
    categories: []
})

export const mutations = {
    setCategories(state, payload) {
        state.categories = payload;
    }
}

export const actions = {
    async getCategories({commit}) {
        // Use webpack's context to get all files from a folder
        const context = require.context('~/content/category/', false, /\.json$/)
        const categories = context.keys().map(key => ({
            ...context(key),
            slug: `${key.replace('.json', '').replace('./', '')}`
        }));

        commit('setCategories', categories.map(category => ({ 
            ...category, 
            slug: slugify(category.title)
        })));
    }
}
