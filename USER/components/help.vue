<template>
  <div class="help-section-wrapper">
    <div class="help-section text-center">
      <div class="help-header section-title font-semibold">
        <h1>{{ headerTitle }}</h1>
      </div>
      <div class="help-content section-content mt-4">
        <p>{{ headerDesc }}</p>
      </div>
      <div
        class="help-actions cursor-pointer mt-8"
        v-if="!hideBtn"
        :class="mobile && 'flex flex-column'"
      >
        <v-button class="primary-btn text-white">
          {{ $t("button.getStarted") }}
        </v-button>

        <v-button
          class="secondary-btn cursor-pointer"
          :class="mobile ? 'ml-0 mt-5' : 'ml-4'"
        >
          {{ $t("button.tryForFree") }}
        </v-button>
      </div>
    </div>
  </div>
</template>

<script>
import { screenSizeMixin } from "~/mixins/screenSizeMixin";
export default {
  mixins: [screenSizeMixin],
  props: {
    headerTitle: {
      type: String,
      default: "",
    },
    headerDesc: {
      type: String,
      default: "",
    },
    hideBtn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      property: "value",
    };
  },
};
</script>

<style lang="scss" scoped>
.help-section {
  padding: 80px 10vw;
  border-radius: 12px;
  background: linear-gradient(
    264.44deg,
    #eff4ff 0.42%,
    rgba(239, 244, 255, 0) 162.58%
  );
}
@media screen and (max-width: 600px) {
  .help-section {
    /* Add your styles for screens under 600px here */
    padding: 50px 5vw; /* Example adjustment for smaller screens */
    /* You can adjust padding, font-size, or any other properties as needed */
  }
}
</style>
