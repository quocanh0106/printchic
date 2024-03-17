<template>
  <div class="faq-section-wrapper">
    <div class="faq-header">
        <h1 class="section-title font-semibold text-center">
            {{ $t("homePage.faqQuestions") }}
        </h1>
    </div>
    <div class="faq-collapsible mt-12">
        <v-expansion-panels v-for="item,index in listFaq" :key="index">
        <v-expansion-panel>
            <v-expansion-panel-title class="accordition-title font-semibold" expand-icon="mdi-plus" collapse-icon="mdi-minus">
                {{item.title}}
            </v-expansion-panel-title>
            <v-expansion-panel-text class="section-content">
                {{ item.content }}
            </v-expansion-panel-text>
        </v-expansion-panel>
        </v-expansion-panels>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            visible: true,
            listFaq:[
                {
                    title: "Title",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                },
                {
                    title: "Title",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                },
                {
                    title: "Title",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                },
                {
                    title: "Title",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                },
                {
                    title: "Title",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                },
            ],
        };
    },
}
</script>

<style lang="scss" scoped>
    .faq-collapsible{
        :deep(.v-expansion-panel__shadow){
            box-shadow: none !important;
        }
        :deep(.v-expansion-panel-title){
            border-bottom: 1px solid #EAECF0;
            border-radius: 0px !important;
        }
    }

    .accordition-title{
        font-size: 20px;
        line-height: 27px;
        :deep(.mdi-plus::before){
            color: #3372DB;
        }
        :deep(.mdi-minus::before){
            color: #3372DB;
        }
    }
</style>

