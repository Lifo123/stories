export interface SearchStore {
    isUploading?: boolean;

    isSearching?: boolean;
    isSearchClicked?: boolean;

    isFile?: boolean;
    historyResults: any[];
    searchResults: any[];

}