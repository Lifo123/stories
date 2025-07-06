 interface images {
    height: number;
    width: number;
    url: string;
 }

interface Artist {
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

interface SpotifyCard {
    id: string;
    album: any;
    name: string;
    duration_ms: number;
    artists: Artist[];
}


export interface SpotifyTrack {
    id: string;
    name: string;
    artists: Artist[];
    type: "image" | "video" | 'spotify';
    preview_url: string;
    album:{
        images: images[];
    }
    release_date: string;
    release_date_precision: string;
}