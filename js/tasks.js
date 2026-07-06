document.addEventListener("DOMContentLoaded", () => {
    const s = window.gameState;

    const actBtn = document.getElementById("activate-promo-btn");
    if(actBtn) {
        actBtn.addEventListener("click", () => {
            const val = document.getElementById("promo-input").value.trim().toUpperCase();
            if(!val) return;

            if (s.usedPromos.includes(val)) {
                alert("Этот промокод уже использован на аккаунте!");
                return;
            }

            if (s.sysPromos[val]) {
                s.balance += s.sysPromos[val];
                s.usedPromos.push(val);
                s.sounds.reward.play().catch(()=>{});
                document.getElementById("promo-input").value = "";
                window.updateUI();
                alert(`Успешно! Начислено +${s.sysPromos[val].toLocaleString()} 🪙`);
            } else {
                alert("Такого промокода нет!");
            }
        });
    }
}); 
