import { Local } from "@lifo123/library/utils";
import { isBrowser, localSearchKey } from "./config";
import { map } from "nanostores";

export const $Search = map({
    isUploading: false,
    isSearching: false,
    isSearchClicked: false,
    searchText: '',
    searchResults: isBrowser ? Local.get(localSearchKey) || [{},] : [{}],
})


$Search.subscribe((value) => {
    if (value.searchText) {
        //fetch for search

    }
})