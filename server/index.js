const { Client, Pool } = require('pg');

const client = new Client({
    connectionString: 'postgresql://ecommerce_owner:9tiYE6WOMCwI@ep-long-bar-a59th2o0.us-east-2.aws.neon.tech/ecommerce?sslmode=require'
});

const pool = new Pool({ 
    host: 'localhost',
    user: 'postgres', 
    password: '1234', 
    database: 'mmo_rpg', 
    port: '5432'
})

// testa a conexao com o BD a partir de um query simples
pool.query('SELECT * FROM jogadores', (erro, resultado) => { 
    if(erro) { 
        console.log(erro)
    } else { 
        console.log(resultado.rows)
    }
})