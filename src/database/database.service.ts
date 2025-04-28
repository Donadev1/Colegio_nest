import { Injectable, Param } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService {
    private pool: mysql.Pool;

    constructor(){
        this.pool = mysql.createPool({
            host:'localhost',
            user:'root',
            password:'12345Tr@',
            database:'escuela',
            waitForConnections:true,
            connectionLimit: 10
        });
    }

    async query(sql:string, params: any[]): Promise<any>{
        const [rows] = await this.pool.execute(sql,params);
        return rows;
    }
}



