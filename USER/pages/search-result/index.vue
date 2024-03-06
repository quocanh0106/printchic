<template>
  <div class="search-result-wrapper flex flex-col items-center justify-center custom-padding-search">
    <div class="product-list">
      <div class="product-card cursor-pointer" @click="toProductDetail(item)" v-for="(item, index) in filterResult"
          :key="index">
          <img class="product-thumbnail" :src="item.media[0]?.path" />
          <div class="product-infor flex flex-col ml-2">
            <p class="mt-1 txt-dark-blue font-semibold">{{ item[`title${currentLanguage}`] }}</p>
            <p class="mt-2 txt-primary font-semibold ">$ {{ item.price }}</p>
            <div class="sale-tag" v-if="item.isSale">{{ $t('productList.saleTag') }}</div>
          </div>
        </div>
      </div>
      <v-btn class="w-100 mt-8 button-see-more" v-if="filterResult.length > 9">{{ $t('button.seeMoreWithItemCount', {count: filterResult.length}) }}</v-btn>
  </div>
</template>

<script>
import { myMixin } from '/mixins/myMixin';

export default {
  mixins: [myMixin],
  data() {
    return {
      filterResult: [],
    };
  },
  created() {
    this.getQuerySearch()
  },
  
  methods:{
    toProductDetail(item) {
      let id = 1
      this.$router.push(`/product/${id}`);
    },
    async getQuerySearch(){
        const response = await this.getRequest(`product/list?search=${this.$route.query.querySearch}`)
        this.filterResult = response.data.items
    }
  }
}
</script>

<style scoped lang="scss">
.product-list {
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 0px;
  row-gap:32px;
  .product-card {
    width: 20vw;
    position: relative;
    display:flex;
    img {
      border-radius: 4px;
      height: 10vw;
      width: 10vw;
      @media screen and (max-width:992px){
        min-height:104px;
        min-width:102px;
      }
    }
    @media screen and (max-width:992px){
      width: 100%;
    }
  }
  @media screen and (max-width:992px){
    grid-template-columns: auto;
  }
}
.custom-padding-search{
  padding: 80px 15vw;
  @media screen and (max-width:992px){
    padding: 24px 5vw;
  }
}
.button-see-more{
  background-color: #F9FAFB;
  box-shadow: none !important;
  height: 42px;
}
</style>