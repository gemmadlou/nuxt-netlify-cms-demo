<template>
    <div class="single-post">
        <div v-if="!isLoading" class="single-post__article">
        	<h1 class="single-post__title">
                {{ currentPost.title }}
            </h1>
        </div>
        <p v-else class="single-post__loading">
            Loading
        </p>
    </div>
</template>

<script>
export default {
    computed: {
        currentPost() {
            return this.$store.state.category.currentCategory
        },
        isLoading() {
            return this.$store.state.category.isLoading
        }
    },
    async fetch({ store, params }) {
        await store.dispatch('category/getCategoryBySlug', params.slug)
    }
}
</script>
