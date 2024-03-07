<template>
  <div class="swiper">
    <div class="swiper-wrapper-outside">
      <swiper :slides-per-view="slidePerView" :pagination="showPagination" :navigation="showNavigation"
        :modules="[Pagination, Navigation]" @swiper="onSwiper" @slideChange="onSlideChange">
        <swiper-slide v-for="blog, index in items" :key="index">
          <div class="blog-content mb-8 flex gap-x-6 flex-column">
            <img class="small-img-blog blog-img" :src="blog.img" @click="toDetailBlog(blog._id)"/>
            <div class="">
              <h1 class="font-semibold mt-3">{{ blog[`title${currentLanguage}`] }}</h1>
              <div v-html="blog[`content${currentLanguage}`] ? JSON.parse(blog[`content${currentLanguage}`]) : ''" class="mt-2"></div>
              <p class="mt-3">{{ blog.createdAt }}</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup lang="js">
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
import useLanguage from '~/composables/useLanguage';


const { currentLanguage, setLanguage } = useLanguage();

defineProps({
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
      default: [],
    }
});

const { data }  = await useAsyncData(
  'blog',
  () => $fetch('http://localhost:8000/auth/blog/list')
)

const onSwiper = (swiper) => {
      // console.log(swiper);
    };
    const toDetailBlog = (id) => {
      this.$router.push(`/blog/${id}`);
    };
    const onSlideChange = () => {
      console.log("slide change");
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
