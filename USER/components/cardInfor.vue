<template>
  <div class="card-infor">
    <div class="card-info-wrapper flex m-4" :class="changeToFlexCol ? 'flex-col bg-light-gray-custom' : ''">
      <img :src="imgSrc" />
      <div class="card-des flex flex-col">
        <h1 class="font-semibold card-title" v-if="showTitle">{{ title }}</h1>
        <p class="card-description mt-2">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgSrc: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    showTitle: {
      type: Boolean,
      default:true,
    },
    changeToFlexCol: {
      type: Boolean,
      default:false,
    }
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.card-info-wrapper {
  display: flex;
  padding: 32px 24px;
  align-items: flex-start;
  gap: 20px;
  background-color: white;
  border-radius: 4px;
  .card-title {
    font-size: 20px;
    line-height: 27px;
  }
  .card-description {
    font-size: 14px;
    line-height: 27px;
  }
}
</style>
