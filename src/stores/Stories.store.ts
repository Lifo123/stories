import { atom, deepMap, map } from "nanostores";
import type { StoriesStore } from "src/types/Stories.types";
import { $Search, SearchInitialState } from "./Search.store";
import UI from "@lifo123/library/UI";

export const StoriesInitalState = {
    isUpload: false,
    isMobile: window.innerWidth < 768,
    spotifyCard: null,
}
export const $Stories = map<StoriesStore>(StoriesInitalState)


const close = () => {
    UI.Dialog.show({
        title: 'Are you sure to leave?',
        message: 'This acction is not reversible.',
        onClick: async () => {
            $Stories.set(StoriesInitalState);
            $Search.set({
                ...$Search.get(),
                isSearchClicked: false,
                isUploading: false,
            });
        }
    })
}

export const storiesUtils = {
    close,
}