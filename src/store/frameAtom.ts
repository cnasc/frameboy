import { atom } from 'jotai';
import { FrameVNext } from '../utils/schemaValidation';

export const frameAtom = atom<FrameVNext | null>(null);
export const frameErrorsAtom = atom<string[]>([]);
