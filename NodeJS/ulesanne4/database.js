const mysql = require('mysql2/promise');
const updateNews = async (id, title, content) => {
  const sql = 'UPDATE news SET title = ?, content = ? WHERE id = ?';
  await pool.execute(sql, [title, content, id]);
};

// Loo ühendus andmebaasiga
const pool = mysql.createPool({
    host:'localhost',
    user:'juhanH',
    password:'php12345678!',
    database:'juhanh',
    port:3306
});

pool.getConnection((err, connection) => {
    if (err) {
        console.log(err);
        return;
    }
    else {
        console.log("a");
        return;
    }
});

// Testi ühendust andmebaasiga
async function getNews() {
await pool.query('SELECT 1');
console.log('Ühendus olemas');
}


async function getNews() {
const [rows] = await pool.query('SELECT * FROM news');
return rows;
}

async function getNewsById(id) {
const [rows] = await pool.query('SELECT * FROM news WHERE id = ?', [id]);
return rows[0];
}

async function deleteNews(id) {
    const [result] = await pool.query(
        'DELETE FROM news WHERE id = ?',
        [id]
    );

    return result.affectedRows > 0;
}

async function createNews(title, content) {
  return pool.execute('INSERT INTO news (title, content) VALUES (?, ?)',[title, content]);
}



module.exports = {
   getNews,
   getNewsById,
   deleteNews,
   createNews,
   updateNews
};

getNews();