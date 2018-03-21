import * as _ from 'lodash';

import { ConnectionParameter } from './ConnectionParameter';
import { getMysqlConnection, MysqlConnection } from './MysqlConnection';

/**
 * 数据库数据同步工具
 */
class DbDataSynchronizer {

    constructor(private _conParam: ConnectionParameter) { }

    /**
     * 真正执行同步的方法
     */
    private _synchronizer(sql: string, params?: any[], dbName?: string, tableName?: string) {
        return getMysqlConnection(this._conParam).then(connection => new Promise((resolve, reject) => {
            let updateSql: string;    //更新本地数据sql

            connection.remote.query(sql, params)
                .on('error', reject)
                .on('fields', fields => {
                    //检索查询时指定的数据库名和表名
                    if (dbName == null) dbName = fields[0].db;
                    if (tableName == null) tableName = fields[0].table;

                    updateSql = "\
                        INSERT INTO`"+ dbName + "`.`" + tableName + "`\
                        ("+ fields.map(v => "`" + v.name + "`").join(',') + ")\
                        VALUES\
                        ("+ fields.map(v => '?').join(',') + ")\
                        ON DUPLICATE KEY UPDATE\
                        "+ fields.map(v => "`" + v.name + "` = ?").join(',') + "\
                    ";
                })
                .on('result', row => {
                    connection.remote.pause();

                    connection.local.query(updateSql, [..._.values(row), ..._.values(row)], (err) => {
                        if (err) {
                            connection.remote.destroy();
                            connection.local.destroy();
                            reject(err);
                        } else {
                            connection.remote.resume();
                        }
                    });
                })
                .on('end', () => {
                    connection.remote.destroy();
                    connection.local.destroy();
                    resolve();
                });
        }));
    }

    /**
     * 查询远端服务器上的数据
     * @param sql 在远端执行的SQL
     * @param params SQL参数
     */
    sync(sql: string, params?: any[]) {
        return {
            /**
             * 指定数据保存的位置
             * @param dbName 要保存到本地的数据库名称，默认与查询时指定的数据库名相同
             * @param tableName 要保存到本地的表名称，默认与查询时指定的表名相同
             */
            to: this._synchronizer.bind(this, sql, params)
        }
    }
}

export = DbDataSynchronizer;