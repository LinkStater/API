const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const porta = 8080;

app.set('view engine', 'ejs');
app.use(express.json());

const db = new sqlite3.Database("Database.sqlite");

app.get("/", function (req, res) {
    res.render("index", {});
});

app.post("/enviar", function (req, res) {

    console.log(req.body);

    var sql = "INSERT INTO PRODUTOS( NOME, CATEGORIA, PRECO ) VALUES ( ?, ?, ? )";

    db.run(sql,[req.body.nome, req.body.categoria, req.body.preco], (err) => {

        if (err) res.send(err);
        else res.send("Sucesso ao inserir dados");

    });

})


app.get("/dados", (req, res) => {

db.all("SELECT * FROM PRODUTOS", (err, rows) => {
if(err) res.send({"error": err});
else res.send(rows);
})

});



function criar_tabela() {

    var sql = "CREATE TABLE IF NOT EXISTS PRODUTOS (";
    sql += "ID INTEGER PRIMARY KEY AUTOINCREMENT,";
    sql += "NOME VARCHAR(100),";
    sql += "CATEGORIA VARCHAR(50),";
    sql += "PRECO REAL(10) )";

    db.run(sql, (err) => {
        if (err) console.log(err);
    });

};

//inserir_registro();

function inserir_registro() {
    var sql = "INSERT INTO PRODUTOS (NOME, CATEGORIA, PRECO) VALUES ('ARROZ', 'ALIMENTO', 30.0)";

    db.run(sql, (err) => {
        if (err) console.log(err);
        else console.log("inserido com sucesso!!");
    })
};





app.listen(porta, console.log("Servidor rodando na porta: " + porta));



