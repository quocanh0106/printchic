<template>
  <div class="swiper">
    <div class="swiper-wrapper-outside">
        <swiper
          :slides-per-view="4"
          :space-between="50"
          :pagination="true"
          :modules="[Pagination]"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide><img :src="introImage" /></swiper-slide>
          <swiper-slide><img :src="introImage" /></swiper-slide>
          <swiper-slide><img :src="introImage" /></swiper-slide>
          <swiper-slide><img :src="introImage" /></swiper-slide>
          <swiper-slide><img :src="introImage" /></swiper-slide>
          <swiper-slide><img :src="introImage" /></swiper-slide>
          <swiper-slide><img :src="introImage" /></swiper-slide>
          <swiper-slide><img :src="introImage" /></swiper-slide>
          <swiper-slide><img :src="introImage" /></swiper-slide>
          <swiper-slide><img :src="introImage" /></swiper-slide>
          <swiper-slide><img :src="introImage" /></swiper-slide>
          <swiper-slide><img :src="introImage" /></swiper-slide>
        </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
// import Swiper core and required modules
import { Pagination } from "swiper/modules";

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
  data() {
    return {
      Pagination,
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
  .swiper-wrapper-outside{
    :deep(.swiper-wrapper){
      padding-bottom: 70px;
    }
  }
</style>
