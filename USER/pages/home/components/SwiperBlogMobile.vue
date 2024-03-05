<template>
  <div class="swiper">
    <div class="swiper-wrapper-outside">
      <swiper :slides-per-view="slidePerView" :pagination="showPagination" :navigation="showNavigation"
        :modules="[Pagination, Navigation]" @swiper="onSwiper" @slideChange="onSlideChange">
        <swiper-slide v-for="blog, index in items" :key="index">
          <div class="blog-content mb-8 flex gap-x-6 flex-column">
            <img class="small-img-blog blog-img" :src="blog.imgUrl" />
            <div class="">
              <h1 class="font-semibold mt-3">{{ blog.title }}</h1>
              <p class="mt-2">{{ blog.description }}</p>
              <p class="mt-3">{{ blog.createdAt }}</p>
            </div>
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
    items: {
      type: Array,
      default: [
        {
          id: 1,
          imgUrl: 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/stock%2FGettyImages-1166414278',
          title: 'Demi Moore gives update on Bruce Willis',
          description: 'Nowhere are these attacks more evident right now than on college campuses. Many academics who teach about the history of race and racism in America, as I do, are being unjustifiably blamed.',
          createdAt: 'April 11, 2023'
        },
        {
          id: 2,
          imgUrl: 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/stock%2FGettyImages-1166414278',
          title: 'Demi Moore gives update on Bruce Willis',
          description: 'Nowhere are these attacks more evident right now than on college campuses. Many academics who teach about the history of race and racism in America, as I do, are being unjustifiably blamed.',
          createdAt: 'April 11, 2023'
        },
        {
          id: 3,
          imgUrl: 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/stock%2FGettyImages-1166414278',
          title: 'Demi Moore gives update on Bruce Willis',
          description: 'Nowhere are these attacks more evident right now than on college campuses. Many academics who teach about the history of race and racism in America, as I do, are being unjustifiably blamed.',
          createdAt: 'April 11, 2023'
        },
        {
          id: 4,
          imgUrl: 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/stock%2FGettyImages-1166414278',
          title: 'Demi Moore gives update on Bruce Willis',
          description: 'Nowhere are these attacks more evident right now than on college campuses. Many academics who teach about the history of race and racism in America, as I do, are being unjustifiably blamed.',
          createdAt: 'April 11, 2023'
        },

      ],
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
      // console.log(swiper);
    },
    onSlideChange() {
      console.log("slide change");
    },
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

  .motive-body-left {
    padding: 0px 24px;
  }

  .blog-img {
    border-radius: 6px;
  }

  .blog-left-wrapper {
    // width: 50%;
  }

  .blog-right-wrapper {
    // width: 50%;
  }

  .small-img-blog {
    width: 100%;
    object-fit: cover;
  }
}</style>
