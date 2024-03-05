<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import Header from '@/components/header/index.vue'
import { ref } from 'vue';
import type { WallHavenData } from '~/types';
import { getByImageId } from '@/composables/wallhaven';

const wallhaven = ref<WallHavenData>();
const showcase = ref(true);
const showTags = ref(false);
const showProperties = ref(false);

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
    wallhaven.value = data.data as WallHavenData;
})
</script>

<template>
    <div c-white h-100vh bg="~ #1b1b1b">
        <Header>
            <div class="listing-header" flex="~ items-center" justify-between h-2_dl_5rem line-height-2_dl_5rem pl-1rem
                pr-10rem text-center font-size-48 font-600>
                <div @click="useNavigateBack" i-ic-round-keyboard-arrow-left w-2rem h-2rem c-gray_cl_9_sl_100 />
                <div>Preview</div>
            </div>
        </Header>
        <div class="content" flex="~ col" h-89_dl_5vh>
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
            <scroll-view scroll-y class="background" max-h-120vh h-120vh overflow-y-auto flex="~ col items-center"
                bg="~ #1b1b1b" border="~ #292929" p-1_dl_5rem v-if="showcase">
                <div font-size-80 font-600 text-center pr-2rem>
                    {{ wallhaven?.resolution }}
                </div>
                <div c-_wn_0cd font-size-40 transition-duration-250 text-center pr-2rem>
                    Search for similar...
                </div>
                <div font-size-32 font-italic text-center pr-2rem>
                    source not provided
                </div>
                <div flex p-1rem w-80vw>
                    <div inline-block w-20% h-1_dl_25rem :style="{ backgroundColor: item }"
                        v-for="item in wallhaven?.colors" :key="item" />
                </div>
                <div flex="~ col" border-t="~ 2 dotted #333" w-80vw p-1rem>
                    <div flex="~ gap-0.5 items-center" @click="showTags = !showTags">
                        <div i-ic-sharp-arrow-right v-if="!showTags" w-2rem h-2rem />
                        <div v-else i-ic-twotone-arrow-drop-down w-2rem h-2rem />
                        <div uppercase c-_wn_8cc font-900>Tags</div>
                    </div>
                    <div pt-1rem v-if="showTags">
                        <div class="tag" inline-block c-_wn_94db94 p-0_dl_3rem bg-_wn_293033 mr-4px mb-4px
                            rounded-_lfl_8px_0_lfr_ v-for="item in wallhaven?.tags" :key="item.id">{{ item.name }}</div>
                        <div class="small-button" flex="~ items-center gap-0.25rem" justify-center c-_wn_ddd
                            bg-_wn_204650 rounded-0_dl_25rem w-9rem m-auto mt-0_dl_5rem>
                            <div w-2rem h-2rem i-ic-baseline-search />
                            <div> More like this</div>
                        </div>
                    </div>
                </div>
                <div flex="~ col" border-t="~ 2 dotted #333" w-80vw p-1rem>
                    <div flex="~ gap-0.5 items-center" @click="showProperties = !showProperties">
                        <div i-ic-sharp-arrow-right v-if="!showProperties" w-2rem h-2rem />
                        <div v-else i-ic-twotone-arrow-drop-down w-2rem h-2rem />
                        <div uppercase c-_wn_8cc font-900>Properties</div>
                    </div>
                    <div flex="~ col items-center" gap-0_dl_5rem pt-1rem justify-center v-if="showProperties">
                        <div flex="~ items-center " w-full gap-1rem>
                            <div text-right c-_wn_85aaaf w-30%>Uploader</div>
                            <div flex="~ gap-0.5rem">
                                <img w-3rem h-3rem :src="wallhaven?.uploader?.avatar['32px']">
                                <div flex="~ col" justify-between>
                                    <div c-_wn_08A6F6>{{ wallhaven?.uploader?.username }}</div>
                                    <div>
                                        {{ new Date(wallhaven!.created_at.replaceAll('-', '/')).toLocaleDateString() }}
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
                            <div class="size">{{ (wallhaven!.file_size / 1024 / 1024).toFixed(2) }}MiB-{{
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
            </scroll-view>
        </div>
    </div>
</template>

<style scoped>
.toggle-move {
    position: absolute;
    bottom: env(safe-area-inset-bottom);
}

.tag {
    box-shadow: 1px 1px 3px rgba(0, 0, 0, .7);
    text-shadow: 1px 1px 1px rgba(0, 0, 0, .3);
}

.small-button {
    background-image: linear-gradient(to bottom, #275660 0, #183640 100%);
}

.background {
    box-shadow: 0 0 7px rgba(0, 0, 0, .5);

}

.link {
    box-shadow: inset 0 0 .75em rgba(255, 255, 255, .02), 0 2px 0 #1c1c1c, 0 3px 4px -3px #000, 0 1px 2px rgba(0, 0, 0, .2);
}

.listing-header {
    background-image: radial-gradient(400px 80px at 0px top, rgba(183, 96, 240, .3), transparent);
}
</style>