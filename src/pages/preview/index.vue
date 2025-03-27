<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import Header from '@/components/header/index.vue'
import PreviewBackground from '@/components/PreviewBackground/index.vue'
import Tags from '@/components/PreviewBackgroundTags/index.vue'
import Properties from '@/components/PreviewBackgroundProperties/index.vue'
import { ref } from 'vue';
import type { WallHavenData } from '@/types';
import { getByImageId } from '@/composables/wallhaven';

const wallhaven = ref<WallHavenData>();
const showcase = ref(true);

const previewImage = (url: string) => {
    uni.previewImage({
        current: 0,
        urls: Array(url)
    })
}

const useNavigateBack = () => {
    uni.navigateBack()
}
onLoad(async (query) => {
    const { id } = query!;
    const { data } = await getByImageId(id);
    wallhaven.value = data as WallHavenData;
})
</script>

<template>
    <div c-white h-100vh bg="~ #1b1b1b" >
        <Header>
            <div class="listing-header" flex="~ items-center" justify-between h-2_dl_5rem line-height-2_dl_5rem pl-1rem
                pr-10rem text-center font-size-48 font-600>
                <div @click="useNavigateBack" i-ic-round-keyboard-arrow-left w-2rem h-2rem c-gray_cl_9_sl_100 />
                <div>Preview</div>
            </div>
        </Header>
        <div flex="~ col" h-70vh>
            <div flex h-full>
                <image max-w-95vw block max-h-95vh m-auto pb-safe :src="wallhaven?.path" mode="aspectFit"
                    @click="previewImage(wallhaven!.path)" />
            </div>
            <div w-full flex justify-center>
                <div w-3rem h-2_dl_5rem border="~ 2 solid #292929 rounded-[100%_100%_0_0]" border-b-none bg-inherit
                    flex="~ items-center" justify-center :class="[!showcase ? 'toggle-move' : '']"
                    @click="showcase = !showcase">
                    <div v-if="showcase" i-ic-round-keyboard-arrow-down w-2rem h-2rem c-gray_cl_9_sl_100 />
                    <div v-else i-ic-round-keyboard-arrow-up w-2rem h-2rem c-gray_cl_9_sl_100 />
                </div>
            </div>
            <PreviewBackground :wallhaven="wallhaven!" :showcase="showcase">
                <template slot="tags">
                    <Tags :wallhaven="wallhaven!" />
                </template>
                <template slot="properties">
                    <Properties :wallhaven="wallhaven!" />
                </template>
            </PreviewBackground>
        </div>
    </div>
</template>

<style scoped>
.toggle-move {
    position: absolute;
    bottom: env(safe-area-inset-bottom);
}

.listing-header {
    background-image: radial-gradient(400px 80px at 0px top, rgba(183, 96, 240, .3), transparent);
}
</style>