import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TrendingEntity } from "src/games/entities/trending.entity";
import { Repository } from "typeorm";
import { TopGamesEntity } from "src/games/entities/top-games.entity";
import { UpComingGamesEntity } from "src/games/entities/upcoming-games.entity";

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(TrendingEntity)
    private trendingRepository: Repository<TrendingEntity>,
    @InjectRepository(TopGamesEntity)
    private topGameRepository: Repository<TopGamesEntity>,
    @InjectRepository(UpComingGamesEntity)
    private upcomingGameRepository: Repository<UpComingGamesEntity>
  ) {}

  async getTopGames() {
    return await this.topGameRepository.createQueryBuilder("games").orderBy({ score: "DESC", releaseDate: "DESC" }).getMany();
  }

  async getTrendingGames() {
    return await this.trendingRepository.createQueryBuilder("games").orderBy({ score: "DESC" }).getMany();
  }

  async getUpcomingGames() {
    return await this.upcomingGameRepository.createQueryBuilder("games").orderBy({ score: "DESC" }).getMany();
  }
}
