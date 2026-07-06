window.renderSkins = function() {
    const s = window.gameState;
    const container = document.getElementById("skins-container");
    if(!container) return;
    container.innerHTML = "";

    s.skins.forEach(sk => {
        const opened = s.level >= sk.min;
        const div = document.createElement("div");
        div.className = `skin-item ${!opened ? 'locked' : ''}`;
        div.innerHTML = `
            <div style="font-size:26px">${opened ? sk.icon : '🔒'}</div>
            <div style="font-size:11px; font-weight:bold;">${sk.name}</div>
            <div style="font-size:9px; color:var(--text-muted)">Lvl ${sk.min}+</div>
        `;
        container.appendChild(div);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    const s = window.gameState;

    const checkBtn = document.getElementById("check-secret-btn");
    if(checkBtn) {
        checkBtn.addEventListener("click", () => {
            if (document.getElementById("secret-input").value === "webFenix1221") {
                window.switchTab("admin");
                document.getElementById("secret-input").value = "";
            } else {
                alert("Неверный ключ доступа разработчика!");
            }
        });
    }

    const bind = (id, cb) => {
        const el = document.getElementById(id);
        if(el) el.addEventListener("click", cb);
    };

    bind("adm-g-1m", () => { s.balance += 1000000; window.updateUI(); });
    bind("adm-g-100m", () => { s.balance += 100000000; window.updateUI(); });
    bind("adm-t-1m", () => { s.balance = Math.max(0, s.balance - 1000000); window.updateUI(); });
    bind("adm-clear-c", () => { s.balance = 0; window.updateUI(); });
    bind("adm-max-l", () => { s.level = 600; window.updateUI(); window.renderSkins(); });
    bind("adm-min-l", () => { s.level = 1; window.updateUI(); window.renderSkins(); });
    bind("adm-add-t", () => { s.totalTaps += 10000; window.updateUI(); });
    bind("adm-x2-t", () => { s.tapPower *= 2; window.updateUI(); });
    bind("adm-inf-e", () => { s.maxEnergy = 100000; s.energy = 100000; window.updateUI(); });
    bind("adm-add-pph", () => { s.pph += 50000; window.updateUI(); });
    bind("adm-mass", () => { s.balance += 50000; window.updateUI(); alert("Массовый бонус роздан!"); });
    bind("adm-ban", () => { s.isBanned = !s.isBanned; window.updateUI(); });

    bind("adm-create-p", () => {
        const name = document.getElementById("adm-p-name").value.trim().toUpperCase();
        const gift = parseInt(document.getElementById("adm-p-gift").value);
        if (name && gift) { s.sysPromos[name] = gift; alert(`Промокод ${name} создан!`); }
    });
    bind("adm-wipe-p", () => { s.sysPromos = {}; alert("Все промокоды удалены."); });

    bind("adm-reset", () => {
        if(confirm("Вы уверены, что хотите сбросить ВСЕ данные?")) {
            localStorage.clear();
            location.reload();
        }
    });

    bind("adm-back-btn", () => window.switchTab("profile"));
}); 
