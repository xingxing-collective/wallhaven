<script setup lang="ts">
import { useTabBar } from "@/composables/useTabBar";
import { useTopList } from "@/composables/wallhaven";
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
import Thumbs from "@/components/thumbs.vue";
import type { WallHavenData } from "~/types";

const topList = ref<any>([]);

useTabBar(0);

onShow(async () => {
    const data = await useTopList()
    topList.value = data.map(x => x.data.data as WallHavenData)
})
</script>
<template>
    <div class="container">
        <div class="header">
            <div class="listing-header">{{ 'Toplist' }}</div>
        </div>
        <div class="content">
            <Thumbs :data="topList"  />
        </div>
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
        max-height: 77vh;
        position: relative;

       
    }
}
</style>