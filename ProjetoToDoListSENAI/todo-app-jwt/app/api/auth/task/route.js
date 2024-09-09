import { getTasks, createTask } from "@/controllers/TaskController";
import { NextResponse } from "next/server";

// Função para obter todas as tarefas
export async function GET(request) {
  try {
    // Chama a função para obter todas as tarefas do banco de dados
    const userId = request.user.userId;
    const tasks = await getTasks(); 
    return NextResponse.json({ success: true, data: tasks });
  } catch (error) {
    // Loga o erro se ocorrer algum problema ao obter as tarefas
    console.error("Erro ao obter tarefas:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao obter tarefas" },
      { status: 400 } // Retorna status 400 em caso de erro
    );
  }
}
// POST: criar uma nova tarefa
export async function POST(request) {
  try {
    const data = await request.json(); // Corrigido para 'request.json()'
    const task = await createTask(data);
    return NextResponse.json({ success: true, data: task });
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao criar tarefa" },
      { status: 400 }
    );
  }
}
