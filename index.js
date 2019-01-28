const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

var port = 2000;

var app = express({defaultErrorHandler:false});
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static('public'))


const conn = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'',
    database:'moviebertasbih',
    port:3306 
});

app.get('/', (req,res)=>{
    res.send("<center><h1>Ini Homepage</h1></center>")
})

//movies

//ambil data movies
app.get('/movies' , (req,res) => {
    var sql = 'select * from movies;'
    conn.query(sql ,(err,result)=>{
        res.send(result)
    })
})
//add new movie
app.post('/add-movie' , (req,res) => {
    var newMovie = req.body
    var sql =`insert into movies set ?`
    conn.query(sql ,newMovie,(err,result)=>{
        console.log(result)
        res.send(result)
    })
})
//edit movie
app.post('/edit-movie/:id', (req,res)=>{
    var editMovie = req.body
    var sql = `update movies set ? where id_mov = ${req.params.id}`
    conn.query(sql, editMovie,(err,result)=>{
        res.send(result)
    })
})
//delete movie
app.post('/delete-movie/:id', (req,res)=>{
    var sql = `delete from movies where id_mov = ${req.params.id}`
    conn.query(sql, (err,result)=>{
        res.send(result)
    })
    var delete2 = `delete from movcat where id_mov=${req.params.id}`;
    conn.query(delete2,(err,results)=>{
        console.log(results)
    })
})
//end movies

//-------------------------------------------------------------------------------------------------------------->

//ambil data categories
app.get('/categories' , (req,res) => {
    var sql = 'select * from categories;'
    conn.query(sql ,(err,result)=>{
        console.log(result)
        res.send(result)
    })
})

//add new categories
app.post('/add-cat' , (req,res) => {
    var newCategories = req.body
    var sql =`insert into categories set ?`
    conn.query(sql ,newCategories,(err,result)=>{
        console.log(result)
        res.send(result)
    })
})

//edit categories
app.post('/edit-cat/:id',(req,res)=>{
    var editCategories =req.body
    var sql = `update categories set ? where id_cat=${req.params.id}`
    conn.query(sql, editCategories,(err,result)=>{
        res.send(result)
    })
})
//delete categories
app.post('/delete-cat/:id',(req,res)=>{
    var sql = `delete from categories where id_cat = ${req.params.id}`
    conn.query(sql, (err,result)=>{
        res.send(result)
    })
    var delete2 = `delete from movcat where id_cat=${req.params.id}`;
    conn.query(delete2,(err,results)=>{
        console.log(results)
    })
})
//end categories

//-------------------------------------------------------------------------------------------------------------->

//menambahkan data connect movie & categories
app.post('/add-movcat' , (req,res) => {
    var newMC = req.body
    var sql =`insert into movcat set ?`
    conn.query(sql ,newMC,(err,result)=>{
        console.log(result)
        res.send(result)
    })
})
//update atau edit data movcat
app.post('/edit-movcat/:id' ,(req,res)=>{
    var editMC =req.body
    var sql = `update movcat set ? where id_mov= ${req.params.id}`
    conn.query(sql, editMC ,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})
// delete movcat
app.post('/delete-movcat/:id' ,(req,res)=>{
    var sql = `delete from movcat where id_mov = ${req.params.id}`
    conn.query(sql, (err,result)=>{
        res.send(result)
        console.log(result)
    })
})
//ambil data many to many untuk movcat
app.get('/movcat' , (req,res) => {
    var sql = 'select nm.nama as nama, ct.namacat as namacat from movcat mc join movies nm on mc.id_mov = nm.id_mov join categories ct on mc.id_cat = ct.id_cat '
    conn.query(sql ,(err,result)=>{
        console.log(result)
        res.send(result)
    })
})

//-------------------------------------------------------------------------------------------------------------->

app.listen(port, () => console.log('API Running On port ' + port))
