import { ofetch } from '@/composables/ofetch'
import type { WallHavenResponse } from '~/types'

const apiURL = import.meta.env.VITE_WALLHAVEN_API;

export const useLatest = () => {
    return ofetch<WallHavenResponse>(`${apiURL}/search`);
}