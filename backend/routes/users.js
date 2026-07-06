const express = require('express');
const router = express.Router();

// Фейковая база данных в оперативной памяти для тестов
let mockUsersDB = {};

router.post('/sync', (req, res) => {
    const { userId, balance, pph } = req.body;
    if (!userId) return res.status(400).json({ error: "Missing userId" });
    
    mockUsersDB[userId] = { userId, balance, pph, lastSeen: Date.now() };
    res.json({ success: true, saved: mockUsersDB[userId] });
});

router.get('/:id', (req, res) => {
    const user = mockUsersDB[req.params.id];
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
});

module.exports = router; 
