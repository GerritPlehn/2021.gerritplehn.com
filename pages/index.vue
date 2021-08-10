<template>
  <section>
    <component
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
      :is="story.content.component"
    />
  </section>
</template>

<script>
export default {
  nuxtI18n: {
    paths: {
      en: '/', // -> accessible at /
      de: '/', // -> accessible at /de/
    },
  },
  name: 'hi',
  data() {
    return {
      story: { content: {} },
    }
  },
  mounted() {
    this.$storybridge(() => {
      const storyblokInstance = new StoryblokBridge()

      // Use the input event for instant update of content
      storyblokInstance.on('input', (event) => {
        if (event.story.id === this.story.id) {
          this.story.content = event.story.content
        }
      })

      // Use the bridge to listen the events
      storyblokInstance.on(['published', 'change'], (event) => {
        // window.location.reload()
        this.$nuxt.$router.go({
          path: this.$nuxt.$router.currentRoute,
          force: true,
        })
      })
    })
  },
  async fetch(context) {
    // Loading reference data - Articles in our case
    if (
      context.store.state.articles.loaded !== '1' ||
      context.store.state.articles.articles[0].lang !== context.app.i18n.locale
    ) {
      let articlesRefRes = await context.app.$storyapi.get(`cdn/stories/`, {
        starts_with:
          context.app.i18n.locale === 'en'
            ? ''
            : context.app.i18n.locale + '/' + 'articles/', // not using language parameter because that alters the full_slug
        version: 'draft',
      })
      context.store.commit('articles/setArticles', articlesRefRes.data.stories)
      context.store.commit('articles/setLoaded', '1')
    }
  },
  asyncData(context) {
    const version =
      context.query._storyblok || context.isDev ? 'draft' : 'published'
    const fullSlug =
      context.route.path == '/' || context.route.path == ''
        ? 'home'
        : context.route.path

    // Load the JSON from the API - loadig the home content (index page)
    return context.app.$storyapi
      .get(`cdn/stories/home`, {
        version: version,
        language: context.app.i18n.locale,
      })
      .then((res) => {
        return res.data
      })
      .catch((res) => {
        if (!res.response) {
          console.error(res)
          context.error({
            statusCode: 404,
            message: 'Failed to receive content form api',
          })
        } else {
          console.error(res.response.data)
          context.error({
            statusCode: res.response.status,
            message: res.response.data,
          })
        }
      })
  },
}
</script>
