import { deepMap } from "nanostores";
import { LocalPrefs, isBrowser,  } from "./config";

interface Controls {
    musiclayer: {
        isOpen: boolean;
        isMute: boolean;
    }
    [key: string]: any;
}

export const $InterfaceControl = deepMap<Controls>({
    musiclayer: {
        isMute: isBrowser ? LocalPrefs.get('musiclayer/isMute') : false,
        isOpen: false,
    }
})

$InterfaceControl.subscribe((value) => {
    LocalPrefs.update('musiclayer', value.musiclayer)
})
