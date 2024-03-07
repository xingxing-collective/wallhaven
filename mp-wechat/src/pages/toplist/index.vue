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
    topList.value.push(...data)
}, {
    immediate: true
})

</script>
<template>
    <div h-full c-white font-mono >
        <Header>
            <template>
                <div class="listing-header"  h-2_dl_5rem line-height-2_dl_5rem pl-1rem font-size-48 font-600 flex="~ items-center gap-2">
                    <div i-material-symbols-light-list-alt-add-outline-rounded w-2rem h-2rem></div>
                    <div i-material-symbols-light-list-alt-add-rounded w-2rem h-2rem></div>
                    <div>Toplist</div>
                </div>
            </template>
        </Header>
        <scroll-view enable-flex scroll-y flex="~ col items-center" overflow-y-auto max-h-76vh position-relative   @scrolltolower="page++;" >
            <Thumbs :data="topList" />
        </scroll-view>
    </div>
</template>
<style scoped>
.listing-header {
    background-image: radial-gradient(400px 80px at 0px top, rgba(183, 96, 240, .3), transparent);
}
</style>