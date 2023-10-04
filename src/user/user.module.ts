import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MysqlService } from 'src/mysql/mysql.service';
import { UserService } from './user.service';
@Module({
  controllers: [UserController],
  providers: [UserService, MysqlService],
})
export class UserModule {}
