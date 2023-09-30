import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { MysqlService } from 'src/mysql/mysql.service';
import { CreateMovie } from './dto/movie.dto';
@Injectable()
export class MovieService {
  constructor(private readonly mysqlService: MysqlService) {}
  async CreateMovie(requestBody: CreateMovie) {
    console.log(requestBody);
    try {
      const { title, rating, actors, genre } = requestBody;

      const genreSQL = 'INSERT INTO genre (name) VALUES (?)';

      const movieGenre = await this.mysqlService.query(genreSQL, [genre]);

      if (movieGenre.affectedRows !== 1) {
        throw new HttpException(
          'Could not create movie',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const getGenreId = 'SELECT id FROM genre WHERE name = ?';
      const genreGet = await this.mysqlService.query(getGenreId, [genre]);
      let genreId = null;
      if (genreGet.Length === 1) {
        genreId = genreGet[0].id;
        console.log(genreId, genreGet);
      } else {
        const createGenre = 'INSERT INTO genre (name) VALUES (?)';
        const newGenre = await this.mysqlService.query(createGenre, [genre]);

        if (newGenre.affectedRows !== 1) {
          throw new HttpException(
            'Could not create actor',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        genreId = genreGet[0].id;
        console.log(genreId, genreGet);
      }

      const sql = 'INSERT INTO movies (title,rating, genre_id) VALUES (?,?,?)';

      const movie = await this.mysqlService.query(sql, [
        title,
        rating,
        genreId,
      ]);

      if (movie.affectedRows !== 1) {
        throw new HttpException(
          'Could not create movie',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      for (const actor of actors) {
        const actorQuery = 'SELECT id FROM actor WHERE name = ?';
        const actorResult = await this.mysqlService.query(actorQuery, [actor]);
        console.log(actor);
        let actorId: number;

        if (actorResult.Length === 1) {
          actorId = actorResult[0].id;
        } else {
          const createActorSql = 'INSERT INTO actor (name) VALUES (?)';

          const createActorResult = await this.mysqlService.query(
            createActorSql,
            [actor],
          );
          if (createActorResult.affectedRows !== 1) {
            throw new HttpException(
              'Could not create actor',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
          actorId = createActorResult.insertId;
        }
        const associationSql =
          'INSERT INTO collection (actor_id, movie_id) VALUES (?, ?)';
        await this.mysqlService.query(associationSql, [
          actorId,
          movie.insertId,
        ]);
      }

      return { message: 'Movie Created' };
    } catch (error) {
      return { error };
    }
  }
}
