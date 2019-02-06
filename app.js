const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
let connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/postgres";

const { Client } = require('pg');
const client = new Client(connectionString);

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

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

app.post('/', (req, res) => {
    let user = req.body.username;
    client.query(`insert into users values('${user}')`,null,(err,user) => {
        if(err) {
            res.status(500);
            res.end();
        } else {
            res.status(200);
            console.log('aala re');
            res.end();
        }  
    });
});

client.connect()
.then(function(){
    client.query('CREATE TABLE IF NOT EXISTS users( username varchar(10))',(err,result) => {
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

