import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./users/user.module";
import { AuthModule } from "./auth/auth.module";
import { RawGApiGamesModule } from "./games/rawgapi-games.module";
import { GamesService } from "./api/games/games.service";
import { GamesModule } from "./api/games/games.module";

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, AuthModule, RawGApiGamesModule, GamesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
