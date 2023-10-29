import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { MysqlService } from 'src/mysql/mysql.service';
import { CreateMovie } from './dto/movie.dto';
@Injectable()
export class MovieService {
  constructor(private readonly mysqlService: MysqlService) {}
  async CreateMovie(requestBody: CreateMovie) {
    const { title, img, id, color, color2, hr, year, genre } = requestBody;

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

    const metaData = await this.mysqlService.query(
      'INSERT INTO metadata (hr,year,genre) VALUES (?,?,?)',
      [hr, year, genre],
    );
    const newMovie = await this.mysqlService.query(
      'INSERT INTO movies (title,img ,color,color2) VALUES (?,?,?,?)',
      [title, img, color, color2],
    );

    const newMovieCollection = await this.mysqlService.query(
      'INSERT INTO moviecollection (movie_id, user_id, metadata_id) VALUES (?,?,?)',
      [newMovie.insertId, id, metaData.insertId],
    );

    return { message: 'New Movie Created' };
  }

  async GetAllMovies() {
    const getAllMovies =
      'SELECT m.id AS movie_id, m.title, m.color, m.color2, m.img, m.video, md.hr, md.year, md.genre FROM movieCollection mc INNER JOIN movies m ON mc.movie_id = m.id INNER JOIN metadata md ON mc.metadata_id = md.id;';
    const data = await this.mysqlService.query(getAllMovies);
    return { data };
  }
}
