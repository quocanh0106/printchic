<template>
  <div class="help-center-container">
    <div class="side-padding">
      <v-breadcrumbs
        :items="breadcrumbItems"
        class="breadcrumb"
      ></v-breadcrumbs>

      <div class="search-section">
        <img :src="bgPic" alt="pic" />
        <div class="search-input-group">
          <p
            class="text-2xl text-white font-medium"
            :class="mobile || tablet ? 'text-xl' : 'text-2xl'"
          >
            Welcome to our Help Center
          </p>
          <div class="search-group">
            <v-text-field
              class="input-search"
              variant="solo"
              prepend-inner-icon="mdi-magnify"
              dense
              v-model="searchData"
            ></v-text-field>
            <v-btn class="seach-btn" color="primary" @click="searchHelpList">
              Search
            </v-btn>
          </div>
        </div>
      </div>

      <div class="flex" :class="mobile || tablet ? 'flex-col mt-5' : 'mt-10'">
        <div class="nav-slide" v-if="pc">
          <p
            v-for="(item, index) in anchorMenuData"
            class="text-sm mb-3 pointer"
            :class="item.isActive && 'blue'"
            :key="index"
            @click="changeTab(index)"
          >
            {{ item.label }}
          </p>
        </div>
        <div class="nav-slide mb-5" v-else>
          <span
            v-for="(item, index) in anchorMenuData"
            class="text-sm mb-3 pointer mr-5"
            :class="item.isActive && 'blue'"
            :key="index"
            @click="changeTab(index)"
            >{{ item.label }}</span
          >
        </div>

        <div class="content" :class="mobile || tablet ? 'ml-0' : 'ml-10'">
          <p v-if="isSearch">
            <span class="font-bold text-cyan-700">{{ helpList.length }}</span>
            Results found for "{{ searchData }}"
          </p>
          <div class="single-block mb-5">
            <v-expansion-panels class="expansions" variant="accordion">
              <v-expansion-panel v-for="(item, index) in helpList" :key="index">
                <v-expansion-panel-title
                  collapse-icon="mdi-minus"
                  expand-icon="mdi-plus"
                >
                  <span class="text-lg font-bold"> {{ item.title }} </span>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  {{ item.description }}
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
          <v-pagination
            v-if="isSearch && helpList.length > 0"
            v-model="pagination"
            :length="paginationLength"
            color="primary"
            variant="outlined"
          ></v-pagination>
          <div
            class="no-data-searching"
            v-if="isSearch && helpList.length === 0"
          >
            <p class="text-sm text-slate-400">Our Suggestions</p>
            <div class="chip-list">
              <v-chip
                v-for="item in 10"
                :key="item"
                class="ma-2"
                label
                size="small"
              >
                Label
              </v-chip>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="detail-info">
      <div class="single-info">
        <p class="mb-2 font-semibold">Chat to us</p>
        <div class="divider"></div>
        <p class="mt-2 text-sm">Monday – Sunday</p>
        <p class="text-sm mb-1">8h30am – 5h30pm (UTC+07:00)</p>
        <p class="text-sm mb-2 flex gap-2 items-center">
          <img :src="mailIcon" alt="icon" />
          contact@printchic.com
        </p>
        <p class="text-sm font-semibold blue flex gap-2 items-center">
          Quick Chat via Messenger <img :src="popupIcon" alt="icon" />
        </p>
      </div>
      <div class="single-info">
        <p class="mb-2 font-semibold">Offices</p>
        <div class="divider"></div>
        <p class="mt-2 text-xs text-slate-400">UK Office: </p>
        <p class="text-sm mb-1">
          23 Old Gloucester Street, WC1N 3AX, LONDON, United Kingdom
        </p>
      </div>
      <div class="single-info">
        <p class="mb-2 font-semibold">Social network</p>
        <div class="divider"></div>
        <p class="mt-2 flex gap-2 mb-1">
          <img :src="linkedInIcon" alt="icon" />
          <img :src="fbIcon" alt="icon" />
          <img :src="twitterIcon" alt="icon" />
        </p>
        <p class="text-sm">
          Review our support <span class="text-sky-700">FAQs</span> page for
          quick solutions.
        </p>
      </div>
    </div>

    <help
      :headerTitle="$t('tos.helpTitle')"
      :headerDesc="$t('tos.helpDes')"
      :class="mobile || tablet ? 'ml-5 mr-5 mt-10' : 'custom-padding'"
    />
  </div>
</template>

<script>
import mailIcon from "../../assets/svg/mail.svg";
import popupIcon from "../../assets/svg/popup.svg";
import linkedInIcon from "../../assets/svg/linkin.svg";
import fbIcon from "../../assets/svg/fb.svg";
import twitterIcon from "../../assets/svg/x-social.svg";
import bgPic from "../../assets/images/help-center-bg.png";
import Help from "../../components/help.vue";
import {
  navMenuData,
  privacyPolicyData,
  anchorMenuData,
  helpListMock,
} from "./helpers/constants";
import { myMixin } from "~/mixins/myMixin";

export default {
  components: { Help },
  mixins: [myMixin],
  data() {
    return {
      mailIcon,
      popupIcon,
      linkedInIcon,
      twitterIcon,
      fbIcon,
      bgPic,
      breadcrumbItems: ["Home", "Help Center"],
      searchData: "",
      helpList: helpListMock,
      navMenuData,
      privacyPolicyData,
      anchorMenuData,
      isSearch: false,
      pagination: 1,
      paginationLength: 1,
    };
  },
  methods: {
    searchHelpList() {
      this.isSearch = true;
      this.helpList = this.helpList.filter((item) =>
        item.title.toLowerCase().includes(this.searchData.toLowerCase())
      );
      this.paginationLength = Math.ceil(this.helpList.length / 8);
    },
    changeTab(index) {
      this.anchorMenuData = this.anchorMenuData.map((item) => {
        return {
          label: item.label,
          isActive: false,
        };
      });
      this.anchorMenuData[index].isActive = true;
    },
  },
  mounted() {
    this.changeTab(0)
  }
};
</script>

<style lang="scss" scoped>
.help-center-container {
  .side-padding {
    padding: 0 120px;
    @media screen and (max-width: 992px) {
      padding: 0 10px;
    }
    .breadcrumb {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
    .content {
      width: 80%;
      @media screen and (max-width: 992px) {
        width: 100%;
      }
    }
    .nav-slide {
      width: 20%;
      @media screen and (max-width: 992px) {
        width: 100%;
      }
    }
  }
  .search-section {
    position: relative;
    img {
      width: 100%;
      @media screen and (max-width: 600px) {
        height: calc(100vw / 2);
      }
    }
    .search-input-group {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .search-group {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 25px;
        gap: 15px;
        @media screen and (max-width: 600px) {
          flex-direction: column;
          width: 100%;
          padding: 0 20px;
          .seach-btn {
            width: 100%;
          }
        }
        .input-search {
          display: flex;
          justify-content: center;
          width: 100%;
          ::v-deep(.v-input__control) {
            width: 500px;
            height: 36px;
            @media screen and (max-width: 600px) {
              width: 100%;
            }
          }
          ::v-deep(.v-input__details) {
            padding: 0;
          }
          ::v-deep(.v-field__field) {
            height: 36px;
          }
          ::v-deep(.v-field__input) {
            min-height: 36px;
            padding: 0 10px;
            display: inline-block;
          }
        }
      }
    }
  }
  .nav-group {
    display: flex;
    .nav-btn {
      text-transform: capitalize;
      font-size: 14px;
    }
  }
  .detail-info {
    margin: 50px 0 0;
    padding: 30px 120px;
    display: flex;
    justify-content: space-between;
    background-color: #fafbff;
    @media screen and (max-width: 600px) {
      flex-direction: column;
      padding: 10px;
    }
    @media screen and (min-width: 600px) and (max-width: 992px) {
      flex-direction: column;
    }
    .single-info {
      width: 30%;
      @media screen and (max-width: 992px) {
        width: 100%;
        margin-bottom: 10px;
      }
      .font-semibold:hover {
        color: #3372db;
        cursor: pointer;
      }
    }
  }
}
.divider {
  width: 100%;
  border-top: 1px solid #d1e0ff;
}
.blue {
  color: #3372db;
}
.pointer {
  cursor: pointer;
}
.gap-10 {
  gap: 10px;
}
</style>
