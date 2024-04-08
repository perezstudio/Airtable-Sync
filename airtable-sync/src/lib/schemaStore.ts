import { writable } from 'svelte/store';

export const baseSchema = writable<null | any>(null);
export const receivingSchema = writable<null | any>(null);
export const differencesSchema = writable<null | any>(null);