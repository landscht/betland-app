import {ExternalUrls} from "@/_models/_shared/ExternalUrls";
import {Image} from "@/_models/_shared/Image";
import {Profile} from "@/_models/profile/Profile";
import {Follower} from "@/_models/_shared/Follower";

export class Playlist {

    collaborative!: boolean;
    description = '';
    external_urls: ExternalUrls = new ExternalUrls();
    href = '';
    id!:string;
    images: Image[] = [];
    name = '';
    owner: Profile = new Profile();
    primary_color!: string;
    public!: boolean;
    snapshot_id!: string;
    tracks: Follower = new Follower();
    type = '';
    uri = '';

}