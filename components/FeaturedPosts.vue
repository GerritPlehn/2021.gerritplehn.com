<template>
  <section v-editable="blok" class="text-gray-600 dark:text-gray-400 body-font">
    <div class="container px-5 py-24 mx-auto">
      <h1
        class="
          sm:text-3xl
          text-2xl
          font-medium
          title-font
          text-center
          dark:text-white
          mb-20
        "
      >
        {{ blok.text }}
      </h1>
      <ul class="flex flex-wrap -m-4">
        <li
          v-for="post in sortedPosts"
          :key="post._uid"
          class="p-4 lg:w-1/3"
        >
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
  async fetch() {
    // Loading reference data - Posts in our case
    const postStore = this.$nuxt.context.store.state.posts
    const version =
      this.$nuxt.context.query._storyblok || this.$nuxt.context.isDev ? 'draft' : 'published'
    if (
      postStore.loaded !== '1' ||
      postStore.posts[0].lang !== this.$nuxt.context.store.state.locales.currentLocale
    ) {
      let postsRefRes = await this.$nuxt.context.app.$storyapi.get(`cdn/stories/`, {
        starts_with:
          this.$nuxt.context.store.state.locales.currentLocale === 'default'
            ? ''
            : this.$nuxt.context.store.state.locales.currentLocale + '/' + 'blog/', // not using language parameter because that alters the full_slug
        version: version,
      })
      this.$nuxt.context.store.commit('posts/setPosts', postsRefRes.data.stories)
      this.$nuxt.context.store.commit('posts/setLoaded', '1')
    }
  },
  computed: {
    sortedPosts() {
      // Load reference data/content from store
      const featuredPosts = this.$store.state.posts.posts.filter(
        (post) => {
          return this.blok.posts.includes(post.uuid)
        }
      )

      // Enable the ordering of the post previews
      featuredPosts.sort((a, b) => {
        return (
          this.blok.posts.indexOf(a.uuid) -
          this.blok.posts.indexOf(b.uuid)
        )
      })

      return featuredPosts
    },
  },
}
</script>
