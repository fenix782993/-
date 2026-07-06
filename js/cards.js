window.marketCards = [
    { id: "farm", name: "Bitcoin Farm", cost: 1000, pph: 80, cat: "market" },
    { id: "node", name: "Solana Node", cost: 5000, pph: 450, cat: "market" },
    { id: "law", name: "Лицензия ЕС", cost: 8000, pph: 700, cat: "legal" },
    { id: "team", name: "Топ Разработчик", cost: 15000, pph: 1500, cat: "team" }
];

window.renderCards = function(filter = "all") {
    const s = window.gameState;
    const grid = document.getElementById("cards-grid");
    if(!grid) return;
    grid.innerHTML = "";

    window.marketCards.forEach(c => {
        if (filter !== "all" && c.cat !== filter) return;
        const lvl = s.cards[c.id] || 0;
        const cost = Math.floor(c.cost * Math.pow(1.6, lvl));
        const pphGain = Math.floor(c.pph * Math.pow(1.3, lvl));

        const card = document.createElement("div");
        card.className = "mine-card";
        card.innerHTML = `
            <h4>${c.name}</h4>
            <p>Lvl ${lvl} | +${pphGain}/ч</p>
            <button class="buyCardBtn" ${s.balance < cost ? 'disabled' : ''}>🪙 ${cost.toLocaleString()}</button>
        `;

        card.querySelector("button").addEventListener("click", () => {
            if (s.balance >= cost) {
                s.balance -= cost;
                s.cards[c.id] = lvl + 1;
                s.pph += pphGain;
                s.sounds.reward.play().catch(()=>{});
                window.renderCards(filter);
                window.updateUI();
            }
        });
        grid.appendChild(card);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".tab-sub").forEach(tab => {
        tab.addEventListener("click", (e) => {
            document.querySelectorAll(".tab-sub").forEach(b => b.classList.remove("active"));
            e.currentTarget.classList.add("active");
            window.renderCards(e.currentTarget.getAttribute("data-cat"));
        });
    });
}); 
