import { ofetch } from '@/composables/ofetch'
import type { WallHavenResponse } from '~/types'

const baseURL = import.meta.env.VITE_WALLHAVEN_URL;
const apiURL = import.meta.env.VITE_WALLHAVEN_API_URL;

const crawler = async (url: string, regexp: RegExp) => {
    const { data } = await ofetch<string>(url);
    const thumbs = [...data.matchAll(regexp)].map((m) => m[1]);
    return Promise.all(thumbs.map((id) => useGetByImageId(id)))
}

export const useTopList = (page: number = 1) => {
    return crawler(`${baseURL}/toplist?page=${page}`, /data-wallpaper-id="([^"]+)"/g)
}

export const useLatest = async (page: number = 1) => {
    return crawler(`${baseURL}/latest?page=${page}`, /data-wallpaper-id="([^"]+)"/g)
}

export const useGetByImageId = async (id: string) => {
    return ofetch<WallHavenResponse>(`${apiURL}/w/${id}`);
}