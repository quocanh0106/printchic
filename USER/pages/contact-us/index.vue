<template>
    <div class="contact-us-page-wrapper">

      <!-- contact form -->
      <div class="contac-form-wrapper flex justify-between items-center custom-padding">
        <div class="contact-form">
          form
        </div>
        <img class="rounded-lg" :src="contactThumb"/>
      </div>
      <!-- social -->
      <div class="social-wrapper bg-light-gray-custom custom-padding">
        <div class="flex gap-x-8">
            <div class="motive-body-left flex-1 flex-col justify-start">
              <h5 class="txt-primary font-semibold border-bottom-primary pb-3">
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
                  <a class="txt-primary font-semibold">{{ $t('contactUs.contactViaMessenger') }}</a>
                  <img :src="arrowUpRight" />
                </div>
              </span>
            </div>
            <div class="motive-body-left flex-1 flex-col">
              <h5 class="font-semibold border-bottom-primary pb-3">
                {{ $t("contactUs.office") }}
              </h5>
              <p class="mt-3">
                UK Office :
              </p>
              <p>
                23 Old Gloucester Street, WC1N 3AX,
              LONDON, United Kingdom
              </p>
            </div>
            <div class="motive-body-left flex-1 flex-col">
              <h5 class="font-semibold border-bottom-primary pb-3">
                {{ $t("contactUs.socialNetwork") }}
              </h5>
              <span class="flex mt-3 gap-x-2">
                <img class="socials" :src="linkedin"/>
                <img class="socials" :src="facebook"/>
                <img class="socials" :src="twitter"/>
              </span>
              <p class="mt-3">
                {{ $t("contactUs.reviewOurSupport") }}
              </p>
            </div>
        </div>
      </div>
      <!-- help -->
      <help
          :headerTitle="$t('homePage.howCanWeHelp')"
          :headerDesc="$t('homePage.howCanWeHelpDesc')"
          class="custom-padding"
      />
    </div>
</template>

<script>
import help from "../../components/help.vue";
import mailIcon from "../assets/svg/mail.svg";
import contactThumb from "../../assets/images/contactUsFormThumb.png"
import linkedin from "../../assets/svg/LinkedIn.svg"
import facebook from "../../assets/svg/facebook.svg"
import twitter from "../../assets/svg/Twitter.svg"
import arrowUpRight from "../assets/svg/arrowUpRight.svg";

export default {
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
        arrowUpRight
      };
    },
}
</script>

<style scoped lang="scss">
.socials{
  background-color: #EFF4FF;
  padding: 7px;
  border-radius: 50px;
}
</style>