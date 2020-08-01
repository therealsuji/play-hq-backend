import { Platform } from "../sub-types/platform.model";
import { Screenshots } from "../sub-types/screenshots.model";
import { Genres } from "../sub-types/genres.model";

export class Upcoming {
    name: string;
    date: string;
    score: string;
    platforms: Platform;
    id: number;
    background: string;
    screenshots: Screenshots
    genres: Genres
}