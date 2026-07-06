// js/api.js — Логика PvP Арены без бэкенда
document.addEventListener("DOMContentLoaded", () => {
    const s = window.gameState;
    const pvpList = document.getElementById("pvp-list");
    const createBtn = document.getElementById("pvp-create");

    window.renderPvPLobby = function() {
        if(!pvpList) return;
        pvpList.innerHTML = "";

        const mockDuels = [
            { id: 1, creator: "Satoshi_Tap", bet: 5000 },
            { id: 2, creator: "GigaChad_Tapper", bet: 25000 },
            { id: 3, creator: "FenixLover", bet: 100000 }
        ];

        mockDuels.forEach(d => {
            const div = document.createElement("div");
            div.className = "leader-row";
            div.style.margin = "8px 0";
            div.innerHTML = `
                <span>⚔️ ${d.creator} (Ставка: ${d.bet.toLocaleString()})</span>
                <button class="buyCardBtn" style="background:var(--orange); color:white; border:none; padding: 4px 10px;" id="join-pvp-${d.id}">Бросить вызов</button>
            `;
            pvpList.appendChild(div);

            div.querySelector("button").addEventListener("click", () => {
                if (s.balance >= d.bet) {
                    s.balance -= d.bet;
                    alert("⚔️ Бой начинается! Сражаемся против соперника...");
                    
                    setTimeout(() => {
                        const win = Math.random() > 0.45; // 55% шанс победы игрока
                        if (win) {
                            const prize = d.bet * 2;
                            s.balance += prize;
                            s.sounds.reward.play().catch(()=>{});
                            alert(`🎉 Победа! Ты разгромил соперника и забрал банк: +${prize.toLocaleString()} 🪙`);
                        } else {
                            alert("💀 К сожалению, твой Феникс уступил в этой схватке. Попробуй еще раз!");
                        }
                        window.updateUI();
                    }, 1500);
                } else {
                    alert("Не хватает монет для участия в этой дуэли!");
                }
            });
        });
    };

    if(createBtn) {
        createBtn.addEventListener("click", () => {
            const betInput = document.getElementById("pvp-bet");
            const bet = parseInt(betInput.value);
            if (!bet || bet <= 0) return alert("Введите корректную ставку!");

            if (s.balance >= bet) {
                s.balance -= bet;
                betInput.value = "";
                window.updateUI();
                alert("⏳ Лобби создано! Ожидаем соперника...");
                
                setTimeout(() => {
                    const win = Math.random() > 0.5;
                    if(win) {
                        s.balance += (bet * 2);
                        alert(`🎉 Кто-то зашел в твою дуэль и ТЫ ВЫИГРАЛ: +${(bet*2).toLocaleString()} 🪙`);
                    } else {
                        alert("💀 Кто-то зашел в твою дуэль, и твой Феникс проиграл ставку.");
                    }
                    window.updateUI();
                }, 4000);
            } else {
                alert("Недостаточно коинов для создания ставки!");
            }
        });
    }

    // Триггер запуска рендеринга при переключении на вкладку pvp
    const oldSwitch = window.switchTab;
    window.switchTab = function(screenId) {
        oldSwitch(screenId);
        if(screenId === 'pvp') window.renderPvPLobby();
    };
});