<template>
  <div class="contact-us-page-wrapper" v-show="pc">
    <!-- contact form -->
    <div class="contact-form-wrapper flex justify-between items-start custom-padding">
      <div class="contact-form w-1/2">
        <h1 class="font-semibold title-contact">
          {{ $t("contactUs.contactUs") }}
        </h1>
        <div class="form-contact mt-8">
          <form @submit.prevent="submitForm" class="">
            <div class="flex flex-col">
              <label class="label-form" for="name">{{
                $t("contactUs.yourName")
              }}</label>
              <input :placeholder="$t('contactUs.fillYourName')" class="input-contact mt-1.5" type="text" id="name"
                v-model="form.name" />
            </div>
            <div class="flex flex-col mt-6">
              <label class="label-form" for="email">{{
                $t("contactUs.yourEmail")
              }}</label>
              <input :placeholder="$t('contactUs.fillYourName')" class="input-contact mt-1.5" type="password" id="email"
                v-model="form.email" />
            </div>
            <div class="flex flex-col mt-6">
              <label class="label-form" for="message">{{
                $t("contactUs.yourMessage")
              }}</label>
              <input :placeholder="$t('contactUs.fillYourMessage')" class="input-contact mt-1.5" type="password"
                id="message" v-model="form.message" />
            </div>
            <div class="action-contact-button flex flex-col mt-6">
              <button type="submit" class="primary-btn text-white cursor-pointer">
                {{
                  $t("contactUs.submit")
                }}
              </button>
              <div class="relative text-center mt-6">
                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center">
                  <span class="px-3 bg-white text-sm text-gray-500">or</span>
                </div>
              </div>
              <button type="submit" class="secondary-btn mt-6 cursor-pointer">{{
                $t("contactUs.contactViaMessenger")
              }}</button>
            </div>
          </form>
        </div>
      </div>
      <img class="w-1/2 rounded-lg" :src="contactThumb" />
    </div>
    <!-- social -->
    <div class="social-wrapper bg-light-gray-custom custom-padding">
      <div class="flex gap-x-8">
        <div class="motive-body-left flex-1 flex-col justify-start">
          <h5 class="txt-primary text-xl font-semibold border-bottom-primary pb-3">
            {{ $t("contactUs.chatToUs") }}
          </h5>
          <span class="mt-3">
            <div class="mt-5">
              <p>Mon - Fri : 9h00 - 18h00</p>
            </div>
            <div class="">
              <p>8h30am – 5h30pm (UTC+07:00)</p>
            </div>
            <div class="flex mt-3">
              <img :src="mailIcon" />
              <p class="ml-1.5">contact@printchic.com</p>
            </div>
            <div class="mt-3 flex gap-x-1.5 cursor-pointer">
              <a class="txt-primary font-semibold">{{
                $t("contactUs.contactViaMessenger")
              }}</a>
              <img :src="arrowUpRight" />
            </div>
          </span>
        </div>
        <div class="motive-body-left flex-1 flex-col">
          <h5 class="font-semibold border-bottom-primary text-xl pb-3">
            {{ $t("contactUs.office") }}
          </h5>
          <p class="mt-3">UK Office :</p>
          <p>23 Old Gloucester Street, WC1N 3AX, LONDON, United Kingdom</p>
        </div>
        <div class="motive-body-left flex-1 flex-col">
          <h5 class="font-semibold text-xl border-bottom-primary pb-3">
            {{ $t("contactUs.socialNetwork") }}
          </h5>
          <span class="flex mt-3 gap-x-2">
            <img class="socials" :src="linkedin" />
            <img class="socials" :src="facebook" />
            <img class="socials" :src="twitter" />
          </span>
          <p class="mt-3">
            {{ $t("contactUs.reviewOurSupport") }}
          </p>
        </div>
      </div>
    </div>
    <!-- help -->
    <help :headerTitle="$t('homePage.howCanWeHelp')" :headerDesc="$t('homePage.howCanWeHelpDesc')"
      class="custom-padding" />
  </div>
  <div class="contact-us-page-wrapper" v-show="mobile">
    <!-- contact form -->
    <div class="contact-form-wrapper-mobile flex justify-between items-start flex-column mx-3">
      <img class="rounded-lg" :src="contactThumb" />
      <div class="contact-form w-100">
        <h1 class="font-semibold title-contact">
          {{ $t("contactUs.contactUs") }}
        </h1>
        <div class="form-contact mt-8">
          <form @submit.prevent="submitForm" class="">
            <div class="flex flex-col">
              <label class="label-form" for="name">{{
                $t("contactUs.yourName")
              }}</label>
              <input :placeholder="$t('contactUs.fillYourName')" class="input-contact mt-1.5" type="text" id="name"
                v-model="form.name" />
            </div>
            <div class="flex flex-col mt-6">
              <label class="label-form" for="email">{{
                $t("contactUs.yourEmail")
              }}</label>
              <input :placeholder="$t('contactUs.fillYourName')" class="input-contact mt-1.5" type="password" id="email"
                v-model="form.email" />
            </div>
            <div class="flex flex-col mt-6">
              <label class="label-form" for="message">{{
                $t("contactUs.yourMessage")
              }}</label>
              <input :placeholder="$t('contactUs.fillYourMessage')" class="input-contact mt-1.5" type="password"
                id="message" v-model="form.message" />
            </div>
            <div class="action-contact-button flex flex-col mt-6">
              <button type="submit" class="primary-btn text-white cursor-pointer">
                {{
                  $t("contactUs.submit")
                }}
              </button>
              <div class="relative text-center mt-6">
                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center">
                  <span class="px-3 bg-white text-sm text-gray-500">or</span>
                </div>
              </div>
              <button type="submit" class="secondary-btn mt-6 cursor-pointer">{{
                $t("contactUs.contactViaMessenger")
              }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- social -->
    <div class="social-wrapper bg-light-gray-custom px-3 mt-15">
      <div class="flex gap-x-8 flex-column">
        <div class="motive-body-left flex-1 flex-col justify-start flex-column">
          <h5 class="txt-primary text-xl font-semibold border-bottom-primary pb-3">
            {{ $t("contactUs.chatToUs") }}
          </h5>
          <span class="mt-3">
            <div class="mt-5">
              <p>Mon - Fri : 9h00 - 18h00</p>
            </div>
            <div class="">
              <p>8h30am – 5h30pm (UTC+07:00)</p>
            </div>
            <div class="flex mt-3">
              <img :src="mailIcon" />
              <p class="ml-1.5">contact@printchic.com</p>
            </div>
            <div class="mt-3 flex gap-x-1.5 cursor-pointer">
              <a class="txt-primary font-semibold">{{
                $t("contactUs.contactViaMessenger")
              }}</a>
              <img :src="arrowUpRight" />
            </div>
          </span>
        </div>
        <div class="motive-body-left flex-1 flex-col mt-5">
          <h5 class="font-semibold border-bottom-primary text-xl pb-3">
            {{ $t("contactUs.office") }}
          </h5>
          <p class="mt-3">UK Office :</p>
          <p>23 Old Gloucester Street, WC1N 3AX, LONDON, United Kingdom</p>
        </div>
        <div class="motive-body-left flex-1 flex-col">
          <h5 class="font-semibold text-xl border-bottom-primary pb-3">
            {{ $t("contactUs.socialNetwork") }}
          </h5>
          <span class="flex mt-3 gap-x-2">
            <img class="socials" :src="linkedin" />
            <img class="socials" :src="facebook" />
            <img class="socials" :src="twitter" />
          </span>
          <p class="mt-3">
            {{ $t("contactUs.reviewOurSupport") }}
          </p>
        </div>
      </div>
    </div>
    <!-- help -->
    <help :headerTitle="$t('homePage.howCanWeHelp')" :headerDesc="$t('homePage.howCanWeHelpDesc')"
      class="mt-10" />
  </div>
</template>

<script>
import help from "../../components/help.vue";
import mailIcon from "../assets/svg/mail.svg";
import contactThumb from "../../assets/images/contactUsFormThumb.png";
import linkedin from "../../assets/svg/LinkedIn.svg";
import facebook from "../../assets/svg/facebook.svg";
import twitter from "../../assets/svg/Twitter.svg";
import arrowUpRight from "../assets/svg/arrowUpRight.svg";
import { screenSizeMixin } from '~/mixins/screenSizeMixin';

export default {
  mixins: [screenSizeMixin],
  components: {
    help,
  },
  data() {
    return {
      mailIcon,
      contactThumb,
      linkedin,
      facebook,
      twitter,
      arrowUpRight,
      form: {},
    };
  },
  methods: {
    submitForm() {
      // Process form data here or send data to server
      console.log(this.form);
      alert("Form submitted! Check console for details.");
    },
  },
};
</script>

<style scoped lang="scss">
.socials {
  background-color: #eff4ff;
  padding: 7px;
  border-radius: 50px;
}

.input-contact {
  border-radius: 6px;
  border: 1px solid #eaecf0;
  padding: 10px 12px;
}

.label-form {
  font-size: 14px;
  font-weight: 600;
}

.title-contact {
  font-size: 40px;
}

.contact-form-wrapper {
  gap: 20vw;
}

.contact-form-wrapper-mobile {
  gap: 10vw;
}
</style>
