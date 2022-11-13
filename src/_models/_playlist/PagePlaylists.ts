import {Playlist} from "@/_models/_playlist/Playlist";

export class PagePlaylists {

    href = '';
    items: Playlist [] = [];
    limit = 0;
    next = '';
    offset = 0;
    previous!: string;
    total = 0;

}