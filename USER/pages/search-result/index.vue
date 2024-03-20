<template>
  <div class="search-result-wrapper flex flex-col items-center justify-center custom-padding-search">
    <div class="product-list">
        <div v-if="loading" class="product-card cursor-pointer" v-for="item,index in 9" :key="index">
          <v-skeleton-loader class="w-100" :elevation="3" type="card"></v-skeleton-loader>
        </div>

      <div class="product-card cursor-pointer" @click="toProductDetail(item)" v-for="(item, index) in data"
          :key="index">
          <img class="product-thumbnail" :src="item.media?.[0]?.path" />
          <div class="product-infor flex flex-col ml-2">
            <p class="mt-1 txt-dark-blue font-semibold">{{ locale.value == 'US' ? item.titleUS : locale.value == 'US' ? item.titleUK : locale.value == 'FR' ? item.titleFR : item.titleDE }}</p>
            <p class="mt-2 txt-primary font-semibold ">$ {{ item.price }}</p>
            <div class="sale-tag" v-if="item.isSale">{{ $t('productList.saleTag') }}</div>
          </div>
      </div>
      <div class="w-max" v-if="data?.length == 0 && !loading">
        {{ $t('notFound',{keyWord:route.query.search}) }}
      </div>
      </div>
      <button class="w-100 mt-8 button-see-more" v-if="filterResult.length > 9">{{ $t('button.seeMoreWithItemCount', {count: filterResult.length}) }}</button>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useFetch } from '#app'
import { useI18n, useLocalePath } from '#imports'

const router = useRouter()
const route = useRoute()
const filterResult = ref([])
const { locale } = useI18n();
const localePath = useLocalePath()

function toProductDetail(item) {
  router.push(localePath(`/print-on-demand/${item._id}`))
}

const loading = ref(true)
const data = ref(null)


watch(() => route.query.search, async (newSearch) => {
  if (newSearch) {
    // Reset listCate when categoryProductId changes
    data.value = [];
    loading.value = true;
    try {
      const response = await $fetch(`http://printchic-api.tvo-solution.net/auth/product/list?search=${route.query.search}`); // Replace with your API endpoint
      data.value = await response.data.items;
    } finally {
      loading.value = false;
    }
  }
});

const fetchData = async () => {
  try {
    const response = await $fetch(`http://printchic-api.tvo-solution.net/auth/product/list?search=${route.query.search}`); // Replace with your API endpoint
    data.value = await response.data.items;
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchData()
})


</script>

<style scoped lang="scss">
.product-list {
  width: 100%;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-gap: 25px;
  row-gap:32px;
  .product-card {
    width: 100%;
    position: relative;
    display:flex;
    img {
      border-radius: 4px;
      height: 10vw;
      width: 10vw;
      @media screen and (max-width:992px){
        min-height:104px;
        min-width:102px;
      }
    }
    @media screen and (max-width:992px){
      width: 100%;
    }
  }
  @media screen and (max-width:992px){
    grid-template-columns: auto;
  }
}
.custom-padding-search{
  padding: 80px 15vw;
  @media screen and (max-width:992px){
    padding: 24px 5vw;
  }
}
.button-see-more{
  background-color: #F9FAFB;
  box-shadow: none !important;
  height: 42px;
}
</style>