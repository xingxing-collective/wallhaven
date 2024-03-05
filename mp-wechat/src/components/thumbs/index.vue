<script setup lang="ts">
import type { WallHavenThumb } from '~/types'
defineProps<{
    data: WallHavenThumb[]
}>()

</script>

<template>
    <div font-mono>
        <section flex="~ wrap" gap-1rem justify-center>
            <div class="thumb" w-10rem h-7_dl_5rem flex="~ items-center" justify-center position-relative
                v-for="item in data" :key="item.id">
                <navigator :url="`/pages/preview/index?id=${item.id}`">
                    <img w-10rem h-7_dl_5rem object-fill rounded-0_dl_5rem :src="item.preview">
                    <div bg="~ #0000002a" w-full position-absolute bottom-0 h-1_dl_25rem font-size-24 font="italic"
                        flex="~ items-center" justify-center gap-2>
                        <div flex gap-1>
                            <div>{{ item.favorites }}</div>
                            <img w-0_dl_75rem h-_dl_75rem src="/static/images/star.png">
                        </div>

                        <div>{{ item.dimension }}</div>
                        <div v-if="item.file_type" bg="~ #db7c0f" px-0_dl_25 py-0_dl_5 rounded-0_dl_5>{{ item.file_type
                            }}</div>
                    </div>
                </navigator>
            </div>
        </section>
    </div>
</template>

<style scoped>
.thumb:nth-child(odd) {
    padding-right: 0.25rem;
}

.thumb:nth-child(even) {
    padding-left: 0.25rem;
}

.thumb-info {
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, .03) 0, rgba(0, 0, 0, .3) 100%);
}
</style>