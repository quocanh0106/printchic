<template>
  <div class="all-screen-blog-wrapper">
    <div class="blog-wrapper" v-show="pc || lgPc || extraPc">
      <div class="blog-header flex justify-between items-center">
        <h1 class="section-title font-semibold">
          {{ title ? title : $t("homePage.ourBlogStory") }}
        </h1>
        <a class="flex gap-1 txt-primary cursor-pointer mt-10" @click="$router.push('/blog')">
          <p>{{ $t("button.viewAll") }}</p>
          <img :src="arrowUpRight" />
        </a>
      </div>
      <div class="blog-body-wrapper gap-x-8 flex mt-10">
        <div
          v-show="listBlog.length > 0"
          class="blog-left-wrapper flex flex-col cursor-pointer"
          @click="toDetailBlog(listBlog[0]?.id)"
        >
          <img :src="listBlog[0]?.img" class="blog-img" />
          <div class="content flex flex-col mt-8">
            <h1 class="text-2xl font-semibold">{{ listBlog[0]?.[`title${currentLanguage}`] }}</h1>
            <div v-html="listBlog[0]?.[`content${currentLanguage}`] ? JSON.parse(listBlog[0][`content${currentLanguage}`]) : ''" class="text-base mt-2"></div>
            <p class="text-sm mt-4">{{ listBlog[0]?.createdAt }}</p>
          </div>
        </div>
        <div class="blog-right-wrapper flex flex-col items-start justify-start">
          <div
            class="side-blog-wrapper cursor-pointer"
            v-for="(blog, index) in listBlog"
            :key="index"
            @click="toDetailBlog(blog.id)"
          >
            <div
              class="blog-content mb-8 flex gap-x-6"
              v-if="index != 0 && index <= 3"
            >
              <img class="small-img-blog blog-img" :src="blog.img" />
              <div class="">
                <h1 class="font-semibold">{{ blog[`title${currentLanguage}`] }}</h1>
                <p v-html="JSON.parse(blog[`content${currentLanguage}`])" class="mt-2"></p>
                <p class="mt-3">{{ blog.createdAt }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="blog-wrapper mx-3" v-show="mobile || tablet">
      <div class="blog-header flex justify-center items-center my-5">
        <h1 class="section-title font-semibold">
          {{ title ? title : $t("homePage.ourBlogStory") }}
        </h1>
      </div>
      <SwiperBlogMobile />
    </div>
  </div>
</template>

<script setup lang="js">
import arrowUpRight from "../assets/svg/arrowUpRight.svg";
import { myMixin } from "~/mixins/myMixin";
import SwiperBlogMobile from "../pages/home/components/SwiperBlogMobile";
import useLanguage from '~/composables/useLanguage';
import useWidthScreen from '~/composables/useWidthScreen';

const { screenWidth, mobile, tablet, pc, lgPc, extraPc } = useWidthScreen();
const { currentLanguage, setLanguage } = useLanguage();

defineProps({
  title: {
    type: String,
  },
  listBlog: {
    type: Array,
  },
});


const toDetailBlog = (id) => {
  this.$router.push(`/blog/${id}`);
};
</script>

<style lang="scss" scoped>
.blog-img {
  border-radius: 6px;
}

.small-img-blog {
  max-width: 183px;
  min-width: 183px;
  height: 183px;
  min-height: 183px;
  object-fit: cover;
}
</style>
