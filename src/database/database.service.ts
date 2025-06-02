import { Injectable, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
    private pool: Pool;

    constructor(private configService: ConfigService){
        this.pool = new Pool({
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
        const result = await this.pool.query(sql,params);
        return result.rows;
    }
}




