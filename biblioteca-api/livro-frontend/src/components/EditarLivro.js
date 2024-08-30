// EditarLivro.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditarLivro() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState("");
  const [genero, setGenero] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/livros/${id}`)
      .then((response) => {
        const { titulo, autor, ano, genero } = response.data;
        setTitulo(titulo);
        setAutor(autor);
        setAno(ano);
        setGenero(genero);
      })
      .catch((error) => console.error("Erro ao buscar o livro:", error));
  }, [id]);

  const atualizarLivro = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/livros/${id}`, { titulo, autor, ano, genero })
      .then(() => navigate("/"))
      .catch((error) => console.error("Erro ao atualizar livro:", error));
  };

  return (
    <form onSubmit={atualizarLivro}>
      <h1>Editar Livro</h1>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título"
        required
      />
      <input
        type="text"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        placeholder="Autor"
        required
      />
      <input
        type="number"
        value={ano}
        onChange={(e) => setAno(e.target.value)}
        placeholder="Ano de Publicação"
        required
      />
      <input
        type="text"
        value={genero}
        onChange={(e) => setGenero(e.target.value)}
        placeholder="Gênero"
        required
      />
      <button type="submit">Atualizar</button>
    </form>
  );
}

export default EditarLivro;
