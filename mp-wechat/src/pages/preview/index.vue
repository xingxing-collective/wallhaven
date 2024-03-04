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
    <div class="container">
        <Header>
            <div class="listing-header">
                <div @click="useNavigateBack"><img src="/static/images/back.png" class="extended"></div>
                <div>Preview</div>
            </div>
        </Header>
        <div class="content">
            <div class="scrollbox">
                <image class="wallpaper" :src="wallhaven?.path" mode="aspectFit"
                    @click="previewImage(wallhaven!.path)" />
            </div>
            <div class="toggle">
                <div :class="['toggle', !showcase ? 'toggle-move' : '']" @click="showcase = !showcase">
                    <img src="/static/images/back.png" :class="['extended', !showcase ? 'unextended' : '']">
                </div>
            </div>
            <div class="background" v-if="showcase">
                <div class="resolution">
                    {{ wallhaven?.resolution }}
                </div>
                <div class="overlay-anchor">
                    Search for similar...
                </div>
                <div class="source">
                    source not provided
                </div>
                <div class="color-palette">
                    <div class="color" :style="{ backgroundColor: item }" v-for="item in wallhaven?.colors"
                        :key="item" />
                </div>
                <div class="section">
                    <div class="collapsed " @click="showTags = !showTags">
                        <img :class="['icon', showTags ? 'toggle' : '']" src="/static/images/collapsed.png">
                        <div class="title">Tags</div>
                    </div>
                    <div class="tags" v-if="showTags">
                        <div class="tag" v-for="item in wallhaven?.tags" :key="item.id">{{ item.name }}</div>
                        <div class="small-button">
                            <img class="icon" src="/static/images/search.png">
                            <div> More like this</div>
                        </div>
                    </div>
                </div>
                <div class="section">
                    <div class="collapsed" @click="showProperties = !showProperties">
                        <img :class="['icon', showProperties ? 'toggle' : '']" src="/static/images/collapsed.png">
                        <div class="title">Properties</div>
                    </div>
                    <div class="extended" v-if="showProperties">
                        <div class="item">
                            <div class="label">Uploader</div>
                            <div class="uploader">
                                <img class="avatar" :src="wallhaven?.uploader?.avatar['32px']">
                                <div class="user">
                                    <div class="username">{{ wallhaven?.uploader?.username }}</div>
                                    <div class="time">{{ new Date(wallhaven!.created_at.replaceAll('-','/')).toLocaleDateString() }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="label">Category</div>
                            <div class="category">{{ wallhaven?.category }}</div>
                        </div>
                        <div class="item">
                            <div class="label">Purity</div>
                            <div class="purity">{{ wallhaven?.purity }}</div>
                        </div>
                        <div class="item">
                            <div class="label">Size</div>
                            <div class="size">{{ (wallhaven!.file_size / 1024 / 1024).toFixed(2) }}MiB-{{
                    wallhaven?.file_type.split('/').at(-1)?.toUpperCase() }}</div>
                        </div>
                        <div class="item">
                            <div class="label">Views</div>
                            <div>{{ wallhaven?.views }}</div>
                        </div>
                        <div class="item">
                            <div class="label">Favorites</div>
                            <div class="favorites">{{ wallhaven?.favorites }}</div>
                        </div>
                        <div class="item link">
                            <div class="label">Link</div>
                            <div class="url">{{ wallhaven?.short_url }}</div>
                        </div>
                    </div>
                </div>
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
                padding-bottom: env(safe-area-inset-bottom);
            }
        }

        .toggle {
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

        .background {
            max-height: 120vh;
            height: 120vh;
            overflow: auto;
            display: flex;
            flex-direction: column;
            background-color: #1b1b1b;
            border-color: #292929;
            box-shadow: 0 0 7px rgba(0, 0, 0, .5);
            align-items: center;
            padding: 2rem;

            .resolution {
                font-size: 2.5rem;
                font-weight: 600;
            }

            .overlay-anchor {
                color: #0cd;
                cursor: pointer;
                font-size: 1.25rem;
                transition-duration: .25s;
                transition-property: color, background, opacity, text-shadow, box-shadow, border-color;
                -webkit-backface-visibility: hidden;
            }

            .source {
                font-style: italic;
                font-size: 1rem;
            }

            .color-palette {
                display: flex;
                margin: 1.5rem auto 0.8rem;
                width: 100%;

                .color {
                    display: inline-block;
                    width: 20%;
                    height: 1.25rem;
                }
            }

            .section {
                display: flex;
                flex-direction: column;
                border-top: 1px dotted #333;
                width: 100%;
                padding: 1rem;

                .collapsed {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    cursor: pointer;

                    .icon {
                        width: 1.25rem;
                        height: 1.25rem;
                    }

                    .toggle {
                        transform: rotate(90deg);
                    }

                    .title {
                        text-transform: uppercase;
                        color: #8cc;
                        font-weight: 900;
                    }
                }

                .tags {
                    padding-top: 1rem;

                    .tag {
                        display: inline-block;
                        color: #94db94;
                        padding: 1rem;
                        background-color: #293033;
                        padding: 0.3rem;
                        margin: 0 4px 4px 0;
                        box-shadow: 1px 1px 3px rgba(0, 0, 0, .7);
                        text-shadow: 1px 1px 1px rgba(0, 0, 0, .3);
                        border-radius: 8px 0;
                    }

                    .small-button {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.25rem;
                        color: #ddd;
                        background-color: #204650;
                        background-image: linear-gradient(to bottom, #275660 0, #183640 100%);
                        border-radius: 0.25rem;
                        width: 9rem;
                        margin: auto;
                        margin-top: 0.5rem;

                        .icon {
                            width: 1.25rem;
                            height: 1.25rem;
                        }
                    }
                }

                .extended {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;

                    .item {
                        display: flex;
                        align-items: center;
                        gap: 1.5rem;
                        width: 100%;

                        .label {
                            color: #85aaaf;
                            width: 30%;
                            text-align: right;
                        }

                        .uploader {
                            display: flex;
                            gap: 0.5rem;

                            .avatar {
                                width: 3rem;
                                height: 3rem;
                            }

                            .user {
                                display: flex;
                                flex-direction: column;
                                justify-content: space-between;

                                .username {
                                    color: #08A6F6;
                                }

                            }
                        }

                        .category {
                            text-transform: capitalize;
                        }

                        .purity {
                            color: #9f9;
                        }

                        .favorites {
                            color: #0cd;
                        }

                        .url{
                            background-color: #2c2c2c;
                            width: 70%;
                            padding-top: 0.5rem;
                            padding-bottom: 0.5rem;
                            text-align: center;
                        }
                    }
                    .link{
                        background-color: #212121;
                        box-shadow: inset 0 0 .75em rgba(255,255,255,.02),0 2px 0 #1c1c1c,0 3px 4px -3px #000,0 1px 2px rgba(0,0,0,.2);
                    }
                }
            }

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