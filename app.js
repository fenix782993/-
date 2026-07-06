// Инициализация глобального стейта игры
const tgApp = window.Telegram?.WebApp;
if (tgApp) tgApp.expand();
const userSchema = tgApp?.initDataUnsafe?.user || { id: 77777, first_name: "WebFenix" };

window.gameState = {
    user: userSchema,
    balance: 0,
    pph: 0,
    level: 1,
    energy: 1000,
    maxEnergy: 1000,
    tapPower: 1,
    totalTaps: 0,
    cards: {},
    usedPromos: [],
    isBanned: false,
    sysPromos: { "START2026": 25000, "WEBFENIX": 100000 },
    
    skins: [
        { min: 1, max: 10, name: "Яйцо Феникса", icon: "🥚", mult: 1.0 },
        { min: 11, max: 50, name: "Птенец", icon: "🐥", mult: 1.4 },
        { min: 51, max: 150, name: "Молодой Ястреб", icon: "🦅", mult: 2.0 },
        { min: 151, max: 350, name: "Огненный Феникс", icon: "🔥", mult: 3.5 },
        { min: 351, max: 600, name: "Бессмертный Лорд", icon: "👑", mult: 6.0 }
    ],
    
    sounds: {
        tap: new Audio('assets/sounds/tap.mp3'),
        reward: new Audio('assets/sounds/reward.mp3')
    }
};

window.saveGame = function() {
    if (window.gameState.isBanned) return;
    localStorage.setItem(`fenix_v3_${window.gameState.user.id}`, JSON.stringify(window.gameState));
};

// Загрузка локальных сохранений
const memory = localStorage.getItem(`fenix_v3_${window.gameState.user.id}`);
if (memory) {
    Object.assign(window.gameState, JSON.parse(memory));
}

// Переключение разделов
window.switchTab = function(screenId) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));

    const elScreen = document.getElementById(`screen-${screenId}`);
    if(elScreen) elScreen.classList.add("active");
    
    const elBtn = document.querySelector(`.nav-btn[data-target="${screenId}"]`);
    if (elBtn) elBtn.classList.add("active");

    if (screenId === 'mine' && window.renderCards) window.renderCards();
    if (screenId === 'profile' && window.renderSkins) window.renderSkins();
    if (screenId === 'rank' && window.renderLeaderboard) window.renderLeaderboard();
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            window.switchTab(btn.getAttribute("data-target"));
        });
    });
    setTimeout(() => {
        if(document.getElementById("loader")) document.getElementById("loader").style.display = "none";
    }, 400);
}); 
