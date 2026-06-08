<template>
    <div class="book-list">
        <div class="card" v-for="book in books" :key="book.id">
            <div class="card-cover">
                <img :src=book.cover :alt="book.name" />
            </div>
            <div class="card-info">
                <h3 class="card-title">{{ book.name }}</h3>
                <p class="card-author">{{ book.author }}</p>
                <!-- <p class="card-intro">{{ book.introduction }}</p> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { bookList12 } from '@/assets/linshi/data/data'

interface Book {
    id: number
    name: string
    author: string
    introduction: string
    cover?: string
}

const books: Book[] = bookList12


</script>

<style scoped>
.book-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 9vw);
    gap: 24px;
    /* padding: 24px; */
    /* background: red; */
}

.card {
    height: fit-content;
    /* background: #618b1b; */
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    /* transition: transform 0.3s, box-shadow 0.3s; */
    cursor: pointer;
    display: flex;
    flex-direction: column;

    font-family: "ZiHun144Hao-LangYuanTi-2";
}

.card:hover {
    /* transform: translateY(-4px); */
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.card-cover {
    width: 100%;
    aspect-ratio: 3 / 3.6;
    overflow: hidden;
    background: #f5f5f5;
}

.card-cover img {
    width: 100%;
    height: 100%;
    /* object-fit: cover; */
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;
    transition: transform 0.3s;
}

.card:hover .card-cover img {
    transform: scale(1.05);
}

.card-info {
    padding: 4px;
  background-color: rgb(160, 160, 160);
    /* background: #097f94; */
}

.card-title {
    margin: 0 0 6px;
    font-size: 16px;
    font-weight: 600;
  color: #fff;
    line-height: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.card-author {
    /* margin: 0 0 8px; */
    font-size: 13px;
    color: #000000;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.card-intro {
    margin: 0;
    font-size: 13px;
    line-height: 1.6;
    color: #555;

}
</style>
