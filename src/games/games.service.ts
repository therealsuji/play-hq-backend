import { Injectable, HttpService } from '@nestjs/common';
import { TopGames } from 'src/games/models/game-type/top-games.model';
import { Platform } from 'src/games/models/sub-types/platform.model';
import { Trending } from 'src/games/models/game-type/trending-games.model';
import { Upcoming } from 'src/games/models/game-type/upcoming-games.model';

@Injectable()
export class GameService {
    constructor(private httpService: HttpService) { }



    async getTopGames() {
        return await this.httpService.get('https://api.rawg.io/api/games?page_size=30&dates=2016-01-01,2020-07-31.1960-01-01,1969-12-31&page=1').toPromise().then((res) => {
            return res.data.results.map((res) => {

                const games: TopGames = {
                    name: res.name,
                    date: res.released,
                    score: res.metacritic,
                    platforms: res.platforms == null ? null : res.platforms.map((plt) => {
                        return {
                            id: plt.platform.id,
                            name: plt.platform.name
                        }
                    }),
                    id: res.id,
                    background: res.background_image,
                    screenshots: res.short_screenshots.map((shots) => {
                        return {
                            id: shots.id,
                            image: shots.image
                        }
                    }),
                    genres: res.genres.map((genres) => {
                        return {
                            id: genres.id,
                            image: genres.name
                        }
                    })

                };
                return games;
            });
        });
    }

    async getTrendingGames() {
        return await this.httpService.get('https://api.rawg.io/api/games?page_size=30&dates=2020-01-01,2020-06-30.1960-01-01,1969-12-31&page=1').toPromise().then((res) => {
            return res.data.results.map((res) => {

                const games: Trending = {
                    name: res.name,
                    date: res.released,
                    score: res.metacritic,
                    platforms: res.platforms == null ? null : res.platforms.map((plt) => {
                        return {
                            id: plt.platform.id,
                            name: plt.platform.name
                        }
                    }),
                    id: res.id,
                    background: res.background_image,
                    screenshots: res.short_screenshots.map((shots) => {
                        return {
                            id: shots.id,
                            image: shots.image
                        }
                    }),
                    genres: res.genres.map((genres) => {
                        return {
                            id: genres.id,
                            image: genres.name
                        }
                    })

                };
                return games;
            });
        });
    }

    async getUpcomingGames() {
        return await this.httpService.get('https://api.rawg.io/api/games?page_size=30&dates=2020-06-06,2021-01-31.1960-01-01,1969-12-31&page=1&ordering=-added').toPromise().then((res) => {
            return res.data.results.map((res) => {
                const games: Upcoming = {
                    name: res.name,
                    date: res.released,
                    score: res.metacritic,
                    platforms: res.platforms == null ? null : res.platforms.map((plt) => {
                        return {
                            id: plt.platform.id,
                            name: plt.platform.name
                        }
                    }),
                    id: res.id,
                    background: res.background_image,
                    screenshots: res.short_screenshots.map((shots) => {
                        return {
                            id: shots.id,
                            image: shots.image
                        }
                    }),
                    genres: res.genres.map((genres) => {
                        return {
                            id: genres.id,
                            image: genres.name
                        }
                    })

                };
                return games;
            });
        });
    }

}
