<script setup lang="ts">
import type { WallHavenThumb } from '~/types'
defineProps<{
    data: WallHavenThumb[]
}>()

</script>
<template>
    <div class="thumbs">
        <section class="thumb-listing-page">
            <div class="thumb" v-for="item in data" :key="item.id" >
                <navigator :url="`/pages/preview/index?id=${item.id}`">
                    <img class="thumb-img" :src="item.preview">
                    <div class="thumb-info">
                        <div class="wall-favs">
                            <div>{{ item.favorites }}</div>
                            <img class="favs-img" src="/static/images/star.png">
                        </div>

                        <div class="wall-res">{{ item.dimension }}</div>
                        <div class="png">{{ item.file_type }}</div>
                    </div>
                </navigator>
            </div>
        </section>
    </div>
</template>
<style scoped lang="scss">
.thumbs {
    font-family: Arial, Helvetica, sans-serif;

    .thumb-listing-page {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;

        .thumb {
            width: 10rem;
            height: 7.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;

            &:nth-child(odd) {
                padding-right: 0.25rem;
            }

            &:nth-child(even) {
                padding-left: 0.25rem;
            }

            .thumb-img {
                width: 10rem;
                height: 7.5rem;
                object-fit: fill;
                border-radius: 0.5rem;
            }

            .thumb-info {
                font-size: 0.75rem;
                font-style: italic;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                gap: 0.5rem;
                height: 1.25rem;
                width: 100%;
                position: absolute;
                bottom: 0;
                background-color: rgba(0, 0, 0, .165);
                background-image: linear-gradient(to bottom, rgba(0, 0, 0, .03) 0, rgba(0, 0, 0, .3) 100%);

                .wall-favs {
                    display: flex;
                    gap: 0.25rem;

                    .favs-img {
                        width: 0.75rem;
                        height: 0.75rem;
                    }
                }

                .png {

                    background: #db7c0f;
                    padding: 1px 2px;
                    border-radius: 2px;
                }
            }
        }
    }
}
</style>