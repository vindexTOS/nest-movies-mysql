import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserValid, LogInUserValid } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  CreateUser(@Body() requestBody: CreateUserValid) {
    console.log(requestBody);

    return this.userService.signup(requestBody);
  }

  @Post('signin')
  @HttpCode(200)
  @UsePipes(LogInUserValid)
  SigninUser(@Body() requestBody: LogInUserValid) {
    return this.userService.signin(requestBody);
  }
}
