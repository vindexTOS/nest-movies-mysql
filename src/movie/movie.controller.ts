import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
  Query,
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

  @Get('all')
  @HttpCode(200)
  GetMovies(
    @Query('title') title: string,
    @Query('search') serach: string,
    @Query('genre') genre: string,
    @Query('actor') actor: string,
  ) {
    return this.movieService.GetAllMovies(title, genre, actor, serach);
  }
}
