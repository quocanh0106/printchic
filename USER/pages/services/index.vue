<template>
  <div class="service-section-wrapper">
    <div class="service-wrapper">
      <!-- Header of service -->
      <div
        class="service-header custom-padding flex items-center justify-between"
      >
        <div class="service-header-left">
          <h1 class="section-title font-semibold w-90">
            {{ $t("servicePage.headerTitle") }}
          </h1>
          <p class="section-content w-90 mt-4">{{ $t("servicePage.headerDesc") }}</p>
          <div class="flex cursor-pointer mt-8">
            <a class="primary-btn text-white flex">
              <p> {{ $t("button.signUpForFree") }} </p>
                <img :src="arrowUpRightWhite" />
            </a>

            <v-button class="secondary-btn cursor-pointer ml-4">
              {{ $t("ContactUs") }}
            </v-button>
          </div>
        </div>
        <div class="service-header-right">
          <img :src="introImage" />
        </div>
      </div>
      <!-- Frequently asked question -->
      <faq class="custom-padding" />

      <!-- help -->
      <help class="custom-padding" />
    </div>
  </div>
</template>

<script>
import help from "../../components/help.vue";
import faq from "../../components/faq.vue";
import arrowUpRight from "../../assets/svg/arrowUpRight.svg";
import arrowUpRightWhite from "../../assets/svg/iconUpRightWhite.svg";
import introImage from "../../assets/images/introImage.png";

export default {
  components: {
    help,
    faq,
  },
  data() {
    return {
      arrowUpRight,
      arrowUpRightWhite,
      introImage
    };
  },
};
</script>
