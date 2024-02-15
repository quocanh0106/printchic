
<template>
  <div class="product-page-wrapper custom-padding">
    <div class="product-header">
      <div class="product-banner rounded-lg text-center flex flex-col">
        <h1 class="section-title font-semibold"> {{ $t('productList.mensClothing') }} </h1>
        <span> Home / Men</span>
      </div>
      <div class="cloth-category">
        <swiperComponent :slidePerView = "6" :showNavigation="true" :showPagination="false" class="mt-12" />
      </div>
    </div>
    <div class="product-grid-wrapper flex justify-between">
      <div class="filter-sidebar mt-2">
        <h1 class="text-2xl font-semibold filter-by-title">{{ $t('productList.filter')}}</h1>
        <div class="list-filter mt-8" v-for="(item,index) in listFilter" :key="index">
          <h1 class="text-2xl font-semibold">{{ item.filterBy }}</h1>
          <div class="filter-by mt-3" v-for="(itemfilterBy,index) in item.listFilter" :key="index">
            <input type="checkbox" :id="itemfilterBy" :value="itemfilterBy" v-model="filterBy">
            <label class="ml-1.5" :for="itemfilterBy">{{itemfilterBy}}</label>
            <!-- <v-checkbox :label="filterBy"></v-checkbox> -->
          </div>
        </div>
      </div>
      <div class="product-list-wrapper">
        <div class="sortbar flex justify-between">
          <span class="total-product-amount mt-2 txt-gray flex"> {{ $t('productList.showing')}} <p class="ml-2"> {{ listProduct.length }}</p> </span>
          <span class="sort-by-select flex gap-x-2"> 
            <p class="mt-2 txt-gray">{{ $t('productList.sortBy') }}:</p>
            <v-select
              :items="items"
              density="compact"
              :label="$t('productList.select')"
              class="sorter"
            ></v-select>
          </span>
        </div>
        <div class="query-filter-tag flex flex-row items-center gap-x-2.5">
          <span v-for="item,index in filterBy" :key="index" class="tag-filter">{{ item }}</span>
          <h1 class="txt-primary font-semibold cursor-pointer" v-if="filterBy.length > 0" @click="clearAllFilterBy()">{{ $t('productList.clearAll') }}</h1>
        </div>
        <div class="right-block-wrapper mt-12">
          <div class="product-list mb-10">
            <div class="product-card cursor-pointer"  v-for="(item,index) in listProduct" :key="index">
              <img class="product-thumbnail" :src="item.imgUrl"/>
              <p class="mt-3 txt-gray font-medium">SKU: {{ item.sku }}</p>
              <p class="mt-1 txt-dark-blue font-semibold">{{ item.title }}</p>
              <p class="mt-2 txt-primary font-medium">$ {{ item.price }}</p>
              <div class="sale-tag" v-if="item.isSale">{{ $t('productList.saleTag') }}</div>
            </div>
          </div>
          <div>
            <v-button class="secondary-btn cursor-pointer button-seemore">{{ $t('button.seeMore') }}</v-button>
            <div class="about-pjm mt-20 bg-light-gray-custom p-6 rounded-md">
              <h1 class="text-xl font-semibold">{{ $t('servicePage.aboutPjmTitle') }}</h1>
              <p class="mt-3">{{ $t('servicePage.aboutPjmContent') }}</p>
          </div>
          </div>
        </div>
      </div>
    </div>
    <!-- help -->
    <help  class="mt-20"/>
  </div>
</template>

<script>
import swiperComponent from "../../components/swiperComponent.vue";
import help from "../../components/help.vue";

export default {
  components: {
    swiperComponent,
    help
  },
  data() {
    return {
      items: ['Best Selling', 'Price Low To High', 'Price High To Low','Most Popular'],
      listProduct: [
        {
          id:'1',
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          isSale : true,
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          id:'2',
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          isSale : true,
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          id:'3',
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          isSale : false,
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          id:'4',
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          isSale : true,
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          id:'5',
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          isSale : false,
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          id:'6',
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          isSale : false,
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          id:'7',
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          isSale : true,
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          id:'8',
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          isSale : true,
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          id:'9',
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          isSale : true,
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          id:'10',
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          isSale : false,
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          id:'11',
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          isSale : true,
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          id:'12',
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          isSale : false,
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          id:'13',
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          isSale : true,
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          id:'14',
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          isSale : true,
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          id:'15',
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          isSale : false,
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        }
      
      ],
      listFilter: [
        {
          filterBy : 'Categories',
          listFilter : ['Apparel', 'Gift & Accessories', 'Home & Decorations', 'All Over Print', 'Canvas & Poster', 'Shoes', 'US 2D Printing']
        },
        {
          filterBy : 'Print Area',
          listFilter : ['Back side', 'All-over Print', 'Front side', 'Sleeve left', 'Sleeve right']
        },
        {
          filterBy : 'Techniques',
          listFilter : ['UV Digital Printing', 'Vinyl Heat Transfer', 'Digital Cylinder Printing', 'Laser Cut', 'Embroidery', 'Digital Printing (DTG)','Dye Sublimation']
        },
      ],
      filterBy: [],
    };
  },
  methods : {
    clearAllFilterBy(){
      this.filterBy = [];
    }
  }
}
</script>
<style lang="scss" scoped>
  .product-banner{
    background-color:#F2F4F7;
    padding : 115px 15vw;
    height : 307px;
    max-height : 307px;
  }
  .filter-sidebar{
    width: 100%;
  }
  .product-list{
    width: 70%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 32px; /* Optional: space between items */
    .product-card{
      width: 20vw;
      position: relative;
      img{
        border-radius: 4px;
        height: 20vw;
        width: 20vw;
      }
    }
    .sale-tag{
      position: absolute;
      z-index: 2;
      top: 10px;
      left: 10px;
      color: white;
      text-transform: uppercase;
      background-color: #16B16D;
      border-radius: 4px;
      padding: 4px 8px;
    }
  }
  .sorter{
    min-width: 120px;
    max-width: 120px;
    :deep(.v-field__overlay){
      background-color: transparent;
    }
  }
  .button-seemore{
    margin-left: 50%;
  }
  .tag-filter{
    background-color: #F9FAFB;
    border-radius: 4px;
    padding: 6px 12px;
  }
</style>