let config = {
    api : {
        PORT : process.env.API_PORT || 3000,
    },
    mysql : {
        host: process.env.MYSQL_HOST || 'localhost' ,
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASS || "",
        database: process.env.MYSQL_DB || 'characters-api',
        port: process.env.MYSQL_PORT || 3306,
    },
    mysql_service : {
        PORT: process.env.MYSQL_SERVICE_PORT || 3001,
    },
    secure: {
        TOKEN: process.env.SECURE_TOKEN || 'not_a_token',
    },
    posts_service : {
        PORT: process.env.POSTS_SERVICE_PORT || 3002,
    },
}


export default config;
