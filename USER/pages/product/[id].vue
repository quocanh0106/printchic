<template>
  <div class="product-detail-all-screen-wrapper">
    <div class="product-detail-wrapper" v-show="pc || lgPc || extraPc">
      <div
        class="product-detail-head-block flex flex-col justify-between gap-y-10 custom-padding"
      >
        <div class="display-image flex gap-x-16">
          <VueGallery class="w-1/2" :photos="detail.data" />
          <div class="product-variant-and-infor w-1/2">
            <h1 class="section-title font-semibold product-name">
              {{ product.name }}
            </h1>
            <p class="product-sku mt-2">SKU: {{ product.sku }}</p>
            <div class="price-n-ship mt-6 flex items-center gap-x-2">
              <span class="price">${{ product.price }}</span>
              <span
                class="include-ship-tag bg-light-blue-custom"
                v-show="product.includeShipping"
                >{{ $t("productDetail.includeShipping") }}</span
              >
            </div>
            <p class="product-description mt-6">
              {{ product.description }}
            </p>
            <div class="product-option mt-8 flex flex-col gap-y-5">
              <span v-for="(item, index) in product.option" :key="index">
                <h1 class="text-black font-semibold leading-3">
                  {{ item.optionName }}
                </h1>
                <span class="option-variant flex gap-x-3">
                  <v-button
                    class="secondary-btn mt-4 txt-primary variant-button cursor-pointer"
                    v-for="(variant, ind) in item.optionVariant"
                    :key="ind"
                  >
                    {{ variant }}
                  </v-button>
                </span>
              </span>
            </div>
            <div class="action-button w-100 mt-8 flex flex-col">
              <v-button
                class="primary-btn w-100 text-center text-white cursor-pointer"
                >{{ $t("productDetail.downloadMockup") }}</v-button
              >
              <v-button
                class="secondary-btn w-100 text-center cursor-pointer mt-3"
                >{{ $t("productDetail.contactSupport") }}</v-button
              >
            </div>
          </div>
        </div>
        <div class="info-of-product flex gap-x-16 w-100">
          <div class="fabric-detail flex flex-col gap-y-5 w-1/2">
            <span class="custimize-option flex gap-x-4 justify-between">
              <h1 class="font-semibold text-lg">
                {{ $t("productDetail.customizeOption") }}
              </h1>
              <p>test</p>
            </span>
            <span class="custimize-option flex items-center gap-x-4 justify-between w-100">
              <h1 class="font-semibold text-lg w-30">
                {{ $t("productDetail.customizeOption") }}
              </h1>
              <span class="flex flex-col w-70">
                <v-layout class="flex justify-between">
                  <v-flex>Start Title</v-flex>
                  <v-flex class="text-right">End Title</v-flex>
                </v-layout>

                <!-- Slider component -->
                <v-slider    
                  class="slider-detail"  
                  v-model="slider1"
                ></v-slider>
              </span>
            </span>
            <span class="custimize-option flex gap-x-4 justify-between">
              <h1 class="font-semibold text-lg w-30">
                {{ $t("productDetail.customizeOption") }}
              </h1>
              <span class="flex flex-col w-70">
                <v-layout class="flex justify-between">
                  <v-flex>Start Title</v-flex>
                  <v-flex class="text-right">End Title</v-flex>
                </v-layout>

                <!-- Slider component -->
                <v-slider    
                  class="slider-detail"  
                  v-model="slider2"  
                ></v-slider>
              </span>
            </span>
            <span class="custimize-option flex gap-x-4 justify-between">
              <h1 class="font-semibold text-lg">
                {{ $t("productDetail.customizeOption") }}
              </h1>
              <p>test</p>
            </span>
          </div>
          <div class="shipping-handle-info w-1/2">
            <v-expansion-panels
              v-model="panel"
              v-for="(item, index) in listShippingInfo"
              :key="index"
            >
              <v-expansion-panel>
                <v-expansion-panel-title
                  class="accordition-title font-semibold text-lg"
                  expand-icon="mdi-plus"
                  collapse-icon="mdi-minus"
                >
                  {{ item.title }}
                </v-expansion-panel-title>
                <v-expansion-panel-text
                  class="text-lg font-normal section-content"
                >
                  {{ item.contentUS }}
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </div>
      </div>

      <!-- Tab -->
      <div class="tab-info-wrapper custom-padding">
        <div class="tab-wrapper bg-light-gray1-custom p-10 rounded-xl">
          <v-card>
            <v-tabs v-model="tab" bg-color="primary" class="tab-information">
              <v-tab value="one">Item One</v-tab>
              <v-tab value="two">Item Two</v-tab>
              <v-tab value="three">Item Three</v-tab>
            </v-tabs>

            <v-card-text>
              <v-window v-model="tab">
                <v-window-item value="one"> One </v-window-item>

                <v-window-item value="two"> Two </v-window-item>

                <v-window-item value="three"> Three </v-window-item>
              </v-window>
            </v-card-text>
          </v-card>
        </div>
      </div>
      <!-- Related Product -->
      <div class="related-product-wrapper bg-light-gray1-custom custom-padding">
        <div class="related-product-header flex justify-between">
          <h1 class="related-product-title section-title font-semibold">
            {{ $t("productDetail.relatedProduct") }}
          </h1>
          <a
            class="related-product-view-all txt-primary flex cursor-pointer items-center"
          >
            <p style="min-width: 50px">{{ $t("viewAll") }}</p>
            <img :src="arrowUpRight" />
          </a>
        </div>
        <swiperComponent :slidePerView="6" class="mt-12 mb-8" />
      </div>

      <!-- help -->
      <help
        :headerTitle="$t('homePage.howCanWeHelp')"
        :headerDesc="$t('homePage.howCanWeHelpDesc')"
        class="custom-padding"
      />
    </div>
    <div class="product-detail-wrapper" v-show="mobile || tablet">
      <div
        class="product-detail-head-block flex justify-between gap-x-16 flex-column"
      >
        <div class="display-image flex flex-col gap-y-10">
          <VueGallery :photos="photos" />
        </div>
        <div class="product-variant-and-infor p-5">
          <h1 class="section-title font-semibold product-name">
            {{ product.name }}
          </h1>
          <p class="product-sku mt-2">SKU: {{ product.sku }}</p>
          <div class="price-n-ship mt-6 flex items-center gap-x-2">
            <span class="price">${{ product.price }}</span>
            <span
              class="include-ship-tag bg-light-blue-custom"
              v-show="product.includeShipping"
              >{{ $t("productDetail.includeShipping") }}</span
            >
          </div>
          <p class="product-description mt-6">
            {{ product.description }}
          </p>
          <div class="product-option mt-8 flex flex-col gap-y-5">
            <span v-for="(item, index) in product.option" :key="index">
              <h1 class="text-black font-semibold leading-3">
                {{ item.optionName }}
              </h1>
              <span class="option-variant flex gap-x-3">
                <v-button
                  class="secondary-btn mt-4 txt-primary variant-button cursor-pointer"
                  v-for="(variant, ind) in item.optionVariant"
                  :key="ind"
                >
                  {{ variant }}
                </v-button>
              </span>
            </span>
          </div>
          <div class="action-button w-100 mt-8 flex flex-col mb-5">
            <v-button
              class="primary-btn w-100 text-center text-white cursor-pointer"
              >{{ $t("productDetail.downloadMockup") }}</v-button
            >
            <v-button
              class="secondary-btn w-100 text-center cursor-pointer mt-3"
              >{{ $t("productDetail.contactSupport") }}</v-button
            >
          </div>
          <img :src="productInfo" />
        </div>
      </div>

      <!-- Tab -->
      <div class="tab-info-wrapper">
        <div class="tab-wrapper bg-light-gray1-custom p-3">
          <v-card>
            <v-tabs v-model="tab" bg-color="primary" class="tab-information">
              <v-tab value="one">Item One</v-tab>
              <v-tab value="two">Item Two</v-tab>
              <v-tab value="three">Item Three</v-tab>
            </v-tabs>

            <v-card-text>
              <v-window v-model="tab">
                <v-window-item value="one"> One </v-window-item>

                <v-window-item value="two"> Two </v-window-item>

                <v-window-item value="three"> Three </v-window-item>
              </v-window>
            </v-card-text>
          </v-card>
        </div>
      </div>
      <!-- Related Product -->
      <div class="related-product-wrapper bg-light-gray1-custom px-3 pt-5">
        <div class="related-product-header flex justify-between">
          <h1 class="related-product-title section-title font-semibold">
            {{ $t("productDetail.relatedProduct") }}
          </h1>
          <a
            class="related-product-view-all txt-primary flex cursor-pointer items-center"
          >
            <p style="min-width: 50px">{{ $t("viewAll") }}</p>
            <img :src="arrowUpRight" />
          </a>
        </div>
        <swiperComponent :slidePerView="2" class="mt-12 mb-8" />
      </div>

      <!-- help -->
      <help
        :headerTitle="$t('homePage.howCanWeHelp')"
        :headerDesc="$t('homePage.howCanWeHelpDesc')"
      />
    </div>
  </div>
</template>

<script setup>
// Import the components and assets
import help from "../../components/help.vue";
import VueGallery from "../../components/vueGalery.vue";
import arrowUpRight from "../../assets/svg/arrowUpRight.svg";
import productInfo from "../../assets/svg/productInfo.svg";
import { myMixin } from "~/mixins/myMixin";
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const { screenWidth, mobile, tablet, pc, lgPc, extraPc } = useWidthScreen();
// Define your reactive data
const arrowUpRightIcon = arrowUpRight;
const productInfoIcon = productInfo;
const tab = ref(null);
const photos = ref([
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/20625/lordea-home-01-min.jpg",
  // Add all other photos...
]);
const product = ref({
  name: "Colorblast Heavyweight T-Shirt Comfort Colors 1745 (Made in US)",
  // Add other product details...
});
const listShippingInfo = ref( [
        {
          title: "Average Est. Processing Time",
          contentUS: "2-4 business days",
          contentUK: "2-4 business days",
          contentFR: "2-4 business days",
          contentDE: "2-4 business days",
        },
        {
          title: "Average Est. Shipping Time",
          contentUS: "US: 4-7 business days",
          contentUK: "US: 4-7 business days",
          contentFR: "US: 4-7 business days",
          contentDE: "US: 4-7 business days",
        },
        {
          title: "Template",
          contentUS: "12000 x 7300px",
          contentUK: "12000 x 7300px",
          contentFR: "12000 x 7300px",
          contentDE: "12000 x 7300px",
        },
      ],);
const panel = ref([0, 3]);
const slider1 = ref(0);
const slider2 = ref(0);
const router = useRoute();
// If you have methods, they can be defined as regular functions within setup
function someMethod() {
  // Your method logic...
}

const { data : detail }  = await useAsyncData(
  'productDetail',
  () => $fetch(`http://printchic-api.tvo-solution.net/auth/product/info?productId=${router.params.id}`)
)

console.log(detail.value.data,'hasd')

// Mixins usage needs to be adapted for the Composition API or integrated directly into the setup function
</script>

<style scoped lang="scss">
.tab-information {
  :deep(.v-slide-group__content) {
    background-color: transparent !important;
    color: #3372db !important;
  }
  :deep(.v-slide-group__container) {
    background-color: transparent !important;
  }
}
.tab-wrapper {
  :deep(.v-slide-group) {
    background-color: transparent !important;
  }
  :deep(.v-card) {
    background-color: transparent !important;
    box-shadow: none !important;
  }
}
.variant-button {
  padding: 12px 24px;
  min-width: 0px !important;
}
.include-ship-tag {
  padding: 4px 12px;
  border-radius: 100px;
}
.tab-info-wrapper {
  padding-top: 0px !important;
}
.shipping-handle-info {
  :deep(.v-expansion-panel-title__overlay) {
    background-color: white;
  }
  :deep(.v-expansion-panel__shadow) {
    box-shadow: none !important;
  }
}

.fabric-detail {
  border-radius: 8px;
  background-color: #f9fafb;
  padding: 32px;
}
.slider-detail{
  :deep(.v-slider-track__background){
    background-color: #D1E0FF;
  }
  :deep(.v-slider-thumb__surface){
    background-color: #709CE6;
  }
  :deep(.v-slider-track__fill){
    background-color: #D1E0FF;
  }
}
</style>
