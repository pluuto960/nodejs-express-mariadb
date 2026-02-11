console.log('START');

const mysql = require('mysql2/promise');

async function testPool() {
  try {
    console.log('Enne ühendust');

    const pool = mysql.createPool({
      host: 'localhost',
      user: 'juhanH',
      password: 'php12345678!',
      database: 'juhanh'
    });

    const [rows] = await pool.query('SELECT 1');
    console.log('Ühendus olemas:', rows);

  } catch (err) {
    console.error('VIGA:', err);
  }
}

testPool();