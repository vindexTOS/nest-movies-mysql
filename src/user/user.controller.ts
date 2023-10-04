import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserValid } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  CreateUser(@Body() requestBody: CreateUserValid) {
    return this.userService.signup(requestBody);
  }
}
