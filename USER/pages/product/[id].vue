<template>
  <div class="product-detail-wrapper">
    <div class="product-detail-head-block flex">
      <div class="display-image"></div>
      <div class="product-variant-and-infor"></div>
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
</template>

<script>
//component
import help from "../../components/help.vue";
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// asset
import arrowUpRight from "../../assets/svg/arrowUpRight.svg";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default {
  components: {
    help,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      arrowUpRight,
      FreeMode,
      Navigation,
      Thumbs,
      tab: null,
      thumbsSwiper: null,
    };
  },
  method: {
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper;
    },
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
</style>
