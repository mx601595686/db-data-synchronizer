import * as mysql from 'mysql';

import { ConnectionParameter } from './ConnectionParameter';

export interface MysqlConnection {
    remote: mysql.Connection;
    local: mysql.Connection;
}

/**
 * 获取mysql连接
 */
export function getMysqlConnection(param: ConnectionParameter) {
    return new Promise<MysqlConnection>((resolve, reject) => {

        const remote = mysql.createConnection({
            multipleStatements: true,
            host: param.remoteHost,
            port: param.remotePort,
            user: param.remoteUser,
            password: param.remotePassword
        });

        const local = mysql.createConnection({
            multipleStatements: true,
            host: param.localHost,
            port: param.localPort,
            user: param.localUser,
            password: param.localPassword
        });

        remote.connect(err => {
            if (err) { reject(err); } else {
                local.connect(err => {
                    if (err) { reject(err); } else {
                        resolve({ remote, local });
                    }
                });
            }
        });
    });
}

