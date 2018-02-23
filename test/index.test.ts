import expect = require('expect.js');
import DbDataSynchronizer = require('../src');

/**
 * 测试之前请先确保在数据库中创建一个`tableA`与`tableB`表，并且在A表中添加一些数据
 */

it('测试', async function () {
    this.timeout(30000);

    const synchronizer = await DbDataSynchronizer.init({
        remoteHost: 'localhost',
        remotePort: 3306,
        remoteUser: 'root',
        remotePassword: 'root',
        localHost: 'localhost',
        localPort: 3306,
        localUser: 'root',
        localPassword: 'root'
    });

    await synchronizer.sync('select * from test.tableA').to('test', 'tableB');
});