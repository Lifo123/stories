import { deepMap } from "nanostores";

interface Controls {
    musiclayer: {
        isOpen: boolean;
        isMute: boolean;
    }
    [key: string]: any;
}

export const $InterfaceControl = deepMap<Controls>({
    musiclayer: {
        isMute: false,
        isOpen: false,
    }
})

