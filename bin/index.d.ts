import { ConnectionParameter } from './ConnectionParameter';
/**
 * 数据库数据同步工具
 */
declare class DbDataSynchronizer {
    private _connection;
    private constructor();
    /**
     * 初始化数据库连接
     */
    static init(param: ConnectionParameter): Promise<DbDataSynchronizer>;
    /**
     * 查询远端服务器上的数据
     */
    sync(sql: string, params?: any[]): {
        to: (dbName?: string | undefined, tableName?: string | undefined) => Promise<{}>;
    };
}
export = DbDataSynchronizer;
