const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;
let connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/postgres";

const { Client } = require('pg');
const client = new Client(connectionString);
let APPNAME = process.env.APPNAME;
console.log(process);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));


app.get('/user', (req, res) => {
    client.query('SELECT * from users', null, (err, result) => {
        if(err) {
            res.status(500);
            res.send(err.message);
            return;
        }
        res.json({ "users": result.rows });    
    });
    
});

app.get('/who-are-you?', (req, res) => {
    console.log('Recieve a request');
    res.send(`<h1>I'm the ${APPNAME}</h1>`);
});


app.post('/', (req, res) => {
    let username = req.body.username;
    client.query(`insert into users values('${username}')`,null,(err,username) => {
        if(err) {
            res.status(500);
            res.end();
        } else {
            res.status(200);
            res.sendfile('public/index.html');
        } 
    });
});

client.connect()
.then(function(){
    client.query('CREATE TABLE IF NOT EXISTS users(username varchar);',(err,result) => {
        if(err) {
            console.log(`Error occur while creating table ${err.message}`);
        } else {
            app.listen(PORT, () => {
                console.log(`App listening on ${PORT}`);
            });
        }
    });
        
})
.catch(function(err){
    console.log(err);
})

