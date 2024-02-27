import { ofetch } from '@/composables/ofetch'

const apiURL = import.meta.env.VITE_WALLHAVEN_API;

export type WallHaven = Record<string, any>;
export type WallHavenResponse = {
    data: Array<WallHaven>,
    meta: Record<string, any>
}

export const useLatest = () => {
    return ofetch<WallHavenResponse>(`${apiURL}/search`);
}