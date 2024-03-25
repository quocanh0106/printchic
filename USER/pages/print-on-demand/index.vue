
<template>
  <div class="product-page-all-screen-wrapper">
    <div class="product-page-wrapper" v-show="pc || lgPc || extraPc">
      <div class="product-header pb-0 custom-padding" style="padding-top: 40px">
        <span> Home / {{ currentBreadCrumb }}</span>
        <div class="product-banner mt-6 rounded-lg text-start flex flex-col custom-padding">
          <h1 class="section-title font-semibold "> {{ $t('productList.mensClothing') }} </h1>
          <p class="mt-4">Check out PrintChic's awesome print-on-demand Men's Pajamas! We've got a huge range of cool Men's Pajamas with all-over prints in different sizes and colors, our service helps retailers broaden their product offerings and increase earnings seamlessly. Enjoy the perfect blend of style and comfort with our </p>
        </div>
        <div class="cloth-category">
          <swiperComponent @submit="filterByCategoryId" :onlyHasTitle="true" :hasDescription="true" :isCategory="true" :items="listCate" :slidePerView="6" :showNavigation="true" :showPagination="false" class="product-category mt-12" />
        </div>
      </div>
      <div class="product-grid-wrapper flex justify-between custom-padding">
        <div class="filter-sidebar mt-2">
          <h1 class="text-2xl font-semibold filter-by-title">{{ $t('productList.filter') }}</h1>
          <h1 class="text-2xl font-semibold">Category</h1>
          <div class="list-filter mt-8" v-for="(item, index) in listCate" :key="index">
            <input type="checkbox" :id="item._id" :value="item" v-model="filterBy" @click="filterByTag(item._id)">
            <label class="ml-1.5" :for="item">{{ locale == 'US' ?  item.titleUS : locale == 'UK' ? item.titleUK : locale == 'FR' ? item.titleDE : item.titleUS ?? '' }}</label>
              <!-- <v-checkbox :label="filterBy"></v-checkbox> -->
          </div>
        </div>
        <div class="product-list-wrapper w-100">
          <div class="sortbar flex justify-between">
            <span class="total-product-amount mt-2 txt-gray flex"> {{ $t('productList.showing') }} 
            <p class="ml-2"> {{listProduct?.length }} of {{ listProduct?.length }}</p> </span>
            <span class="sort-by-select flex gap-x-2">
              <p class="mt-2 txt-gray">{{ $t('productList.sortBy') }}:</p>
              <v-select :items="items" density="compact" :label="$t('productList.select')" class="sorter"></v-select>
            </span>
          </div>
          <div class="query-filter-tag flex flex-row items-center gap-x-2.5">
            <span v-for="item, index in filterBy" :key="index" class="tag-filter">{{ locale == 'US' ?  item.titleUS : locale == 'UK' ? item.titleUK : locale == 'FR' ? item.titleDE : item.titleUS ?? '' }}</span>
            <h1 class="txt-primary font-semibold cursor-pointer" v-if="filterBy.length > 0" @click="clearAllFilterBy()">{{
              $t('productList.clearAll') }}</h1>
          </div>
          <div class="right-block-wrapper mt-12">
            <div class="product-list mb-10">
              <div class="product-card cursor-pointer" @click="toProductDetail(item.id)" v-for="(item, index) in listProduct"
                :key="index">
                <img class="product-thumbnail" :src="item?.media?.[0]?.path" />
                <p class="mt-1 txt-dark-blue font-semibold">{{ item?.[`title${locale}`] }}</p>
                <p class="mt-2 txt-primary font-medium">$ {{ item?.price }}</p>
                <div class="sale-tag" v-if="item?.isSale">{{ $t('productList.saleTag') }}</div>
              </div>
              <p v-if="listProduct?.length == 0">{{ $t('productList.noProductFound') }}</p>
            </div>
            <div>
              <button class="secondary-btn cursor-pointer button-seemore" v-if="hasMoreProducts" @click="loadMoreData">{{ $t('button.seeMore') }}</button>
              <h1 class="text-center" v-else>{{  $t('productList.noMoreProduct') }}</h1>

              <div class="about-pjm mt-20 bg-light-gray-custom p-6 rounded-md">
                <h1 class="text-xl font-semibold">{{ $t('servicePage.aboutPjmTitle') }}</h1>
                <p class="mt-3" v-html="route.query.categoryProductId ? getPajamas :  $t('servicePage.aboutPjmContent')"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
       <!-- 15 pod ideas -->
       <div class="pod-idea bg-light-blue-custom custom-padding">
        <div class="idea-content " v-html="route.query.categoryProductId ? currentParagraph : t('productList.template')">
        </div>
      </div>
      <faq :data="listFaq" class="mt-12 custom-padding" />
      <!-- help -->
      <help :headerTitle="$t('homePage.howCanWeHelp')" :headerDesc="$t('homePage.howCanWeHelpDesc')" class="mt-20" />
    </div>
    <div class="product-page-wrapper" v-show="mobile || tablet">
      <div class="product-header px-3">
        <span> Home / Men</span>
        <div class="product-banner mt-6 rounded-lg text-start flex flex-col custom-padding">
          <h1 class="section-title font-semibold "> {{ $t('productList.mensClothing') }} </h1>
          <p class="mt-4">Check out PrintChic's awesome print-on-demand Men's Pajamas! We've got a huge range of cool Men's Pajamas with all-over prints in different sizes and colors, our service helps retailers broaden their product offerings and increase earnings seamlessly. Enjoy the perfect blend of style and comfort with our </p>
        </div>
        <div class="cloth-category">
          <SwiperCateComponent @submit="filterByCategoryId" :slidePerView="2" :items="listCate" :showNavigation="false" :hasDescription="true" :showPagination="true" class="swiper-category-mobile mt-12" />
        </div>
      </div>
  
      <div class="product-grid-wrapper px-3 flex justify-between">
        <!-- filter -->
  
  
        <!-- list product -->
        <!-- side bar filter -->
        <div class="product-list-wrapper w-100">
          <v-navigation-drawer v-model="drawer" temporary style="width: 80%">
            <v-list density="compact" nav class="pl-5">
              <div class="filter-sidebar mt-2">
                <h1 class="text-2xl font-semibold filter-by-title">{{ $t('productList.filter') }}</h1>
                <h1 class="text-2xl font-semibold">Category</h1>
                <div class="list-filter mt-8" v-for="(item, index) in listCate" :key="index">
                  <input type="checkbox" :id="item._id" :value="item" v-model="filterBy" @click="filterByTag(item._id)">
                  <label class="ml-1.5" :for="item">{{ locale == 'US' ?  item.titleUS : locale == 'UK' ? item.titleUK : locale == 'FR' ? item.titleDE : item.titleUS ?? '' }}</label>
                    <!-- <v-checkbox :label="filterBy"></v-checkbox> -->
                </div>
              </div>
            </v-list>
          </v-navigation-drawer>
  
          <!-- btn filter -->
          <div class="sortbar flex justify-between mt-2 txt-gray">
            <button color="outlined" @click.stop="drawer = !drawer">
              {{ $t('button.filter') }}
            </button>
            <span class="sort-by-select flex gap-x-2">
              <p class="mt-2 txt-gray">{{ $t('productList.sortBy') }}:</p>
              <v-select :items="items" density="compact" :label="$t('productList.select')" class="sorter"></v-select>
            </span>
          </div>
            <span class="total-product-amount txt-gray flex"> {{ $t('productList.showing') }} <p class="ml-2"> {{
              listProduct?.length }}</p> </span>
          <div class="query-filter-tag flex flex-row items-center gap-x-2.5 justify-center flex-wrap">
            <span v-for="item, index in filterBy" :key="index" class="tag-filter">{{ locale == 'US' ?  item.titleUS : locale == 'UK' ? item.titleUK : locale == 'FR' ? item.titleDE : item.titleUS ?? '' }}</span>
            <h1 class="txt-primary font-semibold cursor-pointer" v-if="filterBy.length > 0" @click="clearAllFilterBy()">{{
              $t('productList.clearAll') }}</h1>
          </div>
          <div class="right-block-wrapper mt-5">
            <div class="product-list-mobile mb-10">
              <div class="product-card cursor-pointer" @click="toProductDetail(item.id)" v-for="(item, index) in listProduct"
                :key="index">
                <img class="product-thumbnail" :src="item.media?.[0]?.path" />
                <p class="mt-1 txt-dark-blue font-semibold">{{ item[`title${currentLanguage}`] }}</p>
                <p class="mt-2 txt-primary font-medium">$ {{ item.price }}</p>
                <div class="sale-tag" v-if="item.isSale">{{ $t('productList.saleTag') }}</div>
              </div>
            </div>
            <div>
              <button class="secondary-btn cursor-pointer button-seemore-mobile" v-if="hasMoreProducts" @click="loadMoreData">{{ $t('button.seeMore') }}</button>
              <h1 class="text-center" v-else>{{  $t('productList.noMoreProduct') }}</h1>
              <div class="about-pjm mt-20 bg-light-gray-custom p-6 rounded-md">
                <h1 class="text-xl font-semibold">{{ $t('servicePage.aboutPjmTitle') }}</h1>
                <p class="mt-3" v-html="route.query.categoryProductId ? getPajamas :  $t('servicePage.aboutPjmContent')"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
       <!-- 15 pod ideas -->
      <div class="pod-idea mt-3 bg-light-blue-custom px-3 py-12">
        <div class="idea-content " v-html="route.query.categoryProductId ? currentParagraph : t('productList.template')">
        </div>
      </div>
      <faq class="mt-12" :data="listFaq" />
      <!-- help -->
      <help :headerTitle="$t('homePage.howCanWeHelp')" :headerDesc="$t('homePage.howCanWeHelpDesc')" class="px-3 mt-20 mb-10" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useFetch } from 'nuxt/app';
import SwiperCateComponent from './components/SwiperCateComponent.vue';
import help from '~/components/help.vue';
import useLanguage from '~/composables/useLanguage';
import { useI18n, useLocalePath } from '#imports'
import faq from "~/components/faq.vue";

// Replace the mixin with composable if necessary. 
// const { mixinMethod } = useMyMixin(); // Example usage if you need to replace myMixin with a composable.

const { currentLanguage, setLanguage } = useLanguage();
const router = useRouter();
const route = useRoute();
const { screenWidth, mobile, tablet, pc, lgPc, extraPc, isLoading } = useWidthScreen();
const { t, locale } = useI18n();

const localePath = useLocalePath()
const drawer = ref(null);
const items = ref(['Best Selling', 'Price Low To High', 'Price High To Low', 'Most Popular']);

const currentPage = ref(1);
const limit = ref(9);
const hasMoreProducts = ref(true);

const title= ref('hihi')
const filterByTag = async (newValue) => {
  router.push({
    name: route.name,
    query: { ...route.query, categoryProductId: newValue },
  });
}

const loadMoreData = async () => {
  currentPage.value++
  const response = await $fetch(`http://printchic-api.tvo-solution.net/auth/product/list?page=${currentPage.value}&limit=${limit.value}`)
  
  listProduct.value = [...listProduct.value,...response.data.items]
  if(response.data.items.length == 0){
    hasMoreProducts.value = false
  }
}

// SEO
const currentMetaTitle = ref('Print On Demand')
const currentMetaDescription = ref('Printchic')
const currentBreadCrumb = ref('')
watch(() => route.query.categoryProductId, async (newCategoryProductId) => {
  if (newCategoryProductId) {
    // Reset listCate when categoryProductId changes
    isLoading.value = true;
    listProduct.value = [];
    const data = await $fetch(`http://printchic-api.tvo-solution.net/auth/product/list?categoryProductId=${newCategoryProductId}`).finally(()=>{
      isLoading.value = false
    })
    listProduct.value = data?.data.items || [];
    console.log(listCate.value,'asdasd')
    listCate.value.map(category => {
      if(newCategoryProductId == category._id) {
        listFaq.value = category.faq ? JSON.parse(category.faq ?? '') : []
        if(locale.value == 'US'){
          currentMetaTitle.value = category.metaTitleUS ? category.metaTitleUS : 'Print On Demand'
          currentMetaDescription.value = category.metaDescriptionUS ? category.metaDescriptionUS : 'Print Chic'
          currentBreadCrumb.value = category.parentCategoryUS ? category.parentCategoryUS : ''
        } 
        if(locale.value == 'UK') {
          currentMetaTitle.value = category.metaTitleUK ?  category.metaTitleUK : category.metaTitleUS ?? 'Print On Demand'
          currentMetaDescription.value = category.metaDescriptionUK ? category.metaDescriptionUK : 'Print Chic'
          currentBreadCrumb.value = category.parentCategoryUK ? category.parentCategoryUK : ''

        }
        if(locale.value == 'FR'){
          currentMetaTitle.value = category.metaTitleFR ?  category.metaTitleFR : category.metaTitleUS ?? 'Print On Demand'
          currentMetaDescription.value = category.metaDescriptionFR ? category.metaDescriptionFR : 'Print Chic'
          currentBreadCrumb.value = category.parentCategoryFR ? category.parentCategoryFR : ''

        } 
        if(locale.value == 'DE'){
          currentMetaTitle.value = category.metaTitleDE ? category.metaTitleDE : category.metaTitleUS ?? 'Print On Demand'
          currentMetaDescription.value = category.metaDescriptionDE ? category.metaDescriptionDE: 'Print Chic'
          currentBreadCrumb.value = category.parentCategoryDE ? category.parentCategoryDE : ''

        } 
      }
    })
  }
});

const listFaq = ref([])
const listProduct  = await useAsyncData(
  `listProduct-${new Date().getTime()}`,
  async () => {
    const response = await $fetch(`http://printchic-api.tvo-solution.net/auth/product/list?page=${currentPage.value}&limit=${limit.value}`)
    return response.data.items
  }
  )?.data

const listCate  = await useAsyncData(
  `listCategories-${new Date().getTime()}`,
  async () => {
    const response = await $fetch('http://printchic-api.tvo-solution.net/auth/categoryProduct/list')
    return response.data.items
  }
  )?.data

const listFilter = ref([]);

const filterBy = ref([]);

const clearAllFilterBy = async () => {
  filterBy.value = [];
  router.push({
    name: route.name,
    query: {  },
  });
  const response = await $fetch(`http://printchic-api.tvo-solution.net/auth/product/list?page=${currentPage.value}&limit=${limit.value}`)
  listProduct.value = [...response.data.items]
}

function toProductDetail(id) {
  router.push(localePath(`/print-on-demand/${id}`));
}

function loadMoreItem() {
  // Implement load more functionality
}

function filterByCategoryId(newValue) {
  router.push({
    name: route.name,
    query: { ...route.query, categoryProductId: newValue },
  });
}

const currentParagraph = ref(null)
const getPajamas = computed(() => {
  let currentCategory
  if(route.query.categoryProductId && listCate.value){
    listCate.value?.forEach(element => {
      if(route.query.categoryProductId == element._id){
        currentCategory = element
      }
    });
  }
  if(locale.value == 'US'){
    currentParagraph.value = currentCategory?.paragraphUS ?? ''
    return currentCategory?.pajamasUS ?? ''
  } 
  if(locale.value == 'UK') {
    currentParagraph.value = currentCategory?.paragraphUK ?? ''
    return currentCategory?.pajamasUK  ?? ''
  }
  if(locale.value == 'FR'){
    currentParagraph.value = currentCategory?.paragraphFR ?? ''
    return currentCategory?.pajamasFR ?? ''
  } 
  if(locale.value == 'DE'){
    currentParagraph.value = currentCategory?.paragraphDE ?? ''
    return currentCategory?.pajamasDE  ?? ''
  } 
})

// SEO
useHead({
  title: currentMetaTitle,
  meta: [
    { name: 'description', content: currentMetaDescription }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [ { innerHTML: 'console.log(\'Hello world\')' } ]
})

useSeoMeta({
  title: currentMetaTitle,
  ogTitle: 'Printchic',
  description: currentMetaDescription,
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>

<style lang="scss" scoped>
.product-banner {
  background-color: #F2F4F7;
  padding: 32px 32px;
  max-height: 307px;
}

.product-banner-mobile {
  background-color: #F2F4F7;
  padding: 60px 15vw;
  max-height: 307px;
}

.filter-sidebar {
  width: 100%;
  max-width: 400px;
}

.product-list {
  width: 70%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;

  /* Optional: space between items */
  .product-card {
    width: 20vw;
    position: relative;

    img {
      border-radius: 4px;
      height: 20vw;
      width: 40vh;
    }
  }

  .sale-tag {
    position: absolute;
    z-index: 2;
    top: 10px;
    left: 10px;
    color: white;
    text-transform: uppercase;
    background-color: #16B16D;
    border-radius: 4px;
    padding: 4px 8px;
  }
}

.product-list-mobile {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;

  /* Optional: space between items */
  .product-card {
    width: 100%;
    position: relative;

    img {
      border-radius: 4px;
      width: 100%;
    }
  }

  .sale-tag {
    position: absolute;
    z-index: 2;
    top: 10px;
    left: 10px;
    color: white;
    text-transform: uppercase;
    background-color: #16B16D;
    border-radius: 4px;
    padding: 4px 8px;
  }
}

.sorter {
  min-width: 120px;
  max-width: 120px;

  :deep(.v-field__overlay) {
    background-color: transparent;
  }
}

.button-seemore {
  margin-left: 50%;
}

.button-seemore-mobile {
  margin-left: 35%;
  @media screen and (min-width:700px){
    margin-left: 40%;
  }
}

.tag-filter {
  background-color: #F9FAFB;
  border-radius: 4px;
  padding: 6px 12px;
}
.border-bottom-gray {
  border-bottom: gray 1px solid;
}
.product-thumbnail{
  min-height : 25vh;
  min-width: 15vw;
  max-height: 40vw;
  object-fit: cover;
}

.product-category{
  :deep(h1){
    margin-right:0px;
  }
  :deep(p){
    margin-right:0px;
  }
  :deep(.swiper-thumbnail){
      min-width:0px !important;
      width: 15vw !important;
      height: 15vw !important;
      object-fit:cover;
      max-height: none !important;
  }
  :deep(.swiper-wrapper){
    padding-bottom: 0px;
  }
}

.swiper-category-mobile{

}
.idea-content{
    background-color: white;
    height: 352px;
    overflow-y: scroll;
    border-radius: 4px;
    padding: 40px;
    scrollbar-width: thin; /* "auto" or "thin" */
    scrollbar-color: #D1E0FF white; /* thumb and track color */

}
</style>