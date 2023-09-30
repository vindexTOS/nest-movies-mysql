import { Module } from '@nestjs/common';
import { ActorController } from './actor.controller';
import { ActorService } from './actor.service';
import { MysqlService } from 'src/mysql/mysql.service';
@Module({
  controllers: [ActorController],
  providers: [ActorService, MysqlService],
})
export class ActorModule {}
