import { Platform } from "../sub-types/platform.model";
import { Screenshots } from "../sub-types/screenshots.model";
import { Genres } from "../sub-types/genres.model";

export interface TopGames {
  gameId: string;
  name: string;
  releaseDate: string;
  background: string;
  score:string;
  clip: string;
}
