export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.mixin({
      beforeRouteEnter(to, from, next) {
        if (to.path === '/') {
          next('/home');
        } else {
          next();
        }
      }
    });
  });