<template>
  <div class="swiper">
    <div class="swiper-wrapper-outside">
      <swiper :slides-per-view="slidePerView" :pagination="showPagination" :navigation="showNavigation"
        :modules="[Pagination, Navigation]" @swiper="onSwiper" @slideChange="onSlideChange">
        <swiper-slide>
          <div class="motive-body-left border-left-primary pl-4">
            <h5 class="txt-primary font-semibold">
              {{ $t("homePage.distictBodyTitle1") }}
            </h5>
            <p class="mt-3">
              {{ $t("homePage.distictBodyDescription1") }}
            </p>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="motive-body-left border-left-primary pl-4">
            <h5 class="font-semibold">
              {{ $t("homePage.distictBodyTitle2") }}
            </h5>
            <p class="mt-3">
              {{ $t("homePage.distictBodyDescription2") }}
            </p>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="motive-body-left border-left-primary pl-4">
            <h5 class="font-semibold">
              {{ $t("homePage.distictBodyTitle3") }}
            </h5>
            <p class="mt-3">
              {{ $t("homePage.distictBodyDescription3") }}
            </p>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="motive-body-left border-left-primary pl-4">
            <h5 class="font-semibold">
              {{ $t("homePage.distictBodyTitle4") }}
            </h5>
            <p class="mt-3">
              {{ $t("homePage.distictBodyDescription4") }}
            </p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
// import Swiper core and required modules
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// import asset
import introImage from "../assets/images/introImage.png"

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    slidePerView: {
      type: Number,
      default: 1
    },
    showNavigation: {
      type: Boolean,
      default: false
    },
    showPagination: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      Pagination,
      Navigation,
      introImage,
    };
  },
  methods: {
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log("slide change");
    },
  },
};
</script>

<style lang="scss" scoped>
.swiper-wrapper-outside {
  :deep(.swiper-wrapper) {
    padding-bottom: 70px;
  }

  :deep(.swiper-button-next) {
    top: 50% !important;
    transform: translateY(-50%);
  }

  :deep(.swiper-button-prev) {
    top: 50% !important;
    transform: translateY(-50%);
  }

  :deep(.swiper-button-next::after) {
    color: #1D2939;
    font-size: 16px;
  }

  :deep(.swiper-button-prev::after) {
    color: #1D2939;
    font-size: 16px;
  }
  
  .motive-body-left {
      padding: 0px 24px;
    }
}

</style>
