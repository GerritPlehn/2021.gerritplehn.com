<template>
  <div v-editable="blok" class="py-2 text-center">
    <img class="mx-auto" :src="blok.icon.filename" />
    <h1 class="text-lg">{{ blok.name }}</h1>
    <p class="color--secondary">
      {{ blok.description }}
    </p>
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
}
</script>
