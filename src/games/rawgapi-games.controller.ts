import { Controller, Get, Post, Body} from "@nestjs/common";
import { RawGApiGameService } from "./rawgapi-games.service";
 
@Controller("api/rawg/")
export class RawGApiGamesController {
  constructor(private gameService: RawGApiGameService) {}

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
