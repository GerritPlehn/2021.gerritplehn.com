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
      {{ postContent.name }}
    </h1>
    <p class="leading-relaxed mb-3">{{ postContent.intro }}</p>
    <nuxt-link
      :to="postLink"
      class="inline-flex items-center"
      :class="`text-${color}-400`"
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
    postContent: {
      type: Object,
      required: true,
    },
    postLink: {
      type: String,
      required: true,
    },
  },
  computed: {
    color () {
      return this.$nuxt.context.store.state.settings.colorScheme
    }
  }
}
</script>

<style>
.post-teaser:hover {
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.75);
}
</style>
