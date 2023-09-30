import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActor } from './dto/actor.dto';
@Controller('actor')
export class ActorController {
  constructor(private readonly actroService: ActorService) {}
  @Post('create')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  CreateActor(@Body() requestBody: CreateActor) {
    return this.actroService.CreateActor(requestBody);
  }
}
