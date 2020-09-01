import { Module } from "@nestjs/common";
import { GamesController } from "./games.controller";
import { GamesService } from "./games.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TrendingEntity } from "src/games/entities/trending.entity";
import { TopGamesEntity } from "src/games/entities/top-games.entity";
import { UpComingGamesEntity } from "src/games/entities/upcoming-games.entity";

@Module({
  controllers: [GamesController],
  imports: [TypeOrmModule.forFeature([TrendingEntity, TopGamesEntity, UpComingGamesEntity])],
  providers: [GamesService],
})
export class GamesModule {}
