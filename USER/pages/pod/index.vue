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
    <div class="production-capacity bg-light-gray1-custom custom-padding">
      <div class="content">
        <h1 class="section-title font-semibold">
          {{ $t("contactUs.vietNameBaseTitle") }}
        </h1>
        <p>{{ $t("contactUs.fullFillMentDes") }}</p>
      </div>
      <div class="capacity-card-info">
        <div class="process-card flex flex-col mt-10">
          <cardInfor
            :imgSrc="cardThumbnail"
            :title="$t('homePage.cardTitle1')"
            :description="$t('homePage.cardDescription1')"
          />
          <cardInfor
            :imgSrc="cardThumbnail"
            :title="$t('homePage.cardTitle2')"
            :description="$t('homePage.cardDescription2')"
          />
          <cardInfor
            :imgSrc="cardThumbnail"
            :title="$t('homePage.cardTitle3')"
            :description="$t('homePage.cardDescription3')"
          />
          <cardInfor
            :imgSrc="cardThumbnail"
            :title="$t('homePage.cardTitle4')"
            :description="$t('homePage.cardDescription4')"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UK from "../../assets/svg/UK.svg";
import US from "../../assets/svg/US.svg";
import FRANCE from "../../assets/svg/FRANCE.svg";
import GERMANY from "../../assets/svg/GERMANY.svg";

export default {
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
</style>
