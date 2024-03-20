<template>
  <div class="how-it-works-wrapper">
    <div v-show="pc || lgPc || extraPc">
      <!-- header -->
      <div class="how-it-works-header-wrapper custom-padding">
        <div class="how-it-works-header">
          <div class="content-wrapper mw-378px">
            <h1 class="section-title font-semibold">{{ $t('howItWorks.headerTitle') }}</h1>
            <p class="mt-5">{{ $t('howItWorks.headerDesc1') }}</p>
            <p>{{ $t('howItWorks.headerDesc2') }}</p>
            <div class="action flex mt-8">
              <a class="primary-btn text-white flex">
                {{ $t("button.CTA") }}
                <img :src="arrowUpRightWhite" />
              </a>

              <button class="secondary-btn cursor-pointer ml-4">
                {{ $t("ContactUs") }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Logo of Company -->
      <div class="company-collab bg-light-gray1-custom mt-20 custom-padding">
        <h1 class="text-lg font-semibold text-center">{{ $t('howItWorks.partnerTitle') }}</h1>
        <swiperComponent :slidePerView="6" :showNavigation="false" :showPagination="false" :items="listLogoRef" class="mt-12 mb-8 how-it-work-slider-logo" />
      </div>

      <!-- Counter -->
      <div class="counter-wrapper flex items-center justify-between custom-padding">
        <div class="" v-for="(item, index) in counterInfor" :key="index">
          <cardCounterVue :amount="item.amount" :title="item.title" :description="item.description" />
        </div>
      </div>

      <div class="step-hiw custom-padding flex justify-between items-center bg-light-gray1-custom">
        <div class="step-content">
          <h1 class="txt-primary text-lg">{{ $t('howItWorks.step1') }}</h1>
          <h1 class="mt-4 font-semibold section-title">{{ $t('howItWorks.step1Title') }}</h1>
          <p class="mt-4 mw-379px">{{ $t('howItWorks.step1Desc') }}</p>
          <a class="txt-primary font-semibold mt-8 flex">
            <p>{{ $t('button.learnMore') }}</p> <img :src="arrowUpRight" />
          </a>
        </div>
        <img :src="step1" />
      </div>

      <div class="step-hiw custom-padding flex justify-between items-center">
        <img :src="step2" />
        <div class="step-content">
          <h1 class="txt-primary text-lg">{{ $t('howItWorks.step2') }}</h1>
          <h1 class="mt-4 font-semibold section-title">{{ $t('howItWorks.step2Title') }}</h1>
          <p class="mt-4 mw-379px">{{ $t('howItWorks.step2Desc') }}</p>
          <a class="txt-primary font-semibold mt-8 flex">
            <p>{{ $t('button.learnMore') }}</p> <img :src="arrowUpRight" />
          </a>
        </div>
      </div>

      <div class="step-hiw custom-padding flex justify-between items-center bg-light-gray1-custom">
        <div class="step-content">
          <h1 class="txt-primary text-lg">{{ $t('howItWorks.step3') }}</h1>
          <h1 class="mt-4 font-semibold section-title">{{ $t('howItWorks.step3Title') }}</h1>
          <p class="mt-4 mw-379px">{{ $t('howItWorks.step3Desc') }}</p>
          <a class="txt-primary font-semibold mt-8 flex">
            <p>{{ $t('button.learnMore') }}</p> <img :src="arrowUpRight" />
          </a>
        </div>
        <img :src="step3" />
      </div>

      <div class="step-hiw custom-padding flex justify-between items-center">
        <img :src="step4" />
        <div class="step-content">
          <h1 class="txt-primary text-lg">{{ $t('howItWorks.step4') }}</h1>
          <h1 class="mt-4 font-semibold section-title">{{ $t('howItWorks.step4Title') }}</h1>
          <p class="mt-4 mw-379px">{{ $t('howItWorks.step4Desc') }}</p>
          <a class="txt-primary font-semibold mt-8 flex">
            <p>{{ $t('button.learnMore') }}</p> <img :src="arrowUpRight" />
          </a>
        </div>
      </div>
      <!-- Frequently asked question -->
      <faq class="mt-20 custom-padding" />

      <!-- help -->
      <help :headerTitle="$t('homePage.howCanWeHelp')" :headerDesc="$t('homePage.howCanWeHelpDesc')"
        class="mt-20 custom-padding" />
    </div>
    <div v-show="mobile || tablet">
      <!-- header -->
      <div class="how-it-works-header-wrapper">
        <div class="how-it-works-header-mobile">
          <img class="image-header" :src="imgHoldingPhone"/>
        </div>
        <div class="content-wrapper mt-2 px-3">
          <h1 class="section-title font-semibold">{{ $t('howItWorks.headerTitle') }}</h1>
          <p class="mt-5">{{ $t('howItWorks.headerDesc1') }}</p>
          <p>{{ $t('howItWorks.headerDesc2') }}</p>
          <div class="action flex mt-8 justify-center w-100">
            <a class="primary-btn btn-signup-for-free-mobile text-white flex items-center w-100" :class="mobile?'justify-between' : 'justify-center'">
              <p>{{ $t("button.signUpForFree") }}</p>
              <img :src="arrowUpRightWhite" />
            </a>

            <button class="secondary-btn cursor-pointer ml-4 w-100">
              {{ $t("ContactUs") }}
            </button>
          </div>
        </div>
      </div>
      <!-- Logo of Company -->
      <div class="company-collab bg-light-gray1-custom mt-12">
        <h1 class="text-lg font-semibold text-center pt-5">{{ $t('howItWorks.partnerTitle') }}</h1>
        <swiperComponent :slidePerView="mobile ? 2 : 4" :showNavigation="false" :items="listLogoRef" :showPagination="true" class="mt-12 mb-8 mx-3 how-it-work-slider-logo" />
      </div>

      <!-- Counter -->
      <div class="counter-wrapper flex items-center justify-between flex-column px-3">
        <div class="w-100" v-for="(item, index) in counterInfor" :key="index">
          <cardCounterVue :amount="item.amount" :title="item.title" :description="item.description" />
        </div>
      </div>

      <div class="step-hiw flex justify-between items-center py-12 bg-light-gray1-custom flex-column px-3 mb-10">
        <div class="step-content">
          <img :src="step1" />
          <h1 class="txt-primary text-lg mt-5 font-canevat">{{ $t('howItWorks.step1') }}</h1>
          <h1 class="mt-4 font-semibold section-title">{{ $t('howItWorks.step1Title') }}</h1>
          <p class="mt-4 mw-379px">{{ $t('howItWorks.step1Desc') }}</p>
          <a class="txt-primary font-semibold mt-3 flex mb-8">
            <p>{{ $t('button.learnMore') }}</p> <img :src="arrowUpRight" />
          </a>
        </div>
      </div>

      <div class="step-hiw flex justify-between items-center flex-column py-12 px-3 mb-10">
        <div class="step-content">
          <img :src="step2" />
          <h1 class="txt-primary text-lg mt-5 font-canevat">{{ $t('howItWorks.step2') }}</h1>
          <h1 class="mt-4 font-semibold section-title">{{ $t('howItWorks.step2Title') }}</h1>
          <p class="mt-4 mw-379px">{{ $t('howItWorks.step2Desc') }}</p>
          <a class="txt-primary font-semibold mt-3 flex mb-8">
            <p>{{ $t('button.learnMore') }}</p> <img :src="arrowUpRight" />
          </a>
        </div>
      </div>

      <div class="step-hiw flex justify-between items-center py-12 bg-light-gray1-custom flex-column px-3 mb-10">
        <div class="step-content">
          <img :src="step3" />
          <h1 class="txt-primary text-lg mt-5 font-canevat">{{ $t('howItWorks.step3') }}</h1>
          <h1 class="mt-4 font-semibold section-title">{{ $t('howItWorks.step3Title') }}</h1>
          <p class="mt-4 mw-379px ">{{ $t('howItWorks.step3Desc') }}</p>
          <a class="txt-primary font-semibold mt-3 flex mb-8">
            <p>{{ $t('button.learnMore') }}</p> <img :src="arrowUpRight" />
          </a>
        </div>
      </div>

      <div class="step-hiw flex justify-between items-center py-12 flex-column px-3 mb-10">
        <div class="step-content">
          <img :src="step4" />
          <h1 class="txt-primary text-lg mt-5 font-canevat">{{ $t('howItWorks.step4') }}</h1>
          <h1 class="mt-4 font-semibold section-title">{{ $t('howItWorks.step4Title') }}</h1>
          <p class="mt-4 mw-379px ">{{ $t('howItWorks.step4Desc') }}</p>
          <a class="txt-primary font-semibold mt-3 flex mb-8">
            <p>{{ $t('button.learnMore') }}</p> <img :src="arrowUpRight" />
          </a>
        </div>
      </div>

      <!-- Frequently asked question -->
      <faq />

      <!-- help -->
      <help :headerTitle="$t('homePage.howCanWeHelp')" :headerDesc="$t('homePage.howCanWeHelpDesc')" class="mt-10"/>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import help from '~/components/help.vue';
import faq from '~/components/faq.vue';
import swiperComponent from '~/components/swiperComponent.vue';
import cardCounterVue from '~/components/cardCounter.vue';
import imgHoldingPhone from '~/assets/svg/holding-phone.svg';
import Default from '~/layouts/default.vue';
import arrowUpRightWhite from '~/assets/svg/iconUpRightWhite.svg';
import step1 from '~/assets/images/step1.png';
import step2 from '~/assets/images/step2.png';
import step3 from '~/assets/images/step3.png';
import step4 from '~/assets/images/step4.png';
import arrowUpRight from '~/assets/svg/arrowUpRight.svg';
import logo1 from '~/assets/svg/logoTemplate/logoTemplate1.svg'
import logo2 from '~/assets/svg/logoTemplate/logoTemplate2.svg'
import logo3 from '~/assets/svg/logoTemplate/logoTemplate3.svg'
import logo4 from '~/assets/svg/logoTemplate/logoTemplate4.svg'
import logo5 from '~/assets/svg/logoTemplate/logoTemplate5.svg'
import logo6 from '~/assets/svg/logoTemplate/logoTemplate6.svg'

// Convert mixins to composables if possible. If myMixin contains global properties or methods, 
// you might need to create a composable or find another way to integrate the logic.
const { screenWidth, mobile, tablet, pc, lgPc, extraPc, isLoading } = useWidthScreen();

// Data properties converted to ref
const imgHoldingPhoneRef = ref(imgHoldingPhone);
const arrowUpRightWhiteRef = ref(arrowUpRightWhite);
const arrowUpRightRef = ref(arrowUpRight);
const step1Ref = ref(step1);
const step2Ref = ref(step2);
const step3Ref = ref(step3);
const step4Ref = ref(step4);
const listLogoRef = ref([logo1,logo2,logo3,logo4,logo5,logo6]);

const counterInfor = ref([
  {
    amount: "420+",
    title: "servicePage.counter1Title", // Use t function for translations
    description: "servicePage.counter1Des",
  },
  {
    amount: "90,350+",
    title: "servicePage.counter2Title",
    description: "servicePage.counter2Des",
  },
  {
    amount: "180+",
    title: "servicePage.counter3Title",
    description: "servicePage.counter3Des",
  },
  {
    amount: "2.5M+",
    title: "servicePage.counter4Title",
    description: "servicePage.counter4Des",
  },
]);

// Use useI18n from vue-i18n if you need to translate strings
const { t } = useI18n();

// If there are any methods or lifecycle hooks from the original component, 
// they should be converted to the Composition API style.

</script>

<style lang="scss" scoped>
.how-it-works-header {
  background-color: #EFF4FF;
  padding: 144px 10vw;
  background-image: url('../../assets/svg/holding-phone.svg');
  background-position: bottom right;
  background-position-x: 60vw;
  height: 702px;
  border-radius: 10px;
}

.how-it-works-header-mobile {
  background-color: #EFF4FF;
  background-position: center;
  height: 343px;
  max-height: 343px;
  border-radius: 10px;
  display:flex;
  padding-top:20px;
  justify-content:center;
}

.how-it-work-slider{
  :deep(.swiper-wrapper){
    padding-bottom: 0px;
  }
}
.image-header{
  max-height: inherit;
}
.btn-signup-for-free-mobile{
  padding: 12px 11px !important;
}

.how-it-work-slider-logo{
  :deep(.swiper-thumbnail){
    min-width:0px !important;
    max-width: 12vw !important;
    min-height: 12vw !important;
    max-height: none !important;
  }
  :deep(.swiper-wrapper){
    padding-bottom: 0px !important;
  }
  @media screen and (max-width: 992px){
    :deep(.swiper-thumbnail){
      min-width:0px !important;
      max-width: 160px !important;
      min-height: 160px !important;
      max-height: none !important;
    }
    :deep(.swiper-wrapper){
      padding-bottom: 50px !important;
    }
  }

  @media screen and (max-width: 700px){
    :deep(.swiper-thumbnail){
      min-width:0px !important;
      max-width: 160px !important;
      min-height: 160px !important;
      max-height: none !important;
    }
    :deep(.swiper-wrapper){
      padding-bottom: 50px !important;
    }
  }
}
</style>
