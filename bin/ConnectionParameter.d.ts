/**
 * 数据库 连接参数
*/
export interface ConnectionParameter {
    /**
     * 远端服务器地址
    */
    remoteHost: string;
    /**
     * 远端服务器端口
    */
    remotePort: number;
    /**
     * 远端服务器用户名
    */
    remoteUser: string;
    /**
     * 远端服务器密码
    */
    remotePassword: string;
    /**
     * 本地服务器地址
    */
    localHost: string;
    /**
     * 本地服务器端口
    */
    localPort: number;
    /**
     * 本地服务器用户名
    */
    localUser: string;
    /**
     * 本地服务器密码
    */
    localPassword: string;
}
