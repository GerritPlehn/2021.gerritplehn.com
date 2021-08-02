<template>
  <div
    v-editable="blok"
    class="prose my-24 mx-auto">
    <h1>{{ blok.name }}</h1>
    <p>{{ blok.intro }}</p>
    <div class="prose" v-dompurify-html="$md.render(blok.body)"></div>
  </div>
</template>
 
<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
}
</script>