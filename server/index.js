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


// Rota para obter registros
app.get('/api/records', (req, res) => {
  res.json(records);
});

// Rota para adicionar um novo registro
app.post('/api/records', (req, res) => {
  const newRecord = req.body;
  records.push(newRecord);
  res.status(201).json(newRecord);
});

// Rota para excluir um registro
app.delete('/api/records/:index', (req, res) => {
  const { index } = req.params;
  records.splice(index, 1);
  res.status(204).send();
});

// Rota para editar um registro
app.put('/api/records/:index', (req, res) => {
  const { index } = req.params;
  const updatedRecord = req.body;
  records[index] = updatedRecord;
  res.json(updatedRecord);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
