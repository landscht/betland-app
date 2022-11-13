import {ExternalUrls} from "@/_models/_shared/ExternalUrls";
import {Follower} from "@/_models/_shared/Follower";
import {Image} from "@/_models/_shared/Image";
import {ExplicitContent} from "@/_models/profile/ExplicitContent";

export class Profile {

    country = '';
    display_name = '';
    email = '';
    explicit_content: ExplicitContent = new ExplicitContent();
    external_urls: ExternalUrls = new ExternalUrls();
    followers: Follower = new Follower();
    href = '';
    id!: string;
    images: Image[] = [];
    product = '';
    type = '';
    uri = '';

}