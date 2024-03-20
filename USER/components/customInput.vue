<template>
    <div class="custom-input">
        <v-text-field
        :label="$t('navBar.search')"
        :rules="rules"
        class='custom-text-field'
        prepend-inner-icon="mdi-magnify"
        hide-details="auto"
        v-model="querySearch"
        @keyup.enter="searchProduct"
    >
    </v-text-field>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n, useLocalePath } from '#imports'

const props = defineProps({
  rules: {
    type: Array,
    default: () => []
  }
});

const querySearch = ref('');
const router = useRouter();
const localePath = useLocalePath()

const searchProduct = () => {
  // Use Nuxt's useRouter composable for navigation
  router.push(localePath({ path: '/search-result', query: { search: querySearch.value } }));
}

// Optional: If you need to perform actions when the component is mounted,
// you can use the onMounted lifecycle hook from Vue 3.
onMounted(() => {
  querySearch.value = '';
});
</script>

<style lang="scss" scoped>
    .custom-text-field{
        width:20vw;
        max-width:328px;
        :deep(.v-field__overlay){
          background-color: transparent;
        }
        :deep(.v-field__outline){
          border: 1px solid #EAECF0 !important;
          border-radius: 4px;
        }
    }
</style>