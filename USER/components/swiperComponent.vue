<template>
  <div class="swiper">
    <div class="swiper-wrapper-outside">
        <swiper
          :slides-per-view="slidePerView"
          :space-between="50"
          :freeMode="isFreeMode"
          :pagination="showPagination"
          :navigation="showNavigation"
          :modules="[Pagination,FreeMode, Navigation]"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide v-for="item,index in items" :key="index"><img class="swiper-thumbnail rounded" :src="item.bannerImg? item.bannerImg : item" :class="imgWidth100 && 'w-100'" /></swiper-slide>
        </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
// import Swiper core and required modules
import { Pagination, Navigation, FreeMode  } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import 'swiper/css/free-mode';

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
      default: 4
    },
    showNavigation: {
      type: Boolean,
      default: false
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    isFreeMode: {
      type: Boolean,
      default : true
    },
    isFreeMode: {
      type: Boolean,
      default : true
    },
    items: {
      type: Array,
      default: [introImage, introImage, introImage, introImage, introImage, introImage, introImage, introImage, introImage, introImage],
    },
    imgWidth100: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      Pagination,
      Navigation,
      FreeMode,
      introImage,
    };
  },
  methods: {
    onSwiper(swiper) {
      // console.log(swiper);
    },
    onSlideChange() {
      console.log("slide change");
    },
  },
  mounted() {
    console.log("created", this.items);
  },
  
};
</script>

<style lang="scss" scoped>
.swiper{
  z-index: 0 !important;
}
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
}

.swiper-thumbnail{
  min-width: 378px;
  max-width: 378px;
  min-height: 378px;
  max-height: 378px;
  object-fit: cover;
}
</style>
