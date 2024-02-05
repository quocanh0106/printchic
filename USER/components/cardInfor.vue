<template>
    <div class="card-infor">
      <div class="card-info-wrapper">
        <img :src="imgSrc"/>
      </div>
    </div>
  </template>
  
  
<script>

export default {
  props:{
    imgSrc : {
        type: String,
        default: '',
    },
    title: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    }
  },
  data() {
    return {
      items: [
        { id: 1, image: "https://casualday.co.za/wp-content/uploads/2020/10/Kids-TShirt-2023.png", title: "Item 1" },
        { id: 2, image: "https://casualday.co.za/wp-content/uploads/2020/10/Kids-TShirt-2023.png", title: "Item 2" },
        { id: 3, image: "https://casualday.co.za/wp-content/uploads/2020/10/Kids-TShirt-2023.png", title: "Item 3" },
        { id: 4, image: "https://casualday.co.za/wp-content/uploads/2020/10/Kids-TShirt-2023.png", title: "Item 4" },
        { id: 5, image: "https://casualday.co.za/wp-content/uploads/2020/10/Kids-TShirt-2023.png", title: "Item 5" },
        { id: 6, image: "https://casualday.co.za/wp-content/uploads/2020/10/Kids-TShirt-2023.png", title: "Item 6" },
        { id: 7, image: "https://casualday.co.za/wp-content/uploads/2020/10/Kids-TShirt-2023.png", title: "Item 7" },
        { id: 8, image: "https://casualday.co.za/wp-content/uploads/2020/10/Kids-TShirt-2023.png", title: "Item 8" },
      ],
    };
  },
};
</script>
