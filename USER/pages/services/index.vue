<template>
  <div class="service-page-wrapper">
    <div class="service-section-wrapper" v-show="pc || lgPc || extraPc">
      <div class="service-wrapper">
        <!-- Header of service -->
        <div class="service-header custom-padding flex items-center justify-between">
          <div class="service-header-left">
            <h1 class="section-title font-semibold w-90">
              {{ $t("servicePage.headerTitle") }}
            </h1>
            <p class="section-content w-90 mt-4">
              {{ $t("servicePage.headerDesc") }}
            </p>
            <div class="flex cursor-pointer mt-8">
              <a class="primary-btn text-white flex">
                <p>{{ $t("button.signUpForFree") }}</p>
                <img :src="arrowUpRightWhite" />
              </a>
  
              <button class="secondary-btn cursor-pointer ml-4">
                {{ $t("ContactUs") }}
              </button>
            </div>
          </div>
          <div class="service-header-right">
            <img :src="introImage" />
          </div>
        </div>
  
        <!-- What is print on Demand -->
        <div class="pod-wrapper">
          <div class="bg-light-blue-custom custom-padding flex flex-col justify-center items-center text-center">
            <h1 class="section-title font-semibold">
              {{ $t("servicePage.whatIsPrintOnDemand") }}
            </h1>
            <p class="mt-5 mw-790px">
              {{ $t("servicePage.whatIsPrintOnDemandDes1") }}
            </p>
            <p class="mt-3 mw-790px">
              {{ $t("servicePage.whatIsPrintOnDemandDes2") }}
            </p>
            <button class="mt-8 secondary-btn txt-primary font-semibold">{{
              $t("button.aboutUs")
            }}</button>
          </div>
        </div>
  
        <!-- How fullfilement service Work -->
        <div class="how-pod-works-wrapper custom-padding">
          <div class="how-pod-works-header text-center flex flex-col justify-center items-center">
            <h1 class="section-title font-semibold">
              {{ $t("servicePage.howDoPODWorks") }}
            </h1>
            <p class="mt-5 mw-790px">{{ $t("servicePage.howDoPODWorksDes") }}</p>
          </div>
          <div class="how-pod-works-body mt-12 flex justify-between">
            <div class="blog-wrapper mw-379px" v-for="(item, index) in thumbNailImgBlog" :key="index">
              <img :src="item.img" />
              <h1 class="font-semibold txt-primary mt-5 text-2xl">
                {{ "0" + (index + 1) + "." }}
              </h1>
              <h1 class="font-semibold section-title mt-3">{{ item.title ?? '' }}</h1>
              <p class="section-content mt-2">{{ item.content ?? '' }}</p>
            </div>
          </div>
        </div>
  
        <!-- Card Infor and Service Page -->
        <div class="service-page-trustworthy-wrapper w-auto custom-padding">
          <div class="service-page-trustworthy-wrapper flex flex-row justify-between w-auto mt-20">
            <div class="trustworthy-intro w-1/2 fullfillment-title">
              <h1 class="font-semibold section-title mw-584px">
                {{ $t("servicePage.trustworthyTitle") }}
              </h1>
              <a class="flex gap-1 txt-primary cursor-pointer mt-10">
                <p>{{ $t("button.seePricing") }}</p>
                <img :src="arrowUpRight" />
              </a>
            </div>
            <div class="process-card flex flex-col w-1/2">
              <cardInfor :imgSrc="cardThumbnail" :title="$t('servicePage.servicePageCard1Title')"
                :description="$t('servicePage.servicePageCard1Des')" />
              <cardInfor :imgSrc="cardThumbnail" :title="$t('servicePage.servicePageCard2Title')"
                :description="$t('servicePage.servicePageCard2Des')" />
              <cardInfor :imgSrc="cardThumbnail" :title="$t('servicePage.servicePageCard3Title')"
                :description="$t('servicePage.servicePageCard3Des')" />
              <cardInfor :imgSrc="cardThumbnail" :title="$t('servicePage.servicePageCard4Title')"
                :description="$t('servicePage.servicePageCard4Des')" />
            </div>
          </div>
        </div>
  
        <!-- Counter -->
        <div class="counter-wrapper flex items-center justify-between custom-padding">
          <div class="" v-for="(item, index) in counterInfor" :key="index">
            <cardCounterVue :amount="item.amount" :title="item.title" :description="item.description" />
          </div>
        </div>
  
        <!-- fullfilment center part -->
        <div class="fullfill-center-wrapper custom-padding">
          <div class="fullfill-infor-block mw-433px p-10">
            <h1 class="section-title font-semibold">
              {{ $t("servicePage.fullFillMentCenterTitle") }}
            </h1>
            <p class="section-content">
              {{ $t("servicePage.fullFillMentCenterDes") }}
            </p>
            <p class="section-content">
              01. {{ $t("servicePage.fullFillMentCenterSubDes1") }}
            </p>
            <p class="section-content">
              02. {{ $t("servicePage.fullFillMentCenterSubDes2") }}
            </p>
          </div>
        </div>
  
        <!-- POD products -->
        <div class="pod-product custom-padding">
          <div class="pod-product-header flex justify-between">
            <h1 class="pod-product-title font-semibold section-title">
              {{ $t("servicePage.enjoyOurPODProduct") }}
            </h1>
            <a @click="toProductList" class="pod-product-view-all txt-primary cursor-pointer flex items-center">
              <p class="mw-100px">{{ $t("button.exploreOurCatalog") }}</p>
              <img :src="arrowUpRight" />
            </a>
          </div>
          <swiperComponent :showPagination="true" :items="listPODProduct" class="pod-product mt-12 mb-8" />
        </div>
  
        <!-- Top current trending print -->
        <div class="top-current-trending-print custom-padding bg-light-blue-custom">
          <h1 class="section-title font-semibold">
            {{ $t("servicePage.topPOD") }}
          </h1>
          <div class="top-trending-pod-tag-wrapper flex gap-x-4 mt-8">
            <span class="top-trending-pod-tag section-content font-medium" v-for="(item, index) in listTopCurrentPOD"
              :key="index">
              {{ item }}
            </span>
          </div>
        </div>
  
        <!-- pros and cons -->
        <prosAndConsVue class="custom-padding" />
  
        <!-- tips -->
        <div class="custom-padding pod-tips">
          <div class="tips-header flex justify-between">
            <h1 class="tips-title font-semibold section-title">
              {{ $t("servicePage.podTips") }}
            </h1>
            <a class="tips-view-all txt-primary cursor-pointer flex items-center">
              <p class="mw-100px">{{ $t("button.seePricing") }}</p>
              <img :src="arrowUpRight" />
            </a>
          </div>
          <div class="tips-body flex mt-12 justify-between gap-x-8">
            <img :src="tipImg" />
            <div class="tips-body-content rounded-lg bg-white p-6">
              <h1 class="font-semibold section-title"> {{ $t("servicePage.podTipsContent1") }} </h1>
              <h1 class="font-semibold section-title mt-12"> {{ $t("servicePage.podTipsContent2") }} </h1>
              <p class="section-content mt-3"> {{ $t("servicePage.podTipsContent3") }} </p>
              <ul class="bullet-tips ml-5">
                <li>{{ $t("servicePage.podTipsContent4") }}</li>
                <li>{{ $t("servicePage.podTipsContent5") }}</li>
                <li>{{ $t("servicePage.podTipsContent6") }}</li>
              </ul>
              <h1 class="font-semibold section-title mt-12"> {{ $t("servicePage.podTipsContent7") }} </h1>
            </div>
          </div>
        </div>
        <!-- Frequently asked question -->
        <faq class="custom-padding" />
  
        <!-- help -->
        <help :headerTitle="$t('homePage.howCanWeHelp')" :headerDesc="$t('homePage.howCanWeHelpDesc')"
          class="custom-padding" />
      </div>
    </div>
    <div class="service-section-wrapper" v-show="mobile || tablet">
      <div class="service-wrapper">
        <!-- Header of service -->
        <div class="service-header px-3 flex items-center justify-between flex-column">
          <div class="service-header-right">
            <img :src="introImage" />
          </div>
          <div class="service-header-left">
            <h1 class="section-title font-semibold w-90">
              {{ $t("servicePage.headerTitle") }}
            </h1>
            <p class="section-content w-90 mt-4">
              {{ $t("servicePage.headerDesc") }}
            </p>
            <div class="flex cursor-pointer flex items-center justify-center my-10">
              <a class="primary-btn text-white flex">
                <p>{{ $t("button.signUpForFree") }}</p>
                <img :src="arrowUpRightWhite" />
              </a>
  
              <button class="secondary-btn cursor-pointer ml-4">
                {{ $t("ContactUs") }}
              </button>
            </div>
          </div>
        </div>
  
        <!-- What is print on Demand -->
        <div class="pod-wrapper">
          <div class="bg-light-blue-custom px-3 py-5 flex flex-col justify-center items-center text-center">
            <h1 class="section-title font-semibold">
              {{ $t("servicePage.whatIsPrintOnDemand") }}
            </h1>
            <p class="mt-5 mw-790px">
              {{ $t("servicePage.whatIsPrintOnDemandDes1") }}
            </p>
            <p class="mt-3 mw-790px">
              {{ $t("servicePage.whatIsPrintOnDemandDes2") }}
            </p>
            <button class="mt-8 secondary-btn txt-primary font-semibold">{{
              $t("button.aboutUs")
            }}</button>
          </div>
        </div>
  
        <!-- How fullfilement service Work -->
        <div class="how-pod-works-wrapper px-3 py-5">
          <div class="how-pod-works-header text-center flex flex-col justify-center items-center">
            <h1 class="section-title font-semibold">
              {{ $t("servicePage.howDoPODWorks") }}
            </h1>
            <p class="mt-5 mw-790px">{{ $t("servicePage.howDoPODWorksDes") }}</p>
          </div>
          <div class="how-pod-works-body mt-12 flex items-center justify-between flex-column">
            <div class="blog-wrapper mw-379px" v-for="(item, index) in thumbNailImgBlog" :key="index">
              <img :src="item.img" />
              <h1 class="font-semibold txt-primary mt-5 text-2xl">
                {{ "0" + (index + 1) + "." }}
              </h1>
              <h1 class="font-semibold section-title mt-3">{{ item.title }}</h1>
              <p class="section-content mt-2">{{ item.content }}</p>
            </div>
          </div>
        </div>
  
        <!-- Card Infor and Service Page -->
        <div class="service-page-trustworthy-wrapper w-auto mx-3 my-5">
          <div class="service-page-trustworthy-wrapper flex flex-row justify-between w-auto mt-20 flex-column">
            <div class="trustworthy-intro fullfillment-title text-center p-3">
              <h1 class="font-semibold section-title mw-584px">
                {{ $t("servicePage.trustworthyTitle") }}
              </h1>
              <a class="flex gap-1 txt-primary cursor-pointer mt-10 w-100 justify-center">
                <p >{{ $t("button.seePricing") }}</p>
                <img :src="arrowUpRight" />
              </a>
            </div>
            <div class="process-card flex flex-col">
              <cardInfor :imgSrc="cardThumbnail" :title="$t('servicePage.servicePageCard1Title')"
                :description="$t('servicePage.servicePageCard1Des')" />
              <cardInfor :imgSrc="cardThumbnail" :title="$t('servicePage.servicePageCard2Title')"
                :description="$t('servicePage.servicePageCard2Des')" />
              <cardInfor :imgSrc="cardThumbnail" :title="$t('servicePage.servicePageCard3Title')"
                :description="$t('servicePage.servicePageCard3Des')" />
              <cardInfor :imgSrc="cardThumbnail" :title="$t('servicePage.servicePageCard4Title')"
                :description="$t('servicePage.servicePageCard4Des')" />
            </div>
          </div>
        </div>
  
        <!-- Counter -->
        <div class="counter-wrapper flex items-center justify-between flex-column">
          <div class="w-100 px-5" v-for="(item, index) in counterInfor" :key="index">
            <cardCounterVue :amount="item.amount" :title="item.title" :description="item.description" />
          </div>
        </div>
  
        <!-- fullfilment center part -->
        <div class="fullfill-center-wrapper px-3">
          <div class="fullfill-infor-block mw-433px p-10">
            <h1 class="section-title font-semibold">
              {{ $t("servicePage.fullFillMentCenterTitle") }}
            </h1>
            <p class="section-content">
              {{ $t("servicePage.fullFillMentCenterDes") }}
            </p>
            <p class="section-content">
              01. {{ $t("servicePage.fullFillMentCenterSubDes1") }}
            </p>
            <p class="section-content">
              02. {{ $t("servicePage.fullFillMentCenterSubDes2") }}
            </p>
          </div>
        </div>
  
        <!-- POD products -->
        <div class="pod-product px-3">
          <div class="pod-product-header flex justify-between flex-column text-center py-5">
            <h1 class="pod-product-title font-semibold section-title">
              {{ $t("servicePage.enjoyOurPODProduct") }}
            </h1>
            <a @click="toProductList" class="pod-product-view-all txt-primary cursor-pointer flex items-center justify-center">
              <p class="mw-100px">{{ $t("button.exploreOurCatalog") }}</p>
              <img :src="arrowUpRight" />
            </a>
          </div>
          <swiperComponent :showPagination="true" :items="listPODProduct" class="pod-product mt-12 mb-8" :slidePerView='2'/>
        </div>
  
        <!-- Top current trending print -->
        <div class="top-current-trending-print bg-light-blue-custom px-3 py-5">
          <h1 class="section-title font-semibold">
            {{ $t("servicePage.topPOD") }}
          </h1>
          <div class="top-trending-pod-tag-wrapper flex flex-column gap-x-4 mt-8">
            <span class="top-trending-pod-tag section-content font-medium my-1" v-for="(item, index) in listTopCurrentPOD"
              :key="index">
              {{ item }}
            </span>
          </div>
        </div>
  
        <!-- pros and cons -->
        <prosAndConsVue />
  
        <!-- tips -->
        <div class="pod-tips">
          <div class="tips-header flex justify-between flex-column px-3 py-5 text-center">
            <h1 class="tips-title font-semibold section-title">
              {{ $t("servicePage.podTips") }}
            </h1>
            <a class="tips-view-all txt-primary cursor-pointer flex items-center justify-center">
              <p class="mw-100px">{{ $t("button.seePricing") }}</p>
              <img :src="arrowUpRight" />
            </a>
          </div>
          <div class="tips-body flex mt-12 justify-between gap-x-8 flex-column">
            <img :src="tipImg" />
            <div class="tips-body-content rounded-lg bg-white p-6">
              <h1 class="font-semibold section-title"> {{ $t("servicePage.podTipsContent1") }} </h1>
              <h1 class="font-semibold section-title mt-12"> {{ $t("servicePage.podTipsContent2") }} </h1>
              <p class="section-content mt-3"> {{ $t("servicePage.podTipsContent3") }} </p>
              <ul class="bullet-tips ml-5">
                <li>{{ $t("servicePage.podTipsContent4") }}</li>
                <li>{{ $t("servicePage.podTipsContent5") }}</li>
                <li>{{ $t("servicePage.podTipsContent6") }}</li>
              </ul>
              <h1 class="font-semibold section-title mt-12"> {{ $t("servicePage.podTipsContent7") }} </h1>
            </div>
          </div>
        </div>
        <!-- Frequently asked question -->
        <faq />
  
        <!-- help -->
        <help :headerTitle="$t('homePage.howCanWeHelp')" :headerDesc="$t('homePage.howCanWeHelpDesc')" class="mt-5" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted  } from 'vue';
import { useNuxtApp, useRouter } from '#app';
import arrowUpRight from '~/assets/svg/arrowUpRight.svg';
import arrowUpRightWhite from '~/assets/svg/iconUpRightWhite.svg';
import introImage from '~/assets/images/introImage.png';
import serviceThumbnail1 from '~/assets/images/servicePageThumbNail1.png';
import serviceThumbnail2 from '~/assets/images/servicePageThumbNail2.png';
import serviceThumbnail3 from '~/assets/images/servicePageThumbNail3.png';
import cardThumbnail from '~/assets/svg/cardThumbNail.svg';
import fullFillMentCenter from '~/assets/images/fullFillMentCenter.png';
import tipImg from '~/assets/images/tipsImg.png';
import cardInfor from '~/components/cardInfor.vue';
import help from '~/components/help.vue';
import faq from '~/components/faq.vue';
import cardCounterVue from '~/components/cardCounter.vue';
import swiperComponent from '~/components/swiperComponent.vue';
import prosAndConsVue from '~/components/prosAndCons.vue';
import { myMixin } from '~/mixins/myMixin';
import { useI18n, useLocalePath } from '#imports'


const { t } = useI18n()
const nuxtApp = useNuxtApp();
const router = useRouter();
const listPODProduct = ref([]);
const localePath = useLocalePath()
const {data}  = await useFetch('http://printchic-api.tvo-solution.net/auth/product/list');

const podImage = computed(() => {
  return data.value?.data?.items
})
onMounted(async () => {
  listPODProduct.value = podImage.value.map(item => item.media[0]?.path);
});



const { screenWidth, mobile, tablet, pc, lgPc, extraPc } = useWidthScreen();

function toProductList() {
  router.push(localePath('/print-on-demand'));
}

const thumbNailImgBlog = ref([
  {
    img: serviceThumbnail1,
    title: t("servicePage.howPODImgBlog1Title"),
    content: t("servicePage.howPODImgBlog1Content"),
  },
  {
    img: serviceThumbnail2,
    title: t("servicePage.howPODImgBlog2Title"),
    content: t("servicePage.howPODImgBlog2Content"),
  },
  {
    img: serviceThumbnail3,
    title: t("servicePage.howPODImgBlog3Title"),
    content: t("servicePage.howPODImgBlog3Content"),
  },
]);

const counterInfor = ref([
  {
    amount: "420+",
    title: t("servicePage.counter1Title"),
    description: t("servicePage.counter1Des"),
  },
  {
    amount: "90,350+",
    title: t("servicePage.counter2Title"),
    description: t("servicePage.counter2Des"),
  },
  {
    amount: "180+",
    title: t("servicePage.counter3Title"),
    description: t("servicePage.counter3Des"),
  },
  {
    amount: "2.5M+",
    title: t("servicePage.counter4Title"),
    description: t("servicePage.counter4Des"),
  },
]);

const listTopCurrentPOD = ref([
  "trending1",
  "trending2",
  "trending3",
  "trending4",
  "trending5",
  "trending6",
  "trending7",
]);

useHead({
  title: 'Services',
  meta: [
    { name: 'description', content: 'Printchic.' }
  ],
  bodyAttrs: {
    class: 'test'
  }
})

useSeoMeta({
  title: 'Services',
  ogTitle: 'Printchic',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})

</script>


<style scoped lang="scss">
.service-page-trustworthy-wrapper {
  background-color: #f9fafb;
}

.fullfill-center-wrapper {
  background-image: url("../../assets/images/fullFillMentCenter.png");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding-top: 302px;

  .fullfill-infor-block {
    border-top: 7px solid #5c8ee2;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: #ffffff;

    h1 {
      word-break: break-word;
    }
  }
}

.top-trending-pod-tag {
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #ffffff;
}

.pod-tips {
  background-color: #f9fafb;
}

.bullet-tips {
  list-style-type: disc;
}

.pod-product{
  :deep(.swiper-thumbnail){
      min-width:0px !important;
      width: 15vw !important;
      height: 15vw !important;
      object-fit:cover;
      max-height: none !important;
  }
  @media screen and (max-width: 992px){
    :deep(.swiper-thumbnail){
      min-width:0px !important;
      max-width: 160px !important;
      min-height: 160px !important;
      max-height: none !important;
    }
  }
}
</style>
