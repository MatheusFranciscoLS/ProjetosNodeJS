import { updateTask, deleteTask } from "@/controllers/TaskController";
import { NextResponse } from "next/server";

// Atualizar uma tarefa
export async function PUT(request, { params }) {
  try {
    // Extrai os dados do corpo da requisição
    const data = await request.json();

    // Chama a função para atualizar a tarefa com base no ID e dados fornecidos
    const task = await updateTask(params.id, data);

    // Verifica se a tarefa foi encontrada e atualizada
    if (!task) {
      return NextResponse.json(
        { success: false, message: "Tarefa não encontrada" },
        { status: 404 } // Retorna status 404 se a tarefa não for encontrada
      );
    }

    // Retorna a resposta de sucesso com os dados atualizados da tarefa
    return NextResponse.json({ success: true, data: task });
  } catch (error) {
    // Loga o erro ocorrido durante a atualização da tarefa
    console.error("Erro ao atualizar tarefa:", error);

    // Retorna a resposta de erro com status 400
    return NextResponse.json(
      { success: false, message: "Erro ao atualizar tarefa" },
      { status: 400 }
    );
  }
}

// Deletar uma tarefa
export async function DELETE(request, { params }) {
  try {
    // Chama a função para deletar a tarefa com base no ID fornecido
    const deletedTask = await deleteTask(params.id);

    // Verifica se a tarefa foi deletada com sucesso
    if (!deletedTask.deletedCount) {
      return NextResponse.json(
        { success: false, message: "Tarefa não encontrada" },
        { status: 404 } // Retorna status 404 se a tarefa não for encontrada
      );
    }

    // Retorna a resposta de sucesso com mensagem de confirmação
    return NextResponse.json({
      success: true,
      message: "Tarefa deletada com sucesso",
    });
  } catch (error) {
    // Loga o erro ocorrido durante a exclusão da tarefa
    console.error("Erro ao deletar tarefa:", error);

    // Retorna a resposta de erro com status 400
    return NextResponse.json(
      { success: false, message: "Erro ao deletar tarefa" },
      { status: 400 }
    );
  }
}
