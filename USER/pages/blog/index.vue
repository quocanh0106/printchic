<template>
  <div class="blog-list-wrapper" v-show="pc">
    <!-- featured Post -->
    <blog class="custom-padding" />
    <!-- List Blog -->
    <div
      class="blog-list bg-light-gray-custom flex flex-col justify-center items-center custom-padding"
    >
      <div class="list-tab flex items-center gap-x-8">
        <span
          :class="currentTab == tab ? 'secondary-btn txt-primary' : 'txt-gray'"
          class="cursor-pointer font-semibold tab-btn text-base"
          v-for="(tab, index) in tabList"
          :key="index"
          @click="currentTab = tab"
        >
          {{ tab }}
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
            <img class="thumbnail-img rounded" :src="item.imgUrl" />
            <span class="content p-6">
              <h1 class="font-semibold text-xl">{{ item.title }}</h1>
              <p class="text-base font-normal mt-2">{{ item.content }}</p>
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
  <div class="blog-list-wrapper" v-show="mobile">
    <!-- featured Post -->
    <blog/>
    <!-- List Blog -->
    <div
      class="blog-list bg-light-gray-custom flex flex-col justify-center items-center w-100"
    >
      <div class="list-tab flex gap-x-8 list-tab-name mx-3">
        <span
          :class="currentTab == tab ? 'secondary-btn txt-primary' : 'txt-gray'"
          class="cursor-pointer font-semibold tab-btn text-base"
          v-for="(tab, index) in tabList"
          :key="index"
          @click="currentTab = tab"
        >
          {{ tab }}
        </span>
      </div>
      <div class="list-blog-post mt-12">
        <div class="blog-post-wrapper flex flex-column">
          <div
            class="flex blog-post cursor-pointer flex-column"
            v-for="(item, index) in listBlog"
            :key="index"
            @click="toDetailBlog(item.id)"
          >
            <img class="rounded" :src="item.imgUrl" />
            <span class="content p-6">
              <h1 class="font-semibold text-xl">{{ item.title }}</h1>
              <p class="text-base font-normal mt-2">{{ item.content }}</p>
              <p class="text-xs font-normal mt-3">{{ item.date }}</p>
            </span>
          </div>
        </div>
      </div>
      <v-button
        class="secondary-btn mt-12 btn-seemore cursor-pointer flex justify-center"
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
      listBlog: [
        {
          id: 1,
          title: "Title 1",
          content:
            "Today’s Fortune 500 list rolls over faster than ever. Today, only 12 percent of the companies that.",
          imgUrl:
            "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/stock%2FGettyImages-1166414278",
          date: "20/11/1999",
        },
        {
          id: 1,
          title: "Title 1",
          content:
            "Today’s Fortune 500 list rolls over faster than ever. Today, only 12 percent of the companies that.",
          imgUrl:
            "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/stock%2FGettyImages-1166414278",
          date: "20/11/1999",
        },
        {
          id: 1,
          title: "Title 1",
          content:
            "Today’s Fortune 500 list rolls over faster than ever. Today, only 12 percent of the companies that.",
          imgUrl:
            "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/stock%2FGettyImages-1166414278",
          date: "20/11/1999",
        },
        {
          id: 1,
          title: "Title 1",
          content:
            "Today’s Fortune 500 list rolls over faster than ever. Today, only 12 percent of the companies that.",
          imgUrl:
            "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/stock%2FGettyImages-1166414278",
          date: "20/11/1999",
        },
        {
          id: 1,
          title: "Title 1",
          content:
            "Today’s Fortune 500 list rolls over faster than ever. Today, only 12 percent of the companies that.",
          imgUrl:
            "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/stock%2FGettyImages-1166414278",
          date: "20/11/1999",
        },
        {
          id: 1,
          title: "Title 1",
          content:
            "Today’s Fortune 500 list rolls over faster than ever. Today, only 12 percent of the companies that.",
          imgUrl:
            "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/stock%2FGettyImages-1166414278",
          date: "20/11/1999",
        },
        {
          id: 1,
          title: "Title 1",
          content:
            "Today’s Fortune 500 list rolls over faster than ever. Today, only 12 percent of the companies that.",
          imgUrl:
            "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/stock%2FGettyImages-1166414278",
          date: "20/11/1999",
        },
        {
          id: 1,
          title: "Title 1",
          content:
            "Today’s Fortune 500 list rolls over faster than ever. Today, only 12 percent of the companies that.",
          imgUrl:
            "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/stock%2FGettyImages-1166414278",
          date: "20/11/1999",
        },
      ],
      currentPage: 1,
      currentTab: "",
      tabList: ["tab1", "tab2", "tab3", "tab4", "tab5"],
    };
  },
  mounted() {
    this.currentTab = this.tabList[0];
    this.fetchData();
  },
  watch: {
    currentPage() {
      this.fetchData();
    },
  },
  methods: {
    loadMore() {
      this.currentPage++;
    },
    fetchData() {
      try {
        console.log("FETCHING");
        console.log("CURRENT PAGE", this.currentPage);
      } catch {}
    },
    toDetailBlog(id){
        this.$router.push(`/blog/${id}`)
    }
  },
};
</script>
<style lang="scss">
.tab-btn {
  padding: 8px 16px;
  height: 39px !important;
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
</style>
