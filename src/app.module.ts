import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MysqlService } from './mysql/mysql.service';
import { ActorService } from './actor/actor.service';
import { ActorController } from './actor/actor.controller';
import { ActorModule } from './actor/actor.module';
import { MovieModule } from './movie/movie.module';
import { MovieController } from './movie/movie.controller';
import { MovieService } from './movie/movie.service';

@Module({
  imports: [ActorModule, ActorModule, MovieModule],
  controllers: [ActorController, MovieController],
  providers: [MysqlService, ActorService, MovieService],
})
export class AppModule {}
