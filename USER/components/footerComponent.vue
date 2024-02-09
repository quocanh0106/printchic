<template>
    <div class="footer">
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
                <div class="flex flex-col" v-for="menu,index in menuList" :key="index">
                    <h1 class="section-content txt-primary font-semibold">
                        {{ menu.title }}
                    </h1>
                    <div class="section-content" v-for="menuItem,ind in menu.listUrl" :key="ind" >
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
</template>

<script>
import footerLogo from "../assets/svg/Logo.svg"
import mailIcon from "../assets/svg/mail.svg"
import locationIcon from "../assets/svg/location.svg"
import clockIcon from "../assets/svg/clock.svg"
export default {
    data() {
        return {
            property: 'value',
            footerLogo,
            mailIcon,
            locationIcon,
            clockIcon,
            menuList : [
                {
                    title: this.$t("footer.about") ,
                    listUrl : [
                        {
                            urlName : this.$t("footer.aboutUs"),
                            url:''
                        },
                        {
                            urlName :  this.$t("footer.contactUs"),
                            url:''
                        },
                        {
                            urlName : this.$t("footer.privacyPolicy"),
                            url:''
                        },
                        {
                            urlName :this.$t("footer.returnAndRefund"),
                            url:''
                        }
                    ]
                },
                {
                    title: this.$t("footer.quickAccess") ,
                    listUrl : [
                        {
                            urlName : this.$t("footer.ourBlogPost"),
                            url:''
                        },
                        {
                            urlName :  this.$t("footer.productCatalog"),
                            url:''
                        },
                        {
                            urlName : this.$t("footer.customMerchanise"),
                            url:''
                        },
                        {
                            urlName : this.$t("footer.demoStore"),
                            url:''
                        },
                        {
                            urlName : this.$t("footer.VNCommunity"),
                            url:''
                        },
                        {
                            urlName : this.$t("footer.GlobalCommunity"),
                            url:''
                        },
                    ]
                }
            ]
        };
    },
}
</script>

<style lang="scss" scoped>
    .footer{
        min-height: 451px;
        background-color: #FAFBFF;
    }
    .menu-section-wrapper{
        border-bottom: 1px solid #D1E0FF;
        min-height: 284px;
    }
</style>