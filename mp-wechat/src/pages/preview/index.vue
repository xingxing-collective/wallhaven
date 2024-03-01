<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import Header from '@/components/header/index.vue'
import { ref } from 'vue';
import type { WallHavenData } from '~/types';
import { getByImageId } from '@/composables/wallhaven';

const wallhaven = ref<WallHavenData>();
const showcase = ref(true);

const useNavigateBack=()=>{
    uni.navigateBack()
}
onLoad(async (query) => {
    const { id } = query!;
    const { data } = await getByImageId(id);
    wallhaven.value = data.data as WallHavenData;
})
</script>
<template>
    <div class="container">
        <Header>
            <div class="listing-header">
                <div @click="useNavigateBack"><img src="/static/images/back.png" class="extended"></div>
                <div>Preview</div>
            </div>
        </Header>
        <div class="content">
            <div class="scrollbox">
                <image class="wallpaper" :src="wallhaven?.path" mode="aspectFit" />
            </div>
            <div class="sidebar-toggle">
                <div :class="['toggle', !showcase ? 'toggle-move' : '']" @click="showcase = !showcase">
                    <img src="/static/images/back.png" :class="['extended', !showcase ? 'unextended' : '']">
                </div>
            </div>
            <div class="showcase-sidebar" v-if="showcase">
                <div class="background"></div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.container {
    $text-color: white;
    color: $text-color;
    height: 100vh;
    background-color: #1b1b1b;

    .content {
        display: flex;
        flex-direction: column;
        height: 89.5%;

        .scrollbox {
            display: flex;
            height: 100%;

            .wallpaper {
                max-width: 95%;
                max-height: 95%;
                display: block;
                margin: auto;
            }
        }

        .sidebar-toggle {
            width: 100%;
            display: flex;
            justify-content: center;

            .toggle {
                width: 3rem;
                height: 2.5rem;
                border: 1px solid;
                border-color: #292929;
                border-bottom: none;
                background-color: inherit;
                border-radius: 100% 100% 0 0;
                display: flex;
                justify-content: center;
                align-items: center;

                .extended {
                    width: 1rem;
                    height: 1rem;
                }

                .unextended {
                    transform: rotate(180deg);
                }
            }

            .toggle-move {
                position: absolute;
                bottom: env(safe-area-inset-bottom);
            }
        }

        .showcase-sidebar {
            height: 120vh;
            background-color: #1b1b1b;
            border-color: #292929;
            box-shadow: 0 0 7px rgba(0, 0, 0, .5);
        }
    }
}

.listing-header {
    height: 2.5rem;
    line-height: 2.5rem;
    padding-left: 1rem;
    padding-right: 40%;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
    background-image: radial-gradient(400px 80px at 0px top, rgba(183, 96, 240, .3), transparent);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .extended {
        width: 1.25rem;
        height: 1.25rem;
        transform: rotate(90deg);
    }

}
</style>