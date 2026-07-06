// js/cards.js
window.marketCards = [
    { id: "farm", name: "Bitcoin Farm", cost: 35000, pph: 2430, cat: "market", icon: "🪙" },
    { id: "node", name: "Ethereum Node", cost: 28000, pph: 1890, cat: "market", icon: "💎" },
    { id: "hub", name: "Solana Hub", cost: 22000, pph: 1450, cat: "market", icon: "⚡" },
    { id: "legal", name: "Legal Dept.", cost: 18000, pph: 1200, cat: "legal", icon: "⚖️" },
    { id: "marketing", name: "Marketing", cost: 15000, pph: 980, cat: "team", icon: "📢" },
    { id: "security", name: "Security Team", cost: 12000, pph: 850, cat: "team", icon: "🛡️" },
    { id: "c150", name: "#150 Card", cost: 50000, pph: 3000, cat: "legal", icon: "🔒" },
    { id: "c300", name: "#300 Card", cost: 75000, pph: 4500, cat: "legal", icon: "🔒" },
    { id: "c600", name: "#600 Card", cost: 120000, pph: 8000, cat: "team", icon: "🔒" }
];

window.renderCards = function(filter = "all") {
    const s = window.gameState;
    const grid = document.getElementById("cards-grid");
    if(!grid) return;
    grid.innerHTML = "";

    window.marketCards.forEach(c => {
        if (filter !== "all" && c.cat !== filter) return;
        const lvl = s.cards[c.id] || 0;
        
        const card = document.createElement("div");
        card.className = `mine-card ${c.icon === '🔒' ? 'locked' : ''}`;
        card.innerHTML = `
            <div style="font-size:24px; margin-bottom:4px;">${c.icon}</div>
            <h4>${c.name}</h4>
            <p>Lvl ${lvl || 1}</p>
            <p style="color:#2ecc71; font-size:10px;">+${c.pph}/ч</p>
            <button class="buyCardBtn">🪙 ${c.cost.toLocaleString()}</button>
        `;
        grid.appendChild(card);
    });
};