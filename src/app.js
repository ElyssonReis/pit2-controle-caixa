const express = require('express');
const path = require('path');
const caixaRoutes = require('./routes/caixaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', caixaRoutes);

app.use((req, res) => {
    res.status(404).send('<h1>404 - Página não encontrada</h1><a href="/">Voltar ao início</a>');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
