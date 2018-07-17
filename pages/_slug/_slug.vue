<template>
    <div class="dynamic-page">
        
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
        await store.dispatch('dynamic-page/getPage', params.slug)
    }
}
</script>
