const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'myapp'
};

class UserManager {
    constructor(config) {
        this.pool = mysql.createPool(config);
    }

    async authenticate(username, password) {
        const conn = await this.getConnection();
        try {
            const [rows] = await conn.query(
                'SELECT * FROM users WHERE username = ? AND password = ?',
                [username, password]
            );
            return rows.length > 0;
        } finally {
            conn.release();
        }
    }

    async register(username, password) {
        const conn = await this.getConnection();
        try {
            const [result] = await conn.query(
                'INSERT INTO users (username, password) VALUES (?, ?)',
                [username, password]
            );
            return result.insertId;
        } finally {
            conn.release();
        }
    }

    async getUserList() {
        const conn = await this.getConnection();
        try {
            const [rows] = await conn.query('SELECT * FROM users');
            return rows;
        } finally {
            conn.release();
        }
    }

    getConnection() {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, conn) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(conn);
                }
            });
        });
    }
}

const userManager = new UserManager(config);

function getManager() {
    return userManager;
}
module.exports = getManager();
