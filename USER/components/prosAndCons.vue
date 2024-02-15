<template>
  <div class="pros-and-cons-wrapper">
    <h1 class="text-center section-title font-semibold">
      {{ $t("prosAndConsPage.prosAndCons") }}
    </h1>
    <div class="pros-and-cons-content-wrapper flex mt-12 gap-x-8">
      <div class="pros-blog rounded-xl p-10">
        <span
          class="flex items-start gap-x-2 mb-3"
          v-for="(item, index) in pros"
          :key="index"
        >
          <img class="pt-1" :src="greenTick" />
          <span class="pros-content">
            <h1 class="font-semibold">{{ item.title }} :</h1>
            <p>{{ item.content }}</p>
          </span>
        </span>
      </div>
      <div class="cons-blog rounded-xl p-10">
        <span
          class="flex items-start gap-x-2 mb-3"
          v-for="(item, index) in cons"
          :key="index"
        >
          <img class="pt-1" :src="redX" />
          <span class="pros-content">
            <h1 class="font-semibold">{{ item.title }} :</h1>
            <p>{{ item.content }}</p>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import greenTick from "../assets/svg/tickGreen.svg";
import redX from "../assets/svg/xRed.svg";

export default {
  props: {},
  data() {
    return {
      greenTick,
      redX,
      pros: [
        {
          title: this.$t("prosAndConsPage.pros1Title"),
          content: this.$t("prosAndConsPage.pros1Content"),
        },
        {
          title: this.$t("prosAndConsPage.pros2Title"),
          content: this.$t("prosAndConsPage.pros2Content"),
        },
        {
          title: this.$t("prosAndConsPage.pros3Title"),
          content: this.$t("prosAndConsPage.pros3Content"),
        },
        {
          title: this.$t("prosAndConsPage.pros4Title"),
          content: this.$t("prosAndConsPage.pros4Content"),
        },
      ],
      cons: [
        {
          title: this.$t("prosAndConsPage.cons1Title"),
          content: this.$t("prosAndConsPage.cons1Content"),
        },
        {
          title: this.$t("prosAndConsPage.cons2Title"),
          content: this.$t("prosAndConsPage.cons2Content"),
        },
        {
          title: this.$t("prosAndConsPage.cons3Title"),
          content: this.$t("prosAndConsPage.cons3Content"),
        },
        {
          title: this.$t("prosAndConsPage.cons4Title"),
          content: this.$t("prosAndConsPage.cons4Content"),
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.pros-blog {
  background-color: #f9fafb;
}

.cons-blog {
  background-color: #f9fafb;
}
</style>
