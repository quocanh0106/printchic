<template>
  <div class="privacy-policy-container">
    <div class="side-padding">
      <v-breadcrumbs
        :items="breadcrumbItems"
        class="breadcrumb"
      ></v-breadcrumbs>
      <p id="abc" class="text-3xl font-extrabold mb-3">Privacy Policy</p>
      <p class="text-sm font-thin text-slate-400">
        Effective date: February 23, 2024
      </p>
      <div
        class="flex policy-content"
        :class="mobile || tablet ? 'flex-column mt-5' : 'mt-10'"
      >
        <div class="nav-slide" v-if="mobile || tablet">
          <p
            v-for="(item, index) in anchorMenuData"
            class="text-sm mb-3 pointer"
            :class="item.isActive && 'blue'"
            :key="index"
          >
            <a :href="item.anchor">{{ item.label }}</a>
          </p>
        </div>
        <div class="content mr-10">
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
        <div class="nav-slide" v-if="pc">
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
      :headerTitle="$t('privacyPolicy.helpTitle')"
      :headerDesc="$t('privacyPolicy.helpDes')"
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
import Help from "../../components/help.vue";
import { privacyPolicyData, anchorMenuData } from "./helpers/constants";
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
      breadcrumbItems: ["Home", "Privacy Policy"],
      privacyPolicyData,
      anchorMenuData,
    };
  },
};
</script>

<style lang="scss" scoped>
.privacy-policy-container {
  .side-padding {
    padding: 0 120px;
    @media screen and (max-width: 992px) {
      padding: 0 10px;
    }
    .breadcrumb {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
    .policy-content {
      display: flex;
      .content {
        width: 70%;
        @media screen and (max-width: 992px) {
          width: 100%;
        }
      }
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
</style>
