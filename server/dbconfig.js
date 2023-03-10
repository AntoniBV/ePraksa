const sql = require('mssql');

const dbconfig = {
    user: 'epraksa3', // better stored in an app setting such as process.env.DB_USER
    password: 'student3!,', // better stored in an app setting such as process.env.DB_PASSWORD
    server: 'dbserverstudenti.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: 'ePraksa3v3', // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}




module.exports = dbconfig;


module.exports = dbconfig;