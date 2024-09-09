import User from "@/models/User";
import connectMongo from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // Corrige a importação

export async function POST(request) {
  try {
    const { username, password } = await request.json(); // Aguarda o JSON ser extraído
    await connectMongo();

    // Verifica se o usuário existe
    const user = await User.findOne({ username });
    
    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json({ success: false, message: "Credenciais inválidas" }, { status: 400 });
    }

    // Gera o token de autenticação
    const token = jwt.sign(
      { userId: user._id }, // Correção no campo user._id
      process.env.JWT_SECRET, // Usa a chave secreta do JWT
      { expiresIn: '1h' } // Token expira em 1 hora
    );

    // Retorna a resposta com o token
    return NextResponse.json({ success: true, token }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Erro no servidor" },
      { status: 500 }
    );
  }
}
