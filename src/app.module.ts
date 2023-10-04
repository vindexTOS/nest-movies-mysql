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
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [ActorModule, ActorModule, MovieModule, UserModule],
  controllers: [ActorController, MovieController, UserController],
  providers: [MysqlService, ActorService, MovieService, UserService],
})
export class AppModule {}
