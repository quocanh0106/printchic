<template>
  <div class="carousel">
    <v-carousel :show-arrows="false">
      <v-carousel-item
        :src="blogImg"
        cover
      ></v-carousel-item>

      <v-carousel-item
        :src="pofThumb"
        cover
      ></v-carousel-item>

      <v-carousel-item
        :src="povCover"
        cover
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import blogImg from "../assets/images/blog-img.png";
import pofThumb from "../assets/images/pofThumbNail.png";
import povCover from "../assets/images/podCover.png";
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          image:
            "https://casualday.co.za/wp-content/uploads/2020/10/Kids-TShirt-2023.png",
          title: "Item 1",
        },
        {
          id: 2,
          image:
            "https://casualday.co.za/wp-content/uploads/2020/10/Kids-TShirt-2023.png",
          title: "Item 2",
        },
        {
          id: 3,
          image:
            "https://casualday.co.za/wp-content/uploads/2020/10/Kids-TShirt-2023.png",
          title: "Item 3",
        },
        {
          id: 4,
          image:
            "https://casualday.co.za/wp-content/uploads/2020/10/Kids-TShirt-2023.png",
          title: "Item 4",
        },
        {
          id: 5,
          image:
            "https://casualday.co.za/wp-content/uploads/2020/10/Kids-TShirt-2023.png",
          title: "Item 5",
        },
        {
          id: 6,
          image:
            "https://casualday.co.za/wp-content/uploads/2020/10/Kids-TShirt-2023.png",
          title: "Item 6",
        },
        {
          id: 7,
          image:
            "https://casualday.co.za/wp-content/uploads/2020/10/Kids-TShirt-2023.png",
          title: "Item 7",
        },
        {
          id: 8,
          image:
            "https://casualday.co.za/wp-content/uploads/2020/10/Kids-TShirt-2023.png",
          title: "Item 8",
        },
      ],
      blogImg,
      pofThumb,
      povCover
    };
  },
};
</script>

<style lang="scss" scoped>
  .carousel {
    :deep(.v-carousel__controls){
      background-color: transparent !important;
    }
    :deep(.v-btn__overlay){
      width: 0px ;
      height: 0px;
    }
  }
</style>