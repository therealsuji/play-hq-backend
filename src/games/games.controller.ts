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

  @Get('trending')
  async getTrendingGames(){
    return await this.gameService.getTrendingGames();
  }

  @Get('upcoming')
  async getUpcomingGames(){
    return await this.gameService.getUpcomingGames();
  }
}