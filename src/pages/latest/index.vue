<script setup lang="ts">
import { useTabBar } from "@/composables/useTabBar";
import { useLatest } from "@/composables/wallhaven";
import { ref, watch } from "vue";
import Thumbs from "@/components/thumbs/index.vue";
import type { WallHavenThumb } from "@/types";
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
    <div h-full c-white font-mono>
        <Header>
            <template>
                <div class="listing-header" h-2_dl_5rem line-height-2_dl_5rem pl-2rem font-size-48 font-600>{{ 'Latest'
                    }}</div>
            </template>
        </Header>
        <scroll-view enable-flex scroll-y flex="~ col" overflow-y-auto max-h-76vh position-relative
            @scrolltolower="page++;">
            <Thumbs :data="topList" />
        </scroll-view>
    </div>
</template>
<style scoped>
.listing-header {
    background-image: radial-gradient(400px 80px at 0px top, rgba(170, 221, 51, .3), transparent);
}
</style>