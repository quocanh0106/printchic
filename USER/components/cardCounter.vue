<template>
  <div class="card-counter mh-183px" :class="pc ? 'mw-276px' : ''">
    <div class="card-infor" v-show="pc || lgPc || extraPc">
      <div class="card-info-wrapper m-5 flex items-start flex-col p-2.5">
        <h1 class="card-amount txt-primary font-medium">{{ amount }}</h1>
        <h1 class="font-semibold card-title mt-3">{{ title }}</h1>
        <p class="card-description mt-2">{{ description }}</p>
      </div>
    </div>
    <div class="card-infor w-100" v-show="mobile || tablet">
      <div class="card-info-wrapper m-5 flex items-start flex-col p-2.5">
        <h1 class="card-amount txt-primary font-medium">{{ amount }}</h1>
        <h1 class="font-semibold card-title mt-3">{{ title }}</h1>
        <p class="card-description mt-2">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { myMixin } from '~/mixins/myMixin';
export default {
  mixins: [myMixin],
  props: {
    amount: {
      type: String,
      default: "100+",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.card-infor {
  background-color: #fafbff;
  border-radius: 8px;
  .card-amount {
    font-size: 40px;
  }
}
</style>
