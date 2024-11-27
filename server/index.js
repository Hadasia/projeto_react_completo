const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 3001;

// Configuração do banco de dados
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    port: 3307,
    password: "",
    database: "ong", 
});


app.use(cors());
app.use(express.json()); // Permitir leitura de JSON no corpo das requisições

let records = [];

// Rota para obter todos os registros
app.get("/api/records", (req, res) => {
    const SQL = "SELECT * FROM records"; 
    db.query(SQL, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao listar registros" });
        }
        res.json(result);
    });
});

// Rota para adicionar um novo registro
app.post('/api/records', (req, res) => {
  const newRecord = req.body;
  records.push(newRecord);
  res.status(201).json(newRecord);
});



// Rota para editar um registro
app.put('/api/records/:id', (req, res) => {
  const { id } = req.params;
  const updatedRecord = req.body;
  records = records.map((record, index) => (index === parseInt(id) ? updatedRecord : record));
  res.json(updatedRecord);
});


// Rota para excluir um registro
app.delete('/api/records/:id', (req, res) => {
  const { id } = req.params;
  records = records.filter((_, index) => index !== parseInt(id));
  res.status(204).end();
});


// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

