<template>
  <div class="footer-wrapper bg-light-gray-custom">
    <div class="footer custom-padding" v-show="pc">
      <div class="menu-section-wrapper flex justify-between w-auto">
        <div class="footer-left w-auto">
          <img :src="footerLogo" />
          <div class="flex mt-5">
            <img :src="mailIcon" />
            <p class="ml-1.5">contact@printchic.com</p>
          </div>
          <div class="flex mt-3">
            <img :src="locationIcon" />
            <p class="ml-1.5">Potsdamer Str. 182, 10783 Berlin</p>
          </div>
          <div class="flex mt-3">
            <img :src="clockIcon" />
            <p class="ml-1.5">Mon - Fri : 9h00 - 18h00</p>
          </div>
        </div>
        <div class="footer-right flex w-auto gap-x-32">
          <div class="flex flex-col" v-for="(menu, index) in menuList" :key="index">
            <h1 class="section-content txt-primary font-semibold">
              {{ menu.title }}
            </h1>
            <div class="section-content cursor-pointer" v-for="(menuItem, ind) in menu.listUrl" :key="ind"
              @click="$router.push(`${menuItem.url}`)">
              <p>{{ menuItem.urlName }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-between mt-4">
        <h1>© 2023 PrintChic. All rights reserved.</h1>
        <div class="flex">
          <h1>{{ $t("footer.privacyPolicy") }}</h1>
          <h1>{{ $t("footer.termOfService") }}</h1>
        </div>
      </div>
    </div>
    <div class="footer-mobile custom-padding-mobile" v-show="mobile">
      <div class="footer-body flex flex-col w-auto">
        <img class="mobile-logo" :src="footerLogo" />
        <div class="flex mt-5">
          <img :src="mailIcon" />
          <p class="ml-1.5">contact@printchic.com</p>
        </div>
        <div class="flex mt-3">
          <img :src="locationIcon" />
          <p class="ml-1.5">Potsdamer Str. 182, 10783 Berlin</p>
        </div>
        <div class="flex mt-3">
          <img :src="clockIcon" />
          <p class="ml-1.5">Mon - Fri : 9h00 - 18h00</p>
        </div>
      </div>
      <div class="colapse-menu">
        <v-list class="back-color-light-primary" v-model:opened="open">
          <v-list-group v-for="(item, ind) in menuList" :key="ind" :value="item.title"  class="color-primary">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" :title="item.title"></v-list-item>
            </template>

            <v-list-item v-for="({ urlName }, i) in item.listUrl" :key="i" :title="urlName"
              :value="urlName" class="color-black"></v-list-item>
          </v-list-group>
        </v-list>
      </div>
    </div>
  </div>
</template>

<script>
import footerLogo from "../assets/svg/Logo.svg";
import mailIcon from "../assets/svg/mail.svg";
import locationIcon from "../assets/svg/location.svg";
import clockIcon from "../assets/svg/clock.svg";
export default {
  data() {
    return {
      open: ['Users'],
      property: "value",
      footerLogo,
      mailIcon,
      locationIcon,
      clockIcon,
      menuList: [
        {
          title: this.$t("footer.about"),
          listUrl: [
            {
              urlName: this.$t("footer.aboutUs"),
              url: "about-us",
            },
            {
              urlName: this.$t("footer.contactUs"),
              url: "contact-us",
            },
            {
              urlName: this.$t("footer.privacyPolicy"),
              url: "",
            },
            {
              urlName: this.$t("footer.returnAndRefund"),
              url: "",
            },
          ],
        },
        {
          title: this.$t("footer.productAndService"),
          listUrl: [
            {
              urlName: this.$t("footer.product"),
              url: "",
            },
            {
              urlName: this.$t("footer.service"),
              url: "",
            },
            {
              urlName: this.$t("footer.ourFactory"),
              url: "",
            },
            {
              urlName: this.$t("footer.returnAndRefund"),
              url: "",
            },
          ],
        },
        {
          title: this.$t("footer.quickAccess"),
          listUrl: [
            {
              urlName: this.$t("footer.ourBlogPost"),
              url: "",
            },
            {
              urlName: this.$t("footer.productCatalog"),
              url: "",
            },
            {
              urlName: this.$t("footer.customMerchanise"),
              url: "",
            },
            {
              urlName: this.$t("footer.demoStore"),
              url: "",
            },
            {
              urlName: this.$t("footer.VNCommunity"),
              url: "",
            },
            {
              urlName: this.$t("footer.GlobalCommunity"),
              url: "",
            },
          ],
        },
      ],
    };
  },
  computed: {
    mobile() {
      if (process.client) {
        if (window.screen.width <= 600) {
          return true;
        } else {
          return false;
        }
      }
    },
    tablet() {
      if (process.client) {
        if (window.screen.width > 600 && window.screen.width <= 992) {
          return true;
        } else {
          return false;
        }
      }
    },
    pc() {
      if (process.client) {
        if (window.screen.width > 992) {
          return true;
        } else {
          return false;
        }
      }
    },
    lgPc() {
      if (process.client) {
        if (window.screen.width > 2000) {
          return true;
        } else {
          return false;
        }
      }
    },
    extraPc() {
      if (process.client) {
        if (window.screen.width > 2500) {
          return true;
        } else {
          return false;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  min-height: 451px;
  background-color: #fafbff;
}

.menu-section-wrapper {
  border-bottom: 1px solid #d1e0ff;
  min-height: 284px;
}

.mobile-logo {
  width: 132px;
}

.color-primary {
  color: #3372DB;
}

.color-black {
  color: black;
}

.back-color-light-primary {
  background-color: #fafbff;
}
</style>
