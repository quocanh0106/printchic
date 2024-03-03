<template>
  <div class="menu-expanse-container">
    <v-btn class="expanse-btn" v-if="!isExpanse" @click="isExpanse = true">
      <img :src="menuIcon" alt="icon" />
    </v-btn>
    <div class="expansed-menu" v-if="isExpanse">
      <div class="header flex justify-between">
        <div class="first-title flex align-center gap-2">
          <img :src="menuIcon" alt="icon" />
          <span class="text-sm font-bold text-slate-500">TABLE OF CONTENT</span>
        </div>
        <span
          class="text-sm font-bold text-sky-700 pointer"
          @click="isExpanse = false"
          >HIDE</span
        >
      </div>
      <div class="content">
        <div
          class="single-content flex gap-2 mt-2"
          v-for="(item, index) in menuList"
          :key="index"
        >
          <span class="text-sm text-slate-500"
            >{{ index < 9 ? `0${index + 1}` : index + 1 }}.</span
          >
          <span class="text-sm">{{ item }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menuIcon from "../../assets/svg/menu.svg";

export default {
  name: "MenuExpanseVue",
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      menuIcon,
      isExpanse: true,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.menu-expanse-container {
  background-color: #fff;
  .expansed-menu {
    border: 1px solid #eaecf0;
    padding: 20px;
    border-radius: 4px;
  }
}
</style>
