
<template>
  <div class="product-page-all-screen-wrapper">
    <div class="product-page-wrapper custom-padding" v-show="pc || lgPc || extraPc">
      <div class="product-header">
        <div class="product-banner rounded-lg text-center flex flex-col">
          <h1 class="section-title font-semibold"> {{ $t('productList.mensClothing') }} </h1>
          <span> Home / Men</span>
        </div>
        <div class="cloth-category">
          <swiperComponent :hasDescription="true" :items="listCate" :slidePerView="6" :showNavigation="true" :showPagination="false" class="product-category mt-12" />
        </div>
      </div>
      <div class="product-grid-wrapper flex justify-between">
        <div class="filter-sidebar mt-2">
          <h1 class="text-2xl font-semibold filter-by-title">{{ $t('productList.filter') }}</h1>
          <div class="list-filter mt-8" v-for="(item, index) in listFilter" :key="index">
            <h1 class="text-2xl font-semibold">{{ item.filterBy }}</h1>
            <div class="filter-by mt-3" v-for="(itemfilterBy, index) in item.listFilter" :key="index">
              <input type="checkbox" :id="itemfilterBy" :value="itemfilterBy" v-model="filterBy">
              <label class="ml-1.5" :for="itemfilterBy">{{ itemfilterBy }}</label>
              <!-- <v-checkbox :label="filterBy"></v-checkbox> -->
            </div>
          </div>
        </div>
        <div class="product-list-wrapper">
          <div class="sortbar flex justify-between">
            <span class="total-product-amount mt-2 txt-gray flex"> {{ $t('productList.showing') }} <p class="ml-2"> {{
              listProduct?.length }}</p> </span>
            <span class="sort-by-select flex gap-x-2">
              <p class="mt-2 txt-gray">{{ $t('productList.sortBy') }}:</p>
              <v-select :items="items" density="compact" :label="$t('productList.select')" class="sorter"></v-select>
            </span>
          </div>
          <div class="query-filter-tag flex flex-row items-center gap-x-2.5">
            <span v-for="item, index in filterBy" :key="index" class="tag-filter">{{ item }}</span>
            <h1 class="txt-primary font-semibold cursor-pointer" v-if="filterBy.length > 0" @click="clearAllFilterBy()">{{
              $t('productList.clearAll') }}</h1>
          </div>
          <div class="right-block-wrapper mt-12">
            <div class="product-list mb-10">
              <div class="product-card cursor-pointer" @click="toProductDetail(item._id)" v-for="(item, index) in listProduct"
                :key="index">
                <img class="product-thumbnail" :src="item?.media[0]?.path" />
                <p class="mt-3 txt-gray font-medium">SKU: {{ item?.variants[0]?.sku }}</p>
                <p class="mt-1 txt-dark-blue font-semibold">{{ item?.[`title${currentLanguage}`] }}</p>
                <p class="mt-2 txt-primary font-medium">$ {{ item?.price }}</p>
                <div class="sale-tag" v-if="item?.isSale">{{ $t('productList.saleTag') }}</div>
              </div>
            </div>
            <div>
              <v-button class="secondary-btn cursor-pointer button-seemore">{{ $t('button.seeMore') }}</v-button>
              <div class="about-pjm mt-20 bg-light-gray-custom p-6 rounded-md">
                <h1 class="text-xl font-semibold">{{ $t('servicePage.aboutPjmTitle') }}</h1>
                <p class="mt-3">{{ $t('servicePage.aboutPjmContent') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- help -->
      <help :headerTitle="$t('homePage.howCanWeHelp')" :headerDesc="$t('homePage.howCanWeHelpDesc')" class="mt-20" />
    </div>
    <div class="product-page-wrapper px-3" v-show="mobile || tablet">
      <div class="product-header">
        <div class="product-banner-mobile rounded-lg text-center flex flex-col">
          <h1 class="section-title font-semibold"> {{ $t('productList.mensClothing') }} </h1>
          <span> Home / Men</span>
        </div>
        <div class="cloth-category">
          <SwiperCateComponent :slidePerView="2" :items="listCate" :showNavigation="false" :hasDescription="true" :showPagination="true" class="mt-12" />
        </div>
      </div>
  
      <div class="product-grid-wrapper flex justify-between">
        <!-- filter -->
  
  
        <!-- list product -->
        <!-- side bar filter -->
        <div class="product-list-wrapper">
          <v-navigation-drawer v-model="drawer" temporary style="width: 80%">
            <v-list density="compact" nav class="pl-5">
              <div class="filter-sidebar mt-2">
                <h1 class="text-2xl font-semibold filter-by-title">{{ $t('productList.filter') }}</h1>
                <div class="list-filter mt-8" v-for="(item, index) in listFilter" :key="index">
                  <h3 class="text-xl font-semibold border-bottom-gray">{{ item.filterBy }}</h3>
                  <div class="filter-by mt-3" v-for="(itemfilterBy, index) in item.listFilter" :key="index">
                    <input type="checkbox" :id="itemfilterBy" :value="itemfilterBy" v-model="filterBy">
                    <label class="ml-1.5" :for="itemfilterBy">{{ itemfilterBy }}</label>
                  </div>
                </div>  
              </div>
            </v-list>
          </v-navigation-drawer>
  
          <!-- btn filter -->
          <div class="sortbar flex justify-between mt-2 txt-gray">
            <v-btn color="outlined" @click.stop="drawer = !drawer">
              {{ $t('button.filter') }}
            </v-btn>
            <span class="sort-by-select flex gap-x-2">
              <p class="mt-2 txt-gray">{{ $t('productList.sortBy') }}:</p>
              <v-select :items="items" density="compact" :label="$t('productList.select')" class="sorter"></v-select>
            </span>
          </div>
            <span class="total-product-amount txt-gray flex"> {{ $t('productList.showing') }} <p class="ml-2"> {{
              listProduct?.length }}</p> </span>
          <div class="query-filter-tag flex flex-row items-center gap-x-2.5 justify-center flex-wrap">
            <span v-for="item, index in filterBy" :key="index" class="tag-filter">{{ item }}</span>
            <h1 class="txt-primary font-semibold cursor-pointer" v-if="filterBy.length > 0" @click="clearAllFilterBy()">{{
              $t('productList.clearAll') }}</h1>
          </div>
          <div class="right-block-wrapper mt-5">
            <div class="product-list-mobile mb-10">
              <div class="product-card cursor-pointer" @click="toProductDetail(item._id)" v-for="(item, index) in listProduct"
                :key="index">
                <img class="product-thumbnail" :src="item.media[0]?.path" />
                <p class="mt-3 txt-gray font-medium">SKU: {{ item.variants[0]?.sku }}</p>
                <p class="mt-1 txt-dark-blue font-semibold">{{ item[`title${currentLanguage}`] }}</p>
                <p class="mt-2 txt-primary font-medium">$ {{ item.price }}</p>
                <div class="sale-tag" v-if="item.isSale">{{ $t('productList.saleTag') }}</div>
              </div>
            </div>
            <div>
              <v-button class="secondary-btn cursor-pointer button-seemore-mobile">{{ $t('button.seeMore') }}</v-button>
              <div class="about-pjm mt-20 bg-light-gray-custom p-6 rounded-md">
                <h1 class="text-xl font-semibold">{{ $t('servicePage.aboutPjmTitle') }}</h1>
                <p class="mt-3">{{ $t('servicePage.aboutPjmContent') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- help -->
      <help :headerTitle="$t('homePage.howCanWeHelp')" :headerDesc="$t('homePage.howCanWeHelpDesc')" class="mt-20" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFetch } from 'nuxt/app';
import SwiperCateComponent from './components/SwiperCateComponent.vue';
import help from '~/components/help.vue';
import useLanguage from '~/composables/useLanguage';
import { useI18n, useLocalePath } from '#imports'

// Replace the mixin with composable if necessary. 
// const { mixinMethod } = useMyMixin(); // Example usage if you need to replace myMixin with a composable.

const { currentLanguage, setLanguage } = useLanguage();
const router = useRouter();
const { screenWidth, mobile, tablet, pc, lgPc, extraPc } = useWidthScreen();

const localePath = useLocalePath()
const drawer = ref(null);
const items = ref(['Best Selling', 'Price Low To High', 'Price High To Low', 'Most Popular']);
const currentPage = ref(1);
const listFilter = ref([
  {
    filterBy: 'Categories',
    listFilter: ['Apparel', 'Gift & Accessories', 'Home & Decorations', 'All Over Print', 'Canvas & Poster', 'Shoes', 'US 2D Printing']
  },
  {
    filterBy: 'Print Area',
    listFilter: ['Back side', 'All-over Print', 'Front side', 'Sleeve left', 'Sleeve right']
  },
  {
    filterBy: 'Techniques',
    listFilter: ['UV Digital Printing', 'Vinyl Heat Transfer', 'Digital Cylinder Printing', 'Laser Cut', 'Embroidery', 'Digital Printing (DTG)', 'Dye Sublimation']
  },
]);

const listProduct  = await useAsyncData(
  'listProduct',
  async () => {
    const response = await $fetch('http://printchic-api.tvo-solution.net/auth/product/list')
    return response.data.items
  }
)?.data
console.log('listProduct',listProduct.value)
const listCate  = await useAsyncData(
  'listCategory',
  async () => {
    const response = await $fetch('http://printchic-api.tvo-solution.net/auth/categoryProduct/list')
    return response.data.items
  }
)?.data
const filterBy = ref([]);

function clearAllFilterBy() {
  filterBy.value = [];
}

function toProductDetail(id) {
  router.push(localePath(`/product/${id}`));
}

function loadMoreItem() {
  // Implement load more functionality
}

</script>

<style lang="scss" scoped>
.product-banner {
  background-color: #F2F4F7;
  padding: 115px 15vw;
  height: 307px;
  max-height: 307px;
}

.product-banner-mobile {
  background-color: #F2F4F7;
  padding: 60px 15vw;
  max-height: 307px;
}

.filter-sidebar {
  width: 100%;
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
}
</style>