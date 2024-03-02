<template>
  <div class="tos-container">
    <div class="side-padding">
      <v-breadcrumbs
        :items="breadcrumbItems"
        class="breadcrumb"
      ></v-breadcrumbs>
      <p class="text-3xl font-extrabold mb-3">Terms of services</p>

      <help
        headerTitle="Terms of Services"
        headerDesc="Effective date: February 24, 2024"
        hideBtn
        class="mt-10 mb-10"
      />
    </div>

    <div class="side-padding">
      <div class="nav-group">
        <v-btn
          :variant="item.isActive ? 'outlined' : 'text'"
          :color="item.isActive && 'blue'"
          class="nav-btn"
          v-for="(item, index) in navMenuData"
          :key="index"
        >
          {{ item.label }}
        </v-btn>
      </div>

      <div class="flex" :class="mobile ? 'flex-column mt-5' : 'mt-10'">
        <div class="content mr-10">
          <div class="nav-slide mb-5" v-if="mobile">
            <p
              v-for="(item, index) in anchorMenuData"
              class="text-sm mb-3 pointer"
              :class="item.isActive && 'blue'"
              :key="index"
            >
              <a :href="item.anchor">{{ item.label }}</a>
            </p>
          </div>
          <div
            class="single-block mb-5"
            v-for="(item, index) in privacyPolicyData"
            :key="index"
          >
            <p :id="item.id" class="text-lg font-bold mb-2">{{ item.title }}</p>
            <p class="text-sm mb-2">
              {{ item.content }}
            </p>
            <p class="text-sm" v-if="item.subContent">
              {{ item.subContent }}
            </p>
          </div>
        </div>
        <div class="nav-slide" v-if="!mobile">
          <p
            v-for="(item, index) in anchorMenuData"
            class="text-sm mb-3 pointer"
            :class="item.isActive && 'blue'"
            :key="index"
          >
            <a :href="item.anchor">{{ item.label }}</a>
          </p>
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
import Help from "../../components/help.vue";
import {
  navMenuData,
  privacyPolicyData,
  anchorMenuData,
} from "./helpers/constants";
import { screenSizeMixin } from "~/mixins/screenSizeMixin";

export default {
  components: { Help },
  mixins: [screenSizeMixin],
  data() {
    return {
      mailIcon,
      popupIcon,
      linkedInIcon,
      twitterIcon,
      fbIcon,
      breadcrumbItems: ["Home", "Terms of services"],
      navMenuData,
      privacyPolicyData,
      anchorMenuData,
    };
  },
};
</script>

<style lang="scss" scoped>
.tos-container {
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
  .nav-group {
    display: flex;
    @media screen and (max-width: 600px) {
      overflow-x: scroll;
    }
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
</style>
