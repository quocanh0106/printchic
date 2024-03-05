<template>
  <div class="search-result-wrapper flex flex-col items-center justify-center custom-padding-search">
    <div class="product-list">
      <div class="product-card cursor-pointer" @click="toProductDetail(item)" v-for="(item, index) in filterResult"
          :key="index">
          <img class="product-thumbnail" :src="item.media[0]?.path" />
          <div class="product-infor flex flex-col ml-2">
            <p class="mt-1 txt-dark-blue font-semibold">{{ item[`title${currentLanguage}`] }}</p>
            <p class="mt-2 txt-primary font-semibold ">$ {{ item.price }}</p>
            <div class="sale-tag" v-if="item.isSale">{{ $t('productList.saleTag') }}</div>
          </div>
        </div>
      </div>
      <v-btn class="w-100 mt-8 button-see-more">{{ $t('button.seeMoreWithItemCount', {count: filterResult.length}) }}</v-btn>
  </div>
</template>

<script>
import { myMixin } from '/mixins/myMixin';

export default {
  mixins: [myMixin],
  data() {
    return {
      filterResult: [
      {
    _id: "65e45fec026615cb3e5fe695",
    handleUrl: "undefined",
    titleUS: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleUK: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleFR: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleDE: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    categoryProductId: {
        _id: "65e42ef184c95b6a0610a962",
        languageId: null,
        titleUK: "Long Sleve",
        titleUS: "Long Sleve",
        titleDE: "Long Sleve",
        titleFR: "Long Sleve",
        descriptionUK: "Long Sleve Collection",
        descriptionUS: "Long Sleve Collection",
        descriptionDE: "Long Sleve Collection",
        descriptionFR: "Long Sleve Collection",
        bannerImg: "https://res.cloudinary.com/dungpt123/image/upload/v1709453040/wnhxriag17jpehhwfaem.png",
        parentCategory: "undefined",
        isDeleted: "No",
        createdAt: "2024-03-03 09:04:01",
        updatedAt: null,
        updatedBy: null,
        createdBy: null,
        status: "ACTIVE"
    },
    metaDescription: "undefined",
    type: "1",
    descriptionUK: "\"<p>1</p>\"",
    descriptionUS: "\"<p>2</p>\"",
    descriptionFR: "\"<p>d</p>\"",
    descriptionDE: "\"<p>34</p>\"",
    media: [
        {
            fieldname: "files",
            originalname: "1111.jpg",
            encoding: "7bit",
            mimetype: "image/jpeg",
            path: "https://res.cloudinary.com/dungpt123/image/upload/v1709465578/anujybqa1h400s2drnga.jpg",
            size: 589169,
            filename: "anujybqa1h400s2drnga"
        }
    ],
    variants: [
        {
            id: 1,
            nameOption_1: "1212",
            nameVariant_1: "1212",
            sku: "3",
            price: "3"
        }
    ],
    currency: "EUR",
    status: "private",
    price: 1,
    priceSale: 1,
    isDeleted: "No",
    createdAt: "2024-03-03 18:33:00",
    updatedAt: null,
    updatedBy: null,
    createdBy: null,
    id: "65e45fec026615cb3e5fe695"
},
{
    _id: "65e45fec026615cb3e5fe695",
    handleUrl: "undefined",
    titleUS: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleUK: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleFR: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleDE: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    categoryProductId: {
        _id: "65e42ef184c95b6a0610a962",
        languageId: null,
        titleUK: "Long Sleve",
        titleUS: "Long Sleve",
        titleDE: "Long Sleve",
        titleFR: "Long Sleve",
        descriptionUK: "Long Sleve Collection",
        descriptionUS: "Long Sleve Collection",
        descriptionDE: "Long Sleve Collection",
        descriptionFR: "Long Sleve Collection",
        bannerImg: "https://res.cloudinary.com/dungpt123/image/upload/v1709453040/wnhxriag17jpehhwfaem.png",
        parentCategory: "undefined",
        isDeleted: "No",
        createdAt: "2024-03-03 09:04:01",
        updatedAt: null,
        updatedBy: null,
        createdBy: null,
        status: "ACTIVE"
    },
    metaDescription: "undefined",
    type: "1",
    descriptionUK: "\"<p>1</p>\"",
    descriptionUS: "\"<p>2</p>\"",
    descriptionFR: "\"<p>d</p>\"",
    descriptionDE: "\"<p>34</p>\"",
    media: [
        {
            fieldname: "files",
            originalname: "1111.jpg",
            encoding: "7bit",
            mimetype: "image/jpeg",
            path: "https://res.cloudinary.com/dungpt123/image/upload/v1709465578/anujybqa1h400s2drnga.jpg",
            size: 589169,
            filename: "anujybqa1h400s2drnga"
        }
    ],
    variants: [
        {
            id: 1,
            nameOption_1: "1212",
            nameVariant_1: "1212",
            sku: "3",
            price: "3"
        }
    ],
    currency: "EUR",
    status: "private",
    price: 1,
    priceSale: 1,
    isDeleted: "No",
    createdAt: "2024-03-03 18:33:00",
    updatedAt: null,
    updatedBy: null,
    createdBy: null,
    id: "65e45fec026615cb3e5fe695"
},
{
    _id: "65e45fec026615cb3e5fe695",
    handleUrl: "undefined",
    titleUS: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleUK: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleFR: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleDE: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    categoryProductId: {
        _id: "65e42ef184c95b6a0610a962",
        languageId: null,
        titleUK: "Long Sleve",
        titleUS: "Long Sleve",
        titleDE: "Long Sleve",
        titleFR: "Long Sleve",
        descriptionUK: "Long Sleve Collection",
        descriptionUS: "Long Sleve Collection",
        descriptionDE: "Long Sleve Collection",
        descriptionFR: "Long Sleve Collection",
        bannerImg: "https://res.cloudinary.com/dungpt123/image/upload/v1709453040/wnhxriag17jpehhwfaem.png",
        parentCategory: "undefined",
        isDeleted: "No",
        createdAt: "2024-03-03 09:04:01",
        updatedAt: null,
        updatedBy: null,
        createdBy: null,
        status: "ACTIVE"
    },
    metaDescription: "undefined",
    type: "1",
    descriptionUK: "\"<p>1</p>\"",
    descriptionUS: "\"<p>2</p>\"",
    descriptionFR: "\"<p>d</p>\"",
    descriptionDE: "\"<p>34</p>\"",
    media: [
        {
            fieldname: "files",
            originalname: "1111.jpg",
            encoding: "7bit",
            mimetype: "image/jpeg",
            path: "https://res.cloudinary.com/dungpt123/image/upload/v1709465578/anujybqa1h400s2drnga.jpg",
            size: 589169,
            filename: "anujybqa1h400s2drnga"
        }
    ],
    variants: [
        {
            id: 1,
            nameOption_1: "1212",
            nameVariant_1: "1212",
            sku: "3",
            price: "3"
        }
    ],
    currency: "EUR",
    status: "private",
    price: 1,
    priceSale: 1,
    isDeleted: "No",
    createdAt: "2024-03-03 18:33:00",
    updatedAt: null,
    updatedBy: null,
    createdBy: null,
    id: "65e45fec026615cb3e5fe695"
},
{
    _id: "65e45fec026615cb3e5fe695",
    handleUrl: "undefined",
    titleUS: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleUK: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleFR: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleDE: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    categoryProductId: {
        _id: "65e42ef184c95b6a0610a962",
        languageId: null,
        titleUK: "Long Sleve",
        titleUS: "Long Sleve",
        titleDE: "Long Sleve",
        titleFR: "Long Sleve",
        descriptionUK: "Long Sleve Collection",
        descriptionUS: "Long Sleve Collection",
        descriptionDE: "Long Sleve Collection",
        descriptionFR: "Long Sleve Collection",
        bannerImg: "https://res.cloudinary.com/dungpt123/image/upload/v1709453040/wnhxriag17jpehhwfaem.png",
        parentCategory: "undefined",
        isDeleted: "No",
        createdAt: "2024-03-03 09:04:01",
        updatedAt: null,
        updatedBy: null,
        createdBy: null,
        status: "ACTIVE"
    },
    metaDescription: "undefined",
    type: "1",
    descriptionUK: "\"<p>1</p>\"",
    descriptionUS: "\"<p>2</p>\"",
    descriptionFR: "\"<p>d</p>\"",
    descriptionDE: "\"<p>34</p>\"",
    media: [
        {
            fieldname: "files",
            originalname: "1111.jpg",
            encoding: "7bit",
            mimetype: "image/jpeg",
            path: "https://res.cloudinary.com/dungpt123/image/upload/v1709465578/anujybqa1h400s2drnga.jpg",
            size: 589169,
            filename: "anujybqa1h400s2drnga"
        }
    ],
    variants: [
        {
            id: 1,
            nameOption_1: "1212",
            nameVariant_1: "1212",
            sku: "3",
            price: "3"
        }
    ],
    currency: "EUR",
    status: "private",
    price: 1,
    priceSale: 1,
    isDeleted: "No",
    createdAt: "2024-03-03 18:33:00",
    updatedAt: null,
    updatedBy: null,
    createdBy: null,
    id: "65e45fec026615cb3e5fe695"
},
{
    _id: "65e45fec026615cb3e5fe695",
    handleUrl: "undefined",
    titleUS: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleUK: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleFR: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleDE: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    categoryProductId: {
        _id: "65e42ef184c95b6a0610a962",
        languageId: null,
        titleUK: "Long Sleve",
        titleUS: "Long Sleve",
        titleDE: "Long Sleve",
        titleFR: "Long Sleve",
        descriptionUK: "Long Sleve Collection",
        descriptionUS: "Long Sleve Collection",
        descriptionDE: "Long Sleve Collection",
        descriptionFR: "Long Sleve Collection",
        bannerImg: "https://res.cloudinary.com/dungpt123/image/upload/v1709453040/wnhxriag17jpehhwfaem.png",
        parentCategory: "undefined",
        isDeleted: "No",
        createdAt: "2024-03-03 09:04:01",
        updatedAt: null,
        updatedBy: null,
        createdBy: null,
        status: "ACTIVE"
    },
    metaDescription: "undefined",
    type: "1",
    descriptionUK: "\"<p>1</p>\"",
    descriptionUS: "\"<p>2</p>\"",
    descriptionFR: "\"<p>d</p>\"",
    descriptionDE: "\"<p>34</p>\"",
    media: [
        {
            fieldname: "files",
            originalname: "1111.jpg",
            encoding: "7bit",
            mimetype: "image/jpeg",
            path: "https://res.cloudinary.com/dungpt123/image/upload/v1709465578/anujybqa1h400s2drnga.jpg",
            size: 589169,
            filename: "anujybqa1h400s2drnga"
        }
    ],
    variants: [
        {
            id: 1,
            nameOption_1: "1212",
            nameVariant_1: "1212",
            sku: "3",
            price: "3"
        }
    ],
    currency: "EUR",
    status: "private",
    price: 1,
    priceSale: 1,
    isDeleted: "No",
    createdAt: "2024-03-03 18:33:00",
    updatedAt: null,
    updatedBy: null,
    createdBy: null,
    id: "65e45fec026615cb3e5fe695"
},
{
    _id: "65e45fec026615cb3e5fe695",
    handleUrl: "undefined",
    titleUS: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleUK: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleFR: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleDE: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    categoryProductId: {
        _id: "65e42ef184c95b6a0610a962",
        languageId: null,
        titleUK: "Long Sleve",
        titleUS: "Long Sleve",
        titleDE: "Long Sleve",
        titleFR: "Long Sleve",
        descriptionUK: "Long Sleve Collection",
        descriptionUS: "Long Sleve Collection",
        descriptionDE: "Long Sleve Collection",
        descriptionFR: "Long Sleve Collection",
        bannerImg: "https://res.cloudinary.com/dungpt123/image/upload/v1709453040/wnhxriag17jpehhwfaem.png",
        parentCategory: "undefined",
        isDeleted: "No",
        createdAt: "2024-03-03 09:04:01",
        updatedAt: null,
        updatedBy: null,
        createdBy: null,
        status: "ACTIVE"
    },
    metaDescription: "undefined",
    type: "1",
    descriptionUK: "\"<p>1</p>\"",
    descriptionUS: "\"<p>2</p>\"",
    descriptionFR: "\"<p>d</p>\"",
    descriptionDE: "\"<p>34</p>\"",
    media: [
        {
            fieldname: "files",
            originalname: "1111.jpg",
            encoding: "7bit",
            mimetype: "image/jpeg",
            path: "https://res.cloudinary.com/dungpt123/image/upload/v1709465578/anujybqa1h400s2drnga.jpg",
            size: 589169,
            filename: "anujybqa1h400s2drnga"
        }
    ],
    variants: [
        {
            id: 1,
            nameOption_1: "1212",
            nameVariant_1: "1212",
            sku: "3",
            price: "3"
        }
    ],
    currency: "EUR",
    status: "private",
    price: 1,
    priceSale: 1,
    isDeleted: "No",
    createdAt: "2024-03-03 18:33:00",
    updatedAt: null,
    updatedBy: null,
    createdBy: null,
    id: "65e45fec026615cb3e5fe695"
},
{
    _id: "65e45fec026615cb3e5fe695",
    handleUrl: "undefined",
    titleUS: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleUK: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleFR: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleDE: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    categoryProductId: {
        _id: "65e42ef184c95b6a0610a962",
        languageId: null,
        titleUK: "Long Sleve",
        titleUS: "Long Sleve",
        titleDE: "Long Sleve",
        titleFR: "Long Sleve",
        descriptionUK: "Long Sleve Collection",
        descriptionUS: "Long Sleve Collection",
        descriptionDE: "Long Sleve Collection",
        descriptionFR: "Long Sleve Collection",
        bannerImg: "https://res.cloudinary.com/dungpt123/image/upload/v1709453040/wnhxriag17jpehhwfaem.png",
        parentCategory: "undefined",
        isDeleted: "No",
        createdAt: "2024-03-03 09:04:01",
        updatedAt: null,
        updatedBy: null,
        createdBy: null,
        status: "ACTIVE"
    },
    metaDescription: "undefined",
    type: "1",
    descriptionUK: "\"<p>1</p>\"",
    descriptionUS: "\"<p>2</p>\"",
    descriptionFR: "\"<p>d</p>\"",
    descriptionDE: "\"<p>34</p>\"",
    media: [
        {
            fieldname: "files",
            originalname: "1111.jpg",
            encoding: "7bit",
            mimetype: "image/jpeg",
            path: "https://res.cloudinary.com/dungpt123/image/upload/v1709465578/anujybqa1h400s2drnga.jpg",
            size: 589169,
            filename: "anujybqa1h400s2drnga"
        }
    ],
    variants: [
        {
            id: 1,
            nameOption_1: "1212",
            nameVariant_1: "1212",
            sku: "3",
            price: "3"
        }
    ],
    currency: "EUR",
    status: "private",
    price: 1,
    priceSale: 1,
    isDeleted: "No",
    createdAt: "2024-03-03 18:33:00",
    updatedAt: null,
    updatedBy: null,
    createdBy: null,
    id: "65e45fec026615cb3e5fe695"
},
{
    _id: "65e45fec026615cb3e5fe695",
    handleUrl: "undefined",
    titleUS: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleUK: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleFR: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleDE: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    categoryProductId: {
        _id: "65e42ef184c95b6a0610a962",
        languageId: null,
        titleUK: "Long Sleve",
        titleUS: "Long Sleve",
        titleDE: "Long Sleve",
        titleFR: "Long Sleve",
        descriptionUK: "Long Sleve Collection",
        descriptionUS: "Long Sleve Collection",
        descriptionDE: "Long Sleve Collection",
        descriptionFR: "Long Sleve Collection",
        bannerImg: "https://res.cloudinary.com/dungpt123/image/upload/v1709453040/wnhxriag17jpehhwfaem.png",
        parentCategory: "undefined",
        isDeleted: "No",
        createdAt: "2024-03-03 09:04:01",
        updatedAt: null,
        updatedBy: null,
        createdBy: null,
        status: "ACTIVE"
    },
    metaDescription: "undefined",
    type: "1",
    descriptionUK: "\"<p>1</p>\"",
    descriptionUS: "\"<p>2</p>\"",
    descriptionFR: "\"<p>d</p>\"",
    descriptionDE: "\"<p>34</p>\"",
    media: [
        {
            fieldname: "files",
            originalname: "1111.jpg",
            encoding: "7bit",
            mimetype: "image/jpeg",
            path: "https://res.cloudinary.com/dungpt123/image/upload/v1709465578/anujybqa1h400s2drnga.jpg",
            size: 589169,
            filename: "anujybqa1h400s2drnga"
        }
    ],
    variants: [
        {
            id: 1,
            nameOption_1: "1212",
            nameVariant_1: "1212",
            sku: "3",
            price: "3"
        }
    ],
    currency: "EUR",
    status: "private",
    price: 1,
    priceSale: 1,
    isDeleted: "No",
    createdAt: "2024-03-03 18:33:00",
    updatedAt: null,
    updatedBy: null,
    createdBy: null,
    id: "65e45fec026615cb3e5fe695"
},
{
    _id: "65e45fec026615cb3e5fe695",
    handleUrl: "undefined",
    titleUS: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleUK: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleFR: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleDE: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    categoryProductId: {
        _id: "65e42ef184c95b6a0610a962",
        languageId: null,
        titleUK: "Long Sleve",
        titleUS: "Long Sleve",
        titleDE: "Long Sleve",
        titleFR: "Long Sleve",
        descriptionUK: "Long Sleve Collection",
        descriptionUS: "Long Sleve Collection",
        descriptionDE: "Long Sleve Collection",
        descriptionFR: "Long Sleve Collection",
        bannerImg: "https://res.cloudinary.com/dungpt123/image/upload/v1709453040/wnhxriag17jpehhwfaem.png",
        parentCategory: "undefined",
        isDeleted: "No",
        createdAt: "2024-03-03 09:04:01",
        updatedAt: null,
        updatedBy: null,
        createdBy: null,
        status: "ACTIVE"
    },
    metaDescription: "undefined",
    type: "1",
    descriptionUK: "\"<p>1</p>\"",
    descriptionUS: "\"<p>2</p>\"",
    descriptionFR: "\"<p>d</p>\"",
    descriptionDE: "\"<p>34</p>\"",
    media: [
        {
            fieldname: "files",
            originalname: "1111.jpg",
            encoding: "7bit",
            mimetype: "image/jpeg",
            path: "https://res.cloudinary.com/dungpt123/image/upload/v1709465578/anujybqa1h400s2drnga.jpg",
            size: 589169,
            filename: "anujybqa1h400s2drnga"
        }
    ],
    variants: [
        {
            id: 1,
            nameOption_1: "1212",
            nameVariant_1: "1212",
            sku: "3",
            price: "3"
        }
    ],
    currency: "EUR",
    status: "private",
    price: 1,
    priceSale: 1,
    isDeleted: "No",
    createdAt: "2024-03-03 18:33:00",
    updatedAt: null,
    updatedBy: null,
    createdBy: null,
    id: "65e45fec026615cb3e5fe695"
},
{
    _id: "65e45fec026615cb3e5fe695",
    handleUrl: "undefined",
    titleUS: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleUK: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleFR: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleDE: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    categoryProductId: {
        _id: "65e42ef184c95b6a0610a962",
        languageId: null,
        titleUK: "Long Sleve",
        titleUS: "Long Sleve",
        titleDE: "Long Sleve",
        titleFR: "Long Sleve",
        descriptionUK: "Long Sleve Collection",
        descriptionUS: "Long Sleve Collection",
        descriptionDE: "Long Sleve Collection",
        descriptionFR: "Long Sleve Collection",
        bannerImg: "https://res.cloudinary.com/dungpt123/image/upload/v1709453040/wnhxriag17jpehhwfaem.png",
        parentCategory: "undefined",
        isDeleted: "No",
        createdAt: "2024-03-03 09:04:01",
        updatedAt: null,
        updatedBy: null,
        createdBy: null,
        status: "ACTIVE"
    },
    metaDescription: "undefined",
    type: "1",
    descriptionUK: "\"<p>1</p>\"",
    descriptionUS: "\"<p>2</p>\"",
    descriptionFR: "\"<p>d</p>\"",
    descriptionDE: "\"<p>34</p>\"",
    media: [
        {
            fieldname: "files",
            originalname: "1111.jpg",
            encoding: "7bit",
            mimetype: "image/jpeg",
            path: "https://res.cloudinary.com/dungpt123/image/upload/v1709465578/anujybqa1h400s2drnga.jpg",
            size: 589169,
            filename: "anujybqa1h400s2drnga"
        }
    ],
    variants: [
        {
            id: 1,
            nameOption_1: "1212",
            nameVariant_1: "1212",
            sku: "3",
            price: "3"
        }
    ],
    currency: "EUR",
    status: "private",
    price: 1,
    priceSale: 1,
    isDeleted: "No",
    createdAt: "2024-03-03 18:33:00",
    updatedAt: null,
    updatedBy: null,
    createdBy: null,
    id: "65e45fec026615cb3e5fe695"
},
{
    _id: "65e45fec026615cb3e5fe695",
    handleUrl: "undefined",
    titleUS: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleUK: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleFR: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleDE: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    categoryProductId: {
        _id: "65e42ef184c95b6a0610a962",
        languageId: null,
        titleUK: "Long Sleve",
        titleUS: "Long Sleve",
        titleDE: "Long Sleve",
        titleFR: "Long Sleve",
        descriptionUK: "Long Sleve Collection",
        descriptionUS: "Long Sleve Collection",
        descriptionDE: "Long Sleve Collection",
        descriptionFR: "Long Sleve Collection",
        bannerImg: "https://res.cloudinary.com/dungpt123/image/upload/v1709453040/wnhxriag17jpehhwfaem.png",
        parentCategory: "undefined",
        isDeleted: "No",
        createdAt: "2024-03-03 09:04:01",
        updatedAt: null,
        updatedBy: null,
        createdBy: null,
        status: "ACTIVE"
    },
    metaDescription: "undefined",
    type: "1",
    descriptionUK: "\"<p>1</p>\"",
    descriptionUS: "\"<p>2</p>\"",
    descriptionFR: "\"<p>d</p>\"",
    descriptionDE: "\"<p>34</p>\"",
    media: [
        {
            fieldname: "files",
            originalname: "1111.jpg",
            encoding: "7bit",
            mimetype: "image/jpeg",
            path: "https://res.cloudinary.com/dungpt123/image/upload/v1709465578/anujybqa1h400s2drnga.jpg",
            size: 589169,
            filename: "anujybqa1h400s2drnga"
        }
    ],
    variants: [
        {
            id: 1,
            nameOption_1: "1212",
            nameVariant_1: "1212",
            sku: "3",
            price: "3"
        }
    ],
    currency: "EUR",
    status: "private",
    price: 1,
    priceSale: 1,
    isDeleted: "No",
    createdAt: "2024-03-03 18:33:00",
    updatedAt: null,
    updatedBy: null,
    createdBy: null,
    id: "65e45fec026615cb3e5fe695"
},
{
    _id: "65e45fec026615cb3e5fe695",
    handleUrl: "undefined",
    titleUS: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleUK: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleFR: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    titleDE: "Unisex Eco-friendly T-shirt Next Level 4600 (Made in US)",
    categoryProductId: {
        _id: "65e42ef184c95b6a0610a962",
        languageId: null,
        titleUK: "Long Sleve",
        titleUS: "Long Sleve",
        titleDE: "Long Sleve",
        titleFR: "Long Sleve",
        descriptionUK: "Long Sleve Collection",
        descriptionUS: "Long Sleve Collection",
        descriptionDE: "Long Sleve Collection",
        descriptionFR: "Long Sleve Collection",
        bannerImg: "https://res.cloudinary.com/dungpt123/image/upload/v1709453040/wnhxriag17jpehhwfaem.png",
        parentCategory: "undefined",
        isDeleted: "No",
        createdAt: "2024-03-03 09:04:01",
        updatedAt: null,
        updatedBy: null,
        createdBy: null,
        status: "ACTIVE"
    },
    metaDescription: "undefined",
    type: "1",
    descriptionUK: "\"<p>1</p>\"",
    descriptionUS: "\"<p>2</p>\"",
    descriptionFR: "\"<p>d</p>\"",
    descriptionDE: "\"<p>34</p>\"",
    media: [
        {
            fieldname: "files",
            originalname: "1111.jpg",
            encoding: "7bit",
            mimetype: "image/jpeg",
            path: "https://res.cloudinary.com/dungpt123/image/upload/v1709465578/anujybqa1h400s2drnga.jpg",
            size: 589169,
            filename: "anujybqa1h400s2drnga"
        }
    ],
    variants: [
        {
            id: 1,
            nameOption_1: "1212",
            nameVariant_1: "1212",
            sku: "3",
            price: "3"
        }
    ],
    currency: "EUR",
    status: "private",
    price: 1,
    priceSale: 1,
    isDeleted: "No",
    createdAt: "2024-03-03 18:33:00",
    updatedAt: null,
    updatedBy: null,
    createdBy: null,
    id: "65e45fec026615cb3e5fe695"
},
      ],
    };
  },
  methods:{
    toProductDetail(item) {
      let id = 1
      this.$router.push(`/product/${id}`);
    },
  }
}
</script>

<style scoped lang="scss">
.product-list {
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 0px;
  row-gap:32px;
  .product-card {
    width: 20vw;
    position: relative;
    display:flex;
    img {
      border-radius: 4px;
      height: 10vw;
      width: 10vw;
      @media screen and (max-width:992px){
        min-height:104px;
        min-width:102px;
      }
    }
    @media screen and (max-width:992px){
      width: 100%;
    }
  }
  @media screen and (max-width:992px){
    grid-template-columns: auto;
  }
}
.custom-padding-search{
  padding: 80px 15vw;
  @media screen and (max-width:992px){
    padding: 24px 5vw;
  }
}
.button-see-more{
  background-color: #F9FAFB;
  box-shadow: none !important;
  height: 42px;
}
</style>