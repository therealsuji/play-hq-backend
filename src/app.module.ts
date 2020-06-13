import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { GamesController } from './games/games.controller';
import { GamesModule } from './games/games.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, AuthModule, GamesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
