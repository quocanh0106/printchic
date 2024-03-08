<template>
    <div class="custom-input">
        <v-text-field
        :label="$t('navBar.search')"
        :rules="rules"
        class='custom-text-field'
        prepend-inner-icon="mdi-magnify"
        hide-details="auto"
        v-model="querySearch"
        @keyup.enter="searchProduct"
    >
    </v-text-field>
    </div>
</template>

<script>
import searchIcon from '../assets/svg/searchIcon.svg'

export default {
 components: {
  },
  data() {
    return {
      querySearch:''
    };
  },
  methods:{
    searchProduct() {
      const url = `/search-result?search=${this.querySearch}`;
      // this.$router.push({path:'/search-result',query: this.querySearch})
      window.location.href = url;
    }
  },
  mounted(){
    this.querySearch = '';
  }
}
</script>

<style lang="scss" scoped>
    .custom-text-field{
        width:20vw;
        max-width:328px;
        :deep(.v-field__overlay){
          background-color: transparent;
        }
        :deep(.v-field__outline){
          border: 1px solid #EAECF0 !important;
          border-radius: 4px;
        }
    }
</style>