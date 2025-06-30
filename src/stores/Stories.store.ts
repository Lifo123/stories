import { atom, deepMap, map } from "nanostores";


interface Stories {
    isUpload: boolean;
    file: File | null;
    fileURL: string | undefined;
    fileType: 'image' | 'video' | 'spotify';
    [key: string]: any;
}

export const $Stories = map<Stories>({
    isUpload: false,
    isMobile: window.innerWidth < 768,
    file: null,
    fileType: 'image',
    fileURL: '/stories/menor3.webp',
})

