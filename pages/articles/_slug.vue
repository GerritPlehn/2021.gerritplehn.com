<template>
  <section>
    <Article :blok="story.content" />
  </section>
</template>

<script>
import Article from '~/components/Article.vue'
import { translatedSlugs } from '~/helpers/translated_slug'
export default {
  components: {
    Article,
  },
  nuxtI18n: {
    paths: {
      de: '/artikel/:slug', // -> accessible at /fr/a-propos
      en: '/articles/:slug', // -> accessible at /about-us (no prefix since it's the default locale)
    },
  },
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
        console.log(this.story.content)
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
  async asyncData(context) {
    // Load the JSON from the API
    let version =
      context.query._storyblok || context.isDev ? 'draft' : 'published'
    try {
      const article = await context.app.$storyapi.get(
        `cdn/stories/articles/${context.params.slug}`,
        {
          version: version,
          language: context.app.i18n.locale,
        }
      )
      console.log(article)
      const story = article.data.story
      await context.store.dispatch(
        'i18n/setRouteParams',
        translatedSlugs(story)
      )
      return article.data
    } catch (res) {
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
    }
  },
}
</script>
