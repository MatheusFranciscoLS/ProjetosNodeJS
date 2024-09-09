import mongoose from "mongoose";
const DATABASE_URL = process.env.DATABASE_URL;
//verificação

if (!DATABASE_URL){
  throw new Error(
    'Por favor, defina a variavel DATABASE_URL no arquivo .env.local'
  );
}
const connectMongo = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB", err);
    throw new Error("Falha ao conectar ao MongoDB");
  }
};

export default connectMongo;
