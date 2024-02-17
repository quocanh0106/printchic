// export default {
//     data() {
//       return {
//         isLoading: false,
//         flatPickrConfig: {
//           dateFormat: 'Y-m-d H:m:i',
//           altInput: true,
//           altFormat: 'd/m/Y',
//           allowInput: true,
//           wrap: true,
//           disableMobile: true,
//         },
//         screen: 0,
//       }
//     },
//     mounted() {
//       this.$nextTick(() => {
//         this.screen = window.screen.width
//         window.addEventListener('resize', this.onResize)
//       })
//     },
//     beforeDestroy() {
//       window?.removeEventListener('resize', this.onResize)
//     },
//     computed: {
//       mobile() {
//         if (process.client) {
//           if (window.screen.width <= 600) {
//             return true
//           } else {
//             return false
//           }
//         }
//       },
//       tablet() {
//         if (process.client) {
//           if (window.screen.width > 600 && window.screen.width <= 992) {
//             return true
//           } else {
//             return false
//           }
//         }
//       },
//       pc() {
//         if (process.client) {
//           if (window.screen.width > 992) {
//             return true
//           } else {
//             return false
//           }
//         }
//       },
//       lgPc() {
//         if (process.client) {
//           if (window.screen.width > 2000) {
//             return true
//           } else {
//             return false
//           }
//         }
//       },
//       extraPc() {
//         if (process.client) {
//           if (window.screen.width > 2500) {
//             return true
//           } else {
//             return false
//           }
//         }
//       }
//     },
//     methods: {
//       //@ (queryTransform): Change an object into a query string ------------------------------------------------------------------------- */
//       queryTransform(queryObject) {
//         const transform = new URLSearchParams(queryObject).toString()
//         return `?${transform}`
//       },
//       //@ (startLoading): Start loading page ------------------------------------------------------------------------- */
//       startLoading(global = false) {
//         console.log('Loading...')
//         this.isLoading = true
//         if (global === true) {
//           const appLoading = document.querySelector('.loading-bg')
//           appLoading.classList.add('flex')
//           const bodyHtml = document.querySelector('body')
//           bodyHtml.style.overflow = 'hidden'
//         }
//       },
//       //@ (endLoading): Finish loading page ------------------------------------------------------------------------- */
//       endLoading(global = false) {
//         console.log('DONE!')
//         this.isLoading = false
//         if (global === true) {
//           const appLoading = document.querySelector('.loading-bg')
//           appLoading.classList.remove('flex')
//           const bodyHtml = document.querySelector('body')
//           bodyHtml.style.overflow = 'auto'
//         }
//       },
//     },
//   }
  

export const mobile = computed(() => {
    if (process.client) {
      if (window.screen.width <= 600) {
        return true
      } else {
        return false
      }
    }
}) 