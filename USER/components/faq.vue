<template>
  <div class="faq-section-wrapper">
    <div class="faq-header">
      <h1 class="section-title font-semibold text-center">
        {{ $t("homePage.faqQuestions") }}
      </h1>
    </div>
    <div class="faq-collapsible mt-12">
      <v-expansion-panels
        v-for="(item, index) in data.length > 0 ? data : listFaq"
        :key="index"
      >
        <v-expansion-panel>
          <v-expansion-panel-title
            class="accordition-title font-semibold"
            expand-icon="mdi-plus"
            collapse-icon="mdi-minus"
          >
            {{
              locale.value == "US"
                ? item.questionUS
                : locale.value == "UK"
                ? item.questionUK
                : locale.value == "FR"
                ? item.questionFR
                : item.questionDE
            }}
          </v-expansion-panel-title>
          <v-expansion-panel-text class="section-content">
            {{
              locale.value == "US"
                ? item.answerUS
                : locale.value == "UK"
                ? item.answerUK
                : locale.value == "FR"
                ? item.answerFR
                : item.answerDE
            }}
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});
const { t, locale } = useI18n();

const visible = ref(true);
const listFaq = ref([
  {
    questionUK: "Title",
    questionUS: "Title",
    questionFR: "Title",
    questionDE: "Title",
    answerUK: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    answerUS: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    answerFR: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    answerDE: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    questionUK: "Title",
    questionUS: "Title",
    questionFR: "Title",
    questionDE: "Title",
    answerUK: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    answerUS: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    answerFR: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    answerDE: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    questionUK: "Title",
    questionUS: "Title",
    questionFR: "Title",
    questionDE: "Title",
    answerUK: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    answerUS: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    answerFR: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    answerDE: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },

]);
</script>

<style lang="scss" scoped>
.faq-collapsible {
  :deep(.v-expansion-panel__shadow) {
    box-shadow: none !important;
  }
  :deep(.v-expansion-panel-title) {
    border-bottom: 1px solid #eaecf0;
    border-radius: 0px !important;
  }
}

.accordition-title {
  font-size: 20px;
  line-height: 27px;
  :deep(.mdi-plus::before) {
    color: #3372db;
  }
  :deep(.mdi-minus::before) {
    color: #3372db;
  }
}
</style>
