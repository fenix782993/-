const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Базовый роут проверки сервера
app.get('/', (req, res) => {
    res.json({ status: "working", message: "Fenix Combat API Server v1.0.0 Ready" });
});

// Пример подключения роутов пользователей
const usersRoute = require('./routes/users');
app.use('/api/users', usersRoute);

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
}); 
