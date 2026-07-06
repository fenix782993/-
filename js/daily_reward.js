// js/daily_reward.js — Ежедневные подарки (Day 1 - Day 7)
window.claimDailyReward = function() {
    const s = window.gameState;
    const now = Date.now();
    const lastClaim = localStorage.getItem(`fenix_last_daily_${s.user.id}`);
    const streak = parseInt(localStorage.getItem(`fenix_daily_streak_${s.user.id}`) || "0");

    const oneDay = 24 * 60 * 60 * 1000; // 24 часа в мс

    if (lastClaim) {
        const timePassed = now - parseInt(lastClaim);
        if (timePassed < oneDay) {
            const timeLeft = Math.ceil((oneDay - timePassed) / (60 * 60 * 1000));
            alert(`⏳ Награда уже получена! Возвращайся через ${timeLeft} ч.`);
            return;
        }
        
        // Если прошло больше 48 часов — стрик сбрасывается
        if (timePassed > (oneDay * 2)) {
            localStorage.setItem(`fenix_daily_streak_${s.user.id}`, "0");
        }
    }

    // Рассчитываем день награды (от 1 до 7)
    const currentStreak = parseInt(localStorage.getItem(`fenix_daily_streak_${s.user.id}`) || "0");
    const nextDay = (currentStreak % 7) + 1;

    // Массив наград
    const rewards = [500, 1000, 2500, 5000, 15000, 25000, 100000];
    const prize = rewards[nextDay - 1];

    s.balance += prize;
    localStorage.setItem(`fenix_last_daily_${s.user.id}`, now.toString());
    localStorage.setItem(`fenix_daily_streak_${s.user.id}`, nextDay.toString());
    
    s.sounds.reward.play().catch(()=>{});
    alert(`🎁 День ${nextDay} забран! Награда: +${prize.toLocaleString()} 🪙`);
    window.updateUI();
};