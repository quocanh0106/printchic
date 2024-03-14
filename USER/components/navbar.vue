<template>
  <div class="nav-bar-outer-wrapper-all-screen">
    <div class="nav-bar" v-show="pc || lgPc || extraPc">
      <img
        :src="Logo"
        class="cursor-pointer"
        @click="this.$router.push(localePath('/'))"
      />
      <customInput />
      <div class="nav-bar-action flex items-center">
        <ul class="nav-bar-wrapper">

          <li v-for="(item, index) in links" :key="index">
            <a class="navigation-menu" :href="localePath(item.href)">{{ $t(item.label) }}</a>
          </li>
          <li>
            <v-select
              class="language-select"
              variant="solo"
              prepend-inner-icon="mdi-web"
              dense
              :items="listLang"
              item-text="title"
              item-value="code"
              v-model="selectedLanguage"
              @update:modelValue="selectLanguage"
            />
          </li>
          <li class="navigation-menu signup-btn primary-btn cursor-pointer text-white">
            {{ $t("navBar.signUp") }}
          </li>
        </ul>
      </div>
    </div>
    <div class="nav-bar-mobile flex justify-between" v-show="mobile || tablet">
      <img
        :src="Logo"
        class="cursor-pointer"
        @click="this.$router.push(localePath('/'))"
      />
      <div class="mobile-nav-action flex items-center gap-x-5">
        <img :src="searchIcon" />
        <img :src="drawerIcon" @click.stop="drawer = !drawer" />
      </div>
    </div>
    <v-card class="drawer" v-if="drawer">
      <v-layout>
        <v-navigation-drawer v-model="drawer" temporary>
          <div class="logo-n-closebtn flex justify-between">
            <img
              :src="Logo"
              class="cursor-pointer"
              @click="this.$router.push(localePath('/'))"
            />
            <img
              :src="closeIcon"
              class="cursor-pointer"
              @click="drawer = false"
            />
          </div>
          <customInput class="search-input-mobile" />
          <v-divider></v-divider>

          <v-list
            density="compact"
            class="navigation-menu-mobile"
            @click="isCurrentUrl(url.href)"
            v-for="(url, index) in links"
            :key="index"
            :class="{ 'bg-light-blue-custom': isActive }"
          >
            <a :href="url.href">{{ url.label }}</a>
          </v-list>
        </v-navigation-drawer>
      </v-layout>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import Logo from "../assets/svg/Logo.svg";
import customInput from "./customInput.vue";
import drawerIcon from "../assets/svg/drawerIcon.svg";
import searchIcon from "../assets/svg/searchIcon.svg";
import closeIcon from "../assets/svg/closeIcon.svg";
import languageIcon from "../assets/svg/languageIcon.svg";
import { useRoute, useRouter } from 'vue-router';
import { useI18n, useLocalePath, useSwitchLocalePath } from '#imports'

import useWidthScreen from '~/composables/useWidthScreen';
import { useNuxtApp } from '#app';

const { screenWidth, mobile, tablet, pc, lgPc, extraPc } = useWidthScreen();
const route = useRoute();
const router = useRouter();
const { locale } = useI18n();
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const drawer = ref(null);
const isActive = ref(false);
const selectedLanguage = ref(locale.value);

const links = computed(() => [
  { label: "navBar.Home", href: '/' },
  { label: "navBar.Products", href: '/print-on-demand' },
  { label: "navBar.HIW", href: '/how-it-works' },
  { label: "navBar.Blog", href: '/blog'},
  { label: "navBar.aboutUs", href:'/about-us' },
])

const listLang = ref([
  { code: "US", title: "US" },
  { code: "UK", title: "UK" },
  { code: "DE", title: "DE" },
  { code: "FR", title: "FR" },
])

// watch(selectedLanguage, (newVal) => {
//   locale.value = newVal;
// });

function selectLanguage() {
  const newPath = switchLocalePath(selectedLanguage.value);
  if (newPath !== location.pathname) {
    locale.value = selectedLanguage.value
    window.location.pathname = newPath; // Redirect to the new localized path
  }
}

function isCurrentUrl(url) {
  if (route.path === url) {
    console.log("TRUE");
    isActive.value = !isActive.value;
  }
}

const navigate = (url) =>{
  router.push(localePath(url));
}
</script>

<style lang="scss" scoped>
.nav-bar {
  /* Your navigation bar styles here */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  width: 100%;
  flex-direction: row;
  gap: 10px;
  padding: 30px 120px;
  @media screen and (max-width:1600px){
    padding: 30px 5vw;
  }
}

.nav-bar a {
  /* Your navigation link styles here */
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  font-weight: bold;
}

.nav-bar a:hover {
  /* Your hover styles here */
  color: #007bff;
}

.nav-bar-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2vw;
  @media screen and (max-width:1600px){
    gap: 1vw;
  }
  @media screen and (max-width:1500px){
    gap: 0px;
  }
}

.navigation-menu {
  font-size: 1vw;
  @media screen and (max-width:1600px){
    font-size: 12px;
  }
  @media screen and (max-width:1500px){
    font-size: 10px;
  }
  @media screen and (max-width:1300px){
    font-size: 8px;
  }
}
.nav-bar-mobile {
  padding: 16px 20px;
}
.drawer {
  z-index: 1;
  :deep(.v-navigation-drawer) {
    width: 100% !important;
    background-color: white;
    z-index: 10;
  }
}
.logo-n-closebtn {
  padding: 24px 16px;
}
.search-input-mobile {
  padding: 24px 16px;
  :deep(.v-input--horizontal) {
    width: 100vw;
    max-width: 100%;
  }
}

.navigation-menu-mobile {
  padding: 24px 16px;
}

.language-select {
  :deep(.v-field--variant-solo) {
    box-shadow: none !important;
  }
  :deep(.v-input__details) {
    display: none;
  }
}
.signup-btn{
  height: auto;
}
</style>
