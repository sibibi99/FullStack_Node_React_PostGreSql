var express = require('express');
var router = express.Router();

// Add PG Pool
const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sanpham',
  password: 'Sidaica123',
  port: 5432,
})

/* GET home page. */
router.get('/', function(req, res, next) {
  // Đưa vào trang chủ
  pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
  })  
  res.render('index', { title: 'Express' });
});
// API Get Data From PostGreSQL
router.get('/getdata01', function(req, res, next) {
  // Get Data
  pool.query('SELECT * FROM product_info', (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res.rows);      
    }
    pool.end()
  }) 
  res.render('index', { title: 'Get Data from PostGreSQL' });
});
module.exports = router;
