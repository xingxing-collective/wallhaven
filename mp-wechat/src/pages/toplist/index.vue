<script setup lang="ts">
import { useTabBar } from "@/composables/useTabBar";
import { useTopList } from "@/composables/wallhaven";
import { ref } from "vue";
import Thumbs from "@/components/thumbs.vue";
import type { WallHavenPreview } from "~/types";
import { watch } from "vue";

const topList = ref<Array<WallHavenPreview>>([]);
const page = ref(1);

useTabBar(0);

watch(page, async () => {
    const data = await useTopList(page.value)
    topList.value.push(...data)
}, {
    immediate: true
})

</script>
<template>
    <div class="container">
        <div class="header">
            <div class="listing-header">{{ 'Toplist' }}</div>
        </div>
        <scroll-view scroll-y class="content" @scrolltolower="page++;">
            <Thumbs :data="topList" />
        </scroll-view>
    </div>
</template>
<style scoped lang="scss">
.container {
    color: white;
    font-family: 'Courier New', Courier, monospace;

    .header {
        width: 100%;
        height: 5.5rem;
        display: flex;
        flex-direction: column-reverse;
        padding-bottom: 0.5rem;

        .listing-header {
            height: 2.5rem;
            line-height: 2.5rem;
            padding-left: 2rem;
            font-size: 1.5rem;
            font-weight: 600;
            background-image: radial-gradient(400px 80px at 0px top, rgba(183, 96, 240, .3), transparent);
        }
    }

    .content {
        display: flex;
        flex-direction: column;
        overflow: auto;
        max-height: 76vh;
        position: relative;


    }
}
</style>