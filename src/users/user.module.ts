import { UsersEntity } from './user.entity';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
