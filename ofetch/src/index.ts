import { createFetch } from './fetch';
export type * from './types'

const fetch = uni.request;

export const ofetch = createFetch({ fetch });

export const $fetch = ofetch;
