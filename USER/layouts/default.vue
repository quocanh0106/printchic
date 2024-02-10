<template>
  <div class="default">
    <navbar />
    <slot />
    <footerComponent class="custom-padding"/>
  </div>
</template>

<style scoped>
</style>

<script>
import footerComponent from "../components/footerComponent.vue"
export default {
  components: {
    footerComponent
  },
  data() {
    return {
    };
  },
}
</script>