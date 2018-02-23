# db-data-synchronizer
一个简单的数据库数据同步工具

### 初始化连接
```javascript
const DbDataSynchronizer = require('db-data-synchronizer');

const synchronizer = await DbDataSynchronizer.init({
    remoteHost: '127.0.0.1',
    remotePort: 3306,
    remoteUser: 'root',
    remotePassword: 'root',
    localHost: 'localhost',
    localPort: 3306,
    localUser: 'root',
    localPassword: 'root'
});
```

### 同步数据
```javascript
/**
 * 将查询到的数据保存到`test`库的`tableB`表中
*/
await synchronizer.sync('select * from test.tableA').to('test', 'tableB');
```