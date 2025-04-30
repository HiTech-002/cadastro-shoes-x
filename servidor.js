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
    try {
      const { nome, senha, local, telefone, texto, plano } = req.body;
      const comando = `INSERT INTO pedido_cadastro (nome_loja, senha, localizacao, visualizacao, telefone, informacao, plano) VALUES ($1, $2, $3, false, $4, $5, $6)`;
      const valores = [nome, senha, local, telefone, texto, plano];
  
      await client.query(comando, valores);
      console.log("Dados inseridos com sucesso:", valores);
  
      res.send("Recebido com sucesso!");
    } catch (err) {
      console.error("Erro ao inserir no banco:", err);
      res.status(500).send("Erro ao inserir no banco");
    }
  });
  

export default app