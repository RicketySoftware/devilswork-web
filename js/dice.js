// Placeholder d12 logic - ready for 3D canvas animation integration
document.getElementById('btn-roll-d12').addEventListener('click', () => {
  const display = document.getElementById('dice-display');
  
  // Quick rolling visual effect
  let rolls = 0;
  const interval = setInterval(() => {
    display.innerText = Math.floor(Math.random() * 12) + 1;
    rolls++;
    if (rolls > 10) {
      clearInterval(interval);
      const finalRoll = Math.floor(Math.random() * 12) + 1;
      display.innerText = finalRoll;
      
      if (finalRoll === 12) {
        display.style.color = '#f1c40f'; // Critical Success Gold
      } else if (finalRoll === 1) {
        display.style.color = '#a50000'; // Calamity Red
      } else {
        display.style.color = '#d4af37';
      }
    }
  }, 50);
});
