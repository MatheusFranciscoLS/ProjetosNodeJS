import React, { useState, useEffect } from "react";
import axios from "axios";

function Livro() {
  // Estados para armazenar os livros e dados do formulário
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState("");
  const [genero, setGenero] = useState("");

  // useEffect para buscar os livros da API quando o componente monta
  useEffect(() => {
    axios
      .get("http://localhost:5000/livros")
      .then((res) => {
        // Armazena os dados recebidos no estado 'livros'
        setLivros(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar os livros:", err);
      });
  }, []); // A lista de dependências vazia faz com que o useEffect seja chamado apenas uma vez, na montagem do componente

  // Função para adicionar um novo livro
  const adicionarLivro = () => {
    axios
      .post("http://localhost:5000/livros", { titulo, autor, ano, genero })
      .then((res) => {
        // Adiciona o novo livro à lista de livros no estado
        setLivros([...livros, res.data]);
        // Limpa os campos do formulário
        setTitulo("");
        setAutor("");
        setAno("");
        setGenero("");
      })
      .catch((err) => {
        console.error("Erro ao adicionar o livro:", err);
      });
  };

  return (
    <div>
      <h1>Lista de Livros</h1>
      <ul>
        {livros.map((livro) => (
          <li key={livro._id}>
            {livro.titulo} - {livro.autor} ({livro.ano}) - {livro.genero}
          </li>
        ))}
      </ul>

      <h2>Adicionar Novo Livro</h2>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Autor"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
      />
      <input
        type="number"
        placeholder="Ano"
        value={ano}
        onChange={(e) => setAno(e.target.value)}
      />
      <input
        type="text"
        placeholder="Gênero"
        value={genero}
        onChange={(e) => setGenero(e.target.value)}
      />
      <button onClick={adicionarLivro}>Adicionar Livro</button>
    </div>
  );
}

export default Livro;
