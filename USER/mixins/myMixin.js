export const myMixin = {
    data() {
      return {
        screenWidth: 0,
      };
    },
    computed: {
      mobile() {
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
      async getRequest(endpoint) {
        const response = await  $fetch(`http://printchic-api.tvo-solution.net/auth/${endpoint}`)
        return response
      },
      async postReqest(endpoint, data) {
        const response = await  $fetch(`http://printchic-api.tvo-solution.net/auth/${endpoint}`, {
          method: 'POST',
          body: data
        })
        return response
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