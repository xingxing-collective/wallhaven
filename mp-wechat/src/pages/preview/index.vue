<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import Header from '@/components/header/index.vue'
import { ref } from 'vue';
import type { WallHavenData } from '~/types';
import { getByImageId } from '@/composables/wallhaven';

const wallhaven = ref<WallHavenData>();

onLoad(async (query) => {
    const { id } = query!;
    const { data } = await getByImageId(id);
    wallhaven.value=data.data as WallHavenData;
})
</script>
<template>
    <div class="container">
        <Header>
            <div class="listing-header">Preview</div>
        </Header>
        <div class="content"></div>
    </div>
</template>
<style scoped lang="scss">
.container {
    $text-color: white;
    color: $text-color;
}

.listing-header {
    height: 2.5rem;
    line-height: 2.5rem;
    padding-right: 3rem;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
    background-image: radial-gradient(400px 80px at 0px top, rgba(183, 96, 240, .3), transparent);
}
</style>