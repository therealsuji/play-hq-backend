import { UserService } from '../users/user.service';
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { sign, decode, verify } from 'jsonwebtoken';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: any) {
    const refreshToken = sign(payload, `${process.env.JWTREFRESHSECRET}`, {
      expiresIn: '7d',
    });
    delete payload.refreshCount;
    const accessToken = sign(payload, `${process.env.JWTSECRET}`, {
      expiresIn: '15s',
    });

    return { accessToken, refreshToken };
  }

  async setRefreshCount(decodeToken: any) {
    const user = await this.userService.findByEmail(decodeToken.email);

    if (!user) {
      Logger.log('Invalid credentials');
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    if (user.refreshCount == decodeToken.refreshCount) {
      const refreshedUser = await this.userService.updateUserRefreshCount(user);
      console.log('good token');
      return await this.signPayload({
        email: decodeToken.email,
        refreshCount: refreshedUser.refreshCount,
      });
    } else {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
  }

  async disableRefreshTokenForUser(email: string) {
    const user = await this.userService.findByEmail({
      email,
    });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    this.userService.updateUserRefreshCount(user);
    return true;
  }

  decodeToken(token: string) {
    try {
      verify(token, `${process.env.JWTREFRESHSECRET}`);
    } catch (error) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
    return decode(token);
  }
}
