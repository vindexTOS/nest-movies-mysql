import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class MysqlService {
  private connection;

  constructor() {
    this.connection = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'nest',
      
      connectionLimit: 10,
      
    });
  }

  async query(sql: string, values?: any[]): Promise<any> {
    try {
      const [rows, feilds] = await this.connection.execute(sql, values);
      return rows;
    } catch (error) {
      throw error;
    }
  }
}
