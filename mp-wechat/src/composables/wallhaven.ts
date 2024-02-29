import { ofetch } from '@/composables/ofetch'
import type { WallHavenPreview, WallHavenResponse } from '~/types'

const baseURL = import.meta.env.VITE_WALLHAVEN_URL;
const apiURL = import.meta.env.VITE_WALLHAVEN_API_URL;

const WALLHAVENREGEXP = {
    thumb: /<figure[^>]*>(.*?)<\/figure>/g,
    id: /data-wallpaper-id="([^"]+)"/g,
    dimension: /<span class="wall-res">(.*?)<\/span>/g,
    file_type: /<span class="png"><span>(.*?)<\/span><\/span>/g,
    preview: /data-src="([^"]+)"/g,
    favorites: /<a class="jsAnchor overlay-anchor wall-favs" [^>]*>(.*?)<i class="fa fa-fw fa-star"><\/i><\/a>/g
}

const crawler = async (url: string, regexp: Record<string, RegExp>) => {
    const { data } = await ofetch<string>(url);
    const thumbs = [...data.matchAll(WALLHAVENREGEXP.thumb)].map(x => x[0]);
    return thumbs.map<WallHavenPreview>(x => ({
        id: [...x.matchAll(regexp.id)].map(x => x.at(-1)).at(0)!,
        dimension: [...x.matchAll(regexp.dimension)].map(x => x.at(-1)).at(0)!,
        file_type: [...x.matchAll(regexp.file_type)].map(x => x.at(-1)).at(0)!,
        preview: [...x.matchAll(regexp.preview)].map(x => x.at(-1)).at(0)!,
        favorites: [...x.matchAll(regexp.favorites)].map(x => x.at(-1)).at(0)!,
    }))

}

export const useTopList = (page: number = 1) => {
    return crawler(`${baseURL}/toplist?page=${page}`, WALLHAVENREGEXP)
}

export const useLatest = async (page: number = 1) => {
    return crawler(`${baseURL}/latest?page=${page}`, WALLHAVENREGEXP)
}

export const getByImageId = async (id: string) => {
    return ofetch<WallHavenResponse>(`${apiURL}/w/${id}`);
}