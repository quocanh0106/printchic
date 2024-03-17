<template>
  <div class="all-screen-home-wrapper">
    <div class="page-container" v-show="pc || lgPc || extraPc">
      <carousel />
      <div class="home-page-introduction-wrapper mt-20">
        <div class="introduction-description">
          <h1 class="font-semibold introduction-title">
            {{ $t("homePage.introductionTitle") }}
          </h1>
          <div class="introduction-actions cursor-pointer mt-8">
            <button class="primary-btn text-white" @click="$router.push(localePath('/contact-us'))">
              {{ $t("ContactUs") }}
            </button>

            <button class="secondary-btn cursor-pointer ml-4">
              {{ $t("button.tryForNow") }}
            </button>
          </div>
        </div>
        <div class="introduction-description">
          <p class="introduction-description mt-5">
            {{ $t("homePage.introductionDes-1") }}
          </p>
          <p class="introduction-description mt-2">
            &#8226; {{ $t("homePage.introductionDes-2") }}
          </p>
          <p class="introduction-description mt-2">
            &#8226; {{ $t("homePage.introductionDes-3") }}
          </p>
          <p class="introduction-description mt-2">
            &#8226; {{ $t("homePage.introductionDes-4") }}
          </p>
        </div>
      </div>

      <!-- Category -->
      <div class="home-page-top-category mt-28">
        <div class="top-category-header">
          <h1 class="top-category-title font-semibold">
            {{ $t("homePage.topCategory") }}
          </h1>
          <a class="top-category-view-all txt-primary cursor-pointer flex flex-row"  @click="$router.push(localePath('/print-on-demand'))">
            <p>{{ $t("viewAll") }}</p>
            <img :src="arrowUpRight" />
          </a>
        </div>
        <swiperComponent :hasDescription="true" :items="data?.data?.items" class="mt-12 mb-8 swiper-cate-pc" />
      </div>

      <!-- Card Infor and Process Explaination -->
      <div class="home-page-proccess-wrapper w-auto">
        <div class="home-page-proccess flex justify-between w-auto mt-20">
          <div class="process-intro w-1/2 fullfillment-title">
            <h1 class="font-semibold introduction-title">
              {{ $t("homePage.onDemandFullFilementService") }}
            </h1>
            <p class="introduction-description mt-5">
              {{ $t("homePage.onDemandFullFilementServiceDes1") }}
            </p>
            <p class="introduction-description">
              {{ $t("homePage.onDemandFullFilementServiceDes2") }}
            </p>
            <a class="flex gap-1 txt-primary cursor-pointer mt-10">
              <p>{{ $t("button.tryForNow") }}</p>
              <img :src="arrowUpRight" />
            </a>
          </div>
          <div class="process-card flex flex-col w-1/2">
            <cardInfor :imgSrc="cardThumbnail" :title="$t('homePage.cardTitle1')"
              :description="$t('homePage.cardDescription1')" />
            <cardInfor :imgSrc="cardThumbnail" :title="$t('homePage.cardTitle2')"
              :description="$t('homePage.cardDescription2')" />
            <cardInfor :imgSrc="cardThumbnail" :title="$t('homePage.cardTitle3')"
              :description="$t('homePage.cardDescription3')" />
            <cardInfor :imgSrc="cardThumbnail" :title="$t('homePage.cardTitle4')"
              :description="$t('homePage.cardDescription4')" />
          </div>
        </div>
      </div>

      <!--Printchic Distinctive  -->

      <div class="distict-motive-wrapper">
        <div class="motive-header text-center">
          <h3 class="section-title font-semibold">
            {{ $t("homePage.distictMotive") }}
          </h3>
          <p class="motive-description mt-4">
            {{ $t("homePage.distictMotiveDes") }}
          </p>
        </div>

        <div class="motive-body flex mt-12 w-100 space-x-64">
          <div class="motive-body-left-wrapper w-1/2">
            <div class="motive-body-left border-left-primary">
              <h5 class="txt-primary font-semibold">
                {{ $t("homePage.distictBodyTitle1") }}
              </h5>
              <p class="mt-3">
                {{ $t("homePage.distictBodyDescription1") }}
              </p>
            </div>
            <div class="motive-body-left mt-8">
              <h5 class="font-semibold">
                {{ $t("homePage.distictBodyTitle2") }}
              </h5>
              <p class="mt-3">
                {{ $t("homePage.distictBodyDescription2") }}
              </p>
            </div>
            <div class="motive-body-left mt-8">
              <h5 class="font-semibold">
                {{ $t("homePage.distictBodyTitle3") }}
              </h5>
              <p class="mt-3">
                {{ $t("homePage.distictBodyDescription3") }}
              </p>
            </div>
            <div class="motive-body-left mt-8">
              <h5 class="font-semibold">
                {{ $t("homePage.distictBodyTitle4") }}
              </h5>
              <p class="mt-3">
                {{ $t("homePage.distictBodyDescription4") }}
              </p>
            </div>
          </div>
          <img class="distinct-img" :src="distictThumbnails" />
        </div>
      </div>

      <!-- Customer Review -->
      <div class="review-wrapper text-center custom-padding">
        <div class="review-header">
          <h1 class="section-title font-semibold">
            {{ $t("homePage.customerReview") }}
          </h1>
          <p class="mt-4">{{ $t("homePage.customerReviewSubtitle") }}</p>
        </div>
        <carousel class="mt-12" />
      </div>

      <!-- blog story -->
      <blog :listBlog="listBlog?.data?.items" class="custom-padding" />

      <!-- Frequently asked question -->
      <faq class="custom-padding" />

      <!-- help -->
      <help :headerTitle="$t('homePage.howCanWeHelp')" :headerDesc="$t('homePage.howCanWeHelpDesc')"
        class="custom-padding" />
    </div>
    <div class="mobile-page-container" v-show="mobile || tablet">
      <div class="introduction-banner-mobile text-white flex flex-col">
        <h1 class="font-semibold section-title">
          {{ $t("homePage.introductionTitle") }}
        </h1>
        <div class="introduction-description">
          <p class="introduction-description mt-5">
            {{ $t("homePage.introductionDes-1") }}
          </p>
          <p class="introduction-description mt-2">
            &#8226; {{ $t("homePage.introductionDes-2") }}
          </p>
          <p class="introduction-description mt-2">
            &#8226; {{ $t("homePage.introductionDes-3") }}
          </p>
          <p class="introduction-description mt-2">
            &#8226; {{ $t("homePage.introductionDes-4") }}
          </p>
        </div>
        <div class="introduction-actions-mobile cursor-pointer flex items-center justify-center mt-8">
          <a class="primary-btn text-white w-100 items-center justify-center flex">
            <p>{{ $t("ContactUs") }}</p>
            <img :src="arrowUpRightWhite" />
          </a>
          <button class="secondary-btn txt-primary cursor-pointer  w-100 ml-4">
            {{ $t("button.tryForNow") }}
          </button>
        </div>
      </div>
      <!-- Category -->
      <div class="home-page-top-category mt-10">
        <div class="top-category-header flex-column">
          <h1 class="top-category-title font-semibold">
            {{ $t("homePage.topCategory") }}
          </h1>
          <a class="top-category-view-all txt-primary cursor-pointer flex flex-row">
            <p>{{ $t("viewAll") }}</p>
            <img :src="arrowUpRight" />
          </a>
        </div>
        <swiperComponent class="mt-12 mb-8 swiper-mobile-top-category" :items="data.data.items" :slidePerView="tablet ? 4 : 2" />
      </div>

      <!-- Card Infor and Process Explaination -->
      <div class="home-page-proccess-mobile-wrapper w-auto">
        <div
          class="home-page-proccess-mobile bg-light-gray1-custom flex flex-col justify-center items-center w-auto custom-padding-mobile">
          <div class="process-intro-mobile text-center fullfillment-title flex flex-col items-center">
            <h1 class="font-semibold section-title">
              {{ $t("homePage.onDemandFullFilementService") }}
            </h1>
            <p class="introduction-description mt-5">
              {{ $t("homePage.onDemandFullFilementServiceDes1") }}
            </p>
            <p class="introduction-description">
              {{ $t("homePage.onDemandFullFilementServiceDes2") }}
            </p>
            <a class="flex gap-1 txt-primary cursor-pointer mt-10">
              <p>{{ $t("button.tryForNow") }}</p>
              <img :src="arrowUpRight" />
            </a>
          </div>
          <div class="process-card flex flex-col mt-10">
            <cardInfor :imgSrc="cardThumbnail" :title="$t('homePage.cardTitle1')"
              :description="$t('homePage.cardDescription1')" />
            <cardInfor :imgSrc="cardThumbnail" :title="$t('homePage.cardTitle2')"
              :description="$t('homePage.cardDescription2')" />
            <cardInfor :imgSrc="cardThumbnail" :title="$t('homePage.cardTitle3')"
              :description="$t('homePage.cardDescription3')" />
            <cardInfor :imgSrc="cardThumbnail" :title="$t('homePage.cardTitle4')"
              :description="$t('homePage.cardDescription4')" />
          </div>
        </div>
      </div>

      <!--Printchic Distinctive  -->

      <div class="distict-motive-mobile-wrapper custom-padding-mobile">
        <div class="motive-header text-center flex flex-col items-center mt-12">
          <h3 class="section-title font-semibold">
            {{ $t("homePage.distictMotive") }}
          </h3>
          <p class="motive-description mt-4">
            {{ $t("homePage.distictMotiveDes") }}
          </p>
        </div>

        <div class="motive-body flex flex-col mt-12 w-100 space-x-64">
          <div class="motive-body-left-wrapper">
            <img :src="distictThumbnails" class="mb-5 w-100" />
          </div>
        </div>
        <SwiperDescriptionMobile class="mt-12 mb-8" />
      </div>

      <!-- Customer Review -->
      <div class="review-wrapper text-center custom-padding">
        <div class="review-header">
          <h1 class="section-title font-semibold">
            {{ $t("homePage.customerReview") }}
          </h1>
          <p class="mt-4">{{ $t("homePage.customerReviewSubtitle") }}</p>
        </div>
        <carousel class="mt-12" />
      </div>

      <!-- blog story -->
      <div class="home-page-top-category mt-10">
        <div class="top-category-header flex-column">
          <h1 class="top-category-title font-semibold">
            {{ $t("homePage.ourBlogStory") }}
          </h1>
          <a class="top-category-view-all txt-primary cursor-pointer flex flex-row mt-4">
            <p>{{ $t("viewAll") }}</p>
            <img :src="arrowUpRight" />
          </a>
        </div>
        <SwiperBlogMobile class="blog-mobile-swiper mt-12 mb-8" :items="listBlog?.data?.items" :slidePerView="1" />
      </div>

      <!-- Frequently asked question -->
      <faq class="custom-padding-mobile pt-0" />
      <!-- help -->
      <help :headerTitle="$t('homePage.howCanWeHelp')" :headerDesc="$t('homePage.howCanWeHelpDesc')"
        class="custom-padding-mobile" />
    </div>
  </div>
</template>

<script setup lang="js">
// import  img
import introImage from "../assets/images/introImage.png";
import distictThumbnails from "../assets/images/distictThumbnail.png";
import arrowUpRight from "../assets/svg/arrowUpRight.svg";
import arrowUpRightWhite from "../assets/svg/iconUpRightWhite.svg";
import cardThumbnail from "../assets/svg/cardThumbNail.svg";
// import component
import carousel from "../components/carousel.vue";
import cardInfor from "../components/cardInfor.vue";
import blog from "../components/blog.vue";
import faq from "../components/faq.vue";
import help from "../components/help.vue";
import swiperComponent from "../components/swiperComponent.vue";
import SwiperDescriptionMobile from "./home/components/SwiperDescriptionMobile.vue";
import SwiperBlogMobile from "./home/components/SwiperBlogMobile.vue";
import useWidthScreen from '~/composables/useWidthScreen';
import { useI18n, useLocalePath, useSwitchLocalePath } from '#imports'
const { screenWidth, mobile, tablet, pc, lgPc, extraPc } = useWidthScreen();
const { t } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const { data }  = await useAsyncData(
  'categoryProduct',
  () => $fetch('http://printchic-api.tvo-solution.net/auth/categoryProduct/list')
)


const listBlog  = await useAsyncData(
  'blog',
  () => $fetch('http://printchic-api.tvo-solution.net/auth/blog/list')
)?.data
</script>

<style scoped lang="scss">
.home-page-introduction-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px 120px;

  .introduction-description {
    width: 100%;
  }

  .introduction-title {
    font-size: 40px;
    line-height: 50px;
    width: 60%;
  }

  .introduction-description {
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
  }

  .introduction-actions {
    width: 100%;
    min-height: 50px;
  }
}

.home-page-top-category {
  padding: 30px 120px;

  .top-category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .top-category-title {
      font-size: 50px;
      line-height: 41.6px;
    }
  }

  .top-category-view-all {
    display: flex;
  }
}

.home-page-proccess-wrapper {
  background-color: #f9fafb;
  padding: 80px 120px;

  .process-intro {
    .introduction-title {
      font-size: 40px;
      line-height: 50px;
      width: 60%;
    }
  }
}

.distict-motive-wrapper {
  padding: 80px 120px;

  .motive-title {
    font-size: 32px;
    line-height: 41.6px;
  }

  .motive-description {
    font-size: 16px;
    line-height: 24px;
  }

  .motive-body-left {
    padding: 0px 24px;
  }
}

.review-wrapper {
  background-color: #eff4ff;
}

/* Tablet and below styles */
@media (max-width: 1024px) {
  .home-page-introduction-wrapper {
    flex-direction: column;
    /* Stack content vertically on smaller screens */
    padding: 20px;

    /* Reduce padding */
    .introduction-title {
      font-size: 32px;
      /* Adjust font size for tablet */
      line-height: 42px;
      width: 100%;
      /* Use full width */
    }

    .introduction-description {
      font-size: 14px;
      /* Adjust font size for readability */
      line-height: 22px;
    }
  }

  .home-page-top-category,
  .home-page-proccess-wrapper,
  .distict-motive-wrapper {
    padding: 20px;
    /* Uniform padding for sections */
  }

  .home-page-top-category .top-category-header .top-category-title,
  .home-page-proccess-wrapper .process-intro .introduction-title,
  .distict-motive-wrapper .motive-header .section-title {
    font-size: 24px;
    /* Adjust main section titles */
  }

  .motive-body {
    display: flex;
    // flex-direction: column;

    // Target all child elements except the last one to add vertical spacing
    &>*:not(:last-child) {
      margin-bottom: 1rem; // Assuming '4' translates to 1rem, adjust as needed
    }
  }

  .review-wrapper,
  .custom-padding {
    padding: 20px;
  }
  /* Adjust padding for custom sections */
}

.introduction-banner-mobile {
  background: url("../assets/images/introImage.png");
  background-size: cover;
  padding: 190px 16px;
  height: 800px;
}

.distinct-img{
  width: 30vw;
  object-fit: cover;
}

.home-page-proccess{
  flex-direction: row;
  @media screen and (max-width:1300px) {
      flex-direction: column;
      align-items: center;
      justify-content: center;
  }
}

.process-card {
  @media screen and (max-width:1300px) {
    width: 100%;
  }
}

.introduction-title{
  @media screen and (max-width:1300px) {
    width: 100%;
    text-align: center;
  }
}

.process-intro{
  @media screen and (max-width:1300px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
.swiper-mobile-top-category{
  :deep(.swiper-thumbnail){
      min-width:0px !important;
      max-width: 160px !important;
      min-height: 160px !important;
      max-height: none !important;
  }
}
.swiper-cate-pc{
  :deep(.swiper-thumbnail){
      min-width:0px !important;
      width: 15vw !important;
      height: 15vw !important;
      object-fit:cover;
      max-height: none !important;
  }
}

.swiper-mobile-top-category{
  :deep(.swiper-thumbnail){
      min-width:0px !important;
      width: 25vw !important;
      height: 25vw !important;
      object-fit:cover;
      max-height: none !important;
  }
}

.blog-mobile-swiper{
  :deep(.small-img-blog){
    height: 40vh !important;
    object-fit:cover;
  }
}
</style>
