// Магазин кастомных скинов за коины
window.buyPremiumSkin = function(skinName, price) {
    const s = window.gameState;
    if (s.balance >= price) {
        s.balance -= price;
        alert(`Вы успешно купили премиум-облик: ${skinName}!`);
    } else {
        alert("Вам не хватает монет для покупки этого скина.");
    }
    if(window.updateUI) window.updateUI();
}; 
