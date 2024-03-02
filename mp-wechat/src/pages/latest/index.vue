<script setup lang="ts">
import { useTabBar } from "@/composables/useTabBar";
import { useLatest } from "@/composables/wallhaven";
import { ref } from "vue";
import Thumbs from "@/components/thumbs/index.vue";
import type { WallHavenThumb } from "~/types";
import { watch } from "vue";
import Header from "@/components/header/index.vue";

const topList = ref<Array<WallHavenThumb>>([]);
const page = ref(1);

useTabBar(2);

watch(page, async () => {
    const data = await useLatest(page.value)
    topList.value.push(...data)
}, {
    immediate: true
})

</script>
<template>
    <div class="container">
        <Header>
            <template>
                <div class="listing-header">{{ 'Latest' }}</div>
            </template>
        </Header>
        <scroll-view scroll-y class="content" @scrolltolower="page++;">
            <Thumbs :data="topList" />
        </scroll-view>
    </div>
</template>
<style scoped lang="scss">
.container {
    height: 100vh;
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