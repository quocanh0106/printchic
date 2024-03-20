<template>
  <div class="product-detail-all-screen-wrapper">
    <div class="product-detail-wrapper" v-show="pc || lgPc || extraPc">
      <div
        class="product-detail-head-block flex flex-col justify-between gap-y-10 custom-padding"
      >
        <div class="display-image flex gap-x-16">
          <VueGallery class="w-1/2" :photos="detail?.data" />
          <div class="product-variant-and-infor w-1/2">
            <h1 class="section-title font-semibold product-name">
              {{
                locale == "US"
                  ? detail?.data?.titleUS
                  : locale == "UK"
                  ? detail?.data?.titleUK
                  : locale == "FR"
                  ? detail?.data?.titleFR
                  : detail?.data?.titleDE
              }}
            </h1>
            <p class="product-sku mt-2">
              SKU: {{ detail.data.variants?.[0].sku }}
            </p>
            <div class="price-n-ship mt-6 flex items-center gap-x-2">
              <span class="price">${{ getPriceByVariant }}</span>
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
                <span v-for="(item, index) in listNameOption" :key="index">
                  <h1 class="font-semibold leading-3">
                    {{ item.value }}
                  </h1>
                  <div class="product-option mt-8 flex flex gap-x-3">
                    <span :class="filterVariantBasedOnOption(item.optionNumber)[_ind].isActive ? 'active-name-option' : ''" class="name-option cursor-pointer" v-for="(variant, _ind) in filterVariantBasedOnOption(item.optionNumber)" :key="_ind" @click="changeActiveVariant(index,variant,_ind)">
                      <h1 class="font-semibold leading-3">
                        {{ variant.value }}
                      </h1>
                    </span>
                </div>
                </span>
            </div>
           
            <div class="action-button w-100 mt-8 flex flex-col">
              <a
                :href="detail.data.btnLink"
                target="_blank"
                class="primary-btn w-100 text-center text-white cursor-pointer"
                >{{ $t("productDetail.downloadMockup") }}</a
              >
              <a
                href="/contact-us"
                target="_blank"
                class="secondary-btn w-100 text-center cursor-pointer mt-3"
                >{{ $t("productDetail.contactSupport") }}</a
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
              <p>{{ detail.data.customizationOptions }}</p>
            </span>
            <span
              class="custimize-option flex items-center gap-x-4 justify-between w-100"
            >
              <h1 class="font-semibold text-lg w-30">
                {{ $t("productDetail.details") }}
              </h1>
              <p>{{ detail.data.featureProduct }}</p>
            </span>
            <span class="custimize-option flex gap-x-4 justify-between">
              <h1 class="font-semibold text-lg w-30">
                {{ $t("productDetail.materials") }}
              </h1>
              <div class="flex flex-col w-100">
                <span class="flex flex-col">
                  <v-row class="flex justify-between">
                    <v-col>{{ detail.data.minName_2 }}</v-col>
                    <v-col class="text-right">{{
                      detail.data.maxName_2
                    }}</v-col>
                  </v-row>
  
                  <!-- Slider component -->
                  <v-slider
                    class="slider-detail"
                    v-model="detail.data.valueMaterial_2"
                    disabled
                  ></v-slider>
                </span>
                <span class="flex flex-col">
                  <v-row class="flex justify-between">
                    <v-col>{{ detail.data.minName_1 }}</v-col>
                    <v-col class="text-right">{{
                      detail.data.maxName_1
                    }}</v-col>
                  </v-row>
  
                  <!-- Slider component -->
                  <v-slider
                    class="slider-detail"
                    v-model="detail.data.valueMaterial_1"
                    disabled
                  ></v-slider>
                </span>
              </div>
            </span>
            <span class="custimize-option flex gap-x-4 justify-between">
              <h1 class="font-semibold text-lg">
                {{ $t("productDetail.features") }}
              </h1>
              <p v-html="detail.data.featureProduct"></p>
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
              <v-tab value="one">{{$t("productDetail.productDetail")}}</v-tab>
              <v-tab value="two">{{$t("productDetail.sizeGuide")}}</v-tab>
              <v-tab value="three">{{$t("productDetail.mockUpNTemplate")}}</v-tab>
              <v-tab value="four">{{$t("productDetail.careInstruction")}}</v-tab>
            </v-tabs>

            <v-card-text>
              <v-window v-model="tab">
                <v-window-item value="one" v-html="contentOne"></v-window-item>

                <v-window-item value="two"  v-html="contentTwo"></v-window-item>

                <v-window-item value="three"  v-html="contentThree"
                ></v-window-item>
                <v-window-item value="four" v-html="contentFour"></v-window-item>
              </v-window>
            </v-card-text>
          </v-card>
        </div>
      </div>
      <!-- Description -->
      <div
        class="description-wrapper custom-padding"
        v-html="localizedDescription"
      ></div>
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
        <swiperComponent :hasDescription="true" :items="listProductRelatedMedia" :slidePerView="6" class="mt-12 related-product mb-8" />
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
          <VueGallery :photos="detail.data" />
        </div>
        <div class="product-variant-and-infor p-5">
          <h1 class="section-title font-semibold product-name">
            {{
              locale == "US"
                ? detail?.data.titleUS
                : locale == "UK"
                ? detail?.data.titleUK
                : locale == "FR"
                ? detail?.data.titleFR
                : detail?.data.titleDE
            }}
          </h1>
          <p class="product-sku mt-2">
            SKU: {{ detail.data.variants?.[0].sku }}
          </p>
          <div class="price-n-ship mt-6 flex items-center gap-x-2">
            <span class="price">${{ getPriceByVariant }}</span>
            <span
              class="include-ship-tag bg-light-blue-custom"
              v-show="product.includeShipping"
              >{{ $t("productDetail.includeShipping") }}</span
            >
          </div>
          <div
            class="product-description mt-6"
            v-html="localizedDescription"
          ></div>
          <div class="product-option mt-8 flex flex-col gap-y-5">
            <span v-for="(item, index) in listNameOption" :key="index">
                  <h1 class="font-semibold leading-3">
                    {{ item.value }}
                  </h1>
                  <div class="product-option mt-3 flex gap-x-3">
                    <span :class="filterVariantBasedOnOption(item.optionNumber)[_ind].isActive ? 'active-name-option' : ''" class="name-option cursor-pointer" v-for="(variant, _ind) in filterVariantBasedOnOption(item.optionNumber)" :key="_ind" @click="changeActiveVariant(index,variant,_ind)">
                      <h1 class="font-semibold leading-3">
                        {{ variant.value }}
                      </h1>
                    </span>
                </div>
                </span>
            </div>
          <div class="action-button w-100 mt-8 flex flex-col mb-5">
            <a
                :href="detail.data.btnLink"
                target="_blank"
                class="primary-btn w-100 text-center text-white cursor-pointer"
                >{{ $t("productDetail.downloadMockup") }}</a
              >
              <a
                href="/contact-us"
                target="_blank"
                class="secondary-btn w-100 text-center cursor-pointer mt-3"
                >{{ $t("productDetail.contactSupport") }}</a
              >
          </div>
          <!--  detail slider -->
          <div class="info-of-product flex flex-col gap-y-10 w-100">
            <div class="shipping-handle-info w-100">
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
            <div class="fabric-detail flex flex-col gap-y-5 w-100">
              <span class="custimize-option flex flex-col justify-between">
                <h1 class="font-semibold text-lg">
                  {{ $t("productDetail.customizeOption") }}
                </h1>
                <p>{{ detail.data.customizationOptions }}</p>
              </span>
              <span
                class="custimize-option flex flex-col w-100"
              >
                <h1 class="font-semibold text-lg w-30">
                  {{ $t("productDetail.details") }}
                </h1>
                <p>{{ detail.data.detailProduct }}</p>
              </span>
              <span class="custimize-option flex flex-col">
                <h1 class="font-semibold text-lg">
                  {{ $t("productDetail.materials") }}
                </h1>
                <div class="flex flex-col">
                  <span class="flex flex-col">
                    <v-row class="flex justify-between">
                      <v-col>{{ detail.data.minName_2 }}</v-col>
                      <v-col class="text-right">{{
                        detail.data.maxName_2
                      }}</v-col>
                    </v-row>
  
                    <!-- Slider component -->
                    <v-slider
                      class="slider-detail"
                      v-model="detail.data.valueMaterial_2"
                      disabled
                    ></v-slider>
                  </span>
                  <span class="flex flex-col">
                    <v-row class="flex justify-between">
                      <v-col>{{ detail.data.minName_1 }}</v-col>
                      <v-col class="text-right">{{
                        detail.data.maxName_1
                      }}</v-col>
                    </v-row>
  
                    <!-- Slider component -->
                    <v-slider
                      class="slider-detail"
                      v-model="detail.data.valueMaterial_1"
                      disabled
                    ></v-slider>
                  </span>
                </div>
              </span>
              <span class="custimize-option flex flex-col">
                <h1 class="font-semibold text-lg">
                  {{ $t("productDetail.features") }}
                </h1>
                <p v-html="detail.data.featureProduct"></p>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab -->
      <div class="tab-info-wrapper">
        <div class="tab-wrapper bg-light-gray1-custom p-3">
          <v-card>
            <v-tabs v-model="tab" bg-color="primary" @click="tabValue" class="tab-information">
              <v-tab value="one">{{$t("productDetail.productDetail")}}</v-tab>
              <v-tab value="two">{{$t("productDetail.sizeGuide")}}</v-tab>
              <v-tab value="three">{{$t("productDetail.mockUpNTemplate")}}</v-tab>
              <v-tab value="four">{{$t("productDetail.careInstruction")}}</v-tab>
            </v-tabs>

            <v-card-text>
              <v-window v-model="tab">
                <v-window-item value="one" v-html="contentOne"></v-window-item>

                <v-window-item value="two"  v-html="contentTwo"></v-window-item>

                <v-window-item value="three"  v-html="contentThree"
                ></v-window-item>
                <v-window-item value="four" v-html="contentFour"></v-window-item>
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
import SwiperComponent from '~/components/swiperComponent.vue'
import VueGallery from "../../components/vueGalery.vue";
// asset
import arrowUpRight from "../../assets/svg/arrowUpRight.svg";
import productInfo from "../../assets/svg/productInfo.svg";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const { screenWidth, mobile, tablet, pc, lgPc, extraPc } = useWidthScreen();
// Define your reactive data
const arrowUpRightIcon = arrowUpRight;
const productInfoIcon = productInfo;
const tab = ref('one');

const tabValue = () => {
  console.log(tab.value, "TAB");
}
const photos = ref([
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/20625/lordea-home-01-min.jpg",
  // Add all other photos...
]);
const { t, locale } = useI18n();
const product = ref({
  name: "Colorblast Heavyweight T-Shirt Comfort Colors 1745 (Made in US)",
  // Add other product details...
});

const listShippingInfo = ref([
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
]);
const panel = ref([0, 3]);
const slider1 = ref(0);
const slider2 = ref(0);
const router = useRoute();

// If you have methods, they can be defined as regular functions within setup

const localizedDescription = computed(() => {
  let description = "";
  switch (locale.value) {
    case "US":
      description = detail?.value.data.descriptionUS;
      break;
    case "UK":
      description = detail?.value.data.descriptionUK;
      break;
    case "FR":
      description = detail?.value.data.descriptionFR;
      break;
    case "DE":
      description = detail?.value.data.descriptionDE;
      break;
  }

  // Strip the quotation marks if present
  if (description.startsWith('"') && description.endsWith('"')) {
    return description.substring(1, description.length - 1);
  }
  return description;
});

const currentActiveNameOption = ref(0)
const changeActiveNameOption = (ind,item) => {
  currentActiveNameOption.value = ind
}

const currentActiveVariant1= ref(0)
const currentActiveVariant2= ref(0)
const currentActiveVariant3= ref(0)
const changeActiveVariant = (ind,item,variantInd) => {
  
  // Update the active variant based on the index
  switch(ind) {
    case 0:
      currentActiveVariant1.value = item.value;
      break;
    case 1:
      currentActiveVariant2.value = item.value;
      break;
    case 2:
      currentActiveVariant3.value = item.value;
      break;
    default:
      console.error('Invalid index for active variant');
  }

  // Update the isActive status for the variants
  combinedVariants.value.forEach(variant => {
    if (variant.variantInd === item.variantInd) {
      variant.isActive = variant.value === item.value;
    }
  });
}

const listNameOption = computed(()=>{
  let listNameOption = []
  if(detail?.value.data.variants?.[0].nameOption_1){
    listNameOption.push({optionNumber: 1,value: detail?.value.data.variants[0].nameOption_1})
  }

  if(detail?.value.data.variants?.[0].nameOption_2){
    listNameOption.push({optionNumber: 2, value: detail?.value.data.variants[0].nameOption_2})
  }

  if(detail?.value.data.variants?.[0].nameOption_3){
    listNameOption.push({optionNumber: 3, value:detail?.value.data.variants[0].nameOption_3})
  }
  return listNameOption
})

const { data: detail } = await useAsyncData("productDetail", () =>
$fetch(
  `http://printchic-api.tvo-solution.net/auth/product/info?productId=${router.params.id}`
  )
);

const listProduct  = await useAsyncData(
  'listProduct',
  async () => {
    const response = await $fetch(`http://printchic-api.tvo-solution.net/auth/product/list?categoryProductId=${detail.value?.data.categoryProduct?.[0]}`)
    return response?.data?.items
  }
)?.data


const listProductRelatedMedia = ref([])
const listProductRelated = () => {
  listProduct.value?.forEach(item => listProductRelatedMedia.value.push({
    bannerImg : item?.media?.[0]?.path,
    titleUS: item?.titleUS,
    titleUK: item?.titleUK,
    titleFR: item?.titleFR,
    titleDE: item?.titleDE,
  }))
}

const combinedVariants = ref([]);
const variantProperties = detail.value?.data?.variants.map((product,ind) => {
  for (const key in product) {
    if (key.includes('nameVariant_')) {
      combinedVariants.value.push({
        variantInd: key.split('_')[1],
        value: product[key],
        isActive: false
      },
        );
      }
    }
});

 const uniqueCombinedVariants = ref([]);
 
 const filterVariantBasedOnOption = (ind) => {
  let listData = []
  combinedVariants.value.forEach(item => {
    if(ind == item.variantInd){
      listData.push(item)
    } 
  })
  return [...new Map(listData.map(item => [item['value'], item])).values()];
}
// Mixins usage needs to be adapted for the Composition API or integrated directly into the setup function
const initializeVariant = () => {
  let tempList =  [...new Map(combinedVariants.value.map(item => [item['value'], item])).values()];
  tempList.sort((a, b) => parseInt(a.variantInd) - parseInt(b.variantInd));
  tempList.map(option => {
    if(option.variantInd == 1 && currentActiveVariant1.value == 0 ){
      currentActiveVariant1.value = option.value
      option.isActive = true
    }
    if(option.variantInd == 2 && currentActiveVariant2.value == 0){
      currentActiveVariant2.value = option.value
      option.isActive = true
    }
    if(option.variantInd == 3 && currentActiveVariant3.value == 0){
      currentActiveVariant3.value = option.value
      option.isActive = true
    }
  })
}

const getPriceByVariant = computed(()=>{
  for (let variant of detail.value?.data?.variants) {
        let match = true;
        
        if (variant.nameVariant_1 && variant.nameVariant_1 != currentActiveVariant1.value) {
            match = false;
        }
        if (variant.nameVariant_2 && variant.nameVariant_2 != currentActiveVariant2.value) {
            match = false;
        }
        if (variant.nameVariant_3 && variant.nameVariant_3 != currentActiveVariant3.value) {
            match = false;
        }

        if (match) {
            return variant.price;
        }
    }
    return null; // Return null or any default value if no match is found
})

const tabContent = computed(() => {
  return detail.value?.data
})

const getContent = (tabKey) => {
  const tabs = {
    US: {
      one:   tabContent.value.tabProductDetailUS,
      two:   tabContent.value.tabSizeGuideUS,
      three:   tabContent.value.tabMockupTemplateUS,
      four:   tabContent.value.tabCareInstructionUS,
    },
    UK: {
      one:   tabContent.value.tabProductDetailUK,
      two:   tabContent.value.tabSizeGuideUK,
      three:   tabContent.value.tabMockupTemplateUK,
      four:   tabContent.value.tabCareInstructionUK,
    },
    FR: {
      one:   tabContent.value.tabProductDetailFR,
      two:   tabContent.value.tabSizeGuideFR,
      three:   tabContent.value.tabMockupTemplateFR,
      four:   tabContent.value.tabCareInstructionFR,
    },
    DE: {
      one:   tabContent.value.tabProductDetailDE,
      two:   tabContent.value.tabSizeGuideDE,
      three:   tabContent.value.tabMockupTemplateDE,
      four:   tabContent.value.tabCareInstructionDE,
    },
  };

  return tabs[locale.value][tabKey] || '';
};

const contentOne = computed(() => getContent('one'));
const contentTwo = computed(() => getContent('two'));
const contentThree = computed(() => getContent('three'));
const contentFour = computed(() => getContent('four'));

onMounted(() => {
  listProductRelated()
  initializeVariant()
})
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
.slider-detail {
  :deep(.v-slider-track__background) {
    background-color: #d1e0ff;
  }
  :deep(.v-slider-thumb__surface) {
    background-color: #709ce6;
  }
  :deep(.v-slider-track__fill) {
    background-color: #d1e0ff;
  }
}

.name-option{
  border: 1px solid #709CE6;
  border-radius: 3px;
  padding: 12px 24px;
  h1{
    color: #709CE6;
  }
}

.active-name-option{
  h1{
    color: white;
  }
  background-color: #709CE6;
}

.related-product{
  :deep(.swiper-thumbnail){
      min-width:0px !important;
      width: 15vw !important;
      height: 15vw !important;
      object-fit:cover;
      max-height: none !important;
  }
  :deep(.text-swiper){
    margin-right: 0px !important;
  }
}
</style>
