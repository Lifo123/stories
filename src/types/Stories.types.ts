export interface StoriesStore {
    isUpload: boolean;
    isMobile: boolean;
    fileURL?: string;
    fileType?: "spotify" | "image" | "video";
    file?: any;
    spotifyCard: any;
}