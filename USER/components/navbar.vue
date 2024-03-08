<template>
  <div class="nav-bar-outer-wrapper-all-screen">
    <div class="nav-bar" v-show="pc">
      <img
        :src="Logo"
        class="cursor-pointer"
        @click="this.$router.push('/')"
      />
      <customInput />
      <div class="nav-bar-action flex items-center">
        <ul class="nav-bar-wrapper">
          <li v-for="(item, index) in links" :key="index">
            <a class="navigation-menu" :href="item.href">{{ $t(item.label) }}</a>
          </li>
          <li>
            <v-select
              class="language-select"
              variant="solo"
              prepend-inner-icon="mdi-web"
              dense
              :items="listLang"
              item-text="title"
              item-value="code"
              v-model="selectedLanguage"
              @change="selectLanguage"
            >
            </v-select>
          </li>
          <li class="navigation-menu signup-btn primary-btn cursor-pointer text-white">
            {{ $t("navBar.signUp") }}
          </li>
        </ul>
      </div>
    </div>
    <div class="nav-bar-mobile flex justify-between" v-show="mobile || tablet">
      <img
        :src="Logo"
        class="cursor-pointer"
        @click="this.$router.push('/')"
      />
      <div class="mobile-nav-action flex items-center gap-x-5">
        <img :src="searchIcon" />
        <img :src="drawerIcon" @click.stop="drawer = !drawer" />
      </div>
    </div>
    <v-card class="drawer" v-if="drawer">
      <v-layout>
        <v-navigation-drawer v-model="drawer" temporary>
          <div class="logo-n-closebtn flex justify-between">
            <img
              :src="Logo"
              class="cursor-pointer"
              @click="this.$router.push('/')"
            />
            <img
              :src="closeIcon"
              class="cursor-pointer"
              @click="drawer = false"
            />
          </div>
          <customInput class="search-input-mobile" />
          <v-divider></v-divider>

          <v-list
            density="compact"
            class="navigation-menu-mobile"
            @click="isCurrentUrl(url.href)"
            v-for="(url, index) in links"
            :key="index"
            :class="{ 'bg-light-blue-custom': isActive }"
          >
            <a :href="url.href">{{ url.label }}</a>
          </v-list>
        </v-navigation-drawer>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import Logo from "../assets/svg/Logo.svg";
import customInput from "./customInput.vue";
import drawerIcon from "../assets/svg/drawerIcon.svg";
import searchIcon from "../assets/svg/searchIcon.svg";
import closeIcon from "../assets/svg/closeIcon.svg";
import languageIcon from "../assets/svg/languageIcon.svg";

export default {
  components: {
    customInput,
  }, // Apply the mixin
  data() {
    return {
      Logo,
      drawerIcon,
      searchIcon,
      closeIcon,
      languageIcon,
      drawer: null,
      isActive: false,
      links:  [
        { label: "navBar.Home", href: "/" },
        { label: "navBar.Products", href: "/product" },
        { label: "navBar.HIW", href: "/how-it-works" },
        { label: "navBar.Blog", href: "/blog" },
        { label: "navBar.aboutUs", href: "/about-us" },
      ],
      listLang: [
      {
        code: "US",
        title: "US"
      },  
      {
        code: "UK",
        title: "UK"
      },
      {
        code: "DE",
        title: "DE"
      }, 
      {
        code: "FR",
        title: "FR"
      }],
      selectedLanguage: "US",
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
  watch:{
    selectedLanguage(newVal, oldVal){
      this.$i18n.locale = newVal
    }
  },
  methods: {
    selectLanguage(data) {
      console.log("KLEKKE",data);
    },
    isCurrentUrl(url) {
      if (this.$route.href == url) {
        console.log("TRUE");
        this.isActive = !this.isActive;
      } // Check if the link's URL is the current URL
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  /* Your navigation bar styles here */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  width: 100%;
  flex-direction: row;
  gap: 10px;
  padding: 30px 120px;
  @media screen and (max-width:1600px){
    padding: 30px 5vw;
  }
}

.nav-bar a {
  /* Your navigation link styles here */
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  font-weight: bold;
}

.nav-bar a:hover {
  /* Your hover styles here */
  color: #007bff;
}

.nav-bar-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2vw;
  @media screen and (max-width:1600px){
    gap: 1vw;
  }
  @media screen and (max-width:1500px){
    gap: 0px;
  }
}

.navigation-menu {
  font-size: 1vw;
  @media screen and (max-width:1600px){
    font-size: 12px;
  }
  @media screen and (max-width:1500px){
    font-size: 10px;
  }
  @media screen and (max-width:1300px){
    font-size: 8px;
  }
}
.nav-bar-mobile {
  padding: 16px 20px;
}
.drawer {
  z-index: 1;
  :deep(.v-navigation-drawer) {
    width: 100% !important;
    background-color: white;
    z-index: 10;
  }
}
.logo-n-closebtn {
  padding: 24px 16px;
}
.search-input-mobile {
  padding: 24px 16px;
  :deep(.v-input--horizontal) {
    width: 100vw;
    max-width: 100%;
  }
}

.navigation-menu-mobile {
  padding: 24px 16px;
}

.language-select {
  :deep(.v-field--variant-solo) {
    box-shadow: none !important;
  }
  :deep(.v-input__details) {
    display: none;
  }
}
.signup-btn{
  height: auto;
}
</style>
