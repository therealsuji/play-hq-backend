import { User } from './../../dist/types/user.d';
import { AuthService } from './auth.service';
import { LoginDTO } from './auth.dto';
import { UserService } from '../users/user.service';
import { Controller, Post, Body, Logger, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    const payload = {
      email: user.email,
      refreshCount: user.refreshCount,
    };
    const token = await this.authService.signPayload(payload);
    delete user.refreshCount;
    return { user, token };
  }

  @Post('getRefreshToken')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    const decodedToken = this.authService.decodeToken(refreshToken);
    return this.authService.setRefreshCount(decodedToken);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  test() {
    return 'auth works';
  }

  @Post('register')
  async register(@Body() userDTO: User) {
    const user = await this.userService.create(userDTO);
    const payload = {
      email: user.email,
      refreshCount: user.refreshCount,
    };
    const token = await this.authService.signPayload(payload);
    delete user.refreshCount;
    return { user, token };
  }
}
