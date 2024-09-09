import jwt from "jsonwebtoken"; // Importa a biblioteca JWT para trabalhar com tokens.
import { NextResponse } from "next/server"; // Importa a classe NextResponse para manipular respostas em middlewares do Next.js.

// Função middleware que intercepta as requisições.
export async function middleware(request) {
  // Obtém o token da requisição a partir do cabeçalho Authorization.
  const token = request.headers.get("Authorization")?.split(" ")[1];

  // Se não houver token, redireciona o usuário para a página de login.
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Tenta verificar e decodificar o token utilizando a chave secreta JWT.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Adiciona o usuário decodificado no objeto da requisição.
    request.user = decoded;
  } catch (error) {
    // Se a verificação falhar (token inválido ou expirado), redireciona para a página de login.
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se o token for válido, permite que a requisição continue para a próxima etapa.
  return NextResponse.next();
}

// Configuração do middleware para definir os caminhos que ele irá interceptar.
export const config = {
  matcher: ["/api/tasks/:path*", "/tasks/:path*"], // O middleware será aplicado às rotas que correspondem a esses padrões.
};
