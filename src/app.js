const express = require('express');
const path = require('path');
const caixaRoutes = require('./routes/caixaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do View Engine (EJS - Camada View do MVC)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares para leitura de formulários
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas da aplicação
app.use('/', caixaRoutes);

// Tratamento de rota não encontrada (404)
app.use((req, res) => {
    res.status(404).send('<h1>404 - Página não encontrada</h1><a href="/">Voltar ao início</a>');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
