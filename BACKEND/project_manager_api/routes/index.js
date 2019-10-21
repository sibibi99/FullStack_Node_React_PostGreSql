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
router.get('/', function(req, res, next) {});
// API Get Data From PostGreSQL
router.get('/getdata01', function(req, res, next) {
  
  // Khi đã add Proxy rồi không cần dùng Access Control nữa
  // // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // // Request methods you wish to allow
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // // Request headers you wish to allow
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // // Set to true if you need the website to include cookies in the requests sent
  // // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);

  // Querry Data
  pool.query('SELECT * FROM product_info', (error, response) => {
    if (error) {
      console.log(error);
    } else {
      // console.log(res.rows);    
      res.send(response.rows); 
    }
    // pool.end();
  }) 
});

/* Thêm Mới DỮ liệu */
router.get('/add', function(req, res, next) {
  res.render('add', {});
});
/* Action Thêm Mới DỮ liệu */
router.post('/add', function(req, res, next) {

  // Hứng Biến Từ Form
  var product_name = req.body.product_name,
      product_price = req.body.product_price,
      image = req.body.image;

  // Gọi Pool Query
  pool.query("INSERT INTO product_info (product_name, product_price, image) values ($1,$2,$3)",
  [product_name, product_price, image], (err, response)=> {
    if (err) {
      res.send(err)
      res.send(0)
    }
    else {
      res.send(1)
    }
  })
});

module.exports = router;
