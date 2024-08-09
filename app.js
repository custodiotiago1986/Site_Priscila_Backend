const express = require('express');
const connectToDatabase = require('./connection');
const userRouter = require('./routes/users');

const app = express();

app.use(express.json());

// Conectar ao banco de dados
connectToDatabase();

// Configurar rotas
app.use('/users', userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});