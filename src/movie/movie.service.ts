import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { MysqlService } from 'src/mysql/mysql.service';
import { CreateMovie } from './dto/movie.dto';
@Injectable()
export class MovieService {
  constructor(private readonly mysqlService: MysqlService) {}
  async CreateMovie(requestBody: CreateMovie) {
    const { title, img, id, color, color2 } = requestBody;

    const isUserExist = await this.mysqlService.query(
      'SELECT role,id FROM user WHERE id = ?',
      [id],
    );

    if (!isUserExist[0]?.id) {
      console.log('1');
      throw new HttpException(
        'User Does Not Exist',
        HttpStatus.NON_AUTHORITATIVE_INFORMATION,
      );
    }

    if (isUserExist[0]?.role !== 'admin') {
      throw new HttpException('User Does Not Exist', HttpStatus.FORBIDDEN);
    }

    const newMovie = await this.mysqlService.query(
      'INSERT INTO movies (title,img ,color,color2) VALUES (?,?,?,?)',
      [title, img, color, color2],
    );
    console.log(newMovie);
    // const newMovieCollection = await this.mysqlService.query(
    //   'INSERT INTO moviecollection (movie_id, user_id) VALUES (?,?)',
    //   [newMovie.id, id],
    // );

    return { message: 'New Movie Created' };
  }
}
