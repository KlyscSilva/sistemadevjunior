const express = require('express');
const mysql = require('mysql');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');


app.use(express.urlencoded({ extended: true}));


// criando middleware para carregar o css
app.use(express.static("src"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do MySQL

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '101521ba',
  database: 'silva'
});



// Conexão com o MySQL
connection.connect((error) => {
  if (error) {
    console.log('Erro ao conectar com o MySQL:', error);
  } else {
    console.log('Conexão com o MySQL estabelecida com sucesso!');
  }
});


app.get('/', (req,res) =>{
    res.sendFile(__dirname + "/src/home/index.html"); 
})

app.post('/cadastro', (req, res) => {

  const { name, email, password} = req.body;
  
  const sql = `INSERT INTO usuarios1 (name, email, password) VALUES ('${name}', '${email}', '${password}')`;
 

  connection.query(sql, (error, result) => {
    if (error) {
      console.log('Erro ao cadastrar usuário:', error);
      res.status(500).send('Erro ao cadastrar usuário');
    } else {
      console.log('Usuário cadastrado com sucesso!');

      res.status(200).send('Usuário cadastrado com sucesso!');
      
    }
  });
}); 


// rota de cadastro
app.get('/cadastro', (req, res) => {
  res.sendFile(__dirname + "/src/Create-account/index.html"); 
});


// criando rota para validar o envio de login do formulário que está no banco

// Rota para lidar com o envio do formulário de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Consulta SQL para selecionar o usuário pelo nome de usuário
  const sql = `SELECT * FROM silva.usuarios1 WHERE email = ? AND password = ?`;
  connection.query(sql, [email, password], (error, results) => {
    if (error) {
      throw error;
    }
  
    if (results.length > 0) {
      const user = results[0];
  
      // Senha válida, redireciona o usuário para a página principal
      res.sendFile(__dirname + "/src/Sobre/index.html");
    } else {
      // E-mail ou senha inválidos, mostra uma mensagem de erro na tela de login
      res.send('E-mail ou senha inválidos!');
    }
  });
});




// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('✅Servidor iniciado na porta 3000!✅');
});

module.exports = server;
