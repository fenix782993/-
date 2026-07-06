// js/boosts.js — Управление прокачкой (кликов и энергии)
window.initBoosts = function() {
    const s = window.gameState;
    
    // Создадим простой UI внутри экрана "Earn" или прямо в консоли разработчика для теста, 
    // но логика привязана к кнопкам, если ты добавишь их в разметку
    window.buyMultitap = function() {
        const cost = Math.floor(2000 * Math.pow(2, s.tapPower - 1));
        if (s.balance >= cost) {
            s.balance -= cost;
            s.tapPower += 1;
            s.sounds.reward.play().catch(()=>{});
            alert(`🔥 Сила тапа успешно увеличена до ${s.tapPower}!`);
            window.updateUI();
        } else {
            alert(`Недостаточно монет! Нужно: 🪙 ${cost}`);
        }
    };

    window.buyEnergyMax = function() {
        const currentLevel = (s.maxEnergy - 1000) / 500 + 1;
        const cost = Math.floor(1500 * Math.pow(1.8, currentLevel));
        if (s.balance >= cost) {
            s.balance -= cost;
            s.maxEnergy += 500;
            s.energy += 500;
            s.sounds.reward.play().catch(()=>{});
            alert(`⚡ Максимум энергии увеличен до ${s.maxEnergy}!`);
            window.updateUI();
        } else {
            alert(`Недостаточно монет! Нужно: 🪙 ${cost}`);
        }
    };
};

document.addEventListener("DOMContentLoaded", () => {
    window.initBoosts();
});