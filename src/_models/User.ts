import Profile from "@/_models/Profile";

export default class User {
    id!: number;
    username = '';
    email = '';
    profile: Profile = new Profile();
}