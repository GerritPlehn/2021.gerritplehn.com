<template>
  <footer class="text-gray-400 body-font">
    <div
      class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col"
    >
      <a
        class="
          flex
          title-font
          font-medium
          items-center
          md:justify-start
          justify-center
          text-gray-900
          dark:text-white
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-10 h-10 text-white p-2 rounded-full"
          :class="`bg-${color}-500`"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          ></path>
        </svg>
        <span class="ml-3 text-xl">{{ footerText }}</span>
      </a>
      <span
        class="
          inline-flex
          sm:ml-auto sm:mt-0
          mt-4
          justify-center
          sm:justify-start
        "
      >
        <a class="ml-3 text-gray-400 w-5 h-5 filter dark:invert" v-for="social in socials" :key="social._uid" :href="social.link.url" target="_blank" rel="noopener noreferrer">
          <img :src="social.image.filename" :alt="social.name + ' Icon'">
        </a>
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    footerText() {
      return this.$nuxt.context.store.state.settings.title
    },
    color() {
      return this.$nuxt.context.store.state.settings.colorScheme
    },
    socials() {
      // console.log(this.$nuxt.context.store.state.settings.socials)
      return this.$nuxt.context.store.state.settings.socials
    }
  },
}
</script>

<style></style>
