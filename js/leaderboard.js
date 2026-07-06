window.renderLeaderboard = function() {
    const container = document.getElementById("leaderboard-list");
    if(!container) return;

    const topList = [
        { name: "🥇 CryptoWhale", lvl: 582, coins: "999.4M" },
        { name: "🥈 FenixKing", lvl: 430, coins: "43.2M" },
        { name: "🥉 Blockchainer", lvl: 312, coins: "15.2M" },
        { name: `⚡ Вы (${window.gameState.user.first_name})`, lvl: window.gameState.level, coins: Math.floor(window.gameState.balance).toLocaleString() }
    ];

    container.innerHTML = "";
    topList.forEach(item => {
        const row = document.createElement("div");
        row.className = "leader-row";
        row.innerHTML = `<span>${item.name} (Lvl ${item.lvl})</span> <strong>${item.coins}</strong>`;
        container.appendChild(row);
    });
}; 
