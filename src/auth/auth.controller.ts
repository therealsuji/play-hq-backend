import { AuthService } from "./auth.service";
import { UserCredentials } from "./auth.model";
import { UserService } from "../users/user.service";
import { Controller, Post, Body, Logger, Get, UseGuards, HttpCode, Param } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/users/user.model";

@Controller("api/auth")
export class AuthController {
  constructor(private userService: UserService, private authService: AuthService) {}

  @HttpCode(200)
  @Post("login")
  async login(@Body() userDTO: UserCredentials) {
    console.log(userDTO);

    const user = await this.userService.findByLogin(userDTO);
    const payload = {
      email: user.email,
      refreshCount: user.refreshCount,
    };
    const token = await this.authService.signPayload(payload);
    delete user.refreshCount;
    Logger.log("Logged in user: " + user.email);
    return { user, token };
  }

  @Post("getRefreshToken")
  async refreshToken(@Body("refreshToken") refreshToken: string) {
    const decodedToken = this.authService.decodeToken(refreshToken);
    return this.authService.setRefreshCount(decodedToken);
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))
  test() {
    return "auth works";
  }

  @HttpCode(200)
  @Post("register")
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

  @HttpCode(200)
  @Get("user-exists/:email")
  async userExists(@Param("email") email) {
    const user = await this.userService.findByEmail(email);
    return user ? {"status":true} : {"status":false};
  }
}
