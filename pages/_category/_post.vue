<template>
    <div class="categorized-post">
        <h2>{{currentPost.title}}</h2>
        {{currentPost.body}}
    </div>
</template>

<script>
export default {
    computed: {
        currentPost() {
            return this.$store.state['categorized-post'].currentPost
        },
        isLoading() {
            return this.$store.state['categorized-post'].isLoading
        }
    },
    async fetch({ store, params }) {
        await store.dispatch('categorized-post/getPage', params)
    }
}
</script>
