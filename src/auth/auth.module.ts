import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../users/user.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [UserModule],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
