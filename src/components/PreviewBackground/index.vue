<script setup lang="ts">
import type { WallHavenData } from '@/types';
defineProps<{ wallhaven: WallHavenData, showcase: boolean }>()


</script>

<template>
    <scroll-view enable-flex scroll-y class="background" max-h-50vh h-50vh  overflow-y-auto flex="~ col items-center"
        bg="~ #1b1b1b" border="~ #292929" pt-1rem v-if="showcase">
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
            <div inline-block w-20% h-1_dl_25rem :style="{ backgroundColor: item }" v-for="item in wallhaven?.colors"
                :key="item" />
        </div>
        <slot name="tags"></slot>
        <slot name="properties"></slot>
    </scroll-view>
</template>

<style scoped>
.background {
    box-shadow: 0 0 7px rgba(0, 0, 0, .5);
}
</style>