import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MysqlService } from 'src/mysql/mysql.service';

@Module({
  controllers: [MovieController],
  providers: [MovieService, MysqlService],
})
export class MovieModule {}
