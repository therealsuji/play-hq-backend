import { Controller, Get } from '@nestjs/common';
import { GameService } from './games.service';


@Controller('api/games')
export class GamesController {
  constructor(private gameService:GameService) {

  }

  @Get('top-games')
  async getTopGames(){
    return await this.gameService.getTopGames();
  }



}