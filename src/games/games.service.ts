import { Injectable, HttpService, HttpException, HttpStatus } from "@nestjs/common";
import { TopGames } from "src/games/models/game-type/top-games.model";
import { Platform } from "src/games/models/sub-types/platform.model";
import { Trending } from "src/games/models/game-type/trending-games.model";
import { Upcoming } from "src/games/models/game-type/upcoming-games.model";
import * as moment from "moment";
import { throwError } from "rxjs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TrendingEntity } from "./entities/trending.entity";
import { UpComingGamesEntity } from "./entities/upcoming-games.entity";
import { TopGamesEntity } from "./entities/top-games.entity";
@Injectable()
export class GameService {
  constructor(
    @InjectRepository(TrendingEntity)
    private trendingRepository: Repository<TrendingEntity>,
    @InjectRepository(TopGamesEntity)
    private topGameRepository: Repository<TopGamesEntity>,
    @InjectRepository(UpComingGamesEntity)
    private upcomingGameRepository: Repository<UpComingGamesEntity>,

    private httpService: HttpService
  ) {}

  async getTopGames(toDate: string, fromDate: string, page?: string) {
    //page is null set default to 1
    page = !page ? "1" : page;
    console.log(page);

    if (!moment(toDate, "YYYY-MM-DD", true).isValid()) {
      return new HttpException({ response: "Invalid Date", message: "The To date format is invalid. Format should be YYYY-MM-DD" }, HttpStatus.BAD_REQUEST);
    }
    if (!moment(fromDate, "YYYY-MM-DD", true).isValid()) {
      return new HttpException({ response: "Invalid Date", message: "The From date format is invalid. Format should be YYYY-MM-DD" }, HttpStatus.BAD_REQUEST);
    }

    const topGames: TopGames[] = await this.httpService
      .get(`https://api.rawg.io/api/games?page_size=40&dates=${fromDate},${toDate}&ordering=released,rating&page=${page}`)
      .toPromise()
      .then((res) => {
        return res.data.results.map((res) => {
          const games: TopGames = {
            name: res.name,
            score: res.metacritic ? res.metacritic : "",
            releaseDate: res.released,
            gameId: res.id,
            background:  res.background_image ? res.background_image :'',
            clip: res.clip ? res.clip.clip : "",
          };
          return games;
        });
      });
    const createdEntity = await this.topGameRepository.create(topGames);
    await this.topGameRepository.save(createdEntity);
    return {
      status: 200,
      message: "Successfully added top games to DB",
    };
  }

  async getTrendingGames(toDate: string, fromDate: string, page?: string) {
    //page is null set default to 1
    page = !page ? "1" : page;
    console.log(page);

    if (!moment(toDate, "YYYY-MM-DD", true).isValid()) {
      return new HttpException({ response: "Invalid Date", message: "The To date format is invalid. Format should be YYYY-MM-DD" }, HttpStatus.BAD_REQUEST);
    }
    if (!moment(fromDate, "YYYY-MM-DD", true).isValid()) {
      return new HttpException({ response: "Invalid Date", message: "The From date format is invalid. Format should be YYYY-MM-DD" }, HttpStatus.BAD_REQUEST);
    }

    const trendingGames: Trending[] = await this.httpService
      .get(`https://api.rawg.io/api/games?dates=${fromDate},${toDate}&ordering=rating,released&page=${page}`)
      .toPromise()
      .then((res) => {
        return res.data.results.map((res) => {
          const games: Trending = {
            name: res.name,
            score: res.metacritic ? res.metacritic : "",
            releaseDate: res.released,
            gameId: res.id,
            background: res.background_image ? res.background_image :'',
            clip: res.clip ? res.clip.clip : "",
          };
          return games;
        });
      });
    const createdEntity = await this.trendingRepository.create(trendingGames);
    await this.trendingRepository.save(createdEntity);
    return {
      status: 200,
      message: "Successfully added trending games to DB",
    };
  }

  async getUpcomingGames(page?: string) {
    //page is null set default to 1
    page = !page ? "1" : page;
    const fromDate = moment().format("YYYY-MM-DD");
    const toDate = moment().add(30, "days").format("YYYY-MM-DD");
     const upcomingGames: Upcoming[] = await this.httpService
      .get(`https://api.rawg.io/api/games?ordering=rating&dates=${fromDate},${toDate}&page=${page}`)
      .toPromise()
      .then((res) => {
        return res.data.results.map((res) => {
          const games: Upcoming = {
            name: res.name,
            score: res.metacritic ? res.metacritic : "",
            releaseDate: res.released,
            gameId: res.id,
            background:  res.background_image ? res.background_image :'',
            clip: res.clip ? res.clip.clip : "",
          };
          return games;
        });
      });
    const createdEntity = await this.upcomingGameRepository.create(upcomingGames);
    await this.upcomingGameRepository.save(createdEntity);
    return {
      status: 200,
      message: "Successfully added upcoming games to DB",
    };
  }
}
