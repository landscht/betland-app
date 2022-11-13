import Entity from "@/_models/Entity";
import Competition from "@/_models/Competition";
import Match from "@/_models/Match";

export default class MatchCategory extends Entity {

    competition: Competition = new Competition();
    matchs: Match[] = [];
    name = '';

}