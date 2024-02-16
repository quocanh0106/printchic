<template>
  <div class="how-it-works-wrapper">

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
                    
                    <v-button class="secondary-btn cursor-pointer ml-4">
                        {{ $t("ContactUs") }}
                    </v-button>
                </div>
            </div>
        </div>
    </div>
    <!-- Logo of Company -->
    <div class="company-collab bg-light-gray1-custom mt-20 custom-padding">
        <h1 class="text-lg font-semibold text-center">{{ $t('howItWorks.partnerTitle') }}</h1>
        <swiperComponent :slidePerView = "6" :showNavigation="false" :showPagination="false" class="mt-12 mb-8" />
    </div>

    <!-- Counter -->
    <div
        class="counter-wrapper flex items-center justify-between custom-padding"
      >
        <div class="" v-for="(item, index) in counterInfor" :key="index">
          <cardCounterVue
            :amount="item.amount"
            :title="item.title"
            :description="item.description"
          />
        </div>
      </div>
    
    <div class="step-hiw custom-padding flex justify-between items-center bg-light-gray1-custom">
        <div class="step-content">
            <h1 class="txt-primary text-lg">{{ $t('howItWorks.step1') }}</h1>
            <h1 class="mt-4 font-semibold section-title">{{ $t('howItWorks.step1Title') }}</h1>
            <p class="mt-4 mw-379px">{{ $t('howItWorks.step1Desc') }}</p>
            <a class="txt-primary font-semibold mt-8 flex"> <p>{{  $t('button.learnMore') }}</p> <img :src="arrowUpRight"/> </a>
        </div>
        <img :src="step1"/>
    </div>

    <div class="step-hiw custom-padding flex justify-between items-center">
        <img :src="step2"/>
        <div class="step-content">
            <h1 class="txt-primary text-lg">{{ $t('howItWorks.step2') }}</h1>
            <h1 class="mt-4 font-semibold section-title">{{ $t('howItWorks.step2Title') }}</h1>
            <p class="mt-4 mw-379px">{{ $t('howItWorks.step2Desc') }}</p>
            <a class="txt-primary font-semibold mt-8 flex"> <p>{{  $t('button.learnMore') }}</p> <img :src="arrowUpRight"/> </a>
        </div>
    </div>

    <div class="step-hiw custom-padding flex justify-between items-center bg-light-gray1-custom">
        <div class="step-content">
            <h1 class="txt-primary text-lg">{{ $t('howItWorks.step3') }}</h1>
            <h1 class="mt-4 font-semibold section-title">{{ $t('howItWorks.step3Title') }}</h1>
            <p class="mt-4 mw-379px">{{ $t('howItWorks.step3Desc') }}</p>
            <a class="txt-primary font-semibold mt-8 flex"> <p>{{  $t('button.learnMore') }}</p> <img :src="arrowUpRight"/> </a>
        </div>
        <img :src="step3"/>
    </div>

    <div class="step-hiw custom-padding flex justify-between items-center">
        <img :src="step4"/>
        <div class="step-content">
            <h1 class="txt-primary text-lg">{{ $t('howItWorks.step1') }}</h1>
            <h1 class="mt-4 font-semibold section-title">{{ $t('howItWorks.step4Title') }}</h1>
            <p class="mt-4 mw-379px">{{ $t('howItWorks.step4Desc') }}</p>
            <a class="txt-primary font-semibold mt-8 flex"> <p>{{  $t('button.learnMore') }}</p> <img :src="arrowUpRight"/> </a>
        </div>
    </div>
    <!-- Frequently asked question -->
    <faq class="mt-20 custom-padding" />

    <!-- help -->
    <help :headerTitle="$t('homePage.howCanWeHelp')" :headerDesc="$t('homePage.howCanWeHelpDesc')" class="mt-20 custom-padding" />
  </div>
</template>

<script>
import help from "../../components/help.vue";
import faq from "../../components/faq.vue";
import swiperComponent from "../../components/swiperComponent.vue";
import cardCounterVue from "../../components/cardCounter.vue"; //

// import assets 
import imgHoldingPhone from "../../assets/svg/holding-phone.svg"
import Default from '../../layouts/default.vue';
import arrowUpRightWhite from "../../assets/svg/iconUpRightWhite.svg";
import step1 from "../../assets/images/step1.png";
import step2 from "../../assets/images/step2.png";
import step3 from "../../assets/images/step3.png";
import step4 from "../../assets/images/step4.png";
import arrowUpRight from "../../assets/svg/arrowUpRight.svg";

export default {
    components: {
        help,
        faq,
        Default,
        swiperComponent,
        cardCounterVue,
    },
  data() {
    return {
        imgHoldingPhone,
        arrowUpRightWhite,
        arrowUpRight,
        step1,
        step2,
        step3,
        step4,
        listLogo: [],
        counterInfor: [
        {
          amount: "420+",
          title: this.$t("servicePage.counter1Title"),
          description: this.$t("servicePage.counter1Des"),
        },
        {
          amount: "90,350+",
          title: this.$t("servicePage.counter2Title"),
          description: this.$t("servicePage.counter2Des"),
        },
        {
          amount: "180+",
          title: this.$t("servicePage.counter3Title"),
          description: this.$t("servicePage.counter3Des"),
        },
        {
          amount: "2.5M+",
          title: this.$t("servicePage.counter4Title"),
          description: this.$t("servicePage.counter4Des"),
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.how-it-works-header{
    background-color: #EFF4FF;
    padding: 144px 10vw;
    background-image: url('../../assets/svg/holding-phone.svg');
    background-position: bottom right;
    background-position-x: 60vw;
    height: 702px;
    border-radius: 10px;
}
</style>
