<template>
  <div class="swiper">
    <div class="swiper-wrapper-outside">
      <swiper :slides-per-view="slidePerView" :space-between="50" :pagination="showPagination"
        :navigation="showNavigation" :modules="[Pagination, Navigation]" @swiper="onSwiper" @slideChange="onSlideChange">
        <swiper-slide v-for="item, index in items" :key="index">
          <div>
            <img class="img-thumbnail" :src="item.bannerImg ? item.bannerImg : item.img" />
            <p class="text-center mt-2">{{ item.name }}</p>
            <h1 class=" text-center text-swiper font-semibold mt-2.5" v-if="hasDescription">{{ locale.value == 'US' ? item.titleUS : locale.value == 'US' ? item.titleUK : locale.value == 'FR' ? item.titleFR : item.titleDE }}</h1>
            <p class="text-center text-swiper mt-1" v-if="hasDescription">{{ locale.value == 'US' ? item.descriptionUS : locale.value == 'US' ? item.descriptionUK : locale.value == 'FR' ? item.descriptionFR : item.descriptionDE }}</p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Import asset
import introImage from "~/assets/images/introImage.png";

// Define props
const props = defineProps({
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
    default: () => ([
      { img: introImage, name: "Men's T-shirts" },
      { img: introImage, name: "Men's T-shirts" },
      { img: introImage, name: "Men's T-shirts" },
      // Add other items...
    ]),
  },
  hasDescription: {
    type: Boolean,
    default: false
  },
});
import { useI18n } from 'vue-i18n'

const { locale } = useI18n();
// Reactive state
const introImageRef = ref(introImage);

// Methods
const onSwiper = (swiper) => {
  console.log(swiper);
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
}

.img-thumbnail{
    min-width:0px !important;
    width: 15vw !important;
    height: 15vw !important;
    object-fit:cover;
    max-height: none !important;
    @media screen and (max-width:992px) {
      width: 35vw !important;
      height: 35vw !important;
    }
}

</style>
