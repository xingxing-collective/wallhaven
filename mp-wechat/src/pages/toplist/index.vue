<script setup lang="ts">
import { useTabBar } from "@/composables/useTabBar";
import { useTopList, useGetByImageId } from "@/composables/wallhaven";
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
import type { WallHavenData } from "~/types";

const topList = ref<WallHavenData[]>([]);

useTabBar(0);

onShow(async () => {
    const data = await useTopList()
    topList.value = data.map(x => x.data.data as WallHavenData)
})
</script>
<template>
    <div class="container">
        <div class="header"></div>
        <div class="content">
            <div class="thumbs">
                <section class="thumb-listing-page">
                    <div class="thumb" v-for="item in topList" :key="item.id">
                        <img class="thumb-img" :src="item.thumbs.small">
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.container {
    .header {
        width: 100%;
        height: 5.5rem;
    }

    .content {
        display: flex;
        flex-direction: column;
        overflow: auto;
        max-height: 77vh;
        position: relative;

        .thumbs {
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
                        border-radius: 1.5rem;
                    }
                }
            }
        }
    }
}
</style>