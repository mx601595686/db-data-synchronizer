"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
/**
 * 获取mysql连接
 */
function getMysqlConnection(param) {
    return new Promise((resolve, reject) => {
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
            if (err) {
                reject(err);
            }
            else {
                local.connect(err => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve({ remote, local });
                    }
                });
            }
        });
    });
}
exports.getMysqlConnection = getMysqlConnection;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk15c3FsQ29ubmVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUErQjtBQVMvQjs7R0FFRztBQUNILDRCQUFtQyxLQUEwQjtJQUN6RCxNQUFNLENBQUMsSUFBSSxPQUFPLENBQWtCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBRXBELE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztZQUNsQyxrQkFBa0IsRUFBRSxJQUFJO1lBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsVUFBVTtZQUN0QixJQUFJLEVBQUUsS0FBSyxDQUFDLFVBQVU7WUFDdEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxVQUFVO1lBQ3RCLFFBQVEsRUFBRSxLQUFLLENBQUMsY0FBYztTQUNqQyxDQUFDLENBQUM7UUFFSCxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsa0JBQWtCLEVBQUUsSUFBSTtZQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLFNBQVM7WUFDckIsSUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFTO1lBQ3JCLElBQUksRUFBRSxLQUFLLENBQUMsU0FBUztZQUNyQixRQUFRLEVBQUUsS0FBSyxDQUFDLGFBQWE7U0FDaEMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNqQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDaEIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQUMsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDNUIsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7b0JBQy9CLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUE3QkQsZ0RBNkJDIiwiZmlsZSI6Ik15c3FsQ29ubmVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG15c3FsIGZyb20gJ215c3FsJztcclxuXHJcbmltcG9ydCB7IENvbm5lY3Rpb25QYXJhbWV0ZXIgfSBmcm9tICcuL0Nvbm5lY3Rpb25QYXJhbWV0ZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNeXNxbENvbm5lY3Rpb24ge1xyXG4gICAgcmVtb3RlOiBteXNxbC5Db25uZWN0aW9uO1xyXG4gICAgbG9jYWw6IG15c3FsLkNvbm5lY3Rpb247XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5ZteXNxbOi/nuaOpVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE15c3FsQ29ubmVjdGlvbihwYXJhbTogQ29ubmVjdGlvblBhcmFtZXRlcikge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPE15c3FsQ29ubmVjdGlvbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCByZW1vdGUgPSBteXNxbC5jcmVhdGVDb25uZWN0aW9uKHtcclxuICAgICAgICAgICAgbXVsdGlwbGVTdGF0ZW1lbnRzOiB0cnVlLFxyXG4gICAgICAgICAgICBob3N0OiBwYXJhbS5yZW1vdGVIb3N0LFxyXG4gICAgICAgICAgICBwb3J0OiBwYXJhbS5yZW1vdGVQb3J0LFxyXG4gICAgICAgICAgICB1c2VyOiBwYXJhbS5yZW1vdGVVc2VyLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogcGFyYW0ucmVtb3RlUGFzc3dvcmRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgbG9jYWwgPSBteXNxbC5jcmVhdGVDb25uZWN0aW9uKHtcclxuICAgICAgICAgICAgbXVsdGlwbGVTdGF0ZW1lbnRzOiB0cnVlLFxyXG4gICAgICAgICAgICBob3N0OiBwYXJhbS5sb2NhbEhvc3QsXHJcbiAgICAgICAgICAgIHBvcnQ6IHBhcmFtLmxvY2FsUG9ydCxcclxuICAgICAgICAgICAgdXNlcjogcGFyYW0ubG9jYWxVc2VyLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogcGFyYW0ubG9jYWxQYXNzd29yZFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZW1vdGUuY29ubmVjdChlcnIgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB7IHJlamVjdChlcnIpOyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbG9jYWwuY29ubmVjdChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHsgcmVqZWN0KGVycik7IH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoeyByZW1vdGUsIGxvY2FsIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuIl19
