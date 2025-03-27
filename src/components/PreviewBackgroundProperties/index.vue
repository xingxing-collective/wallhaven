<script setup lang="ts">
import { ref } from 'vue';
import type { WallHavenData } from '@/types';

defineProps<{ wallhaven: WallHavenData }>()

const showProperties = ref(false);
</script>

<template>
    <div flex="~ col" border-t="~ 2 dotted #333" w-80vw p-1rem p-safe>
        <div flex="~ gap-1 items-center" @click="showProperties = !showProperties">
            <div i-ic-sharp-arrow-right v-if="!showProperties" w-2rem h-2rem />
            <div v-else i-ic-twotone-arrow-drop-down w-2rem h-2rem />
            <div uppercase c-_wn_8cc font-900>Properties</div>
        </div>
        <div flex="~ col items-center gap-1" pt-1rem justify-center v-if="showProperties">
            <div flex="~ items-center " w-full gap-1rem>
                <div text-right c-_wn_85aaaf w-30%>Uploader</div>
                <div flex="~ gap-0.5rem">
                    <img w-3rem h-3rem :src="wallhaven?.uploader?.avatar['32px']">
                    <div flex="~ col" justify-between>
                        <div c-_wn_08A6F6>{{ wallhaven?.uploader?.username }}</div>
                        <div>
                            {{ new Date(wallhaven!.created_at.replace('-', '/')).toLocaleDateString() }}
                        </div>
                    </div>
                </div>
            </div>
            <div flex="~ items-center " w-full gap-1rem>
                <div text-right c-_wn_85aaaf w-30%>Category</div>
                <div capitalize>{{ wallhaven?.category }}</div>
            </div>
            <div flex="~ items-center " w-full gap-1rem>
                <div text-right c-_wn_85aaaf w-30%>Purity</div>
                <div c-_wn_9f9>{{ wallhaven?.purity }}</div>
            </div>
            <div flex="~ items-center " w-full gap-1rem>
                <div text-right c-_wn_85aaaf w-30%>Size</div>
                <div>{{ (wallhaven!.file_size / 1024 / 1024).toFixed(2) }}MiB-{{
            wallhaven?.file_type.split('/').at(-1)?.toUpperCase() }}</div>
            </div>
            <div flex="~ items-center " w-full gap-1rem>
                <div text-right c-_wn_85aaaf w-30%>Views</div>
                <div>{{ wallhaven?.views }}</div>
            </div>
            <div flex="~ items-center " w-full gap-1rem>
                <div text-right c-_wn_85aaaf w-30%>Favorites</div>
                <div c-_wn_0cd>{{ wallhaven?.favorites }}</div>
            </div>
            <div flex="~ items-center " w-full bg-_wn_212121 class="link" gap-1rem>
                <div text-right c-_wn_85aaaf w-30%>Link</div>
                <div bg-_wn_2c2c2c w-70% pt-0_dl_5rem pb-0_dl_5rem text-center>{{ wallhaven?.short_url }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.link {
    box-shadow: inset 0 0 .75em rgba(255, 255, 255, .02), 0 2px 0 #1c1c1c, 0 3px 4px -3px #000, 0 1px 2px rgba(0, 0, 0, .2);
}
</style>