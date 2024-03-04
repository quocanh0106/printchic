<template>
  <div>
    <NuxtLayout name="default">
      <v-app>
        <NuxtPage />
      </v-app>
    </NuxtLayout>
  </div>
</template>

<script>
export default {
  created() {
    console.log("rere")
  },
  
};
</script>

<style>
.v-navigation-drawer {
  z-index: 999999 !important;
}
</style>