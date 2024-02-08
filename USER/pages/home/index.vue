<template>
     <div class="page-container">
          <carousel />
       <div class="home-page-introduction-wrapper mt-20">

         <div class="introduction-description">
           <h1 class="font-semibold introduction-title">
             {{ $t("homePage.introductionTitle") }}
           </h1>
           <div class="introduction-actions cursor-pointer mt-8">
             <v-button class="primary-btn text-white">
               {{ $t("ContactUs") }}
             </v-button>
   
             <v-button class="secondary-btn cursor-pointer ml-4">
               {{ $t("button.tryForNow") }}
             </v-button>
           </div>
         </div>
         <div class="introduction-description">
              <p class="introduction-description mt-5">
                  {{ $t("homePage.introductionDes-1") }}
                </p>
                <p class="introduction-description mt-2">
                  &#8226; {{ $t("homePage.introductionDes-2") }}
                </p>
                <p class="introduction-description mt-2">
                  &#8226; {{ $t("homePage.introductionDes-3") }}
                </p>
                <p class="introduction-description mt-2">
                  &#8226; {{ $t("homePage.introductionDes-4") }}
                </p>
         </div>
       </div>
   
       <div class="home-page-top-category mt-28">
         <div class="top-category-header">
           <h1 class="top-category-title font-semibold">
             {{ $t("homePage.topCategory") }}
           </h1>
           <a class="top-category-view-all txt-primary cursor-pointer">
             <p>{{ $t("viewAll") }}</p>
             <img :src="arrowUpRight" />
           </a>
         </div>
       </div>
   
       <!-- Card Infor and Process Explaination -->
       <div class="home-page-proccess-wrapper w-full mt-40">
         <div
           class="home-page-proccess flex flex-row justify-between w-full mt-20"
         >
           <div class="process-intro w-1/2 fullfillment-title">
             <h1 class="font-semibold introduction-title">
               {{ $t("homePage.onDemandFullFilementService") }}
             </h1>
             <p class="introduction-description mt-5">
               {{ $t("homePage.onDemandFullFilementServiceDes1") }}
             </p>
             <p class="introduction-description">
               {{ $t("homePage.onDemandFullFilementServiceDes2") }}
             </p>
             <a class="flex gap-1 txt-primary cursor-pointer mt-10">
               <p>{{ $t("button.tryForNow") }}</p>
               <img :src="arrowUpRight" />
             </a>
           </div>
           <div class="process-card flex flex-col w-1/2">
             <cardInfor
               :imgSrc="cardThumbnail"
               :title="$t('homePage.cardTitle1')"
               :description="$t('homePage.cardDescription1')"
             />
             <cardInfor
               :imgSrc="cardThumbnail"
               :title="$t('homePage.cardTitle2')"
               :description="$t('homePage.cardDescription2')"
             />
             <cardInfor
               :imgSrc="cardThumbnail"
               :title="$t('homePage.cardTitle3')"
               :description="$t('homePage.cardDescription3')"
             />
             <cardInfor
               :imgSrc="cardThumbnail"
               :title="$t('homePage.cardTitle4')"
               :description="$t('homePage.cardDescription4')"
             />
           </div>
         </div>
       </div>
   
       <!--Printchic Distinctive  -->
   
       <div class="distict-motive-wrapper">
         <div class="motive-header text-center">
           <h3 class="section-title font-semibold">
             {{ $t("homePage.distictMotive") }}
           </h3>
           <p class="motive-description mt-4">
             {{ $t("homePage.distictMotiveDes") }}
           </p>
         </div>
   
         <div class="motive-body flex mt-12 w-100 space-x-64">
           <div class="motive-body-left-wrapper w-1/2">
             <div class="motive-body-left border-left-primary">
                  <h5 class="txt-primary font-semibold">
                  {{ $t("homePage.distictBodyTitle1") }}
                  </h5>
                  <p class="mt-3">
                  {{ $t("homePage.distictBodyDescription1") }}
                  </p>
             </div>
             <div class="motive-body-left mt-8">
                  <h5 class="font-semibold">
                  {{ $t("homePage.distictBodyTitle2") }}
                  </h5>
                  <p class="mt-3">
                  {{ $t("homePage.distictBodyDescription2") }}
                  </p>
             </div>
             <div class="motive-body-left  mt-8">
                  <h5 class="font-semibold">
                  {{ $t("homePage.distictBodyTitle3") }}
                  </h5>
                  <p class="mt-3">
                  {{ $t("homePage.distictBodyDescription3") }}
                  </p>
             </div>
             <div class="motive-body-left  mt-8">
                  <h5 class="font-semibold">
                  {{ $t("homePage.distictBodyTitle4") }}
                  </h5>
                  <p class="mt-3">
                  {{ $t("homePage.distictBodyDescription4") }}
                  </p>
             </div>
           </div>
           <img :src="distictThumbnails" />
         </div>
       </div>

       <!-- Customer Review -->
       <div class="review-wrapper text-center custom-padding">
          <div class="review-header">
               <h1 class="section-title font-semibold">{{ $t("homePage.customerReview") }}</h1>
               <p class="mt-4">{{ $t("homePage.customerReviewSubtitle") }}</p>
          </div>
          <carousel class="mt-12" />
       </div>

       <!-- blog story -->
       <blog class="custom-padding" />

       <!-- Frequently asked question -->
       <faq class="custom-padding" />

       <!-- help -->
       <help class="custom-padding" />
     </div>
   </template>
   
   <script>
   // import  img
   import introImage from "../../assets/images/introImage.png";
   import distictThumbnails from "../../assets/images/distictThumbnail.png";
   import arrowUpRight from "../../assets/svg/arrowUpRight.svg";
   import cardThumbnail from "../../assets/svg/cardThumbNail.svg";
   // import component
   import carousel from "../../components/carousel.vue";
   import cardInfor from "../../components/cardInfor.vue";
   import blog from "../../components/blog.vue";
   import faq from "../../components/faq.vue";
   import help from "../../components/help.vue";
   export default {
     components: {
       carousel,
       cardInfor,
       blog,
       faq,
       help
     },
     data() {
       return {
         introImage,
         arrowUpRight,
         cardThumbnail,
         distictThumbnails
       };
     },
   };
   </script>
   
   <style scoped lang="scss">
   .home-page-introduction-wrapper {
     width: 100%;
     display: flex;
     flex-direction: row;
     justify-content: space-between;
     align-items: center;
     padding: 30px 120px;
     .introduction-description {
       width: 100%;
     }
     .introduction-title {
       font-size: 40px;
       line-height: 50px;
       width: 60%;
     }
   
     .introduction-description {
       font-size: 16px;
       line-height: 24px;
       font-weight: 400;
     }
   
     .introduction-actions {
       width: 100%;
       min-height: 50px;
     }
   }
   
   .home-page-top-category {
     padding: 30px 120px;
     .top-category-header {
       display: flex;
       justify-content: space-between;
       align-items: center;
       .top-category-title {
         font-size: 50px;
         line-height: 41.6px;
       }
     }
     .top-category-view-all {
       display: flex;
     }
   }
   .home-page-proccess-wrapper {
     background-color: #f9fafb;
     padding: 80px 120px;
     .process-intro {
       .introduction-title {
         font-size: 40px;
         line-height: 50px;
         width: 60%;
       }
     }
   }
   .distict-motive-wrapper {
     padding: 80px 120px;
     .motive-title {
       font-size: 32px;
       line-height: 41.6px;
     }
     .motive-description {
       font-size: 16px;
       line-height: 24px;
     }
     .motive-body-left{
          padding: 0px 24px;
     }
   }

   .review-wrapper{
     background-color: #EFF4FF;
   }
   </style>
   