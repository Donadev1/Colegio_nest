import { Injectable, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService {
    private pool: mysql.Pool;

    constructor(private configService: ConfigService){
        this.pool = mysql.createPool({
            host: this.configService.get<string>('DB_HOST'),
            user: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
            port: this.configService.get<number>('DB_PORT'),
            waitForConnections:true,
            connectionLimit: 10
        });
    }

    async query(sql:string, params: any[]): Promise<any>{
        const [rows] = await this.pool.execute(sql,params);
        return rows;
    }
}



