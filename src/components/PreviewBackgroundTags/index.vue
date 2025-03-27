<script setup lang="ts">
import { ref } from 'vue';
import type { WallHavenData } from '@/types';

defineProps<{ wallhaven: WallHavenData }>()

const showTags = ref(false);
</script>

<template>
    <div flex="~ col" border-t="~ 2 dotted #333" w-80vw p-1rem>
        <div flex="~ gap-0.5 items-center" @click="showTags = !showTags">
            <div i-ic-sharp-arrow-right v-if="!showTags" w-2rem h-2rem />
            <div v-else i-ic-twotone-arrow-drop-down w-2rem h-2rem />
            <div uppercase c-_wn_8cc font-900>Tags</div>
        </div>
        <div pt-1rem v-if="showTags">
            <div class="tag" inline-block c-_wn_94db94 p-0_dl_3rem bg-_wn_293033 mr-4px mb-4px rounded-_lfl_8px_0_lfr_
                v-for="item in wallhaven?.tags" :key="item.id">{{ item.name }}</div>
            <div class="small-button" flex="~ items-center gap-0.25rem" justify-center c-_wn_ddd bg-_wn_204650
                rounded-0_dl_25rem w-9rem m-auto mt-0_dl_5rem>
                <div w-2rem h-2rem i-ic-baseline-search />
                <div> More like this</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tag {
    box-shadow: 1px 1px 3px rgba(0, 0, 0, .7);
    text-shadow: 1px 1px 1px rgba(0, 0, 0, .3);
}

.small-button {
    background-image: linear-gradient(to bottom, #275660 0, #183640 100%);
}
</style>