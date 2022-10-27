const express = require('express');
const mysql = require("mysql2");
const cors = require("cors");

const app = express();


//config
app.use(express.json());
app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    })
);

let con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "0000",
    port: "3306",
    database: "workshop",
});

//select
app.get('/product', (require, response) => {

    let sql = "SELECT * FROM product";

    con.query(sql, function(err, result) {
        if (err) throw err;
        response.send(result);
        console.log(result)
    });
})

app.post('/vlados', (require, response) => {

    console.log(require.body);

    const { dateOrder, user_mail, user_name, user_phone, ...products } = require.body;
    for (let prodId in products) {

        let sql = `call insertIntoOrder(${prodId}, ${products[prodId]})`
        con.query(sql, function(err, result) {
            if (err) throw err;
            console.log(result)
        });

    }

    let usersql = `call insertIntoUser ("${user_name}", "${user_mail}", "${user_phone}")`
    con.query(usersql, function(err, result) {
        if (err) throw err;
        console.log(result)
    });

    for (let prodId in products) {

        let sql = `call insertIntoListOrder (${prodId}, ${products[prodId]},"${user_name}" ,"${user_mail}" ,"${user_phone}" ,"${dateOrder}" )`

        con.query(sql, function(err, result) {
            if (err) throw err;
            console.log(result)
        });

    }

})


//listener
app.listen(3025, () => {
    console.log("connected")
});