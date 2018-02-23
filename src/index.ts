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

    sync(sql: string, params?: any[]) {
        return {
            to: (dbName: string, tableName: string) => {
                return new Promise((resolve, reject) => {
                    let syncSql: string;    //同步数据sql

                    this._connection.remote.query(sql, params)
                        .on('error', reject)
                        .on('fields', fields => {
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