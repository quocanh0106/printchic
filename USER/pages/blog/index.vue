<template>
  <div class="blog-list-all-page-wrapper">
    <div class="blog-list-wrapper" v-show="pc">
      <!-- featured Post -->
      <blog class="custom-padding" />
      <!-- List Blog -->
      <div
        class="blog-list bg-light-gray-custom flex flex-col justify-center items-center custom-padding"
      >
        <div class="list-tab flex items-center gap-x-8">
          <span
            :class="currentTab == index ? 'secondary-btn txt-primary' : 'txt-gray'"
            class="cursor-pointer font-semibold tab-btn text-base"
            v-for="(tab, index) in tabList"
            :key="index"
            @click="currentTab = index"
          >
            {{ this.$i18n.locale == 'US' ? tab.titleUS : this.$i18n.locale == 'US' ? tab.titleUK : this.$i18n.locale == 'FR' ? tab.titleFR : tab.titleDE}}
          </span>
        </div>
        <div class="list-blog-post mt-12">
          <div class="blog-post-wrapper flex">
            <div
              class="flex blog-post cursor-pointer"
              v-for="(item, index) in listBlog"
              :key="index"
              @click="toDetailBlog(item.id)"
            >
              <img class="thumbnail-img rounded" :src="item.img" />
              <span class="content p-6">
                <h1 class="font-semibold text-xl">{{ this.$i18n.locale == 'US' ? item.titleUS : this.$i18n.locale == 'US' ? item.titleUK : this.$i18n.locale == 'FR' ? item.titleFR : item.titleDE }}</h1>
                <p class="text-base font-normal mt-2" v-html="this.$i18n.locale == 'US' ? item.contentUS : this.$i18n.locale == 'US' ? item.contentUK : this.$i18n.locale == 'FR' ? item.contentFR : item.contentDE"></p>
                <p class="text-xs font-normal mt-3">{{ item.date }}</p>
              </span>
            </div>
          </div>
        </div>
        <v-button
          class="secondary-btn mt-12 btn-seemore cursor-pointer"
          @click="loadMore"
          >{{ $t("button.seeMore") }}</v-button
        >
      </div>
      <!-- help -->
      <help
        :headerTitle="$t('homePage.howCanWeHelp')"
        :headerDesc="$t('homePage.howCanWeHelpDesc')"
        class="custom-padding"
      />
    </div>
    <div class="blog-list-wrapper" v-show="mobile || tablet">
      <!-- featured Post -->
      <blog/>
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
          {{ this.$i18n.locale == 'US' ? tab.titleUS : this.$i18n.locale == 'US' ? tab.titleUK : this.$i18n.locale == 'FR' ? tab.titleFR : tab.titleDE}}
          </span>
        </div>
        <div class="list-blog-post mt-12">
          <div class="blog-post-wrapper flex flex-column">
            <div
              class="flex blog-post cursor-pointer flex-column"
              v-for="(item, index) in listBlog"
              :key="index"
              @click="toDetailBlog(item._id)"
            >
              <img class="rounded" :src="item.img" />
              <span class="content p-6">
                <h1 class="font-semibold text-xl">{{ this.$i18n.locale == 'US' ? item.titleUS : this.$i18n.locale == 'US' ? item.titleUK : this.$i18n.locale == 'FR' ? item.titleFR : item.titleDE }}</h1>
                <p class="text-base font-normal mt-2" v-html="this.$i18n.locale == 'US' ? item.contentUS : this.$i18n.locale == 'US' ? item.contentUK : this.$i18n.locale == 'FR' ? item.contentFR : item.contentDE"></p>
                <p class="text-xs font-normal mt-3">{{ item.date }}</p>
              </span>
            </div>
          </div>
        </div>
        <v-button
          class="secondary-btn mt-4 mb-8 btn-seemore cursor-pointer flex justify-center"
          @click="loadMore"
          >{{ $t("button.seeMore") }}</v-button
        >
      </div>
      <!-- help -->
      <help
        :headerTitle="$t('homePage.howCanWeHelp')"
        :headerDesc="$t('homePage.howCanWeHelpDesc')"
        class="mt-5"
      />
    </div>
  </div>
</template>
<script>
import blog from "../../components/blog.vue";
import help from "../../components/help.vue";
import { myMixin } from '~/mixins/myMixin';

export default {
  mixins: [myMixin],
  components: {
    blog,
    help,
  },
  data() {
    return {
      listBlog: [],
      currentPage: 1,
      currentTab: 0,
      tabList: [],
    };
  },
  mounted() {
    // this.currentTab = this.tabList[0];
    this.getListBlog();
    this.getListBlogTag();
  },
  watch: {
    currentPage() {
      this.getListBlog();
    },
  },
  methods: {
    loadMore() {
      this.currentPage++;
    },
    async getListBlog() {
      const response = await this.getRequest('blog/list')
      this.listBlog = response.data.items
      console.log( this.listBlog, 'HAHA')
    },
    async getListBlogTag(){
      const response = await this.getRequest('categoryBlog/list')
      this.tabList = response.data.items
    },
    toDetailBlog(id){
        this.$router.push(`/blog/${id}`)
    }
  },
};
</script>
<style lang="scss">
.tab-btn {
  min-width: 165px;
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
</style>
