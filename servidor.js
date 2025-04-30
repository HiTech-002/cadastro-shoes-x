import express from "express"
import cors from "cors"
import pkg from "pg"

const { Client } = pkg;
const app=express()
app.use(cors());
app.use(express.json())

// Conexão com o banco de dados PostgreSQL (Neon)
const client = new Client({
    connectionString: "postgresql://shoes_x_owner:npg_wGSQCAXHs51c@ep-delicate-truth-a59lql4p-pooler.us-east-2.aws.neon.tech/shoes_x?sslmode=require",
    ssl: {
      rejectUnauthorized: false, // Para evitar problemas de SSL com o Neon
    },
  });
  
  client.connect()
    .then(() => console.log("Banco de dados conectado com sucesso!"))
    .catch(err => console.error("Erro ao conectar no banco:", err));
  
  // Rota para pegar os dados

  app.post("/manda", async (req, res) => {
    let body = req.body;
    let { nome, senha, local, telefone, texto, plano }=body
    console.log(nome);
    res.send('Recebido com sucesso!');
    let comando=`INSERT INTO pedido_cadastro (nome_loja, senha, localizacao, visualizacao, telefone,informacao, plano) VALUES ('${nome}','${senha}','${local}',false,${telefone},'${texto}','${plano}')`
    await client.query(comando)
    console.log(comando)
});

export default app