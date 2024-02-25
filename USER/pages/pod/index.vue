<template>
  <div class="pod-page-warpper">
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

    <!-- help -->
    <!-- help -->
    <help
      :headerTitle="$t('homePage.howCanWeHelp')"
      :headerDesc="$t('homePage.howCanWeHelpDesc')"
      class="custom-padding"
    />
  </div>
</template>
<script>
import UK from "../../assets/svg/UK.svg";
import US from "../../assets/svg/US.svg";
import FRANCE from "../../assets/svg/FRANCE.svg";
import GERMANY from "../../assets/svg/GERMANY.svg";
import help from "../../components/help.vue";

export default {
  component: {
    help,
  },
  data() {
    return {
      UK,
      US,
      FRANCE,
      GERMANY,
      texts: [
        "Our Global Fulfillment Centers",
        "State-of-the-art Logistics",
        "Worldwide Shipping",
        "24/7 Customer Support",
      ],
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
</style>
