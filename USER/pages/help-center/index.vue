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
            :class="mobile ? 'text-xl' : 'text-2xl'"
          >
            Welcome to our Help Center
          </p>
          <div class="search-group">
            <v-text-field
              class="input-search"
              variant="solo"
              prepend-inner-icon="mdi-magnify"
              dense
            ></v-text-field>
            <v-btn class="seach-btn" color="primary"> Search </v-btn>
          </div>
        </div>
      </div>

      <div class="flex" :class="mobile ? 'flex-col mt-5' : 'mt-10'">
        <div class="nav-slide" v-if="pc">
          <p
            v-for="(item, index) in anchorMenuData"
            class="text-sm mb-3 pointer"
            :class="item.isActive && 'blue'"
            :key="index"
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
            >{{ item.label }}</span
          >
        </div>

        <div class="content" :class="mobile ? 'ml-0' : 'ml-10'">
          <p>
            <span class="font-bold text-cyan-700">16</span> Results found for
            “warehouse”
          </p>
          <div class="single-block mb-5 mt-5">
            <v-expansion-panels class="expansions" variant="accordion">
              <v-expansion-panel v-for="item in 6" :key="item">
                <v-expansion-panel-title
                  collapse-icon="mdi-minus"
                  expand-icon="mdi-plus"
                >
                  <span class="text-lg font-bold"> Item </span>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
          <v-pagination
            :length="4"
            color="primary"
            variant="outlined"
          ></v-pagination>
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
      :class="mobile ? 'ml-5 mr-5 mt-10' : 'custom-padding'"
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
      navMenuData,
      privacyPolicyData,
      anchorMenuData,
    };
  },
};
</script>

<style lang="scss" scoped>
.help-center-container {
  .side-padding {
    padding: 0 120px;
    @media screen and (max-width: 600px) {
      padding: 0 10px;
    }
    .breadcrumb {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
    .content {
      width: 70%;
      @media screen and (max-width: 600px) {
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
    .single-info {
      width: 30%;
      @media screen and (max-width: 600px) {
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
