<template>
      <client-only>

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
      <v-card class="drawer" v-show="drawer">
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
            <span class="change-language-mobile flex items-center gap-x-3">
              <span class="mdi--web"></span>
              <h1 @click="selectLanguage('US')" :class="locale == 'US' ? 'active-lang' : ''" class="cursor-pointer">US</h1>
              <v-divider style="border: 1px solid #EAECF0" vertical></v-divider>
              <h1 @click="selectLanguage('UK')" :class="locale == 'UK' ? 'active-lang' : ''" class="cursor-pointer">UK</h1>
              <v-divider style="border: 1px solid #EAECF0" vertical></v-divider>
              <h1  @click="selectLanguage('FR')" :class="locale == 'FR' ? 'active-lang' : ''" class="cursor-pointer">FR</h1>
              <v-divider style="border: 1px solid #EAECF0" vertical></v-divider>
              <h1  @click="selectLanguage('DE')" :class="locale == 'DE' ? 'active-lang' : ''" class="cursor-pointer">DE</h1>
            </span>
          </v-navigation-drawer>
        </v-layout>
      </v-card>
    </div>
  </client-only>
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
const { locale, t } = useI18n();
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const drawer = ref(null);
const isActive = ref(false);
const selectedLanguage = ref(locale.value);

const links = computed(() => [
  { label: t('navBar.Home'), href: '/' },
  { label:  t('navBar.Products'), href: '/print-on-demand' },
  { label: t('navBar.HIW'), href: '/how-it-works' },
  { label: t('navBar.Blog'), href: '/blog'},
  { label: t('navBar.aboutUs'), href:'/about-us' },
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

function selectLanguage(lang = null) {
  const newPath = switchLocalePath(lang == null ? selectedLanguage.value : lang);
  if (newPath !== location.pathname) {
    locale.value = selectedLanguage.value
    router.push({
      path: newPath,
    });
  }
}

function isCurrentUrl(url) {
  if (route.path === url) {
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

.mdi--web {
  display: inline-block;
  width: 18px;
  height: 18px;
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M16.36 14c.08-.66.14-1.32.14-2c0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2m-5.15 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56M14.34 14H9.66c-.1-.66-.16-1.32-.16-2c0-.68.06-1.35.16-2h4.68c.09.65.16 1.32.16 2c0 .68-.07 1.34-.16 2M12 19.96c-.83-1.2-1.5-2.53-1.91-3.96h3.82c-.41 1.43-1.08 2.76-1.91 3.96M8 8H5.08A7.923 7.923 0 0 1 9.4 4.44C8.8 5.55 8.35 6.75 8 8m-2.92 8H8c.35 1.25.8 2.45 1.4 3.56A8.008 8.008 0 0 1 5.08 16m-.82-2C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2c0 .68.06 1.34.14 2M12 4.03c.83 1.2 1.5 2.54 1.91 3.97h-3.82c.41-1.43 1.08-2.77 1.91-3.97M18.92 8h-2.95a15.65 15.65 0 0 0-1.38-3.56c1.84.63 3.37 1.9 4.33 3.56M12 2C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2'/%3E%3C/svg%3E");
  background-color: currentColor;
  -webkit-mask-image: var(--svg);
  mask-image: var(--svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}

.change-language-mobile{
  padding:24px 16px ;
  h1{
    color: #98A2B3;
  }
}
.active-lang{
  color:#3372DB !important;
  font-weight: 400;
}
</style>
