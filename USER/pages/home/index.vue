<template>
     <div class="page-container">
          <div class="home-page-introduction-wrapper mt-20">
               <div class="introduction-description">
                    <h1 class="font-semibold introduction-title">{{ $t("homePage.introductionTitle") }}</h1>
                    <p class="introduction-description mt-5">{{ $t("homePage.introductionDes-1") }}</p>
                    <p class="introduction-description mt-2">&#8226; {{ $t("homePage.introductionDes-2") }}</p>
                    <p class="introduction-description mt-2">&#8226; {{ $t("homePage.introductionDes-3") }}</p>
                    <p class="introduction-description mt-2">&#8226; {{ $t("homePage.introductionDes-4") }}</p>
                    <div class="introduction-actions cursor-pointer mt-8">
                         <v-button class="primary-btn text-white">
                              {{ $t("ContactUs") }}
                         </v-button>
     
                         <v-button class="secondary-btn cursor-pointer ml-4">
                              {{ $t("button.tryForNow") }}
                         </v-button>
                    </div>
               </div>
               
               <img class="introduction-image" :src="introImage"/>
          </div>

          <div class="home-page-top-category mt-40">
               <div class="top-category-header">
                    <h1 class="top-category-title font-semibold">
                         {{ $t("homePage.topCategory") }}
                    </h1>
                    <a class="top-category-view-all txt-primary cursor-pointer">
                         <p>{{ $t("viewAll") }}</p>
                         <img :src="arrowUpRight"/>
                    </a>
               </div>
               <!-- <carousel /> -->
          </div>

          <div class="home-page-proccess-wrapper w-full mt-40">
               <div class="home-page-proccess flex flex-row justify-between w-full mt-20">
                    <div class="process-intro w-1/2 fullfillment-title">
                         <h1 class="font-semibold introduction-title">{{ $t("homePage.onDemandFullFilementService") }}</h1>
                         <p class="introduction-description mt-5">{{ $t("homePage.onDemandFullFilementServiceDes1") }}</p>
                         <p class="introduction-description ">{{ $t("homePage.onDemandFullFilementServiceDes2") }}</p>
                    </div>
                    <div class="process-card flex flex-col w-1/2">
                         <div>card 1</div>
                         <div>card 2</div>
                         <div>card 3</div>
                         <div>card 4</div>
                    </div>
               </div>
          </div>
     </div>
</template>

<script>

import introImage from "../../assets/images/introImage.png"
import arrowUpRight from "../../assets/svg/arrowUpRight.svg"
import carousel from "../../components/carousel.vue"

export default {
     components: {
          carousel
     },
     data() {
         return {
               introImage,
               arrowUpRight,
          }
     }
}
</script>

<style scoped lang="scss">
     .home-page-introduction-wrapper{
          width:100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 30px 120px;
          .introduction-description{
               width: 55%;
          }
          .introduction-image{
               width: 45%;
          }
          .introduction-title{
               font-size: 40px;
               line-height:50px;
               width: 60%;
          }
     
          .introduction-description{
               font-size: 16px;
               line-height:24px;
               font-weight:400;
          }

          .introduction-actions{
               width: 100%;
               min-height: 50px;
          }

     }
     
     .home-page-top-category{
          padding: 30px 120px;
          .top-category-header{
               display: flex;
               justify-content: space-between;
               align-items: center;
               .top-category-title{
                    font-size: 50px;
                    line-height: 41.6px;
               }
          }
          .top-category-view-all{
               display: flex;
          }
     }
     .home-page-proccess-wrapper{
          background-color: #F9FAFB;
          padding: 30px 120px;
          .process-intro{
               .introduction-title{
                    font-size: 40px;
                    line-height:50px;
                    width: 60%;
               }
          }
     }
</style>