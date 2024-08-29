const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const livroRoutes = require("./routes/livroRoutes");
require("dotenv").config();
require("./config/database"); // Conectando ao banco de dados

const app = express();

// Middlewares
app.use(bodyParser.json());

// Habilitando CORS para permitir que o front-end interaja com a API
app.use(cors());

// Rotas
app.use("/livros", livroRoutes);

// Exportando a aplicação configurada
module.exports = app;
