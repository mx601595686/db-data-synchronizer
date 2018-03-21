import { ConnectionParameter } from './ConnectionParameter';
/**
 * 数据库数据同步工具
 */
declare class DbDataSynchronizer {
    private _conParam;
    constructor(_conParam: ConnectionParameter);
    /**
     * 真正执行同步的方法
     */
    private _synchronizer(sql, params?, dbName?, tableName?);
    /**
     * 查询远端服务器上的数据
     * @param sql 在远端执行的SQL
     * @param params SQL参数
     */
    sync(sql: string, params?: any[]): {
        to: any;
    };
}
export = DbDataSynchronizer;
