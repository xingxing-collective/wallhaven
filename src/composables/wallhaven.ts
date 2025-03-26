import type { WallHavenThumb } from '~/types'

const baseURL = import.meta.env.VITE_WALLHAVEN_URL!;
const apiURL = import.meta.env.VITE_WALLHAVEN_API_URL!;

const WALLHAVENREGEXP = {
    thumb: /<figure[^>]*>(.*?)<\/figure>/g,
    id: /data-wallpaper-id="([^"]+)"/g,
    dimension: /<span class="wall-res">(.*?)<\/span>/g,
    file_type: /<span class="png"><span>(.*?)<\/span><\/span>/g,
    preview: /data-src="([^"]+)"/g,
    favorites: /<a class="jsAnchor overlay-anchor wall-favs" [^>]*>(.*?)<i class="fa fa-fw fa-star"><\/i><\/a>/g
}

const crawler = async (url: string, regexp: Record<string, RegExp>) => {
    const data = await uni.request({
        url
    });
    const thumbs = Array.from(data.data.toString().matchAll(WALLHAVENREGEXP.thumb)).map(x => x[0]);
    return thumbs.map<WallHavenThumb>(x => ({
        id: Array.from(x.matchAll(regexp.id)).map(x => x.at(-1)).at(0)!,
        dimension: Array.from(x.matchAll(regexp.dimension)).map(x => x.at(-1)).at(0)!,
        file_type: Array.from(x.matchAll(regexp.file_type)).map(x => x.at(-1)).at(0)!,
        preview: Array.from(x.matchAll(regexp.preview)).map(x => x.at(-1)).at(0)!,
        favorites: Array.from(x.matchAll(regexp.favorites)).map(x => x.at(-1)).at(0)!,
    }))

}

export const useTopList = (page: number = 1) => {
    return crawler(`${baseURL}/toplist?page=${page}`, WALLHAVENREGEXP)
}

export const useLatest = async (page: number = 1) => {
    return crawler(`${baseURL}/latest?page=${page}`, WALLHAVENREGEXP)
}

export const useHot = async (page: number = 1) => {
    return crawler(`${baseURL}/hot?page=${page}`, WALLHAVENREGEXP)
}

export const useRandom = async (page: number = 1) => {
    return crawler(`${baseURL}/random?page=${page}`, WALLHAVENREGEXP)
}

export const getByImageId = async (id: string) => {
    return uni.request({
        url: `${apiURL}/wallpaper/${id}`
    });
}
