// Система ачивок за тапы и баланс
window.checkAchievements = function() {
    const s = window.gameState;
    if (s.totalTaps >= 1000 && !s.usedPromos.includes("ACH_TAP_1K")) {
        s.balance += 10000;
        s.usedPromos.push("ACH_TAP_1K");
        alert("🏆 Достижение: Сделано 1,000 тапов! Награда: +10,000 коинов.");
    }
    if (s.balance >= 1000000 && !s.usedPromos.includes("ACH_MILLIONAIRE")) {
        s.usedPromos.push("ACH_MILLIONAIRE");
        alert("🏆 Достижение: Коиновый миллионер! Вы накопили первый 1,000,000.");
    }
}; 
