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
          <swiper-slide class="cursor-pointer" v-for="item,index in items" :key="index" @click="pushRouter(item._id)">
            <img class="swiper-thumbnail cursor-pointer rounded" :src="item.bannerImg? item.bannerImg : item" :class="imgWidth100 && 'w-100'" />
            <h1 class=" text-center text-swiper font-semibold mt-2.5" v-if="hasDescription">{{ locale.value == 'US' ? item.titleUS : locale.value == 'US' ? item.titleUK : locale.value == 'FR' ? item.titleFR : item.titleDE }}</h1>
            <p class="text-center text-swiper mt-1" v-if="hasDescription">{{ locale.value == 'US' ? item.descriptionUS : locale.value == 'US' ? item.descriptionUK : locale.value == 'FR' ? item.descriptionFR : item.descriptionDE }}</p>
          </swiper-slide>
        </swiper>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation, FreeMode } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import 'swiper/css/free-mode';

import introImage from "~/assets/images/introImage.png";

// Props
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
  isFreeMode: {
    type: Boolean,
    default: true
  },
  items: {
    type: Array,
    default: () => [introImage, introImage, introImage, introImage, introImage, introImage, introImage, introImage, introImage, introImage],
  },
  imgWidth100: {
    type: Boolean,
    default: false
  },
  hasDescription: {
    type: Boolean,
    default: false
  },
  isCategory: {
    type: Boolean,
    default: false
  }
});

// Reactive data
const pagination = Pagination;
const navigation = Navigation;
const freeMode = FreeMode;
const introImageRef = ref(introImage);
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const { locale } = useI18n();
const emit = defineEmits(['submit'])

// Methods
const onSwiper = (swiper) => {
  // console.log(swiper);
};

const onSlideChange = () => {
  console.log("slide change");
};

const pushRouter = (id) => {
  console.log('sdsd',id)
  emit('submit', id);

}
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

.text-swiper{
  margin-right: 5vw;
}
</style>
