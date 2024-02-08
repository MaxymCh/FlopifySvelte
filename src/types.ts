export interface AlbumData {
    id: number;
    name: string;
    release_date: string;
    url_image?: string;
    artist_id: number;
    artist_name: string;
}

export interface MusicData {
    music_id: number;
    title: string;
    album_name: string;
    url_image: string;
    artist_name: string;
}


