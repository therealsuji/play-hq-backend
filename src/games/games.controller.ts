import { Controller, Get, Post, Body} from "@nestjs/common";
import { GameService } from "./games.service";
 
@Controller("api/games")
export class GamesController {
  constructor(private gameService: GameService) {}

  @Post("top-games")
  async getTopGames(@Body() body) {
 
    return await this.gameService.getTopGames(body.toDate, body.fromDate, body.page);
  }

  @Post("trending")
  async getTrendingGames(@Body() body) {
    return await this.gameService.getTrendingGames(body.toDate, body.fromDate, body.page);
  }

  @Post("upcoming")
  async getUpcomingGames(@Body() body) {
    return await this.gameService.getUpcomingGames(body.page);
  }
}
