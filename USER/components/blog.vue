<template>
  <div class="blog-wrapper">
    <div class="blog-header flex justify-between items-center">
        <h1 class="section-title font-semibold">
        {{ $t("homePage.ourBlogStory") }}
        </h1>
        <a class="flex gap-1 txt-primary cursor-pointer mt-10">
            <p>{{ $t("button.viewAll") }}</p>
            <img :src="arrowUpRight" />
        </a>
    </div>
    <div class="blog-body-wrapper flex mt-12">
        <div class="blog-left-wrapper flex flex-col">
            <img :src="listBlog[0]?.imgUrl" class="w-1/2 blog-img"/>
            <div class="content flex flex-col mt-8">
                <h1 class="text-2xl font-semibold ">{{ listBlog[0]?.title }}</h1>
                <p class="text-base mt-2">{{ listBlog[0]?.description }}</p>
                <p class="text-sm mt-4">{{ listBlog[0]?.createdAt }}</p>
            </div>
        </div>
        <div class="blog-right-wrapper ">
            <div class="side-blog-wrapper flex gap-y-32"  v-for="(blog, index) in listBlog" :key="index">
                <div class="blog-content flex gap-x-24" v-if="index!=0 && index <=3 ">
                    <img class="w-1/2 small-img-blog blog-img" :src="blog.imgUrl" />
                    <div class="w-1/2">
                        <h1 class="font-semibold">{{ blog.title }}</h1>
                        <p class="mt-2">{{ blog.description }}</p>
                        <p class="mt-3">{{ blog.createdAt }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import arrowUpRight from "../assets/svg/arrowUpRight.svg";

export default {
    data() {
        return {
            arrowUpRight,
            listBlog: [
                {
                    imgUrl: 'https://casualday.co.za/wp-content/uploads/2020/10/Kids-TShirt-2023.png',
                    title: 'Demi Moore gives update on Bruce Willis',
                    description: 'Nowhere are these attacks more evident right now than on college campuses. Many academics who teach about the history of race and racism in America, as I do, are being unjustifiably blamed.',
                    createdAt: 'April 11, 2023'
                },
                {
                    imgUrl: 'https://casualday.co.za/wp-content/uploads/2020/10/Kids-TShirt-2023.png',
                    title: 'Demi Moore gives update on Bruce Willis',
                    description: 'Nowhere are these attacks more evident right now than on college campuses. Many academics who teach about the history of race and racism in America, as I do, are being unjustifiably blamed.',
                    createdAt: 'April 11, 2023'
                },
                {
                    imgUrl: 'https://casualday.co.za/wp-content/uploads/2020/10/Kids-TShirt-2023.png',
                    title: 'Demi Moore gives update on Bruce Willis',
                    description: 'Nowhere are these attacks more evident right now than on college campuses. Many academics who teach about the history of race and racism in America, as I do, are being unjustifiably blamed.',
                    createdAt: 'April 11, 2023'
                },
                {
                    imgUrl: 'https://casualday.co.za/wp-content/uploads/2020/10/Kids-TShirt-2023.png',
                    title: 'Demi Moore gives update on Bruce Willis',
                    description: 'Nowhere are these attacks more evident right now than on college campuses. Many academics who teach about the history of race and racism in America, as I do, are being unjustifiably blamed.',
                    createdAt: 'April 11, 2023'
                }
            ]
        };
    },
}
</script>

<style lang="scss" scoped>
    .blog-img{
        border-radius: 6px;
    }
    .blog-left-wrapper{
        // width: 50%;
    }
    .blog-right-wrapper{
        // width: 50%;
    }
    .small-img-blog{
        max-width: 189px;
    }
</style>

