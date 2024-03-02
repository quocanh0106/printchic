<template>
  <div class="product-detail-wrapper" v-show="pc">
    <div class="product-detail-head-block flex justify-between gap-x-16 custom-padding">
      <div class="display-image flex flex-col gap-y-10">
        <VueGallery :photos="photos" />
        <img :src="productInfo"/>
      </div>
      <div class="product-variant-and-infor">
        <h1 class="section-title font-semibold product-name">{{ product.name }}</h1>
        <p class="product-sku mt-2">SKU: {{ product.sku }}</p>
        <div class="price-n-ship mt-6 flex items-center gap-x-2">
          <span class="price">${{ product.price }}</span>
          <span class="include-ship-tag bg-light-blue-custom" v-show="product.includeShipping">{{ $t('productDetail.includeShipping') }}</span>
        </div>
        <p class="product-description mt-6">
          {{ product.description }}
        </p>
        <div class="product-option mt-8 flex flex-col gap-y-5">
          <span v-for="item,index in product.option" :key="index">
            <h1 class="text-black font-semibold leading-3">{{ item.optionName }}</h1>
            <span class="option-variant flex gap-x-3">
              <v-button class="secondary-btn mt-4 txt-primary variant-button cursor-pointer" v-for="variant,ind in item.optionVariant" :key="ind" >
                {{ variant }}
              </v-button >
            </span>
          </span>
        </div>
        <div class="action-button w-100 mt-8 flex flex-col">
          <v-button class="primary-btn w-100 text-center text-white cursor-pointer">{{ $t('productDetail.downloadMockup') }}</v-button>
          <v-button class="secondary-btn w-100  text-center cursor-pointer mt-3">{{ $t('productDetail.contactSupport') }}</v-button>
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
  <div class="product-detail-wrapper" v-show="mobile">
    <div class="product-detail-head-block flex justify-between gap-x-16 flex-column">
      <div class="display-image flex flex-col gap-y-10">
        <VueGallery :photos="photos" />
      </div>
      <div class="product-variant-and-infor p-5">
        <h1 class="section-title font-semibold product-name">{{ product.name }}</h1>
        <p class="product-sku mt-2">SKU: {{ product.sku }}</p>
        <div class="price-n-ship mt-6 flex items-center gap-x-2">
          <span class="price">${{ product.price }}</span>
          <span class="include-ship-tag bg-light-blue-custom" v-show="product.includeShipping">{{ $t('productDetail.includeShipping') }}</span>
        </div>
        <p class="product-description mt-6">
          {{ product.description }}
        </p>
        <div class="product-option mt-8 flex flex-col gap-y-5">
          <span v-for="item,index in product.option" :key="index">
            <h1 class="text-black font-semibold leading-3">{{ item.optionName }}</h1>
            <span class="option-variant flex gap-x-3">
              <v-button class="secondary-btn mt-4 txt-primary variant-button cursor-pointer" v-for="variant,ind in item.optionVariant" :key="ind" >
                {{ variant }}
              </v-button >
            </span>
          </span>
        </div>
        <div class="action-button w-100 mt-8 flex flex-col mb-5">
          <v-button class="primary-btn w-100 text-center text-white cursor-pointer">{{ $t('productDetail.downloadMockup') }}</v-button>
          <v-button class="secondary-btn w-100  text-center cursor-pointer mt-3">{{ $t('productDetail.contactSupport') }}</v-button>
        </div>
        <img :src="productInfo"/>
      </div>
    </div>
    

    <!-- Tab -->
    <div class="tab-info-wrapper">
      <div class="tab-wrapper bg-light-gray1-custom p-3 ">
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
</template>

<script>
//component
import help from "../../components/help.vue";
import VueGallery from "../../components/vueGalery.vue";
// asset
import arrowUpRight from "../../assets/svg/arrowUpRight.svg";
import productInfo from "../../assets/svg/productInfo.svg";
import { myMixin } from '~/mixins/myMixin';

export default {
  mixins: [myMixin],
  components: {
    help,
    VueGallery
  },
  data() {
    return {
      arrowUpRight,
      productInfo,
      tab: null,
      photos: [
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/20625/lordea-home-01-min.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/20625/lordea-home-02-min.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/20625/lordea-home-03-min.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/20625/lordea-home-04-min.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/20625/lordea-home-05-min.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/20625/lordea-home-06-min.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/20625/lordea-home-07-min.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/20625/lordea-home-08-min.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/20625/lordea-home-08-min.jpg',
      ],
      product: {
        name: 'Colorblast Heavyweight T-Shirt Comfort Colors 1745 (Made in US)',
        sku : 'ARPSVN',
        price: '15.75',
        includeShipping: true,
        description: 'Made for training, travel, or lounging, our insanely-soft Flowknit fabric is jam-packed with performance features like moisture-wicking and anti-odor benefits.',
        option: [
          {
            optionName: 'Size',
            optionVariant: ['S', 'M', 'L']
          },
          {
            optionName: 'Color',
            optionVariant: ['red', 'green', 'yellow']
          },
          {
            optionName: 'Material',
            optionVariant: ['Cotton', 'Silk', 'Fabric']
          }
        ],
        moreInformation: ''
      }
    };
  },
  method: {
  },
};
</script>

<style scoped lang="scss">
.tab-information{
  :deep(.v-slide-group__content){
    background-color: transparent !important;
    color: #3372DB !important;
  }
  :deep(.v-slide-group__container){
    background-color: transparent !important;
  }
}
.tab-wrapper{
  :deep(.v-slide-group){
    background-color: transparent !important;
  }
  :deep(.v-card){
    background-color: transparent !important;
    box-shadow: none !important;
  }
}
.variant-button{
  padding: 12px 24px;
  min-width: 0px !important;
}
.include-ship-tag{
  padding: 4px 12px;
  border-radius: 100px;
}
.tab-info-wrapper{
  padding-top: 0px !important;
}
</style>
