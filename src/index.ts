import * as _ from 'lodash';

import { ConnectionParameter } from './ConnectionParameter';
import { getMysqlConnection, MysqlConnection } from './MysqlConnection';

/**
 * 数据库数据同步工具
 */
class DbDataSynchronizer {

    private _connection: MysqlConnection;   //数据库连接

    private constructor() { }

    /**
     * 初始化数据库连接
     */
    static async init(param: ConnectionParameter) {
        const synchronizer = new DbDataSynchronizer();
        synchronizer._connection = await getMysqlConnection(param);
        return synchronizer;
    }

    /**
     * 查询远端服务器上的数据
     */
    sync(sql: string, params?: any[]) {
        return {
            /**
             * 指定数据保存的位置
             * @param dbName 要保存到本地的数据库名称，默认与查询时指定的数据库名相同
             * @param tableName 要保存到本地的表名称，默认与查询时指定的表名相同
             */
            to: (dbName?: string, tableName?: string) => {
                return new Promise((resolve, reject) => {
                    let syncSql: string;    //同步数据sql

                    this._connection.remote.query(sql, params)
                        .on('error', reject)
                        .on('fields', fields => {
                            //检索查询时指定的数据库名和表名
                            if (dbName == null) dbName = fields[0].db;
                            if (tableName == null) tableName = fields[0].table;

                            syncSql = "\
                                INSERT INTO`"+ dbName + "`.`" + tableName + "`\
                                ("+ fields.map(v => "`" + v.name + "`").join(',') + ")\
                                VALUES\
                                ("+ fields.map(v => '?').join(',') + ")\
                                ON DUPLICATE KEY UPDATE\
                                "+ fields.map(v => "`" + v.name + "` = ?").join(',') + "\
                            ";
                        })
                        .on('result', row => {
                            this._connection.remote.pause();

                            this._connection.local.query(syncSql, [..._.values(row), ..._.values(row)], (err) => {
                                if (err) {
                                    this._connection.remote.end();
                                    this._connection.local.end();
                                    reject(err);
                                } else {
                                    this._connection.remote.resume();
                                }
                            });
                        })
                        .on('end', resolve);
                });
            }
        }
    }
}

export = DbDataSynchronizer;