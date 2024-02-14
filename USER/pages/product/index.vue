
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
      <div class="filter-sidebar mt-2">Filter</div>
      <div class="product-list-wrapper">
        <div class="sortbar flex justify-between">
          <span class="total-product-amount mt-2 txt-gray"> {{ $t('productList.showing') }}</span>
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
        <div class="product-list">
          <div class="product-card"  v-for="(item,index) in listProduct" :key="index">
            <img class="product-thumbnail" :src="item.imgUrl"/>
            <p class="mt-3 txt-gray font-medium">SKU: {{ item.sku }}</p>
            <p class="mt-1 txt-dark-blue font-semibold">{{ item.title }}</p>
            <p class="mt-2 txt-primary font-medium">$ {{ item.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swiperComponent from "../../components/swiperComponent.vue";
export default {
  components: {
    swiperComponent,
  },
  data() {
    return {
      items: ['Best Selling', 'Price Low To High', 'Price High To Low','Most Popular'],
      listProduct: [
        {
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
        {
          title : 'Product',
          sku : 'LSRLVN',
          price : '15.75',
          imgUrl : 'https://media.boohoo.com/i/boohoo/bmm57614_white_xl/male-white-long-sleeve-muscle-satin-shirt/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
        },
      ],
    };
  },
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
    width: 30%;
  }
  .product-list{
    width: 70%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 32px; /* Optional: space between items */
    .product-card{
      width: 20vw;
      img{
        border-radius: 4px;
        height: 20vw;
        width: 20vw;
      }
    }
  }
  .sorter{
    min-width: 120px;
    max-width: 120px;
    :deep(.v-field__overlay){
      background-color: transparent;
    }
  }
</style>