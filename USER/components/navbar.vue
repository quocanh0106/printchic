<template>
  <div class="nav-bar">
    <img :src="Logo" />
    <ul class="nav-bar-wrapper">
      <li v-for="(item, index) in links" :key="index">
        <a :href="item.href">{{ item.label }}</a>
      </li>
    </ul>
    <div class="nav-bar-action">
      <b-button class="primary-btn cursor-pointer txt-white">{{ $t("ContactUs") }}</b-button>
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n()
import Logo from '../assets/svg/Logo.svg'

defineProps({
  links: {
    type: Array,
    default: () => [
      { label: 'Home', href: '/' },
      { label: 'Catalog', href: '/' },
      { label: 'How it works', href: '/' },
      { label: 'Blog', href: '/' },
      { label: 'About us', href: '/' },
    ],
  },
});
</script>

<style scoped>
.nav-bar {
  /* Your navigation bar styles here */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  width: 100vw;
  flex-direction: row;
}

.nav-bar a {
  /* Your navigation link styles here */
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  font-weight: bold;
}

.nav-bar a:hover {
  /* Your hover styles here */
  color: #007bff;
}

.nav-bar-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>