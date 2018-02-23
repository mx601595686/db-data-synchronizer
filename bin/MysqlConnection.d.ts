import * as mysql from 'mysql';
import { ConnectionParameter } from './ConnectionParameter';
export interface MysqlConnection {
    remote: mysql.Connection;
    local: mysql.Connection;
}
/**
 * 获取mysql连接
 */
export declare function getMysqlConnection(param: ConnectionParameter): Promise<MysqlConnection>;
