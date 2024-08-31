const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configuração do pool de conexão com o PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
});

app.use(express.json());

// Rota para criar um novo jogador
app.post('/jogadores', async (req, res) => {
  const { nome, email, senha_hash } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO Jogadores (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, senha_hash]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Rota para obter todos os jogadores
app.get('/jogadores', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Jogadores');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Rota para obter um jogador pelo ID
app.get('/jogadores/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM Jogadores WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Jogador não encontrado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Rota para atualizar um jogador
app.put('/jogadores/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha_hash } = req.body;
  try {
    const result = await pool.query(
      'UPDATE Jogadores SET nome = $1, email = $2, senha_hash = $3 WHERE id = $4 RETURNING *',
      [nome, email, senha_hash, id]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Jogador não encontrado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Rota para deletar um jogador
app.delete('/jogadores/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM Jogadores WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Jogador deletado com sucesso' });
    } else {
      res.status(404).json({ error: 'Jogador não encontrado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
