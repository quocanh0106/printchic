<template>
    <div class="print-on-demand-page-wrapper">
        <!-- Header  -->
        <div class="pod-header-wrapper flex justify-between gap-x-36 items-center custom-padding">
            <img :src="podThumb"/>
            <div class="header-pod-content">
                <h1 class="section-title font-semibold">{{ $t('pod.podProduct') }}</h1>
                <p class="section-content mt-8">{{ $t('pod.podProductDes') }}</p>
                <span class="check-list-wrapper mt-2 flex gap-x-3" v-for="item, index in checkList" :key="index">
                    <img :src="check"/>
                    <p>{{ item }}</p>
                </span>
                <div class="action-buttons flex mt-8 gap-x-4">
                    <a class="cursor-pointer flex txt-primary secondary-btn">
                        <p>{{ $t('button.contactUs') }}</p>
                        <img :src="arrowUpRight"/>
                    </a>
                    <v-button class="cursor-pointer primary-btn">{{ $t('button.tryForNow') }}</v-button>
                </div>
            </div>
        </div>

        <!-- What is print on Demand -->
        <div class="pod-wrapper">
            <div
            class="bg-light-blue-custom custom-padding flex flex-col justify-center items-center text-center"
            >
            <h1 class="section-title font-semibold">
                {{ $t("servicePage.whatIsPrintOnDemand") }}
            </h1>
            <p class="mt-5 mw-790px">
                {{ $t("servicePage.whatIsPrintOnDemandDes1") }}
            </p>
            <p class="mt-3 mw-790px">
                {{ $t("servicePage.whatIsPrintOnDemandDes2") }}
            </p>
            <v-button class="mt-8 secondary-btn txt-primary font-semibold">{{
                $t("button.aboutUs")
            }}</v-button>
            </div>
        </div>

        <!-- card infor -->
        <div class="card-info-wrapper flex bg-light-gray-custom justify-between custom-padding">
            <cardInfor class="card-info-pod" :imgSrc="cardThumbnail" :title="$t('pod.templateTitle')"
            :description="$t('pod.templateDes')" />
            <cardInfor class="card-info-pod" :imgSrc="cardThumbnail" :title="$t('pod.templateTitle')"
            :description="$t('pod.templateDes')" />
            <cardInfor class="card-info-pod" :imgSrc="cardThumbnail" :title="$t('pod.templateTitle')"
            :description="$t('pod.templateDes')" />
        </div>

        <!-- pod product -->
        <div class="pod-product-wrapper custom-padding">
            <span class="pod-product-header flex justify-between">
                <h1 class="section-title font-semibold">{{ $t('pod.enjoyPOPProduct') }}</h1>
                <a class="flex items-center justify-center gap-x-2 txt-primary">
                    <p>{{ $t('pod.exploreOurCatalog') }}</p>
                    <img :src="arrowUpRight"/>
                </a>
            </span>
            <swiperComponent class="pod-product-galery mt-12 mb-8" :showPagination="true" :showNavigation="true" :slidePerView = "4"  />
        </div>

        <!-- our customized clothing -->
        <div class="our-customized-clothing custom-padding  justify-center items-center bg-light-gray-custom">
            <h1 class="section-title text-center font-semibold">{{ $t('pod.ourCustomizedClothing') }}</h1>
            <span class="service-tag-wrapper w-100 flex items-center gap-x-8 justify-center mt-6">
                <span @click="ourCustomizedClothing = index" class="flex service-tag" :class="ourCustomizedClothing == index ? 'secondary-btn' : ''" v-for="(tag, index) in listServiceTags" :key="index">
                    <p class="text-center w-100">{{ tag }}</p>
                </span>
            </span>
            <swiperComponent class="mt-12 " :showPagination="true" :showNavigation="true" :slidePerView = "4"  />
        </div>

        <!-- our customized home decor -->
        <div class="our-customized-home-decor custom-padding  justify-center items-center">
            <h1 class="section-title text-center font-semibold">{{ $t('pod.ourCustomizedHomeDecor') }}</h1>
            <span class="service-tag-wrapper w-100 flex items-center gap-x-8 justify-center mt-6">
                <span @click="ourCustomizedDecor = index" class="flex service-tag" :class="ourCustomizedDecor == index ? 'secondary-btn' : ''" v-for="(tag, index) in listServiceTags" :key="index">
                    <p class="text-center w-100">{{ tag }}</p>
                </span>
            </span>
            <swiperComponent class="mt-12 " :showPagination="true" :showNavigation="true" :slidePerView = "4"  />
        </div>

        <!-- Frequently asked question -->
        <faq class="pt-0 custom-padding" />

         <!-- help -->
        <help :headerTitle="$t('homePage.howCanWeHelp')" :headerDesc="$t('homePage.howCanWeHelpDesc')"
        class="custom-padding" />
    </div>
</template>
<script>
// component
import cardInfor from "../../components/cardInfor.vue";
import swiperComponent from "../../components/swiperComponent.vue";
import faq from "../../components/faq.vue";
import help from "../../components/help.vue";

// asset
import podThumb from '../../assets/images/printOnDemandThumb.png'
import check from '../../assets/svg/tickGreen.svg'
import arrowUpRight from "../assets/svg/arrowUpRight.svg";
import cardThumbnail from "../../assets/svg/cardThumbNail.svg";

export default {
  components: {
    swiperComponent,
    faq,
    help
  },
  props: {
  },
  data() {
    return {
        podThumb,
        check,
        arrowUpRight,
        cardThumbnail,
        checkList: [
            this.$t('pod.checkList1'),
            this.$t('pod.checkList2'),
            this.$t('pod.checkList3'),
            this.$t('pod.checkList4'),
        ],
        listServiceTags: [
            "T-Shirt",
            "Hoodie",
            "Sweater",
            "Long Sleeves"
        ],
        ourCustomizedClothing: '',
        ourCustomizedDecor: '',
    };
  },
  methods: {
  },
};
</script>
<style scoped lang="scss">
.header-pod-content{
    h1{
        font-size: 40px ;
    }
}

.card-info-pod{
    :deep(.card-info-wrapper){
        flex-direction: column;
    }
}

</style>