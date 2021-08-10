<template>
  <div
    class="
      h-full
      bg-gray-300
      dark:bg-gray-800
      bg-opacity-40
      px-8
      pt-16
      pb-24
      rounded-lg
      overflow-hidden
      text-center
      relative
    "
  >
    <h1
      class="
        title-font
        sm:text-2xl
        text-xl
        font-medium
        text-gray-900
        dark:text-white
        mb-3
      "
    >
      {{ articleContent.name }}
    </h1>
    <p class="leading-relaxed mb-3">{{ articleContent.intro }}</p>
    <nuxt-link :to="articleLink" class="text-red-400 inline-flex items-center"
      >Learn More
      <svg
        class="w-4 h-4 ml-2"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M5 12h14"></path>
        <path d="M12 5l7 7-7 7"></path>
      </svg>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    articleContent: {
      type: Object,
      required: true,
    },
    articleLink: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
.article-teaser:hover {
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.75);
}
</style>
