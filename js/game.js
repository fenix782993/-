document.addEventListener("DOMContentLoaded", () => {
    const s = window.gameState;

    function getCurrentSkin() {
        return s.skins.find(sk => s.level >= sk.min && s.level <= sk.max) || s.skins[s.skins.length - 1];
    }

    window.updateUI = function() {
        if (s.isBanned) {
            document.body.innerHTML = "<div style='color:red; text-align:center; padding-top:30vh; font-size:20px; font-weight:bold;'>🚫 Модерация: Аккаунт заблокирован!</div>";
            return;
        }

        const skin = getCurrentSkin();
        const finalTap = Math.floor(s.tapPower * skin.mult);

        document.getElementById("user-name").innerText = s.user.first_name;
        document.getElementById("coins").innerText = Math.floor(s.balance).toLocaleString();
        document.getElementById("lvl").innerText = s.level;
        document.getElementById("stage-title").innerText = skin.name;
        document.getElementById("pph").innerText = s.pph.toLocaleString();
        document.getElementById("tap-power").innerText = finalTap;
        document.getElementById("stat-taps").innerText = s.totalTaps;
        document.getElementById("energy-val").innerText = Math.floor(s.energy);
        document.getElementById("energy-max").innerText = s.maxEnergy;

        const imgRender = document.getElementById("phoenix-img");
        if(imgRender) imgRender.alt = skin.icon;

        document.getElementById("energyFill").style.width = (s.energy / s.maxEnergy * 100) + "%";
        window.saveGame();
    };

    const tapBtn = document.getElementById("tapBtn");
    if(tapBtn) {
        tapBtn.addEventListener("click", () => {
            const skin = getCurrentSkin();
            const finalTap = Math.floor(s.tapPower * skin.mult);

            if (s.energy >= finalTap) {
                s.energy -= finalTap;
                s.balance += finalTap;
                s.totalTaps++;
                
                s.sounds.tap.currentTime = 0;
                s.sounds.tap.play().catch(()=>{});

                tapBtn.style.transform = "scale(0.93)";
                setTimeout(() => tapBtn.style.transform = "scale(1)", 60);
                window.updateUI();
            }
        });
    }

    setInterval(() => {
        s.balance += (s.pph / 3600);
        if (s.energy < s.maxEnergy) {
            s.energy = Math.min(s.maxEnergy, s.energy + 3);
        }
        window.updateUI();
    }, 1000);

    window.updateUI();
}); 
