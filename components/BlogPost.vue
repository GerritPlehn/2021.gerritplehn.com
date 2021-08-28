<template>
  <div
    v-editable="blok"
    class="prose text-gray-600 dark:text-gray-400 my-24 mx-auto"
  >
    <h1 class="text-gray-900 dark:text-white">{{ blok.name }}</h1>
    <p class="">{{ blok.intro }}</p>
    <div
      class="prose dark:prose-light"
      v-html="richtext(blok.body)"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  methods: {
    richtext(text) {
      return this.$storyapi.richTextResolver.render(text)
    }
  }
}
</script>
