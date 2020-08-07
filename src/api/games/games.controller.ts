import { Controller, Get, UseGuards } from "@nestjs/common";
import { GamesService } from "./games.service";
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller("api")
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get("top-games")
  async getTopGames() {
    return await this.gamesService.getTopGames();
  }

  @Get("trending")
  async getTrendingGames() {
    return await this.gamesService.getTrendingGames();
  }

  @Get("upcoming")
  async getUpcomingGames() {
    return await this.gamesService.getUpcomingGames();
  }
}
