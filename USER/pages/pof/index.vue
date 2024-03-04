<template>
  <div class="pod-page-warpper-all-screen">
    <div class="pod-page-warpper" v-show="pc">
      <div class="pod-intro-banner">
        <div
          class="pod-intro-carousel p-6 bg-white shadow rounded-lg flex items-center justify-between"
        >
          <div class="w-100 flex flex-col">
            <h2 class="text-lg font-semibold current-text">{{ currentText }}</h2>
            <div class="flex justify-between items-center mt-2">
              <div class="pagination flex">
                <span
                  v-for="(item, index) in texts"
                  :key="index"
                  :class="{
                    'bg-blue-500': currentIndex === index,
                    'bg-gray-300': currentIndex !== index,
                  }"
                  class="h-2 w-2 mx-1 rounded-full"
                ></span>
              </div>
              <div class="action-btns">
                <button
                  @click="prev"
                  :disabled="!(currentIndex > 0)"
                  class="text-blue-500 hover:text-blue-700"
                >
                  prev
                </button>
  
                <button
                  :disabled="!(currentIndex < texts.length - 1)"
                  @click="next"
                  class="text-blue-500 hover:text-blue-700"
                >
                  next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- fullfillment centers -->
      <div class="fullfillment-center bg-light-blue-custom">
        <div class="fullfillment-center-wrapper custom-padding">
          <div
            class="fullfillment-center-title flex flex-col justify-center items-center"
          >
            <h1 class="section-title font-semibold">
              {{ $t("contactUs.fullFillMentTitle") }}
            </h1>
            <p class="mt-4 mw-584px text-center">
              {{ $t("contactUs.fullFillMentDes") }}
            </p>
          </div>
          <div class="fullfillment-img flex justify-between mt-12 gap-x-8">
            <img :src="UK" />
            <img :src="US" />
            <img :src="FRANCE" />
            <img :src="GERMANY" />
          </div>
        </div>
      </div>
  
      <!-- Vietnam-based Production Capacity -->
      <div
        class="w-100 production-capacity flex gap-x-8 bg-light-gray1-custom custom-padding"
      >
        <div class="content w-100">
          <h1 class="section-title font-semibold mt-4">
            {{ $t("contactUs.vietNameBaseTitle") }}
          </h1>
          <p class="mt-4">{{ $t("contactUs.fullFillMentDes") }}</p>
        </div>
        <div class="capacity-card-info w-100">
          <div class="infor-card flex flex-col">
            <cardInfor
              :imgSrc="cardThumbnail"
              title="+53,800-sq/ft"
              :description="$t('contactUs.manufactureFacility')"
            />
            <cardInfor
              :imgSrc="cardThumbnail"
              title="+420"
              :description="$t('contactUs.highQualityProduct')"
            />
            <cardInfor
              :imgSrc="cardThumbnail"
              title="+90,350"
              :description="$t('contactUs.highShipment')"
            />
            <cardInfor
              :imgSrc="cardThumbnail"
              title="$2.5 M+"
              :description="$t('contactUs.investEquip')"
            />
            <cardInfor
              :imgSrc="cardThumbnail"
              title="+1000"
              :description="$t('contactUs.highQualityWorkForce')"
            />
          </div>
        </div>
      </div>
  
      <!-- Featured printing technique  -->
      <div class="feature-printing-technique-wrapper flex flex-col justify-center items-center custom-padding">
        <h1 class="section-title font-semibold">{{ $t('contactUs.featuredPrintingTechnique') }}</h1>
        <p class="section-content mw-584px text-center mt-4">{{ $t('contactUs.featuredPrintingTechniqueDes') }}</p>
        <div class="technique-tags flex flex-col gap-x-3 mt-8">
          <div class="flex" >
            <span class="cursor-pointer" :class="currentTechNiqueTags == ind ? 'active-tag' : 'not-active-tag'" @click="currentTechNiqueTags = ind" v-for="tag,ind in techNiqueTags" :key="ind" >
              {{ tag.name }}
            </span>
          </div>
          <div class="img-wrapper mt-12 w-100">
            <span v-for="img,index in techNiqueTags" :key="index">
              <span class="flex justify-between" v-if="currentTechNiqueTags == index">
                <img :src="thumb" v-for="thumb, _index in img.img" :key="_index"/>
              </span>
            </span>
          </div>
        </div>
        <span class="flex mt-12">
          <p class="txt-primary cursor-pointer">{{ $t('pof.exploreMore') }}</p>
          <img :src="arrowUpRight"/>
        </span>
      </div>
  
      <!-- Quality control Process -->
      <div class="quality-control-process flex flex-col justify-center items-center bg-light-gray1-custom custom-padding">
        <h1 class="section-title font-semibold">{{ $t('pof.qualityControlProcess') }}</h1>
        <p class="section-content text-center mt-6 mw-790px">{{ $t('pof.qualityControl') }}</p>
  
        <div class="flex gap-x-8 mt-12">
          <div class="quality-thumbs-n-content flex flex-col " v-for="item,ind in qualityControlProcess" :key="ind">
            <img :src="item.img"/>
            <h1 class="mt-5 text-2xl txt-primary font-semibold">{{ item.stt }}</h1>
            <h1 class="mt-3 font-semibold">{{ item.title }}</h1>
            <p class="mt-2">{{ item.content }}</p>
          </div>
        </div>
      </div>
      
       <!-- Product showcase -->
       <div class="product-showcase custom-padding">
          <div class="product-showcase flex justify-between">
            <h1 class="section-title font-semibold">
              {{ $t("pof.productShowcase") }}
            </h1>
            <a class="top-category-view-all txt-primary cursor-pointer flex flex-row justify-center items-center">
              <p class="">{{ $t("pof.discoverMore") }}</p>
              <img :src="arrowUpRight" />
            </a>
          </div>
          <swiperComponent :showPagination="false" :slidePerView = "6"  class="mt-12 mb-8" />
        </div>
      
      <!-- fullfilment & shipping -->
      <div class="fullfillment-shippping flex flex-col justify-between text-white custom-padding">
        <div class="flex flex-column">
          <h1 class="section-title">{{ $t('pof.fullFillMentNShipping') }}</h1>
          <h1 class="mt-5">{{ $t('pof.fullFillMentNShippingDes') }}</h1>
        </div>
        <div class="content-wrapper flex items-start gap-x-8">
          <div class="shipping-content" v-for="item,index in fullFillMentContent" :key="index">
            {{ item }}
          </div>
        </div>
      </div>
  
      <!-- how merchanzie can help  -->
      <div class="flex custom-padding justify-between w-100">
        <div class="title-of-merchanize w-100">
          <h1 class="section-title font-semibold mt-4">{{ $t('pof.howMerchanizeCanHelpYourBusiness') }}</h1>
          <p class="mt-4">{{ $t('pof.howMerchanizeCanHelpYourBusinessDes') }}</p>
          <span class="flex mt-10">
            <p class="txt-primary">{{  $t('pof.seePricing') }}</p>
            <img class="ml-1.5" :src="arrowUpRight"/>
          </span>
        </div>
        <div class="process-card flex flex-col gap-y-8 w-1/2">
          <span class="flex gap-x-8">
            <cardInfor class="card-info-merchanize" :imgSrc="cardThumbnail" :title="$t('homePage.cardTitle1')"
              :description="$t('homePage.cardDescription1')" />
            <cardInfor class="card-info-merchanize" :imgSrc="cardThumbnail" :title="$t('homePage.cardTitle2')"
              :description="$t('homePage.cardDescription2')" />
          </span>
          <span class="flex gap-x-8" >
            <cardInfor class="card-info-merchanize" :imgSrc="cardThumbnail" :title="$t('homePage.cardTitle3')"
              :description="$t('homePage.cardDescription3')" />
            <cardInfor class="card-info-merchanize" :imgSrc="cardThumbnail" :title="$t('homePage.cardTitle4')"
              :description="$t('homePage.cardDescription4')" />
          </span>
        </div>
      </div>
  
      <!-- more ways to support your brand -->
      <div class="bg-light-gray1-custom custom-padding">
        <div class="distict-motive-wrapper">
          <div class="motive-header text-center">
            <h3 class="section-title font-semibold">
              {{ $t("pof.moreWayWeevSupportedBrand") }}
            </h3>
            <p class="motive-description mt-4">
              {{ $t("pof.moreWayWeevSupportedBrandDes") }}
            </p>
          </div>
  
          <div class="motive-body flex mt-12 w-100 space-x-64">
            <img :src="distictThumbnails" />
            <div class="motive-body-left-wrapper w-1/2">
              <div class="motive-body-left border-left-primary">
                <h5 class="txt-primary font-semibold">
                  {{ $t("pof.infoCard1Title") }}
                </h5>
                <p class="mt-3">
                  {{ $t("pof.infoCard1Des") }}
                </p>
              </div>
              <div class="motive-body-left mt-8">
                <h5 class="font-semibold">
                  {{ $t("pof.infoCard2Title") }}
                </h5>
                <p class="mt-3">
                  {{ $t("pof.infoCard2Des") }}
                </p>
              </div>
              <div class="motive-body-left mt-8">
                <h5 class="font-semibold">
                  {{ $t("pof.infoCard3Title") }}
                </h5>
                <p class="mt-3">
                  {{ $t("pof.infoCard3Des") }}
                </p>
              </div>
              <div class="motive-body-left mt-8">
                <h5 class="font-semibold">
                  {{ $t("pof.infoCard4Title") }}
                </h5>
                <p class="mt-3">
                  {{ $t("pof.infoCard4Des") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Manufacturing Galery -->
      <div class="manufacturing-galery-wrapper">
        <div class="header-of-manufacturing-galery custom-padding flex flex-col items-center justify-center">
          <h1 class="section-title font-semibold">{{ $t('pof.manuFacturingGallery') }}</h1>
          <p class="mt-4 mw-790px text-center">{{  $t('pof.manuFacturingGalleryDes') }}</p>
        </div>
  
        <swiperComponent class="manufacturing-galery mt-12 mb-8" :showPagination="false" :showNavigation="true" :slidePerView = "5"  />
        
      </div>
      <!-- help -->
      <help
        :headerTitle="$t('homePage.howCanWeHelp')"
        :headerDesc="$t('homePage.howCanWeHelpDesc')"
        class="custom-padding"
      />
    </div>
    <div class="pod-page-warpper" v-show="mobile || tablet">
      <div class="pod-intro-banner">
        <div
          class="pod-intro-carousel-mobile p-6 bg-white shadow rounded-lg flex items-center justify-between"
        >
          <div class="w-100 flex flex-col">
            <h2 class="text-lg font-semibold current-text">{{ currentText }}</h2>
            <div class="flex justify-between items-center mt-2">
              <div class="pagination flex">
                <span
                  v-for="(item, index) in texts"
                  :key="index"
                  :class="{
                    'bg-blue-500': currentIndex === index,
                    'bg-gray-300': currentIndex !== index,
                  }"
                  class="h-2 w-2 mx-1 rounded-full"
                ></span>
              </div>
              <div class="action-btns">
                <button
                  @click="prev"
                  :disabled="!(currentIndex > 0)"
                  class="text-blue-500 hover:text-blue-700 mr-5"
                >
                  prev
                </button>
  
                <button
                  :disabled="!(currentIndex < texts.length - 1)"
                  @click="next"
                  class="text-blue-500 hover:text-blue-700"
                >
                  next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- fullfillment centers -->
      <div class="fullfillment-center bg-light-blue-custom pt-10">
        <div class="fullfillment-center-wrapper">
          <div
            class="fullfillment-center-title flex flex-col justify-center items-center"
          >
            <h1 class="section-title font-semibold">
              {{ $t("contactUs.fullFillMentTitle") }}
            </h1>
            <p class="mt-4 mw-584px text-center">
              {{ $t("contactUs.fullFillMentDes") }}
            </p>
          </div>
          <swiperComponent :showPagination="false" :slidePerView = "1" :items="[UK, US, FRANCE, GERMANY]" class="mt-12 mb-8 px-10" :imgWidth100="true"/>
        </div>
      </div>
  
      <!-- Vietnam-based Production Capacity -->
      <div
        class="w-100 production-capacity flex gap-x-8 bg-light-gray1-custom flex-column px-3"
      >
        <div class="content w-100 my-8">
          <h1 class="section-title font-semibold mt-4">
            {{ $t("contactUs.vietNameBaseTitle") }}
          </h1>
          <p class="mt-4">{{ $t("contactUs.fullFillMentDes") }}</p>
        </div>
        <div class="capacity-card-info w-100">
          <div class="infor-card flex flex-col">
            <cardInfor
              :imgSrc="cardThumbnail"
              title="+53,800-sq/ft"
              :description="$t('contactUs.manufactureFacility')"
            />
            <cardInfor
              :imgSrc="cardThumbnail"
              title="+420"
              :description="$t('contactUs.highQualityProduct')"
            />
            <cardInfor
              :imgSrc="cardThumbnail"
              title="+90,350"
              :description="$t('contactUs.highShipment')"
            />
            <cardInfor
              :imgSrc="cardThumbnail"
              title="$2.5 M+"
              :description="$t('contactUs.investEquip')"
            />
            <cardInfor
              :imgSrc="cardThumbnail"
              title="+1000"
              :description="$t('contactUs.highQualityWorkForce')"
            />
          </div>
        </div>
      </div>
  
      <!-- Featured printing technique  -->
      <div class="feature-printing-technique-wrapper flex flex-col justify-center items-center px-3 mt-8">
        <h1 class="section-title font-semibold">{{ $t('contactUs.featuredPrintingTechnique') }}</h1>
        <p class="section-content mw-584px text-center mt-4">{{ $t('contactUs.featuredPrintingTechniqueDes') }}</p>
        <div class="technique-tags flex flex-col gap-x-3 mt-8">
          <div class="flex item-tag-mobile overflow-x-scroll pb-2 pl-1" >
            <span class="cursor-pointer min-w-fit" :class="currentTechNiqueTags == ind ? 'active-tag' : 'not-active-tag'" @click="currentTechNiqueTags = ind" v-for="tag,ind in techNiqueTags" :key="ind" >
              {{ tag.name }}
            </span>
          </div>
          <div class="img-wrapper mt-12 w-100  item-tag-mobile overflow-x-scroll" >
            <span v-for="img,index in techNiqueTags" :key="index">
              <span class="flex justify-between" v-if="currentTechNiqueTags == index">
                <img :src="thumb" v-for="thumb, _index in img.img" :key="_index"/>
              </span>
            </span>
          </div>
        </div>
        <span class="flex mt-5 mb-5">
          <p class="txt-primary cursor-pointer">{{ $t('pof.exploreMore') }}</p>
          <img :src="arrowUpRight"/>
        </span>
      </div>
  
      <!-- Quality control Process -->
      <div class="quality-control-process flex flex-col justify-center items-center bg-light-gray1-custom px-3">
        <h1 class="section-title font-semibold">{{ $t('pof.qualityControlProcess') }}</h1>
        <p class="section-content text-center mt-6 mw-790px">{{ $t('pof.qualityControl') }}</p>
  
        <div class="flex gap-x-8 mt-12 flex-column">
          <div class="quality-thumbs-n-content flex flex-col mb-10" v-for="item,ind in qualityControlProcess" :key="ind">
            <img :src="item.img"/>
            <h1 class="mt-5 text-2xl txt-primary font-semibold">{{ item.stt }}</h1>
            <h1 class="mt-3 font-semibold">{{ item.title }}</h1>
            <p class="mt-2">{{ item.content }}</p>
          </div>
        </div>
      </div>
      
       <!-- Product showcase -->
       <div class="product-showcase mt-5">
          <div class="product-showcase flex justify-center align-center flex-column">
            <h1 class="section-title font-semibold">
              {{ $t("pof.productShowcase") }}
            </h1>
            <a class="top-category-view-all txt-primary cursor-pointer flex flex-row justify-center items-center">
              <p class="">{{ $t("pof.discoverMore") }}</p>
              <img :src="arrowUpRight" />
            </a>
          </div>
          <swiperComponent :showPagination="false" :slidePerView = "2"  class="mt-12 mb-8" />
        </div>
      
      <!-- fullfilment & shipping -->
      <div class="fullfillment-shippping-mobile flex flex-col justify-between text-white">
        <div class="flex flex-column">
          <h1 class="section-title">{{ $t('pof.fullFillMentNShipping') }}</h1>
          <h1 class="mt-5">{{ $t('pof.fullFillMentNShippingDes') }}</h1>
        </div>
        <div class="content-wrapper flex flex-column items-start gap-x-8">
          <div class="shipping-content" v-for="item,index in fullFillMentContent" :key="index">
            {{ item }}
          </div>
        </div>
      </div>
  
      <!-- how merchanzie can help  -->
      <div class="flex justify-between flex-column w-100 px-3">
        <div class="title-of-merchanize w-100">
          <h1 class="section-title font-semibold mt-4">{{ $t('pof.howMerchanizeCanHelpYourBusiness') }}</h1>
          <p class="mt-4">{{ $t('pof.howMerchanizeCanHelpYourBusinessDes') }}</p>
          <span class="flex mt-10">
            <p class="txt-primary">{{  $t('pof.seePricing') }}</p>
            <img class="ml-1.5" :src="arrowUpRight"/>
          </span>
        </div>
        <div class="process-card flex flex-col gap-y-8 flex-column">
          <span class="flex flex-column gap-x-8">
            <cardInfor class="card-info-merchanize" :imgSrc="cardThumbnail" :title="$t('homePage.cardTitle1')"
              :description="$t('homePage.cardDescription1')" />
            <cardInfor class="card-info-merchanize" :imgSrc="cardThumbnail" :title="$t('homePage.cardTitle2')"
              :description="$t('homePage.cardDescription2')" />
          </span>
          <span class="flex flex-column gap-x-8" >
            <cardInfor class="card-info-merchanize" :imgSrc="cardThumbnail" :title="$t('homePage.cardTitle3')"
              :description="$t('homePage.cardDescription3')" />
            <cardInfor class="card-info-merchanize" :imgSrc="cardThumbnail" :title="$t('homePage.cardTitle4')"
              :description="$t('homePage.cardDescription4')" />
          </span>
        </div>
      </div>
  
      <!-- more ways to support your brand -->
      <div class="bg-light-gray1-custom px-3 py-5">
        <div class="distict-motive-wrapper">
          <div class="motive-header text-center">
            <h3 class="section-title font-semibold">
              {{ $t("homePage.distictMotive") }}
            </h3>
            <p class="motive-description mt-4">
              {{ $t("homePage.distictMotiveDes") }}
            </p>
          </div>
  
          <div class="motive-body flex flex-column mt-12 w-100">
            <img :src="distictThumbnails" />
            <SwiperMoreWayComponent  class="mt-12 mb-8"/>
            <div class="motive-body-left-wrapper w-100">
            </div>
          </div>
        </div>
      </div>
  
      <!-- help -->
      <help
        :headerTitle="$t('homePage.howCanWeHelp')"
        :headerDesc="$t('homePage.howCanWeHelpDesc')"
      />
    </div>
  </div>
</template>
<script>
import UK from "../../assets/svg/UK.svg";
import US from "../../assets/svg/US.svg";
import FRANCE from "../../assets/svg/FRANCE.svg";
import GERMANY from "../../assets/svg/GERMANY.svg";
import help from "../../components/help.vue";
import swiperComponent from "../../components/swiperComponent.vue";
import pofThumb from "../../assets/images/pofThumbNail.png"
import cardInfor from "../../components/cardInfor.vue";

import SwiperMoreWayComponent from "./components/SwiperMoreWayComponent.vue";

// import assest
import arrowUpRight from "../assets/svg/arrowUpRight.svg";
import imgThumb from "../../assets/images/podCover.png"
import cardThumbnail from "../../assets/svg/cardThumbNail.svg";
import distictThumbnails from "../../assets/images/distictThumbnail.png";

import { myMixin } from '~/mixins/myMixin';

export default {
  mixins: [myMixin],
  component: {
    help,
    swiperComponent,
    cardInfor,
    SwiperMoreWayComponent,
  },
  data() {
    return {
      UK,
      US,
      FRANCE,
      GERMANY,
      pofThumb,
      arrowUpRight,
      cardThumbnail,
      distictThumbnails,
      imgThumb,
      texts: [
        "Our Global Fulfillment Centers",
        "State-of-the-art Logistics",
        "Worldwide Shipping",
        "24/7 Customer Support",
      ],
      techNiqueTags: [
        {
          name: this.$t('pof.cutNSew'),
          img :[GERMANY,GERMANY,GERMANY]
        },
        {
          name: this.$t('pof.directToGarment'),
          img :[UK,UK,UK]
        },{
          name: this.$t('pof.engraving'),
          img :[US,US,US]
        },{
          name: this.$t('pof.uvPrinting'),
          img :[FRANCE,FRANCE,FRANCE]
        },{
          name: this.$t('pof.subLiMation'),
          img :[UK,UK,UK]
        },{
          name: this.$t('pof.laserCut'),
          img :[FRANCE,FRANCE,FRANCE]
        },
      ],
      qualityControlProcess: [
        {
          img: imgThumb,
          stt: '01.',
          title: this.$t('pof.manufacturedQualityControlTitle1'),
          content: this.$t('pof.manufacturedQualityControlDes1')
        },
        {
          img: imgThumb,
          stt: '02.',
          title: this.$t('pof.manufacturedQualityControlTitle2'),
          content: this.$t('pof.manufacturedQualityControlDes2')
        },
        {
          img: imgThumb,
          stt: '03.',
          title: this.$t('pof.manufacturedQualityControlTitle3'),
          content: this.$t('pof.manufacturedQualityControlDes3')
        }
      ],
      fullFillMentContent: [
        this.$t('pof.fullFillMent1'),
        this.$t('pof.fullFillMent2'),
        this.$t('pof.fullFillMent3'),
        this.$t('pof.fullFillMent4'),
      ],
      currentTechNiqueTags: '',
      currentIndex: 0,
    };
  },
  computed: {
    currentText() {
      return this.texts[this.currentIndex];
    },
  },
  methods: {
    next() {
      if (this.currentIndex < this.texts.length - 1) {
        this.currentIndex++;
      }
    },
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
  },
};
</script>
<style scoped lang="scss">
.pod-intro-banner {
  background-image: url("../../assets/images/podCover.png");
  background-size: cover;
  background-repeat: no-repeat;
  height: 728px;
  background-position: bottom right;
  position: relative;
}

.pod-intro-carousel {
  position: absolute;
  bottom: 60px;
  right: 120px;
  height: 149px;
  width: 20vw;
  min-width: 20vw;
  border-top: 7px solid #5c8ee2;
}

.pod-intro-carousel-mobile {
  width: 95%;
  position: absolute;
  bottom: 60px;
  height: 149px;
  left: 50%;
  transform: translateX(-50%);
  border-top: 7px solid #5c8ee2;
}

.current-text {
  min-width: 300px;
}

.infor-card {
  :deep(h1) {
    color: #3372db;
    font-size: 40px !important;
    font-weight: 500 !important;
  }
  :deep(p) {
    color: #344054;
    font-size: 20px !important;
    font-weight: 600 !important;
  }
}

.active-tag{
  background-color: #709CE6;
  color: white;
  padding : 8px 16px 8px 16px;
  border-radius: 4px;
}
.not-active-tag{
  padding : 8px 16px 8px 16px;
}
.fullfillment-shippping{
  background-image: url('../../assets/images/pofThumbNail.png');
  background-size: cover ;
  height: 460px;
  .shipping-content{
    border-top: 2px solid #D1E0FF;
    padding-top: 12px;
  }
}

.fullfillment-shippping-mobile{
  background-image: url('../../assets/images/pofThumbNailMobile.png');
  background-size: cover ;
  height: 460px;
  padding: 10px;
  .shipping-content{
    border-top: 2px solid #D1E0FF;
    padding-top: 12px;
  }
}

.card-info-merchanize{
  background-color: #FAFBFF;
  border-radius: 8px;
  width: 16vw;
  height: 16vw;
  :deep(.card-info-wrapper){
    background-color: transparent !important;
    flex-direction: column;
    padding: 10px;
  }
}

.motive-body-left{
  padding: 0px 24px;
}

.manufacturing-galery{
  :deep(.swiper){
    overflow: visible;
  }
  :deep(.swiper-slide:nth-child(even) img){
    height: 50vh !important;
  }
  :deep(.swiper-slide:nth-child(odd)){
    transform: translateY(10%);
  }
  :deep(.swiper-button-next){
    background-color: white;
    border-radius: 50px;
    padding: 24px 24px;
  }
  :deep(.swiper-button-prev){
    background-color: white;
    border-radius: 50px;
    padding: 24px 24px;
  }
}

.item-tag-mobile {
  width: 100vw;
}
</style>
