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

          <!-- Card Infor and Process Explaination -->
          <div class="home-page-proccess-wrapper w-full mt-40">
               <div class="home-page-proccess flex flex-row justify-between w-full mt-20">
                    <div class="process-intro w-1/2 fullfillment-title">
                         <h1 class="font-semibold introduction-title">{{ $t("homePage.onDemandFullFilementService") }}</h1>
                         <p class="introduction-description mt-5">{{ $t("homePage.onDemandFullFilementServiceDes1") }}</p>
                         <p class="introduction-description ">{{ $t("homePage.onDemandFullFilementServiceDes2") }}</p>
                         <a class="flex gap-1 txt-primary cursor-pointer mt-10">
                              <p>{{ $t("button.tryForNow") }}</p>
                              <img :src="arrowUpRight"/>
                         </a>
                    </div>
                    <div class="process-card flex flex-col w-1/2">
                         <cardInfor :imgSrc="cardThumbnail" :title='$t("homePage.cardTitle1")' :description='$t("homePage.cardDescription1")' />
                         <cardInfor :imgSrc="cardThumbnail" :title='$t("homePage.cardTitle2")' :description='$t("homePage.cardDescription2")' />
                         <cardInfor :imgSrc="cardThumbnail" :title='$t("homePage.cardTitle3")' :description='$t("homePage.cardDescription3")' />
                         <cardInfor :imgSrc="cardThumbnail" :title='$t("homePage.cardTitle4")' :description='$t("homePage.cardDescription4")' />
                    </div>
               </div>
          </div>

          <!--Printchic Distinctive  -->

          <div class="distict-motive-wrapper">
               <div class="motive-header text-center">
                    <h3 class="motive-title font-semibold">
                         {{ $t("homePage.distictMotive") }}
                    </h3>
                    <p class="motive-description mt-4">
                         {{ $t("homePage.distictMotiveDes") }}
                    </p>
               </div>

               <div class="motive-body">
                    <div class="motive-body-left-wrapper">

                    </div>
                    <div class="motive-body-right-wrapper">
                         <h5>
                              {{ $t("homePage.distictBodyTitle1") }}
                         </h5>
                         <p>
                              {{ $t("homePage.distictBodyDescription1") }}
                         </p>
                    </div>
               </div>
          </div>
     </div>
</template>

<script>
// import  img
import introImage from "../../assets/images/introImage.png"
import arrowUpRight from "../../assets/svg/arrowUpRight.svg"
import cardThumbnail from "../../assets/svg/cardThumbNail.svg"
// import component
import carousel from "../../components/carousel.vue"
import cardInfor from "../../components/cardInfor.vue"
export default {
     components: {
          carousel,
          cardInfor
     },
     data() {
         return {
               introImage,
               arrowUpRight,
               cardThumbnail
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
          padding: 80px 120px;
          .process-intro{
               .introduction-title{
                    font-size: 40px;
                    line-height:50px;
                    width: 60%;
               }
          }
     }
     .distict-motive-wrapper{
          padding: 80px 120px;
          .motive-title{
               font-size: 32px;
               line-height: 41.6px;
          }
          .motive-description{
               font-size: 16px;
               line-height: 24px;
          }
     }
</style>