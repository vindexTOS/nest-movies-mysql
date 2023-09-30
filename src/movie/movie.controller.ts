import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovie } from './dto/movie.dto';
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post('create')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  CreateMovie(@Body() requestBody: CreateMovie) {
    return this.movieService.CreateMovie(requestBody);
  }
}
