
import { Module, HttpModule } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GameService } from './games.service';


@Module({
  controllers: [GamesController],
  imports: [HttpModule],
  providers: [GameService],
})
export class GamesModule {}
