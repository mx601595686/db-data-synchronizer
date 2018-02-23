import expect = require('expect.js');
import DbDataSynchronizer = require('../src');

/**
 * 测试之前请先确保在数据库中创建一个`tableA`与`tableB`表，并且在A表中添加一些数据
 */

describe('test', function () {
    this.timeout(30000);
    let synchronizer: DbDataSynchronizer;

    before(async function () {
        synchronizer = await DbDataSynchronizer.init({
            remoteHost: 'localhost',
            remotePort: 3306,
            remoteUser: 'root',
            remotePassword: 'root',
            localHost: 'localhost',
            localPort: 3306,
            localUser: 'root',
            localPassword: 'root'
        });
    });

    it('测试1', async function () {  
        await synchronizer.sync('select * from test.tableA').to('test', 'tableB');
    });

    it('测试2', async function () {  
        await synchronizer.sync('select * from test.tableA').to();
    });
});