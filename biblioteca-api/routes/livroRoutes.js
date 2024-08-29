// routes/livroRoutes.js

const express = require("express");
const router = express.Router();
const livroController = require("../controllers/livroController");

// Definindo as rotas e associando aos métodos do controller
router.post("/", livroController.criarLivro); // Criar um novo livro
router.get("/", livroController.listarLivros); // Listar todos os livros
router.get("/:id", livroController.buscarLivroPorId); // Buscar um livro por ID
router.put("/:id", livroController.atualizarLivro); // Atualizar um livro por ID
router.delete("/:id", livroController.deletarLivro); // Deletar um livro por ID

module.exports = router;
