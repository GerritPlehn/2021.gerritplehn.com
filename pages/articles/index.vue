<template>
  <section>
    <h2 class="py-10 text-center font-bold text-4xl">
      {{ $t('all_articles') }}
    </h2>
    <ul class="flex py-6 mb-6">
      <li
        v-for="article in this.$store.state.articles.articles"
        :key="article._uid"
        class="flex-auto px-6"
        style="min-width: 33%"
      >
        <article-teaser
          v-if="article.content"
          :article-link="'/' + article.full_slug"
          :article-content="article.content"
        />
        <p v-else class="px-4 py-2 text-white bg-red-700 text-center rounded">
          This content loads on save. <strong>Save the entry & reload.</strong>
        </p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'AllArticles',
  nuxtI18n: {
    paths: {
      en: '/articles',
      de: '/artikel',
    },
  },
  data() {
    return {
      stories: [],
    }
  },
  asyncData(context) {
    if (
      context.store.state.articles.loaded !== '1' ||
      context.store.state.articles.articles[0].lang !== context.app.i18n.locale
    ) {
      const version =
        context.query._storyblok || context.isDev ? 'draft' : 'published'
      return context.app.$storyapi
        .get('cdn/stories', {
          starts_with:
            context.app.i18n.locale === 'en'
              ? ''
              : context.app.i18n.locale + '/' + 'articles/', // not using language parameter because that alters the full_slug
          version: version,
        })
        .then((res) => {
          context.store.commit('articles/setArticles', res.data.stories)
          context.store.commit('articles/setLoaded', '1')
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
    } else {
      return context.store.state.articles.articles
    }
  },
}
</script>
