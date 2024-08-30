import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListaLivros() {
  const [livros, setLivros] = useState([]);
  const [livrosFiltrados, setLivrosFiltrados] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/livros")
      .then((response) => {
        setLivros(response.data);
        setLivrosFiltrados(response.data);
      })
      .catch((error) => console.error("Erro ao buscar os livros:", error));
  }, []);

  useEffect(() => {
    setLivrosFiltrados(
      livros.filter((livro) =>
        livro.titulo.toLowerCase().includes(busca.toLowerCase())
      )
    );
  }, [busca, livros]);

  const deletarLivro = (id) => {
    axios
      .delete(`http://localhost:5000/livros/${id}`)
      .then(() => setLivros(livros.filter((livro) => livro._id !== id)))
      .catch((error) => console.error("Erro ao deletar o livro:", error));
  };

  return (
    <div>
      <h1>Lista de Livros</h1>
      <Link to="/novo">Adicionar Novo Livro</Link>
      <input
        type="text"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Pesquisar livros"
      />
      <ul>
        {livrosFiltrados.map((livro) => (
          <li key={livro._id}>
            <span>
              {livro.titulo} - {livro.autor}
            </span>
            <div className="actions">
              <Link to={`/editar/${livro._id}`} className="editar-btn">
                Editar
              </Link>
              <button onClick={() => deletarLivro(livro._id)}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaLivros;
