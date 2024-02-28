<template>
    <div class="all-screen-blog-wrapper">
        <div class="blog-wrapper " v-show="pc">
            <div class="blog-header flex justify-between items-center">
                <h1 class="section-title font-semibold">
                    {{ $t("homePage.ourBlogStory") }}
                </h1>
                <a class="flex gap-1 txt-primary cursor-pointer mt-10">
                    <p>{{ $t("button.viewAll") }}</p>
                    <img :src="arrowUpRight" />
                </a>
            </div>
            <div class="blog-body-wrapper gap-x-8 flex mt-12">
                <div class="blog-left-wrapper flex flex-col cursor-pointer" @click="toDetailBlog(listBlog[0]?.id)">
                    <img :src="listBlog[0]?.imgUrl" class="blog-img" />
                    <div class="content flex flex-col mt-8">
                        <h1 class="text-2xl font-semibold ">{{ listBlog[0]?.title }}</h1>
                        <p class="text-base mt-2">{{ listBlog[0]?.description }}</p>
                        <p class="text-sm mt-4">{{ listBlog[0]?.createdAt }}</p>
                    </div>
                </div>
                <div class="blog-right-wrapper flex flex-col items-start justify-start">
                    <div class="side-blog-wrapper cursor-pointer" v-for="(blog, index) in listBlog" :key="index"
                        @click="toDetailBlog(blog.id)">
                        <div class="blog-content mb-8 flex gap-x-6" v-if="index != 0 && index <= 3">
                            <img class="small-img-blog blog-img" :src="blog.imgUrl" />
                            <div class="">
                                <h1 class="font-semibold">{{ blog.title }}</h1>
                                <p class="mt-2">{{ blog.description }}</p>
                                <p class="mt-3">{{ blog.createdAt }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="blog-wrapper mx-3" v-show="mobile">
            <div class="blog-header flex justify-center items-center my-5">
                <h1 class="section-title font-semibold">
                    {{ $t("homePage.ourBlogStory") }}
                </h1>
            </div>
            <SwiperBlogMobile />
        </div>
    </div>
</template>

<script>
import arrowUpRight from "../assets/svg/arrowUpRight.svg";
import { screenSizeMixin } from '~/mixins/screenSizeMixin';
import SwiperBlogMobile from "../pages/home/components/SwiperBlogMobile"

export default {
    mixins: [screenSizeMixin],
    components: {
        SwiperBlogMobile
    },
    data() {
        return {
            arrowUpRight,
            listBlog: [
                {
                    id: 1,
                    imgUrl: 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/stock%2FGettyImages-1166414278',
                    title: 'Demi Moore gives update on Bruce Willis',
                    description: 'Nowhere are these attacks more evident right now than on college campuses. Many academics who teach about the history of race and racism in America, as I do, are being unjustifiably blamed.',
                    createdAt: 'April 11, 2023'
                },
                {
                    id: 1,
                    imgUrl: 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/stock%2FGettyImages-1166414278',
                    title: 'Demi Moore gives update on Bruce Willis',
                    description: 'Nowhere are these attacks more evident right now than on college campuses. Many academics who teach about the history of race and racism in America, as I do, are being unjustifiably blamed.',
                    createdAt: 'April 11, 2023'
                },
                {
                    id: 1,
                    imgUrl: 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/stock%2FGettyImages-1166414278',
                    title: 'Demi Moore gives update on Bruce Willis',
                    description: 'Nowhere are these attacks more evident right now than on college campuses. Many academics who teach about the history of race and racism in America, as I do, are being unjustifiably blamed.',
                    createdAt: 'April 11, 2023'
                },
                {
                    id: 1,
                    imgUrl: 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/stock%2FGettyImages-1166414278',
                    title: 'Demi Moore gives update on Bruce Willis',
                    description: 'Nowhere are these attacks more evident right now than on college campuses. Many academics who teach about the history of race and racism in America, as I do, are being unjustifiably blamed.',
                    createdAt: 'April 11, 2023'
                },

            ]
        };
    },
    methods: {
        toDetailBlog(id) {
            this.$router.push(`/blog/${id}`)
        }
    }
}
</script>

<style lang="scss" scoped>
.blog-img {
    border-radius: 6px;
}

.blog-left-wrapper {
    // width: 50%;
}

.blog-right-wrapper {
    // width: 50%;
}

.small-img-blog {
    max-width: 189px;
    min-width: 183px;
    height: 183px;
    object-fit: cover;
}
</style>

