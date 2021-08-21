<template>
  <section v-editable="blok" class="text-gray-600 dark:text-gray-400 body-font">
    <div class="container px-5 py-24 mx-auto">
      <ul class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <li v-for="post in posts" :key="post._uid">
          <post-teaser
            v-if="post.content"
            :post-link="'/' + post.full_slug"
            :post-content="post.content"
          />
          <p
            v-else
            class="px-4 py-2 dark:text-white bg-red-700 text-center rounded"
          >
            This content loads on save.
            <strong>Save the entry & reload.</strong>
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  computed: {
    posts () {
	    return this.$nuxt.context.store.state.posts.posts
    },
    color () {
      return 'red'
    }
  },
  async fetch() {
    // Loading reference data - Posts in our case
    const postStore = this.$nuxt.context.store.state.posts
    const settingsStore = this.$nuxt.context.store.state.settings
    if (
      postStore.loaded !== '1' ||
      postStore.posts[0].lang !== settingsStore.currentLocale
    ) {
      let postsRefRes = await this.$nuxt.context.app.$storyapi.get(`cdn/stories/`, {
        starts_with:
          (settingsStore.currentLocale === 'default'
            ? ''
            : (settingsStore.currentLocale + '/')) + 'blog/', // not using language parameter because that alters the full_slug
        content_type: 'blog-post',
        version: 'draft',
      })
      this.$nuxt.context.store.commit('posts/setPosts', postsRefRes.data.stories)
      this.$nuxt.context.store.commit('posts/setLoaded', '1')
    }
  },
}
</script>
