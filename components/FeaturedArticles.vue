<template>
<section  v-editable="blok" class="text-gray-600 dark:text-gray-400 body-font">
  <div class="container px-5 py-24 mx-auto">
    <h1 class="sm:text-3xl text-2xl font-medium title-font text-center dark:text-white mb-20">{{ blok.text }}
    </h1>
    <ul class="flex flex-wrap -m-4">
      <li
        v-for="article in sortedArticles" :key="article._uid"
        class="p-4 lg:w-1/3" >
        <article-teaser
          v-if="article.content"
          :article-link="article.full_slug"
          :article-content="article.content"/>
        <p v-else class="px-4 py-2 dark:text-white bg-red-700 text-center rounded">This content loads on save. <strong>Save the entry & reload.</strong></p>
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
      required: true
    }
  },
  computed: {
    sortedArticles() {
      // Load reference data/content from store
      const featuredArticles = this.$store.state.articles.articles.filter((article) => {
        return this.blok.articles.includes(article.uuid)
      })
 
      // Enable the ordering of the article previews
      featuredArticles.sort((a, b) => {
        return this.blok.articles.indexOf(a.uuid) - this.blok.articles.indexOf(b.uuid);
      })
 
      return featuredArticles
    }
  }
}
</script>