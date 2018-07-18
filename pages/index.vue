<template>
    <div class="container">
        <h2>Latest posts</h2>
        <ul>
            <li v-if="posts" v-for="(post, index) in posts" :key="index">
                <nuxt-link :to="post.slug">{{ post.title }}</nuxt-link>
                {{ post.rel}}
            </li>
        </ul>
        <h2>Categories</h2>
        <ul>
            <li v-if="categories" v-for="(category, index) in categories" :key="index">
                <nuxt-link :to="category.slug">{{ category.title }}</nuxt-link>
                {{ category.title }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    computed: {
        posts() {
            return this.$store.state.posts.posts
        },
        categories() {
            return this.$store.state.categories.categories;
        }
    },
    async fetch({ store, params }) {
        await store.dispatch('posts/getPosts', params.slug)
        await store.dispatch('categories/getCategories');
    }
}
</script>

<style>
h2,
li { margin-bottom: 20px; }
</style>