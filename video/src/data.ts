import rms from './rms.json';
export const RMS: number[] = rms as number[];
export const TOTAL = 364.7;
export type Cap = { s: number; e: number; t: string; who?: string };
export const CAPS: Cap[] = []; // no on-screen captions; the SRT goes to YouTube CC
export const SPEAK: Record<string, [number, number][]> = {};
export const SCENE_TAGS: { s: number; e: number; tag: string }[] = [];
export const SFX: [string, number, number][] = [];
