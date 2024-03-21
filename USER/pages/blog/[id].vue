<template>
  <div class="blog-detail-container">
    <div class="side-paddings mb-5">
      <v-breadcrumbs
        :items="breadcrumbItems"
        class="breadcrumb"
      ></v-breadcrumbs>
    </div>

    <div class="hero-image mb-10">
      <img  :src="blogDetail?.imgBanner" alt="pic" />
    </div>

    <div class="side-paddings" :class="mobile || tablet ? '' : 'flex gap-10 mb-10'">
      <div class="blog-content">
        <!-- Title --------------------------------------------------------------------------->
        <div class="title text-3xl font-bold mb-5">
          {{ locale == 'US' ? blogDetail.titleUS : locale == 'UK' ? blogDetail.titleUK : locale == 'FR' ? blogDetail.titleFR : blogDetail.titleDE ?? ''}}
        </div>
        <!-- Selling guide button and link bar --------------------------------------------------------------------------->
        <div class="link-bar">
          <div class="tags flex gap-x-2" v-if="blogDetail?.tags?.length > 1 && blogDetail.tags?.[0] != null">
            <div class="" v-for="tag,ind in blogDetail?.tags" :key="ind">
              <button class="p-1 blog-tag" size="sm" color="primary" variant="tonal">
                {{ locale == 'US' ? tag.titleUS : locale == 'UK' ? tag.titleUK : locale == 'FR' ? tag.titleFR :tag.titleDE ?? ''}}
              </button>
            </div>
          </div>
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
        <p class="content-info mb-10" :class="mobile || tablet ? 'mt-5' : 'mt-10'" v-html="locale == 'US' ? blogDetail.contentUS : locale == 'UK' ? blogDetail.contentUK : locale == 'FR' ? blogDetail.contentFR : blogDetail.contentDE ?? ''">
        </p>

        <!-- Avatar and link bar --------------------------------------------------------------------------->
        <div class="link-bar py-4">
          <div class="avatar flex gap-2">
            <v-avatar :image="heroImg" size="50"></v-avatar>
            <div class="flex flex-column justify-between">
              <span class="font-bold">Chloe Nguyen</span>
              <span class="text-sm text-slate-400">{{ blogDetail.createdAt  ?? ''}}</span>
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
            v-for="item in blogDetail?.recommendProduct"
            :key="item"
          >
            <h1>{{ item }}</h1>
            <span class="text-slate-400">12</span>
          </div>
        </div>
        <div class="trending-topics">
          <span class="text-xl font-bold">Trending Topics</span>
          <div
            class="info pt-3 pb-3 flex justify-between font-bold text-slate-500 align-start"
            v-for="item,index in listTrendingTopic"
            :key="index"
          >
          <span class="flex gap-x-2">
            {{ locale == 'US' ? item.titleUS : locale == 'UK' ? item.titleUK : locale == 'FR' ? item.titleFR : item.titleDE ?? ''}}
              <img class="cursor-pointer" @click="this.$router.push(localePath(`/blog/${item.id}`))" :src="popupBoxIcon" alt="icon" />
          </span>
          </div>
        </div>
      </div>
    </div>

    <!-- [component] Block --------------------------------------------------------------------------->
    <div class="related-post side-paddings" >
      <Blog :listBlog="listTrendingTopic" title="Related Posts"  v-show="pc || lgPc || extraPc"/>
      <SwiperBlogMobile class="related-post-swipper-mobile"  v-show="mobile || tablet" :items="listTrendingTopic" :slidePerView="1" />
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
          v-for="news,index in listTrendingTopic"
          :key="index"
        >
        <span class="flex gap-x-2">
            {{ locale == 'US' ? news.titleUS : locale == 'UK' ? news.titleUK : locale == 'FR' ? news.titleFR : news.titleDE ?? '' }}
              <img class="cursor-pointer" @click="this.$router.push(localePath(`/blog/${news.id}`))" :src="popupBoxIcon" alt="icon" />
          </span>
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router';
import SwiperBlogMobile from "../pages/home/components/SwiperBlogMobile";

import heroImg from '~/assets/images/blog-img.png'
import linkIcon from '~/assets/svg/gray-hyper.svg'
import linkedinIcon from '~/assets/svg/gray-linkedin.svg'
import twIcon from '~/assets/svg/gray-tw.svg'
import fbIcon from '~/assets/svg/gray-fb.svg'
import popupIcon from '~/assets/svg/popup.svg'
import popupBoxIcon from '~/assets/svg/popup-box.svg'
import Help from '~/components/help.vue'
import Blog from '../../components/blog.vue'
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
const route = useRoute();
const { t , locale, d } = useI18n()
const blogId = computed(() => route.params.id);

const blogDetail = computed(() => {
  return data.value.data
})

const { data }  = await useAsyncData(
  'blogDetail',
  () => $fetch(`http://printchic-api.tvo-solution.net/auth/blog/info?blogId=${blogId.value}`)
)


const listTrendingTopic = computed(() => {
  return listTrending.value.data.items.filter(item => item.isTop).slice(0, 3);
})


const { data : listTrending }  = await useAsyncData(
  'listTrending',
  () => $fetch(`http://printchic-api.tvo-solution.net/auth/blog/list`)
)
const { screenWidth, mobile, tablet, pc, lgPc, extraPc } = useWidthScreen();

</script>

<script>
export default {
  components: {
    Help,
    Blog,
    MenuExpanse,
    SwiperBlogMobile
  },
}
</script>

<style lang="scss" scoped>
.blog-detail-container {
  .hero-image {
    width: 100%;
    img {
      width: 100%;
      max-height: 431px;
      object-fit: cover;
    }
  }
  .blog-content {
    width: 75%;
    @media screen and (max-width: 992px) {
      width: 100%;
    }
    .link-bar {
      display: flex;
      align-items: center;
      border-top: 1px solid #eaecf0;
      justify-content: space-between;
      padding: 16px;
      flex-wrap: wrap;
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
.related-post-swipper-mobile{
  :deep(img){
    max-height: 241px;
    min-height: 241px;
    object-fit: cover;
  }
  :deep(.swiper-wrapper){
    padding-bottom: 0px;
  }
}

.blog-tag{
  background-color: #EFF4FF;
  padding: 4px 12px;
  border-radius: 2px;
  color: #3372DB;
}
</style>
