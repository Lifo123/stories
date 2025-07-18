import { searchTracks } from "@Services/Search.services";
import { isBrowser, LocalSearch } from "./config";
import { map } from "nanostores";
import { type SearchStore } from "src/types/Search.types";
import { $Stories } from "./Stories.store";
import { getTrack } from "@Services/Track.services";

export const SearchInitialState = {
    historyResults: isBrowser ? LocalSearch.get('historyResults') || [] : [],
    searchResults: [],
}

export const $Search = map<SearchStore>(SearchInitialState)


$Search.subscribe((value) => {
    if (value.historyResults[0]?.id) {
        LocalSearch.update('historyResults', value.historyResults)
    }
})


const selectSong = async (props: any) => {
    const prev = LocalSearch.get('historyResults') || [];
    const exists = prev.some((t: any) => t.id === props.id);

    if (!exists) {
        const updated = [props, ...prev].slice(0, 4);
        $Search.setKey('historyResults', updated);
    }
    const song = await getTrack(props.id)

    $Stories.setKey('spotifyCard', song);
    $Search.setKey('searchResults', []);

    //Get Song
}

const deleteSong = (id: string) => {
    const prev = LocalSearch.get('historyResults') || [];
    const updated = prev.filter((t: any) => t.id !== id);
    $Search.setKey('historyResults', updated);
}

const setDefault = () => {
    $Search.set(SearchInitialState);
}

export const searchUtils = {
    selectSong,
    deleteSong,
    setDefault
}