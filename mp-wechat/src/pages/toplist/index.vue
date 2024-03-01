<script setup lang="ts">
import { useTabBar } from "@/composables/useTabBar";
import { useTopList } from "@/composables/wallhaven";
import { ref } from "vue";
import Thumbs from "@/components/thumbs/index.vue";
import type { WallHavenThumb } from "~/types";
import { watch } from "vue";
import Header from "@/components/header/index.vue";

const topList = ref<Array<WallHavenThumb>>([]);
const page = ref(1);

useTabBar(0);

watch(page, async () => {
    const data = await useTopList(page.value)

    /* const data = Array(24).fill(null).map<WallHavenThumb>((_, i) => ({
        id: '856dlk',
        favorites: '542',
        file_type: 'PNG',
        preview: 'https://th.wallhaven.cc/small/85/856dlk.jpg',
        dimension: '2427 x 1404'
    })); */
    topList.value.push(...data)
}, {
    immediate: true
})

</script>
<template>
    <div class="container">
        <Header>
            <template>
                <div class="listing-header">{{ 'Toplist' }}</div>
            </template>
        </Header>
        <scroll-view scroll-y class="content" @scrolltolower="page++;">
            <Thumbs :data="topList" />
        </scroll-view>
    </div>
</template>
<style scoped lang="scss">
.container {
    color: white;
    font-family: 'Courier New', Courier, monospace;

    .content {
        display: flex;
        flex-direction: column;
        overflow: auto;
        max-height: 76vh;
        position: relative;

    }
}

.listing-header {
    height: 2.5rem;
    line-height: 2.5rem;
    padding-left: 2rem;
    font-size: 1.5rem;
    font-weight: 600;
    background-image: radial-gradient(400px 80px at 0px top, rgba(183, 96, 240, .3), transparent);
}
</style>