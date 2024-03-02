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

    <div class="side-paddings flex gap-10 mb-10">
      <div class="blog-content">
        <div class="title text-3xl font-bold mb-5">
          Summer Products to Sell: 15 POD Ideas for This Season
        </div>
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

        <div class="content-info mt-10 mb-10">
          As the days get longer and warmer, it’s prime time to prep your
          designs for those sizzling summer moments. If you want a sales chart
          hotter than the pavement in July, make sure your catalog is bursting
          with the coolest summer essentials. In 2024, we’ve got your back with
          the top 15 summer products to sell. So, gear up for your best season
          ever by snagging some (or all) of these trendsetters! 
        </div>

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
      <div class="summary-block">
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

    <div class="related-post side-paddings">
      <Blog title="Related Posts" />
    </div>

    <Help
      :headerTitle="$t('tos.helpTitle')"
      :headerDesc="$t('tos.helpDes')"
      :class="mobile ? 'ml-5 mr-5 mt-10' : 'custom-padding'"
    />
  </div>
</template>

<script>
import heroImg from "../../assets/images/blog-img.png";
import linkIcon from "../../assets/svg/gray-hyper.svg";
import linkedinIcon from "../../assets/svg/gray-linkedin.svg";
import twIcon from "../../assets/svg/gray-tw.svg";
import fbIcon from "../../assets/svg/gray-fb.svg";
import popupIcon from "../../assets/svg/popup.svg";
import popupBoxIcon from "../../assets/svg/popup-box.svg";
import Help from "../../components/help.vue";
import { screenSizeMixin } from "~/mixins/screenSizeMixin";
import Blog from "../../components/blog.vue";

export default {
  name: "BlogDetailVue",
  components: { Help, Blog },
  mixins: [screenSizeMixin],
  data() {
    return {
      breadcrumbItems: ["Home", "Blog Posts", "Selling Guide"],
      heroImg,
      linkIcon,
      linkedinIcon,
      popupBoxIcon,
      twIcon,
      fbIcon,
      popupIcon,
    };
  },
  methods: {},
};
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
  .summary-block {
    width: 25%;
    border: 1px solid #eaecf0;
    border-radius: 8px;
    padding: 15px;
    .info {
      border-bottom: 1px solid #eaecf0;
    }
  }
}
</style>
