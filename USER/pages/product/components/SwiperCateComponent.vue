<template>
  <div class="swiper">
    <div class="swiper-wrapper-outside">
      <swiper :slides-per-view="slidePerView" :space-between="50" :pagination="showPagination"
        :navigation="showNavigation" :modules="[Pagination, Navigation]" @swiper="onSwiper" @slideChange="onSlideChange">
        <swiper-slide v-for="item, index in items" :key="index">
          <div>
            <img :src="item.img" />
            <p class="text-center mt-2">{{ item.name }}</p>
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
    items: {
      type: Array,
      default: [{
        img: introImage,
        name: `Men's T-shirts`
      }, {
        img: introImage,
        name: `Men's T-shirts`
      }, {
        img: introImage,
        name: `Men's T-shirts`
      }, {
        img: introImage,
        name: `Men's T-shirts`
      }, {
        img: introImage,
        name: `Men's T-shirts`
      }, {
        img: introImage,
        name: `Men's T-shirts`
      }, {
        img: introImage,
        name: `Men's T-shirts`
      }, {
        img: introImage,
        name: `Men's T-shirts`
      }, {
        img: introImage,
        name: `Men's T-shirts`
      }, {
        img: introImage,
        name: `Men's T-shirts`
      }],
    }
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
}
</style>
