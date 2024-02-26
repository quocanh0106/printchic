export const screenSizeMixin = {
    data() {
      return {
        screenWidth: 0,
      };
    },
    computed: {
      mobile() {
        console.log('mobile',this.screenWidth)
        return this.screenWidth <= 600;
      },
      tablet() {
        return this.screenWidth > 600 && this.screenWidth <= 992;
      },
      pc() {
        return this.screenWidth > 992 && this.screenWidth <= 2000;
      },
      lgPc() {
        return this.screenWidth > 2000 && this.screenWidth <= 2500;
      },
      extraPc() {
        return this.screenWidth > 2500;
      },
    },
    methods: {
      updateScreenWidth() {
        this.screenWidth = window.innerWidth;
      },
    },
    mounted() {
      this.updateScreenWidth();
      window.addEventListener('resize', this.updateScreenWidth);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.updateScreenWidth);
    },
  };