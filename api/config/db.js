const mysql = require('mysql');

const conn = mysql.createPool({
    connectionLimit: 10,
    user: 'user',
    password: 'password',
    database: 'database',
    host: 'localhost'
});

let codespacedb = {};

codespacedb.badges = () => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM badges`, (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

codespacedb.onebadge = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM badges WHERE id = ?`, [id], (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

codespacedb.addbadge = (id, badgeid) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO members_collections (member_id, badge_id) VALUES (?,?)`, [id, badgeid], (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve('Add Successful');
        })
    })
};

codespacedb.collections = () => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM collections`, (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

codespacedb.onecollection = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM collections WHERE id = ?`, [id], (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

codespacedb.members = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM members_collections WHERE member_id = ?`, [id], (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

codespacedb.member = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT firstname, lastname, email FROM users WHERE id = ?`, [id], (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

codespacedb.points = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT points FROM users WHERE id = ?`, [id], (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

codespacedb.pointscheck = (id, amount) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT points FROM users WHERE id = ?`, [id], (err, results) => {
            if(err) {
                return reject(err);
            }
            const points = results[0]['points'];
            if(amount > points) {
                return resolve(false);
            } else {
                return resolve(true);
            }
        })
    })
};

codespacedb.pointsupdate = (id, amount) => {
    return new Promise((resolve, reject) => {
        conn.query(`UPDATE users SET points= ? WHERE id = ?`, [amount, id], (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve('Points Updated')
        })
    })
};

module.exports = codespacedb;