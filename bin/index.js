"use strict";
const _ = require("lodash");
const MysqlConnection_1 = require("./MysqlConnection");
/**
 * 数据库数据同步工具
 */
class DbDataSynchronizer {
    constructor() { }
    /**
     * 初始化数据库连接
     */
    static async init(param) {
        const synchronizer = new DbDataSynchronizer();
        synchronizer._connection = await MysqlConnection_1.getMysqlConnection(param);
        return synchronizer;
    }
    /**
     * 查询远端服务器上的数据
     */
    sync(sql, params) {
        return {
            /**
             * 指定数据保存的位置
             * @param dbName 要保存到本地的数据库名称，默认与查询时指定的数据库名相同
             * @param tableName 要保存到本地的表名称，默认与查询时指定的表名相同
             */
            to: (dbName, tableName) => {
                return new Promise((resolve, reject) => {
                    let syncSql; //同步数据sql
                    this._connection.remote.query(sql, params)
                        .on('error', reject)
                        .on('fields', fields => {
                        //检索查询时指定的数据库名和表名
                        if (dbName == null)
                            dbName = fields[0].db;
                        if (tableName == null)
                            tableName = fields[0].table;
                        syncSql = "\
                                INSERT INTO`" + dbName + "`.`" + tableName + "`\
                                (" + fields.map(v => "`" + v.name + "`").join(',') + ")\
                                VALUES\
                                (" + fields.map(v => '?').join(',') + ")\
                                ON DUPLICATE KEY UPDATE\
                                " + fields.map(v => "`" + v.name + "` = ?").join(',') + "\
                            ";
                    })
                        .on('result', row => {
                        this._connection.remote.pause();
                        this._connection.local.query(syncSql, [..._.values(row), ..._.values(row)], (err) => {
                            if (err) {
                                this._connection.remote.end();
                                this._connection.local.end();
                                reject(err);
                            }
                            else {
                                this._connection.remote.resume();
                            }
                        });
                    })
                        .on('end', resolve);
                });
            }
        };
    }
}
module.exports = DbDataSynchronizer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LEVBQUUsQ0FBQzs0QkFDckMsQ0FBQzt3QkFDTCxDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUM7eUJBQ0QsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDNUIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1NBQ0osQ0FBQTtJQUNMLENBQUM7Q0FDSjtBQUVELGlCQUFTLGtCQUFrQixDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHsgQ29ubmVjdGlvblBhcmFtZXRlciB9IGZyb20gJy4vQ29ubmVjdGlvblBhcmFtZXRlcic7XHJcbmltcG9ydCB7IGdldE15c3FsQ29ubmVjdGlvbiwgTXlzcWxDb25uZWN0aW9uIH0gZnJvbSAnLi9NeXNxbENvbm5lY3Rpb24nO1xyXG5cclxuLyoqXHJcbiAqIOaVsOaNruW6k+aVsOaNruWQjOatpeW3peWFt1xyXG4gKi9cclxuY2xhc3MgRGJEYXRhU3luY2hyb25pemVyIHtcclxuXHJcbiAgICBwcml2YXRlIF9jb25uZWN0aW9uOiBNeXNxbENvbm5lY3Rpb247ICAgLy/mlbDmja7lupPov57mjqVcclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbmlbDmja7lupPov57mjqVcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGluaXQocGFyYW06IENvbm5lY3Rpb25QYXJhbWV0ZXIpIHtcclxuICAgICAgICBjb25zdCBzeW5jaHJvbml6ZXIgPSBuZXcgRGJEYXRhU3luY2hyb25pemVyKCk7XHJcbiAgICAgICAgc3luY2hyb25pemVyLl9jb25uZWN0aW9uID0gYXdhaXQgZ2V0TXlzcWxDb25uZWN0aW9uKHBhcmFtKTtcclxuICAgICAgICByZXR1cm4gc3luY2hyb25pemVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5p+l6K+i6L+c56uv5pyN5Yqh5Zmo5LiK55qE5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHN5bmMoc3FsOiBzdHJpbmcsIHBhcmFtcz86IGFueVtdKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOaMh+WumuaVsOaNruS/neWtmOeahOS9jee9rlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gZGJOYW1lIOimgeS/neWtmOWIsOacrOWcsOeahOaVsOaNruW6k+WQjeensO+8jOm7mOiupOS4juafpeivouaXtuaMh+WumueahOaVsOaNruW6k+WQjeebuOWQjFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gdGFibGVOYW1lIOimgeS/neWtmOWIsOacrOWcsOeahOihqOWQjeensO+8jOm7mOiupOS4juafpeivouaXtuaMh+WumueahOihqOWQjeebuOWQjFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdG86IChkYk5hbWU/OiBzdHJpbmcsIHRhYmxlTmFtZT86IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3luY1NxbDogc3RyaW5nOyAgICAvL+WQjOatpeaVsOaNrnNxbFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25uZWN0aW9uLnJlbW90ZS5xdWVyeShzcWwsIHBhcmFtcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdmaWVsZHMnLCBmaWVsZHMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mo4DntKLmn6Xor6Lml7bmjIflrprnmoTmlbDmja7lupPlkI3lkozooajlkI1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYk5hbWUgPT0gbnVsbCkgZGJOYW1lID0gZmllbGRzWzBdLmRiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhYmxlTmFtZSA9PSBudWxsKSB0YWJsZU5hbWUgPSBmaWVsZHNbMF0udGFibGU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3luY1NxbCA9IFwiXFxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJTlNFUlQgSU5UT2BcIisgZGJOYW1lICsgXCJgLmBcIiArIHRhYmxlTmFtZSArIFwiYFxcXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKFwiKyBmaWVsZHMubWFwKHYgPT4gXCJgXCIgKyB2Lm5hbWUgKyBcImBcIikuam9pbignLCcpICsgXCIpXFxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWQUxVRVNcXFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChcIisgZmllbGRzLm1hcCh2ID0+ICc/Jykuam9pbignLCcpICsgXCIpXFxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPTiBEVVBMSUNBVEUgS0VZIFVQREFURVxcXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIrIGZpZWxkcy5tYXAodiA9PiBcImBcIiArIHYubmFtZSArIFwiYCA9ID9cIikuam9pbignLCcpICsgXCJcXFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbigncmVzdWx0Jywgcm93ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3Rpb24ucmVtb3RlLnBhdXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29ubmVjdGlvbi5sb2NhbC5xdWVyeShzeW5jU3FsLCBbLi4uXy52YWx1ZXMocm93KSwgLi4uXy52YWx1ZXMocm93KV0sIChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3Rpb24ucmVtb3RlLmVuZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25uZWN0aW9uLmxvY2FsLmVuZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25uZWN0aW9uLnJlbW90ZS5yZXN1bWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdlbmQnLCByZXNvbHZlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgPSBEYkRhdGFTeW5jaHJvbml6ZXI7Il19
