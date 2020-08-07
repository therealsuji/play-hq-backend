import { Platform } from "../sub-types/platform.model";
import { Screenshots } from "../sub-types/screenshots.model";
import { Genres } from "../sub-types/genres.model";

export class Trending {
    gameId: string;
    name: string;
    releaseDate: string;
    background: string;
    clip: string;
    score:string;

    characterImage?: string
}