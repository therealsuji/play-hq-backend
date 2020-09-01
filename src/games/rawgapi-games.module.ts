
import { Module, HttpModule } from '@nestjs/common';
import { RawGApiGamesController} from './rawgapi-games.controller';
import { RawGApiGameService } from './rawgapi-games.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TrendingEntity } from './entities/trending.entity';
import { TopGamesEntity } from './entities/top-games.entity';
import { UpComingGamesEntity } from './entities/upcoming-games.entity';


@Module({
  controllers: [RawGApiGamesController],
  imports: [HttpModule,TypeOrmModule.forFeature([TrendingEntity,TopGamesEntity,UpComingGamesEntity])],
  providers: [RawGApiGameService],
})
export class RawGApiGamesModule {}
