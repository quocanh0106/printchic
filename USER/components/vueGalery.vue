<template>
  <div class="gallery-wrapper">
    <div class="vueGallery" v-show="pc || lgPc || extraPc">
      <div class="activePhoto" :style="'background-image: url(' + photos?.media?.[activePhoto]?.path + ');'">
        <button type="button" aria-label="Previous Photo" class="previous" @click="previousPhoto()">
          <i class="fas fa-chevron-circle-left"></i>
        </button>
        <button type="button" aria-label="Next Photo" class="next" @click="nextPhoto()">
          <i class="fas fa-chevron-circle-right"></i>
        </button>
      </div>
      <div class="thumbnails" v-show=" photos?.media?.length > 1">
        <div v-for="(photo, index) in photos?.media" :src="photo" :key="index" @click="activePhoto = index"
          :class="{ 'active': activePhoto == index }" :style="'background-image: url(' + photo?.path + ')'">
        </div>
      </div>
    </div>
    <!-- mobile -->
    <div class="vueGallery-mobile" v-show="mobile || tablet">
      <div class="activePhoto" :style="'background-image: url(' + photos?.media?.[activePhoto]?.path + ');'">
        <button type="button" aria-label="Previous Photo" class="previous" @click="previousPhoto()">
          <i class="fas fa-chevron-circle-left"></i>
        </button>
        <button type="button" aria-label="Next Photo" class="next" @click="nextPhoto()">
          <i class="fas fa-chevron-circle-right"></i>
        </button>
      </div>
      <div class="thumbnails" v-show=" photos?.media?.length > 1">
        <div v-for="(photo, index) in photos?.media" :src="photo" :key="index" @click="activePhoto = index"
          :class="{ 'active': activePhoto == index }" :style="'background-image: url(' + photo?.path + ')'">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { myMixin } from '~/mixins/myMixin';

export default {
  mixins: [myMixin],
  props: ['photos'],
  data() {
    return {
      activePhoto: null
    };
  },
  mounted() {
    this.activePhoto = 0;
    document.addEventListener("keydown", (event) => {
      if (event.which == 37) this.previousPhoto();
      if (event.which == 39) this.nextPhoto();
    });
  },
  methods: {
    nextPhoto() {
      this.activePhoto = (this.activePhoto + 1 < this.photos.length ? this.activePhoto + 1 : 0);
    },
    previousPhoto() {
      this.activePhoto = (this.activePhoto - 1 >= 0 ? this.activePhoto - 1 : this.photos.length - 1);
    }
  }
};
</script>

<style scoped lang="scss">
/* Your styles go here */
$brand: #5c4084;

body {
  background-color: $brand;
  padding: 25px;
}

.container {
  padding: 6px;
  background-color: #fff;
  border-radius: 8px;
  max-width: 800px;
  box-shadow: 0 5px 8px #0000007a;
}

.heading {
  text-align: center;

  h1 {
    background: -webkit-linear-gradient(#fff, lighten($brand, 20%));
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    text-align: center;
    margin: 0 0 5px 0;
    font-weight: 900;
    font-size: 4rem;
    color: #fff;
  }

  h4 {
    color: lighten($brand, 20%);
    text-align: center;
    margin: 0 0 35px 0;
    font-weight: 400;
    font-size: 24px;
  }
}

.vueGallery {
  display: flex;
  width: 40vw;
  height: 100%;

  .activePhoto {
    width: 100%;
    margin-bottom: 5px;
    padding-bottom: 65%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border: 2px solid #fff;
    position: relative;

    button {
      border: none;
      background-color: transparent;
      font-size: 32px;
      color: #fff;
      opacity: 0.5;
      position: absolute;
      outline: none;
      height: 100%;

      &:hover {
        opacity: 1;
      }

      &.previous {
        padding: 0 1em 0 0.7em;
        left: 0;
        background: -moz-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
        background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
        background: linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1);
      }

      &.next {
        padding: 0 0.7em 0 1em;
        right: 0;
        background: -moz-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
        background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
        background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1);
      }
    }
  }

  .thumbnails {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10vh, 1fr));
    grid-gap: 5px;
    @media screen and (max-width: 992px) {
      overflow-x: scroll;
    }
    div {
      width: 100%;
      max-width: 100px;
      max-height: 100px;
      border: 2px solid #fff;
      outline: 2px solid #fff;
      cursor: pointer;
      padding-bottom: 65%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      opacity: 1;

      &:hover {
        opacity: 0.6;
      }

      &.active {
        outline-color: $brand;
        opacity: 1;
      }
    }
  }
}

.vueGallery-mobile {
  display: flex;
  flex-direction: column;

  .activePhoto {
    width: 100%;
    margin-bottom: 5px;
    padding-bottom: 65%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border: 2px solid #fff;
    position: relative;

    button {
      border: none;
      background-color: transparent;
      font-size: 32px;
      color: #fff;
      opacity: 0.5;
      position: absolute;
      outline: none;
      height: 100%;

      &:hover {
        opacity: 1;
      }

      &.previous {
        padding: 0 1em 0 0.7em;
        left: 0;
        background: -moz-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
        background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
        background: linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1);
      }

      &.next {
        padding: 0 0.7em 0 1em;
        right: 0;
        background: -moz-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
        background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
        background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1);
      }
    }
  }

  .thumbnails {
    display: flex;
    overflow-x: scroll;
    div {
      min-width: 30vw;
      height: 30vw;
      border: 2px solid #fff;
      outline: 2px solid #fff;
      cursor: pointer;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      opacity: 1;

      &:hover {
        opacity: 0.6;
      }

      &.active {
        outline-color: $brand;
        opacity: 1;
      }
    }
  }
}</style>