<template>
  <div class="carousel">
    <v-carousel :items="items" :items-per-skew="4" :cycle="true" :interval="3000" :show-arrows="false">
      <v-carousel-item v-for="item in items" :key="item.id" >
        <v-img :src="item.image" height="200px" width="200px" />
        <v-card-text>{{ item.title }}</v-card-text>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>

export default {
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
