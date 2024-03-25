<template>
  <div class="print-on-demand-page-wrapper-all-screen">
    <div class="print-on-demand-page-wrapper" v-show="pc || lgPc || extraPc">
      <!-- Header  -->
      <div
        class="pod-header-wrapper flex justify-between gap-x-36 items-center custom-padding"
      >
        <img :src="podThumb" />
        <div class="header-pod-content">
          <h1 class="section-title font-semibold">{{ $t("pod.podProduct") }}</h1>
          <p class="section-content mt-8">{{ $t("pod.podProductDes") }}</p>
          <span
            class="check-list-wrapper mt-2 flex gap-x-3"
            v-for="(item, index) in checkList"
            :key="index"
          >
            <img :src="check" />
            <p>{{ item }}</p>
          </span>
          <div class="action-buttons flex mt-8 gap-x-4">
            <a class="cursor-pointer flex txt-primary secondary-btn">
              <p>{{ $t("button.contactUs") }}</p>
              <img :src="arrowUpRight" />
            </a>
            <button class="cursor-pointer primary-btn">{{
              $t("button.tryForNow")
            }}</button>
          </div>
        </div>
      </div>
  
      <!-- What is print on Demand -->
      <div class="pod-wrapper">
        <div
          class="bg-light-blue-custom custom-padding flex flex-col justify-center items-center text-center"
        >
          <h1 class="section-title font-semibold">
            {{ $t("servicePage.whatIsPrintOnDemand") }}
          </h1>
          <p class="mt-5 mw-790px">
            {{ $t("servicePage.whatIsPrintOnDemandDes1") }}
          </p>
          <p class="mt-3 mw-790px">
            {{ $t("servicePage.whatIsPrintOnDemandDes2") }}
          </p>
          <button class="mt-8 secondary-btn txt-primary font-semibold">{{
            $t("button.aboutUs")
          }}</button>
        </div>
      </div>
  
      <!-- card infor -->
      <div
        class="card-info-wrapper flex bg-light-gray-custom justify-between custom-padding"
      >
        <cardInfor
          class="card-info-pod"
          :imgSrc="cardThumbnail"
          :title="$t('pod.templateTitle')"
          :description="$t('pod.templateDes')"
        />
        <cardInfor
          class="card-info-pod"
          :imgSrc="cardThumbnail"
          :title="$t('pod.templateTitle')"
          :description="$t('pod.templateDes')"
        />
        <cardInfor
          class="card-info-pod"
          :imgSrc="cardThumbnail"
          :title="$t('pod.templateTitle')"
          :description="$t('pod.templateDes')"
        />
      </div>
  
      <!-- pod product -->
      <div class="pod-product-wrapper custom-padding">
        <span class="pod-product-header flex justify-between">
          <h1 class="section-title font-semibold">
            {{ $t("pod.enjoyPOPProduct") }}
          </h1>
          <a @click="this.$router.push(localePath('/print-on-demand'))" class="flex items-center justify-center gap-x-2 txt-primary">
            <p>{{ $t("pod.exploreOurCatalog") }}</p>
            <img :src="arrowUpRight" />
          </a>
        </span>
        <swiperComponent
          class="pod-product-galery mt-12 mb-8"
          :showPagination="true"
          :showNavigation="true"
          :slidePerView="4"
          :items="listPod"
        />
      </div>
  
      <!-- our customized clothing -->
      <div
        class="our-customized-clothing custom-padding justify-center items-center bg-light-gray-custom"
      >
        <h1 class="section-title text-center font-semibold">
          {{ $t("pod.ourCustomizedClothing") }}
        </h1>
        <span
          class="service-tag-wrapper w-100 flex items-center gap-x-8 justify-center mt-6"
        >
          <span
            @click="ourCustomizedClothing = index"
            class="flex service-tag"
            :class="ourCustomizedClothing == index ? 'secondary-btn' : ''"
            v-for="(tag, index) in listServiceTags"
            :key="index"
          >
            <p class="text-center w-100">{{ tag }}</p>
          </span>
        </span>
        <swiperComponent
          class="mt-12 customized-clothing"
          :showPagination="true"
          :showNavigation="true"
          :slidePerView="4"
          :items="listPod"
        />
      </div>
  
      <!-- our customized home decor -->
      <div
        class="our-customized-home-decor custom-padding justify-center items-center"
      >
        <h1 class="section-title text-center font-semibold">
          {{ $t("pod.ourCustomizedHomeDecor") }}
        </h1>
        <span
          class="service-tag-wrapper w-100 flex items-center gap-x-8 justify-center mt-6"
        >
          <span
            @click="ourCustomizedDecor = index"
            class="flex service-tag"
            :class="ourCustomizedDecor == index ? 'secondary-btn' : ''"
            v-for="(tag, index) in listServiceTags"
            :key="index"
          >
            <p class="text-center w-100">{{ tag }}</p>
          </span>
        </span>
        <swiperComponent
          class="mt-12 customized-home-decor"
          :showPagination="true"
          :showNavigation="true"
          :slidePerView="4"
          :items="listPod"
        />
      </div>
  
      <div class="banner-try-pod bg-light-blue-custom custom-padding">
          <div class="discount-tag">
              50% OFF
          </div>
          <h1 class="section-title mt-5 font-semibold">{{ $t('pod.tryPOD') }}</h1>
          <p class="section-content mt-4">{{ $t('pod.signUpAsSeller') }}</p>
          <a class="flex gap-1 txt-primary cursor-pointer mt-10">
              <p>{{ $t("pod.signUpForFree") }}</p>
              <img :src="arrowUpRight" />
            </a>
      </div>
      <!-- how pod works -->
      <div
        class="home-page-proccess-wrapper custom-padding bg-light-gray1-custom w-auto"
      >
        <div
          class="home-page-proccess flex flex-row justify-between w-auto mt-20"
        >
          <div class="process-intro w-1/2 fullfillment-title">
            <h1 class="font-semibold section-title">
              {{ $t("homePage.onDemandFullFilementService") }}
            </h1>
            <p class="introduction-description section-content mt-5">
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
  
      <!-- 15 pod ideas -->
      <div class="pod-idea custom-padding bg-light-blue-custom">
        <div class="idea-content">
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and more
          recently with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum. Why do we use it? It is a long established fact
          that a reader will be distracted by the readable content of a page when
          looking at its layout. The point of using Lorem Ipsum is that it has a
          more-or-less normal distribution of letters, as opposed to using
          'Content here, content here', making it look like readable English. Many
          desktop publishing packages and web page editors now use Lorem Ipsum as
          their default model text, and a search for 'lorem ipsum' will uncover
          many web sites still in their infancy. Various versions have evolved
          over the years, sometimes by accident, sometimes on purpose (injected
          humour and the like). Where does it come from? Contrary to popular
          belief, Lorem Ipsum is not simply random text. It has roots in a piece
          of classical Latin literature from 45 BC, making it over 2000 years old.
          Richard McClintock, a Latin professor at Hampden-Sydney College in
          Virginia, looked up one of the more obscure Latin words, consectetur,
          from a Lorem Ipsum passage, and going through the cites of the word in
          classical literature, discovered the undoubtable source. Lorem Ipsum
          comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
          Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
          This book is a treatise on the theory of ethics, very popular during the
          Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
          amet..", comes from a line in section 1.10.32. The standard chunk of
          Lorem Ipsum used since the 1500s is reproduced below for those
          interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
          Malorum" by Cicero are also reproduced in their exact original form,
          accompanied by English versions from the 1914 translation by H. Rackham.
          Where can I get some? There are many variations of passages of Lorem
          Ipsum available, but the majority have suffered alteration in some form,
          by injected humour, or randomised words which don't look even slightly
          believable. If you are going to use a passage of Lorem Ipsum, you need
          to be sure there isn't anything embarrassing hidden in the middle of
          text. All the Lorem Ipsum generators on the Internet tend to repeat
          predefined chunks as necessary, making this the first true generator on
          the Internet. It uses a dictionary of over 200 Latin words, combined
          with a handful of model sentence structures, to generate Lorem Ipsum
          which looks reasonable. The generated Lorem Ipsum is therefore always
          free from repetition, injected humour, or non-characteristic words etc.
        </div>
      </div>
      <!-- Frequently asked question -->
      <faq class="custom-padding" />
  
      <!-- help -->
      <help
        :headerTitle="$t('homePage.howCanWeHelp')"
        :headerDesc="$t('homePage.howCanWeHelpDesc')"
        class="custom-padding"
      />
    </div>
    <div class="print-on-demand-page-wrapper" v-show="mobile || tablet">
      <!-- Header  -->
      <div
        class="pod-header-wrapper flex justify-between flex-column gap-x-36 items-center px-3"
      >
        <img class="w-100" :src="podThumb" />
        <div class="header-pod-content py-8">
          <h1 class="section-title font-semibold my-2">{{ $t("pod.podProduct") }}</h1>
          <p class="section-content mt-8">{{ $t("pod.podProductDes") }}</p>
          <span
            class="check-list-wrapper mt-2 flex gap-x-3"
            v-for="(item, index) in checkList"
            :key="index"
          >
            <img :src="check" />
            <p>{{ item }}</p>
          </span>
          <div class="action-buttons flex mt-8 gap-x-4 mb-5">
            <a class="cursor-pointer flex txt-primary secondary-btn">
              <p>{{ $t("button.contactUs") }}</p>
              <img :src="arrowUpRight" />
            </a>
            <button class="cursor-pointer primary-btn">{{
              $t("button.tryForNow")
            }}</button>
          </div>
        </div>
      </div>
  
      <!-- What is print on Demand -->
      <div class="pod-wrapper">
        <div
          class="bg-light-blue-custom px-3 py-5 flex flex-col justify-center items-center text-center"
        >
          <h1 class="section-title font-semibold">
            {{ $t("servicePage.whatIsPrintOnDemand") }}
          </h1>
          <p class="mt-5 mw-790px">
            {{ $t("servicePage.whatIsPrintOnDemandDes1") }}
          </p>
          <p class="mt-3 mw-790px">
            {{ $t("servicePage.whatIsPrintOnDemandDes2") }}
          </p>
          <button class="mt-8 secondary-btn txt-primary font-semibold">{{
            $t("button.aboutUs")
          }}</button>
        </div>
      </div>
  
      <!-- card infor -->
      <div
        class="card-info-wrapper flex bg-light-gray-custom justify-between flex-column  py-8"
      >
        <cardInfor
          class="card-info-pod"
          :imgSrc="cardThumbnail"
          :title="$t('pod.templateTitle')"
          :description="$t('pod.templateDes')"
        />
        <cardInfor
          class="card-info-pod"
          :imgSrc="cardThumbnail"
          :title="$t('pod.templateTitle')"
          :description="$t('pod.templateDes')"
        />
        <cardInfor
          class="card-info-pod"
          :imgSrc="cardThumbnail"
          :title="$t('pod.templateTitle')"
          :description="$t('pod.templateDes')"
        />
      </div>
  
      <!-- pod product -->
      <div class="pod-product-wrapper px-3 py-8">
        <span class="pod-product-header flex flex-col justify-center items-center gap-y-6">
          <h4 class="section-title">
            {{ $t("pod.enjoyPOPProduct") }}
          </h4>
          <a class="flex items-center justify-center gap-x-2 txt-primary">
            <p>{{ $t("pod.exploreOurCatalog") }}</p>
            <img :src="arrowUpRight" />
          </a>
        </span>
        <swiperComponent
          class="pod-product-galery mt-12 mb-8"
          :showPagination="true"
          :showNavigation="true"
          :items="listPod"
          :slidePerView="2"
        />
      </div>
  
      <!-- our customized clothing -->
      <div
        class="our-customized-clothing justify-center items-center bg-light-gray-custom py-8"
      >
        <h1 class="section-title text-center ">
          {{ $t("pod.ourCustomizedClothing") }}
        </h1>
        <span
          class="service-tag-wrapper w-100 flex items-center gap-x-4 justify-center mt-6"
        >
          <span
            @click="ourCustomizedClothing = index"
            class="flex service-tag"
            :class="ourCustomizedClothing == index ? 'secondary-btn' : ''"
            v-for="(tag, index) in listServiceTags"
            :key="index"
          >
            <p class="text-center w-100">{{ tag }}</p>
          </span>
        </span>
        <swiperComponent
          class="mt-12 pod-product-galery"
          :showPagination="true"
          :showNavigation="true"
          :items="listPod"
          :slidePerView="2"
        />
      </div>
  
      <!-- our customized home decor -->
      <div
        class="our-customized-home-decor px-3 justify-center items-center py-8"
      >
        <h1 class="section-title text-center">
          {{ $t("pod.ourCustomizedHomeDecor") }}
        </h1>
        <span
          class="service-tag-wrapper w-100 flex items-center gap-x-4 justify-center mt-6"
        >
          <span
            @click="ourCustomizedDecor = index"
            class="flex service-tag"
            :class="ourCustomizedDecor == index ? 'secondary-btn' : ''"
            v-for="(tag, index) in listServiceTags"
            :key="index"
          >
            <p class="text-center w-100">{{ tag }}</p>
          </span>
        </span>
        <swiperComponent
          class="mt-12 pod-product-galery"
          :showPagination="true"
          :showNavigation="true"
          :items="listPod"
          :slidePerView="2"
        />
      </div>
  
      <div class="bg-light-blue-custom banner-try-pod-mobile text-center flex flex-col items-center justify-start py-8">
          <div class="discount-tag">
              50% OFF
          </div>
          <h1 class="section-title mt-5 font-semibold">{{ $t('pod.tryPOD') }}</h1>
          <p class="section-content mt-4">{{ $t('pod.signUpAsSeller') }}</p>
          <a class="flex gap-1 txt-primary cursor-pointer mt-10">
              <p>{{ $t("pod.signUpForFree") }}</p>
              <img :src="arrowUpRight" />
            </a>
      </div>
      <!-- how pod works -->
      <div
        class="home-page-proccess-wrapper px-3 bg-light-gray1-custom w-auto"
      >
        <div
          class="home-page-proccess flex flex-column justify-between w-auto mt-20  py-8"
        >
          <div class="process-intro fullfillment-title">
            <h1 class="font-semibold section-title">
              {{ $t("homePage.onDemandFullFilementService") }}
            </h1>
            <p class="introduction-description section-content mt-5">
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
          <div class="process-card flex flex-col">
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
  
      <!-- 15 pod ideas -->
      <div class="pod-idea bg-light-blue-custom">
        <div class="idea-content">
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and more
          recently with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum. Why do we use it? It is a long established fact
          that a reader will be distracted by the readable content of a page when
          looking at its layout. The point of using Lorem Ipsum is that it has a
          more-or-less normal distribution of letters, as opposed to using
          'Content here, content here', making it look like readable English. Many
          desktop publishing packages and web page editors now use Lorem Ipsum as
          their default model text, and a search for 'lorem ipsum' will uncover
          many web sites still in their infancy. Various versions have evolved
          over the years, sometimes by accident, sometimes on purpose (injected
          humour and the like). Where does it come from? Contrary to popular
          belief, Lorem Ipsum is not simply random text. It has roots in a piece
          of classical Latin literature from 45 BC, making it over 2000 years old.
          Richard McClintock, a Latin professor at Hampden-Sydney College in
          Virginia, looked up one of the more obscure Latin words, consectetur,
          from a Lorem Ipsum passage, and going through the cites of the word in
          classical literature, discovered the undoubtable source. Lorem Ipsum
          comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
          Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
          This book is a treatise on the theory of ethics, very popular during the
          Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
          amet..", comes from a line in section 1.10.32. The standard chunk of
          Lorem Ipsum used since the 1500s is reproduced below for those
          interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
          Malorum" by Cicero are also reproduced in their exact original form,
          accompanied by English versions from the 1914 translation by H. Rackham.
          Where can I get some? There are many variations of passages of Lorem
          Ipsum available, but the majority have suffered alteration in some form,
          by injected humour, or randomised words which don't look even slightly
          believable. If you are going to use a passage of Lorem Ipsum, you need
          to be sure there isn't anything embarrassing hidden in the middle of
          text. All the Lorem Ipsum generators on the Internet tend to repeat
          predefined chunks as necessary, making this the first true generator on
          the Internet. It uses a dictionary of over 200 Latin words, combined
          with a handful of model sentence structures, to generate Lorem Ipsum
          which looks reasonable. The generated Lorem Ipsum is therefore always
          free from repetition, injected humour, or non-characteristic words etc.
        </div>
      </div>
      <!-- Frequently asked question -->
      <faq class="mb-7 mt-8"/>
  
      <!-- help -->
      <help
        :headerTitle="$t('homePage.howCanWeHelp')"
        :headerDesc="$t('homePage.howCanWeHelpDesc')"
       
      />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import swiperComponent from '~/components/swiperComponent.vue';
import faq from '~/components/faq.vue';
import help from '~/components/help.vue';
import podThumb from '~/assets/images/printOnDemandThumb.png';
import check from '~/assets/svg/tickGreen.svg';
import arrowUpRight from '~/assets/svg/arrowUpRight.svg'; // Corrected the path
import cardThumbnail from '~/assets/svg/cardThumbNail.svg';
import { useI18n, useLocalePath } from '#imports'

// Replace the mixin with composable if possible. Here's a placeholder for your mixin logic.
// const { someReactiveProperty, someMethod } = useMyMixin();

const { t } = useI18n();

const podThumbRef = ref(podThumb);
const checkRef = ref(check);
const arrowUpRightRef = ref(arrowUpRight);
const cardThumbnailRef = ref(cardThumbnail);
const checkList = ref([
  t("pod.checkList1"),
  t("pod.checkList2"),
  t("pod.checkList3"),
  t("pod.checkList4"),
]);
const listServiceTags = ref(["T-Shirt", "Hoodie", "Sweater", "Long Sleeves"]);
const ourCustomizedClothing = ref("");
const ourCustomizedDecor = ref("");
const { screenWidth, mobile, tablet, pc, lgPc, extraPc } = useWidthScreen();

// Convert methods to simple functions if there are any in the methods block.

const localePath = useLocalePath()
const { data }  = await useAsyncData(
  `listProductData-${new Date().getTime()}`,
  () => $fetch('http://printchic-api.tvo-solution.net/auth/product/list')
)

const listPod = ref([])

onMounted(() => {
  listPod.value = data.value?.data?.items.map(item => item.media[0]?.path);
})
</script>

<style scoped lang="scss">
.header-pod-content {
  h1 {
    font-size: 40px;
  }
}

.card-info-pod {
  :deep(.card-info-wrapper) {
    flex-direction: column;
  }
}

.idea-content{
    background-color: white;
    height: 352px;
    overflow-y: scroll;
    border-radius: 4px;
    padding: 40px;
    scrollbar-width: thin; /* "auto" or "thin" */
    scrollbar-color: #D1E0FF white; /* thumb and track color */

}

.idea-content::-webkit-scrollbar-thumb{
    border-radius: 4px;
}

.banner-try-pod{
    height: 600px;
    background-image: url('../../assets/images/tryPODImag.png');
    background-position: bottom right;
}

.banner-try-pod-mobile{
    height: 600px;
    background-image: url('../../assets/images/tryPODImag.png');
    background-position: bottom center;
    padding: 20px 20px 16px 20px;
    background-size: 100vw auto;
}
.overlay-img{
    z-index: 1;
}
.discount-tag{
    color: #12B76A;
    padding: 8px 20px;
    background-color: white;
    border-radius: 50px;
    text-align: center;
    width: 113px;
    font-weight: 500;
}
.pod-product-galery{
  :deep(.swiper-thumbnail){
      min-width:0px !important;
      width: 15vw !important;
      height: 15vw !important;
      object-fit:cover;
      max-height: none !important;
  }
  @media screen and (max-width: 992px){
    :deep(.swiper-thumbnail){
      width: 35vw !important;
      height: 35vw !important;
  }
  }
}

.customized-clothing{
  :deep(.swiper-thumbnail){
      min-width:0px !important;
      width: 15vw !important;
      height: 15vw !important;
      object-fit:cover;
      max-height: none !important;
  }
}
.customized-home-decor{
  :deep(.swiper-thumbnail){
      min-width:0px !important;
      width: 15vw !important;
      height: 15vw !important;
      object-fit:cover;
      max-height: none !important;
  }
}
@media screen and (max-width:600px){
  .service-tag-wrapper{
    overflow-x: scroll;
  }
}
.service-tag{
  min-width: 150px;
}
</style>
