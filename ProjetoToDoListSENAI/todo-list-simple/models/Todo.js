// Importa o módulo mongoose, que é uma biblioteca ODM (Object Data Modeling) para MongoDB
import mongoose from "mongoose";

// Define o esquema (schema) para a coleção "Todo", que irá determinar a estrutura dos documentos dessa coleção
const TodoSchema = new mongoose.Schema({
  // Campo 'title' para armazenar o título da tarefa
  title: {
    type: String, // O tipo de dado é uma string (texto)
    required: true, // Este campo é obrigatório, ou seja, um título deve ser fornecido
  },
  // Campo 'completed' para indicar se a tarefa foi concluída ou não
  completed: {
    type: Boolean, // O tipo de dado é booleano (verdadeiro ou falso)
    default: false, // O valor padrão para 'completed' é false (não concluído)
  },
});

// Exporta o modelo "Todo" para ser utilizado em outras partes da aplicação
// mongoose.models.Todo verifica se o modelo já existe para evitar recriação acidental
export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
