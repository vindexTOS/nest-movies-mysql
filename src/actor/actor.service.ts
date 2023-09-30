import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MysqlService } from '../mysql/mysql.service';
import { CreateActor } from './dto/actor.dto';
@Injectable()
export class ActorService {
  constructor(private readonly mysqlService: MysqlService) {}
  async CreateActor(requestBody: CreateActor) {
    try {
      console.log(requestBody);
      const { name } = requestBody;
      const sql = 'INSERT INTO actor (name) VALUES (?)';

      const actor = await this.mysqlService.query(sql, [name]);

      if (actor.affectedRows === 1) {
        return { message: 'Actor created successfully' };
      } else {
        return { message: 'Could not create an actor' };
      }
    } catch (error) {
      throw new HttpException(
        'INTERNAL SERVER ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
