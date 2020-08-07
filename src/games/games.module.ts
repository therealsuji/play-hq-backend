
import { Module, HttpModule } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GameService } from './games.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TrendingEntity } from './entities/trending.entity';
import { TopGamesEntity } from './entities/top-games.entity';
import { UpComingGamesEntity } from './entities/upcoming-games.entity';


@Module({
  controllers: [GamesController],
  imports: [HttpModule,TypeOrmModule.forFeature([TrendingEntity,TopGamesEntity,UpComingGamesEntity])],
  providers: [GameService],
})
export class GamesModule {}
