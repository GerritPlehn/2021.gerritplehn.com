<template>
<section class="text-gray-600 dark:text-gray-400 body-font">
  <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div v-editable="blok" class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 dark:text-white">{{ blok.headline }}
      </h1>
      <p  v-editable="blok" class="mb-8 leading-relaxed">{{blok.short}}</p>
    </div>
    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <img  v-editable="blok" class="object-cover object-center rounded" alt="hero" :src="blok.image.filename">
    </div>
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
}
</script>
