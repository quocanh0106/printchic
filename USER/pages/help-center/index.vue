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
          <p class="text-2xl text-white font-medium">
            Welcome to our Help Center
          </p>
          <div class="search-group">
            <v-text-field class="input-search"></v-text-field>
            <v-btn color="primary"> Button </v-btn>
          </div>
        </div>
      </div>

      <div class="mt-10 flex">
        <div class="nav-slide">
          <p
            v-for="(item, index) in anchorMenuData"
            class="text-sm mb-3 pointer"
            :class="item.isActive && 'blue'"
            :key="index"
          >
            <a :href="item.anchor">{{ item.label }}</a>
          </p>
        </div>
        <div class="content ml-10">
          <div class="single-block mb-5">
            <v-expansion-panels class="expansions" variant="accordion">
              <v-expansion-panel v-for="item in 6" :key="item">
                <v-expansion-panel-title
                  collapse-icon="mdi-minus"
                  expand-icon="mdi-plus"
                >
                  <span class="text-lg font-bold">
                    Item
                  </span>
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
      class="custom-padding"
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

export default {
  components: { Help },
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
    .breadcrumb {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
    .content {
      width: 70%;
    }
  }
  .search-section {
    position: relative;
    img {
      /* position: absolute; */
      width: 100%;
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
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 15px;
        gap: 15px;
        .input-search {
          width: 300px;
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
    .single-info {
      width: 30%;
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
</style>
