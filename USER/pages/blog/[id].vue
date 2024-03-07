<template>
  <div class="blog-detail-container">
    <div class="side-paddings mb-5">
      <v-breadcrumbs
        :items="breadcrumbItems"
        class="breadcrumb"
      ></v-breadcrumbs>
    </div>

    <div class="hero-image mb-10">
      <img :src="heroImg" alt="pic" />
    </div>

    <div class="side-paddings" :class="mobile || tablet ? '' : 'flex gap-10 mb-10'">
      <div class="blog-content">
        <!-- Title --------------------------------------------------------------------------->
        <div class="title text-3xl font-bold mb-5">
          Summer Products to Sell: 15 POD Ideas for This Season
        </div>
        <!-- Selling guide button and link bar --------------------------------------------------------------------------->
        <div class="link-bar">
          <v-btn class="p-1" size="sm" color="primary" variant="tonal">
            Selling Guide
          </v-btn>
          <div class="hyper-link-group flex gap-2">
            <img :src="linkIcon" alt="icon" class="pointer" />
            <img :src="linkedinIcon" alt="icon" class="pointer" />
            <img :src="twIcon" alt="icon" class="pointer" />
            <img :src="fbIcon" alt="icon" class="pointer" />
          </div>
        </div>

        <!-- [component] MenuExpanse --------------------------------------------------------------------------->
        <div class="table-of-content" :class="mobile || tablet ? 'mt-5' : 'mt-10'">
          <MenuExpanse :menuList="menuList" />
        </div>

        <!-- Content --------------------------------------------------------------------------->
        <div class="content-info mb-10" :class="mobile || tablet ? 'mt-5' : 'mt-10'">
          As the days get longer and warmer, it’s prime time to prep your
          designs for those sizzling summer moments. If you want a sales chart
          hotter than the pavement in July, make sure your catalog is bursting
          with the coolest summer essentials. In 2024, we’ve got your back with
          the top 15 summer products to sell. So, gear up for your best season
          ever by snagging some (or all) of these trendsetters! 
        </div>

        <!-- Avatar and link bar --------------------------------------------------------------------------->
        <div class="link-bar">
          <div class="avatar flex gap-2">
            <v-avatar :image="heroImg" size="50"></v-avatar>
            <div class="flex flex-column justify-between">
              <span class="font-bold">Chloe Nguyen</span>
              <span class="text-sm text-slate-400">11 Jan 2022</span>
            </div>
          </div>
          <div class="hyper-link-group flex gap-2">
            <img :src="linkIcon" alt="icon" class="pointer" />
            <img :src="linkedinIcon" alt="icon" class="pointer" />
            <img :src="twIcon" alt="icon" class="pointer" />
            <img :src="fbIcon" alt="icon" class="pointer" />
          </div>
        </div>
      </div>

      <!-- <?PC> Summary block --------------------------------------------------------------------------->
      <div class="summary-block" v-show="pc || lgPc || extraPc">
        <div class="products mb-10">
          <span class="text-xl font-bold">Products</span>
          <div
            class="info pt-3 pb-3 flex justify-between"
            v-for="item in 3"
            :key="item"
          >
            <span>T-shirts</span>
            <span class="text-slate-400">12</span>
          </div>
        </div>
        <div class="trending-topics">
          <span class="text-xl font-bold">Trending Topics</span>
          <div
            class="info pt-3 pb-3 flex justify-between font-bold text-slate-500 align-start"
            v-for="item in 3"
            :key="item"
          >
            What are best-selling Christmas print on demand ornament?
            <img :src="popupBoxIcon" alt="icon" />
          </div>
        </div>
      </div>
    </div>

    <!-- [component] Block --------------------------------------------------------------------------->
    <div class="related-post side-paddings" :class="mobile || tablet && 'mt-10'">
      <Blog title="Related Posts" />
    </div>

    <!-- <?Mobile> Summary block --------------------------------------------------------------------------->
    <div class="summary-block" v-show="mobile || tablet">
      <div class="products mb-10">
        <span class="text-xl font-bold">Products</span>
        <div
          class="info pt-3 pb-3 flex justify-between"
          v-for="item in 3"
          :key="item"
        >
          <span>T-shirts</span>
          <span class="text-slate-400">12</span>
        </div>
      </div>
      <div class="trending-topics">
        <span class="text-xl font-bold">Trending Topics</span>
        <div
          class="info pt-3 pb-3 flex justify-between font-bold text-slate-500 align-start"
          v-for="item in 3"
          :key="item"
        >
          What are best-selling Christmas print on demand ornament?
          <img :src="popupBoxIcon" alt="icon" />
        </div>
      </div>
    </div>

    <!-- [Component] Help --------------------------------------------------------------------------->
    <Help
      :headerTitle="$t('tos.helpTitle')"
      :headerDesc="$t('tos.helpDes')"
      :class="mobile || tablet ? 'ml-5 mr-5 mt-10' : 'custom-padding'"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'
import { useRoute } from 'vue-router';

import heroImg from '~/assets/images/blog-img.png'
import linkIcon from '~/assets/svg/gray-hyper.svg'
import linkedinIcon from '~/assets/svg/gray-linkedin.svg'
import twIcon from '~/assets/svg/gray-tw.svg'
import fbIcon from '~/assets/svg/gray-fb.svg'
import popupIcon from '~/assets/svg/popup.svg'
import popupBoxIcon from '~/assets/svg/popup-box.svg'
import Help from '~/components/help.vue'
import Blog from '~/components/blog.vue'
import MenuExpanse from '~/components/MenuExpanse.vue'

import { useAsyncData,useFetch } from 'nuxt/app'

// If myMixin is compatible with Composition API, consider converting it to a composable
// Otherwise, you need to adapt its functionality within the setup

// Reactive data properties
const breadcrumbItems = ref(["Home", "Blog Posts", "Selling Guide"])
const menuList = ref([
  "Yard signs",
  "What are best-selling Christmas print on demand ornament?",
  "Doormats +10 Best Free Print on Demand Design Software and Tools An Ultimate Guide On How To Make And Sell Merch For Creators",
  "Ornaments",
])
const listBlog = ref([])
const route = useRoute();
const { t } = useI18n()
const nuxtApp = useNuxtApp()
const blogId = computed(() => route.params.id);

const { data, pending, error } = useFetch(`http://printchic-api.tvo-solution.net/auth/blog/info/${blogId.value}`, {
  headers: {
    fetchMode: 'headless',
  },
  server: true,
  watch: false,
});

onMounted(async () => {
  if (process.client) {
    updateScreenWidth();
    window.addEventListener('resize', updateScreenWidth);
  }
});

onUnmounted(() => {
  // Remove event listener when the component is unmounted
  window.removeEventListener('resize', updateScreenWidth);
});

const screenWidth = ref(0);

function updateScreenWidth() {
  screenWidth.value = window.innerWidth;

}

const mobile = computed(() => screenWidth.value <= 600);
const tablet = computed(() => screenWidth.value > 600 && screenWidth.value <= 992);
const pc = computed(() => screenWidth.value > 992 && screenWidth.value <= 2000);
const lgPc = computed(() => screenWidth.value > 2000 && screenWidth.value <= 2500);
const extraPc = computed(() => screenWidth.value > 2500);
</script>

<script>
export default {
  components: {
    Help,
    Blog,
    MenuExpanse,
  },
}
</script>

<style lang="scss" scoped>
.blog-detail-container {
  .hero-image {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .blog-content {
    width: 75%;
    @media screen and (max-width: 992px) {
      width: 100%;
    }
    .link-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #eaecf0;
      padding-top: 15px;
    }
  }
  .related-post {
    background-color: #f9fafb;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .table-of-content {
    width: 45%;
    @media screen and (max-width: 600px) {
      width: 100%;
      z-index: 99999;
    }
  }
  .summary-block {
    width: 25%;
    border: 1px solid #eaecf0;
    border-radius: 8px;
    padding: 15px;
    @media screen and (max-width: 992px) {
      width: 100%;
      border-left: none;
      border-right: none;
      border-bottom: none;
      border-radius: 0;
    }
    .info {
      border-bottom: 1px solid #eaecf0;
    }
  }
}
</style>
