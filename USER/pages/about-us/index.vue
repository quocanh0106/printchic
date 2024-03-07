<template>
  <div class="about-us-wrapper">
    <div
      class="header-wrapper text-center flex flex-col items-center justify-center custom-padding"
    >
      <h1 class="section-title font-semibold mw-584px">
        {{ $t("aboutUs.honestIntergrityTitle") }}
      </h1>
      <p class="section-content mt-5 mw-768px">
        {{ $t("aboutUs.honestIntergrityDescription") }}
      </p>
      <img class="mt-12" :src="aboutUsImg" />
    </div>

    <!--  About us -->
    <div class="about-us-wrapper custom-padding">
      <div
        class="about-us-header text-center flex flex-col items-center justify-center"
      >
        <h1 class="section-title font-semibold mw-584px">
          {{ $t("aboutUs.aboutUsTitle") }}
        </h1>
        <p class="section-content mt-5 mw-768px">
          {{ $t("aboutUs.aboutUsDesc") }}
        </p>
      </div>
      <div class="motive-body flex mt-12 w-100 space-x-64">
        <div class="about-us-body-left-wrapper w-1/2">
          <div class="about-us-body-left border-left-primary">
            <h5 class="txt-primary font-semibold">
              {{ $t("homePage.distictBodyTitle1") }}
            </h5>
            <p class="mt-3">
              {{ $t("homePage.distictBodyDescription1") }}
            </p>
          </div>
          <div class="about-us-body-left mt-8">
            <h5 class="font-semibold">
              {{ $t("homePage.distictBodyTitle2") }}
            </h5>
            <p class="mt-3">
              {{ $t("homePage.distictBodyDescription2") }}
            </p>
          </div>
          <div class="about-us-body-left mt-8">
            <h5 class="font-semibold">
              {{ $t("homePage.distictBodyTitle3") }}
            </h5>
            <p class="mt-3">
              {{ $t("homePage.distictBodyDescription3") }}
            </p>
          </div>
          <div class="about-us-body-left mt-8">
            <h5 class="font-semibold">
              {{ $t("homePage.distictBodyTitle4") }}
            </h5>
            <p class="mt-3">
              {{ $t("homePage.distictBodyDescription4") }}
            </p>
          </div>
        </div>
        <img class="about-us-thumbnail" :src="aboutUsMiddleImg" />
      </div>
    </div>

    <!-- Our services Stat -->
    <div
      class="our-service-stat-wrapper text-center flex flex-col items-center justify-center custom-padding bg-light-blue-custom"
    >
      <h1 class="section-title font-semibold mw-584px">
        {{ $t("aboutUs.ourService") }}
      </h1>
      <p class="section-content mt-5 mw-768px">
        {{ $t("aboutUs.ourServiceDesc") }}
      </p>
      <div class="service-tag-wrapper w-100 flex justify-between mt-6" v-show="pc || lgPc || extraPc">
        <span
          class="service-tag"
          v-for="(tag, index) in listServiceTags"
          :key="index"
        >
          <p>{{ tag }}</p>
        </span>
      </div>
      <div class="service-info-counter w-100 flex mt-12 justify-between">
        <span v-for="(item, index) in serviceInfoCounter" :key="index">
          <cardCounterVue
            class="card-info-counter-aboutus"
            :amount="item.amount"
            :title="item.title"
          />
        </span>
      </div>
    </div>

    <!-- Product Showcase -->
    <div class="about-us-product-showcase-wrapper custom-padding">
      <div class="about-us-product-showcase-header flex justify-between">
        <h1 class="about-us-product-showcase-title section-title font-semibold">
          {{ $t("aboutUs.productShowcase") }}
        </h1>
        <a
          class="about-us-product-showcase-view-all txt-primary flex cursor-pointer items-center"
        >
          <p style="min-width: 100px;">{{ $t("aboutUs.discoverMore") }}</p>
          <img :src="arrowUpRight" />
        </a>
      </div>
      <swiperComponent v-show="pc || lgPc || extraPc" :slidePerView="6" class="mt-12 mb-8" />
    </div>

    <!-- Banner About Us -->
    <div
      class="about-us-banner-wrapper custom-padding flex justify-between bg-light-gray1-custom items-center"
    >
      <div class="content-banner">
        <h1 class="section-title font-semibold">
          {{ $t("aboutUs.bannerContentTitle") }}
        </h1>
        <p class="section-content mt-4">{{ $t("aboutUs.bannerContentDes") }}</p>
      </div>
      <img :src="aboutUsBanner" />
    </div>

    <!-- Card Info flex -->
    <div class="card-info-about-us-wrapper custom-padding">
      <div class="banner-content-header flex">
        <h1 class="section-title font-semibold w-100">
          {{ $t("aboutUs.boostYourBus") }}
        </h1>
        <div class="flex flex-col items-start">
          <p>{{ $t("aboutUs.boostYourBusDes") }}</p>
          <div class="flex mt-6">
            <p class="txt-primary font-semibold">
              {{ $t("aboutUs.discoverMore") }}
            </p>
            <img :src="arrowUpRight" />
          </div>
        </div>
      </div>
      <div class="about-us-card-info flex mt-12">
        <cardInfor
          :showTitle="false"
          :changeToFlexCol="true"
          :imgSrc="cardThumbnail"
          :title="$t('homePage.cardTitle4')"
          :description="$t('homePage.cardDescription4')"
        />
        <cardInfor
          :showTitle="false"
          :changeToFlexCol="true"
          :imgSrc="cardThumbnail"
          :title="$t('homePage.cardTitle4')"
          :description="$t('homePage.cardDescription4')"
        />
        <cardInfor
          :showTitle="false"
          :changeToFlexCol="true"
          :imgSrc="cardThumbnail"
          :title="$t('homePage.cardTitle4')"
          :description="$t('homePage.cardDescription4')"
        />
        <cardInfor
          :showTitle="false"
          :changeToFlexCol="true"
          :imgSrc="cardThumbnail"
          :title="$t('homePage.cardTitle4')"
          :description="$t('homePage.cardDescription4')"
        />
        <cardInfor
          :showTitle="false"
          :changeToFlexCol="true"
          :imgSrc="cardThumbnail"
          :title="$t('homePage.cardTitle4')"
          :description="$t('homePage.cardDescription4')"
        />
      </div>
    </div>
    <!-- Logo of Company -->
    <div class="company-collab bg-light-gray1-custom custom-padding">
      <h1 class="text-lg font-semibold text-center">
        {{ $t("howItWorks.partnerTitle") }}
      </h1>
      <swiperComponent
        :slidePerView="pc ? 6 : 2"
        :showNavigation="false"
        :showPagination="false"
        class="mt-12 mb-8"
      />
    </div>
    <!-- help -->
    <help
      :headerTitle="$t('aboutUs.howToLaunchAmerchandiseBrand')"
      :headerDesc="$t('aboutUs.helpDes')"
      class="custom-padding"
    />
  </div>
</template>

<script>
import aboutUsImg from "../../assets/svg/aboutUsImg.svg";
import aboutUsMiddleImg from "../../assets/svg/aboutUsMiddleImg.svg";
import arrowUpRight from "../../assets/svg/arrowUpRight.svg";
import aboutUsBanner from "../../assets/svg/aboutUsBanner.svg";
import cardThumbnail from "../../assets/svg/cardThumbNail.svg";

// component
import cardCounterVue from "../../components/cardCounter.vue"; //
import swiperComponent from "../../components/swiperComponent.vue";
import help from "../../components/help.vue";
import cardInfor from "../../components/cardInfor.vue";

export default {
  components: {
    cardCounterVue,
    swiperComponent,
    help,
    cardInfor,
  },
  data() {
    return {
      aboutUsBanner,
      aboutUsImg,
      arrowUpRight,
      cardThumbnail,
      aboutUsMiddleImg,
      listServiceTags: [
        this.$t("aboutUs.ourServiceTag1"),
        this.$t("aboutUs.ourServiceTag2"),
        this.$t("aboutUs.ourServiceTag3"),
        this.$t("aboutUs.ourServiceTag4"),
        this.$t("aboutUs.ourServiceTag5"),
        this.$t("aboutUs.ourServiceTag6"),
      ],
      serviceInfoCounter: [
        {
          amount: "420+",
          title: this.$t("aboutUs.products"),
        },
        {
          amount: "30,000+",
          title: this.$t("aboutUs.happyMerchant"),
        },
        {
          amount: "180+",
          title: this.$t("aboutUs.countriesDeliveredIn"),
        },
        {
          amount: "90,350",
          title: this.$t("aboutUs.highestShipment"),
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.about-us-body-left {
  padding: 0px 24px;
}
.service-tag {
  border-radius: 3px;
  padding: 12px 16px 12px 16px;
  background-color: #ffffff;
}
.card-info-counter-aboutus {
  width: 100% !important;
  min-height: 0px !important;
}
.content-banner {
  max-width: 481px;
}
.motive-body{
  @media screen and (max-width:990px) {
    flex-direction: column;
  }
}
.about-us-body-left-wrapper{
  @media screen and (max-width:990px) {
    width: 100%;
  }
}

.about-us-thumbnail{
  @media screen and (max-width:990px) {
    width: 100%;
    margin-left: 0px !important;
    margin-top: 20px;;
  }
}

.service-info-counter{
  @media screen and (max-width:990px) {
    flex-direction: column;
  }
}

.about-us-banner-wrapper{
  @media screen and (max-width:990px) {
    gap: 48px;
    flex-direction: column;
  }
}

.banner-content-header {
  @media screen and (max-width:990px) {
    gap: 48px;
    flex-direction: column;
  }
}

.about-us-card-info{
  @media screen and (max-width:990px) {
    flex-direction: column;
  }
}
</style>
