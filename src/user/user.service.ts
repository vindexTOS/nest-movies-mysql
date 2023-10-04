import { BadRequestException, Injectable } from '@nestjs/common';
import { MysqlService } from 'src/mysql/mysql.service';
import { CreateUserValid, LogInUserValid } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UserService {
  constructor(private readonly mysqlService: MysqlService) {}

  async signup(requestBody: CreateUserValid) {
    const { username, password, confirmPassword } = requestBody;
    const defaultUser = 'user';
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const findUseSql = 'SELECT username FROM user WHERE username = ?';
    const isUserExit = await this.mysqlService.query(findUseSql, [username]);
    if (isUserExit.length > 0 && isUserExit[0]?.username) {
      throw new BadRequestException('User Already Exits');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const createSQL =
      'INSERT INTO user (username, password, role) VALUES (?, ? , ?)';

    const NewUser = await this.mysqlService.query(createSQL, [
      username,
      hashedPassword,
      defaultUser,
    ]);

    if (!NewUser) {
      throw new BadRequestException('Could not register try later');
    }
    const userSql = 'SELECT username, role FROM user WHERE username = ?';
    const u = await this.mysqlService.query(userSql, [username]);
    const user = u[0];

    return { token: this.generateToken(user), message: 'User Created' };
  }

  async signin(requestBody: LogInUserValid) {
    const { username, password } = requestBody;

    const user = await this.mysqlService.query(
      'SELECT username, password, role FROM user WHERE username = ?',
      [username],
    );
    if (user.length <= 0) {
      throw new BadRequestException('Could not find user');
    }
    const comperePass = await bcrypt.compare(password, user[0].password);

    if (!comperePass) {
      throw new BadRequestException('Password is wrong');
    }
    user[0].password = null;

    return { token: this.generateToken(user[0]), message: 'Sign in' };
  }

  private generateToken(token: object) {
    return jwt.sign(token, '1234', { expiresIn: '1h' });
  }
}
