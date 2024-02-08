<template>
  <div class="blog-wrapper flex">
    <div class="blog-left-wrapper flex flex-col">
        <img :src="listBlog[0]?.imgUrl" />
        <h1>{{ listBlog[0]?.title }}</h1>
        <p>{{ listBlog[0]?.description }}</p>
        <p>{{ listBlog[0]?.createdAt }}</p>
    </div>
    <div class="blog-right-wrapper flex flex-col" v-for="(blog, index) in listBlog" :key="index">
        <div class="side-blog-wrapper flex"  v-if="index <=3 && index > 0">
            <img :src="blog.imgUrl" />
            <div>
                <h1>{{ blog.title }}</h1>
                <p>{{ blog.description }}</p>
                <p>{{ blog.createdAt }}</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            listBlog: [
                {
                    imgUrl: '"https://casualday.co.za/wp-content/uploads/2020/10/Kids-TShirt-2023.png"',
                    title: 'Demi Moore gives update on Bruce Willis',
                    description: 'Nowhere are these attacks more evident right now than on college campuses. Many academics who teach about the history of race and racism in America, as I do, are being unjustifiably blamed.',
                    createdAt: 'April 11, 2023'
                },
                {
                    imgUrl: '"https://casualday.co.za/wp-content/uploads/2020/10/Kids-TShirt-2023.png"',
                    title: 'Demi Moore gives update on Bruce Willis',
                    description: 'Nowhere are these attacks more evident right now than on college campuses. Many academics who teach about the history of race and racism in America, as I do, are being unjustifiably blamed.',
                    createdAt: 'April 11, 2023'
                },
                {
                    imgUrl: '"https://casualday.co.za/wp-content/uploads/2020/10/Kids-TShirt-2023.png"',
                    title: 'Demi Moore gives update on Bruce Willis',
                    description: 'Nowhere are these attacks more evident right now than on college campuses. Many academics who teach about the history of race and racism in America, as I do, are being unjustifiably blamed.',
                    createdAt: 'April 11, 2023'
                },
                {
                    imgUrl: '"https://casualday.co.za/wp-content/uploads/2020/10/Kids-TShirt-2023.png"',
                    title: 'Demi Moore gives update on Bruce Willis',
                    description: 'Nowhere are these attacks more evident right now than on college campuses. Many academics who teach about the history of race and racism in America, as I do, are being unjustifiably blamed.',
                    createdAt: 'April 11, 2023'
                }
            ]
        };
    },
}
</script>

<style>

</style>