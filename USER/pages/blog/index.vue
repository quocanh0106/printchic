<template>
  <div class="blog-list-all-page-wrapper">
    <div class="blog-list-wrapper" v-show="pc || lgPc || extraPc">
      <!-- featured Post -->
      <blog :listBlog="listBlog?.data?.items" class="custom-padding" />
      <!-- List Blog -->
      <div
        class="blog-list bg-light-gray-custom flex flex-col justify-center items-center custom-padding"
      >
        <div class="list-tab flex items-center gap-x-8">
          <span
            :class="currentTab == index ? 'secondary-btn txt-primary active-tab' : 'txt-gray'"
            class="cursor-pointer font-semibold tab-btn text-base"
            v-for="(tab, index) in tabList?.data?.items"
            :key="index"
            @click="currentTab = index"
          >
          {{ locale == 'US' ? tab.titleUS : locale == 'US' ? tab.titleUK : locale == 'FR' ? tab.titleFR : tab.titleDE}}
          </span>
        </div>
        <div class="list-blog-post mt-12">
          <div class="blog-post-wrapper flex">
            <div
              class="flex blog-post cursor-pointer"
              v-for="(item, index) in listBlog?.data?.items"
              :key="index"
              @click="toDetailBlog(item.id)"
            >
              <img class="thumbnail-img rounded" :src="item.img" />
              <span class="content p-6">
                <h1 class="font-semibold text-xl">{{  locale == 'US' ? item.titleUS :  locale == 'US' ? item.titleUK :  locale == 'FR' ? item.titleFR : item.titleDE }}</h1>
                <p class="text-base font-normal mt-2" v-html=" locale == 'US' ? item.contentUS :  locale == 'US' ? item.contentUK :  locale == 'FR' ? item.contentFR : item.contentDE"></p>
                <p class="text-xs font-normal mt-3">{{ item.date }}</p>
              </span>
            </div>
          </div>
        </div>
        <button
          v-if="hasMoreBlogPost"
          class="secondary-btn mt-12 btn-seemore cursor-pointer"
          @click="loadMore"
          >{{ t("button.seeMore") }}</button
        >
        <p v-else class="text-center mt-6">{{ t("blogList.noMorePost") }}</p>
      </div>
      <!-- help -->
      <help
        :headerTitle="t('homePage.howCanWeHelp')"
        :headerDesc="t('homePage.howCanWeHelpDesc')"
        class="custom-padding"
      />
    </div>
    <div class="blog-list-wrapper" v-show="mobile || tablet">
      <!-- featured Post -->
      <blog :listBlog="listBlog?.data?.items"/>
      <!-- List Blog -->
      <div
        class="blog-list bg-light-gray-custom flex flex-col justify-center items-center w-100"
      >
        <div class="list-tab flex gap-x-8 list-tab-name mx-3">
          <span
            :class="currentTab == index ? 'secondary-btn txt-primary' : 'txt-gray'"
            class="cursor-pointer font-semibold tab-btn text-base"
            v-for="(tab, index) in tabList"
            :key="index"
            @click="currentTab = index"
          >
          {{  locale == 'US' ? tab.titleUS :  locale == 'US' ? tab.titleUK :  locale == 'FR' ? tab.titleFR : tab.titleDE}}
          </span>
        </div>
        <div class="list-blog-post mt-12">
          <div class="blog-post-wrapper flex flex-column">
            <div
              class="flex blog-post cursor-pointer flex-column"
              v-for="(item, index) in listBlog?.data?.items"
              :key="index"
              @click="toDetailBlog(item._id)"
            >
              <img class="rounded" :src="item.img" />
              <span class="content p-6">
                <h1 class="font-semibold text-xl">{{  locale == 'US' ? item.titleUS :  locale == 'US' ? item.titleUK :  locale == 'FR' ? item.titleFR : item.titleDE }}</h1>
                <p class="text-base font-normal mt-2" v-html=" locale == 'US' ? item.contentUS :  locale == 'US' ? item.contentUK :  locale == 'FR' ? item.contentFR : item.contentDE"></p>
                <p class="text-xs font-normal mt-3">{{ item.date }}</p>
              </span>
            </div>
          </div>
        </div>
        <button
          v-if="hasMoreBlogPost"
          class="secondary-btn mt-4 mb-8 btn-seemore cursor-pointer flex justify-center"
          @click="loadMore"
          >{{ t("button.seeMore") }}</button
        >
        <p v-else class="text-center mt-4">{{ t("blogList.noMorePost") }}</p>
      </div>
      <!-- help -->
      <help
        :headerTitle="t('homePage.howCanWeHelp')"
        :headerDesc="t('homePage.howCanWeHelpDesc')"
        class="mt-5"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import blog from "../../components/blog.vue";
import help from "../../components/help.vue";
import { useI18n, useLocalePath,useRouter } from '#imports'

const currentTab = ref(0);
const { screenWidth, mobile, tablet, pc, lgPc, extraPc } = useWidthScreen();

const router = useRouter()

const localePath = useLocalePath()
const { t , locale } = useI18n()

const listBlog   = await useAsyncData(
  `listBlog-${new Date().getTime()}`,
  () => $fetch('http://printchic-api.tvo-solution.net/auth/blog/list?page=1&limit=10')
)?.data
const { data:tabList }  = await useAsyncData(
  `tabList-${new Date().getTime()}`,
  () => $fetch('http://printchic-api.tvo-solution.net/auth/categoryBlog/list')
)

const currentPage = ref(1)
const limit = ref(9)
const hasMoreBlogPost = ref(true)

const loadMore = async () => {
  currentPage.value++;
  const response = await $fetch(`http://printchic-api.tvo-solution.net/auth/blog/list?page=${currentPage.value}&limit=${limit.value}`)
  
  listBlog.value.data.items = [...listBlog.value.data.items,...response.data.items]
  if(response.data.items.length == 0){
    hasMoreBlogPost.value = false
  }
};

const toDetailBlog = (id) => {
  router.push(localePath(`/blog/${id}`));
};
</script>
<style lang="scss">
.tab-btn {
  display:flex;
  align-items:center;
}
.blog-post-wrapper {
  flex-wrap: wrap;
}

.blog-post {
  flex: 0 0 50%; /* Makes each post take up 50% of the container's width */
  box-sizing: border-box;
  padding: 10px; /* Adjust spacing as needed */
}
.btn-seemore {
  max-width: 120px;
  height: 46px;
}

.list-tab-name {
  margin-top: 20px;
  padding-bottom: 10px;
  overflow-x: scroll;
  padding-left: 5px;
  width: 100vw;
}

.thumbnail-img {
  height:183px;
  width:183px;
  object-fit: cover;
}
.active-tab{
  min-width: 0px !important;
}
</style>
