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
import { translatedSlugs } from '~/helpers/translated_slug'
export default {
  name: 'home',
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
        this.$nuxt.$router.go({
          path: this.$nuxt.$router.currentRoute,
          force: true,
        })
      })
    })
  },

  asyncData(context) {
    const version =
      context.query._storyblok || context.isDev ? 'draft' : 'published'
    let fullSlug, lang
    let segments = context.route.path.split('/').filter((e) => e !== '')
    if (context.i18n.locales.map((l) => l.code).indexOf(segments[0]) !== -1) {
      lang = segments[0]
      segments = segments.slice(1)
    }
    fullSlug = segments.join('/')
    if (segments.length === 0) fullSlug = 'home'
    // Load the JSON from the API - loadig the home content (index page)

    return context.app.$storyapi
      .get(`cdn/stories/${fullSlug}`, {
        version: version,
        language: lang,
      })
      .then(async (res) => {
        if (res.data.story.translated_slugs) {
          await context.store.dispatch(
            'i18n/setRouteParams',
            translatedSlugs(res.data.story)
          )
        }
        return res.data
      })
      .catch((res) => {
        if (!res.response) {
          console.error(res)
          context.error({
            statusCode: 404,
            message: 'Failed to receive content from api',
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
