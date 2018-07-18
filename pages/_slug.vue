<template>
    <div class="single-post">
        <div v-if="!isLoading && template === 'post'" class="single-post__article">
        	<h1 class="single-post__title">
                {{ currentPost.title }}
            </h1>
            <div class="single-post__content" v-html="$md.render(currentPost.body)"></div>
        </div>
        <div v-else-if="!isLoading && template === 'category'" class="single-post__article">
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
            return this.$store.state['dynamic-page'].currentPost
        },
        isLoading() {
            return this.$store.state['dynamic-page'].isLoading
        },
        template() {
            return this.$store.state['dynamic-page'].template;
        }
    },
    async fetch({ store, params }) {
        await store.dispatch('dynamic-page/getDynamicPageBySlug', params.slug)
    }
}
</script>
