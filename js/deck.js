let deckData = null;

const DECK_FOLDERS = {
  heart: 'assets/cards/deck-heart/',
  kin: 'assets/cards/deck-kin/',
  class: 'assets/cards/deck-class/',
  item: 'assets/cards/deck-item/'
};

const itemPlaceholderHTML = `
  <div id="item-placeholder" class="card placeholder-item" style="display: flex; gap: 16px; align-items: center; width: 100%; max-width: 580px; height: auto; padding: 12px; background-color: var(--bg-card); border: 1px dashed var(--bg-card-border); border-radius: 12px;">
    <div class="card" style="width: 140px; height: 210px; flex-shrink: 0; padding: 0;">
      <div class="card-inner">
        <div class="card-back">
          <img src="assets/cards/deck-item/item-cardback.png" alt="Item Deck Back" style="border-radius: 10px;">
        </div>
      </div>
    </div>
    <div>
      <h3 style="color: var(--accent-gold); margin-bottom: 6px; font-size: 1.1rem;">NO CURSED ITEMS HELD</h3>
      <p style="font-size: 0.85rem; line-height: 1.4; color: var(--text-muted); margin: 0;">In each "room" there are a number of interactions of interest presented to the players, each one either rewards the players with items or progresses the story. You will meet other weirdos during the story, helping them may result in earning a cursed item card.</p>
    </div>
  </div>
`;

fetch('data/cards.json')
  .then(response => response.json())
  .then(data => {
    deckData = data;
  })
  .catch(error => console.error('Error loading cards.json:', error));

function getRandomFilename(filenameArray) {
  const randomIndex = Math.floor(Math.random() * filenameArray.length);
  return filenameArray[randomIndex];
}

function updateCharacterSlot(slotId, imagePath) {
  const slot = document.getElementById(slotId);
  const card = slot.querySelector('.card');
  const frontImg = card.querySelector('.card-front img');

  if (card.classList.contains('flipped')) {
    // Unflip to show cardback first
    card.classList.remove('flipped');
    
    // Swap image at flip midpoint (300ms), then flip face-up
    setTimeout(() => {
      frontImg.src = imagePath;
      card.classList.add('flipped');
    }, 300);
  } else {
    // First flip from static cardback
    frontImg.src = imagePath;
    setTimeout(() => {
      card.classList.add('flipped');
    }, 50);
  }
}

function createItemCardElement(imagePath) {
  const cardEl = document.createElement('div');
  cardEl.className = 'card';

  cardEl.innerHTML = `
    <div class="card-inner">
      <div class="card-back">
        <img src="assets/cards/deck-item/item-cardback.png" alt="Item Deck Back">
      </div>
      <div class="card-front">
        <img src="${imagePath}" alt="Cursed Item Card">
        <button class="btn-use">Use Item</button>
      </div>
    </div>
  `;

  const useBtn = cardEl.querySelector('.btn-use');
  useBtn.onclick = (e) => {
    e.stopPropagation();
    // Unflip card before removing from DOM
    cardEl.classList.remove('flipped');
    setTimeout(() => {
      cardEl.remove();
      const itemContainer = document.getElementById('item-container');
      if (itemContainer.children.length === 0) {
        itemContainer.innerHTML = itemPlaceholderHTML;
      }
    }, 300);
  };

  return cardEl;
}

document.getElementById('btn-character').addEventListener('click', () => {
  if (!deckData) return;

  const heartImg = DECK_FOLDERS.heart + getRandomFilename(deckData.heart);
  const kinImg = DECK_FOLDERS.kin + getRandomFilename(deckData.kin);
  const classImg = DECK_FOLDERS.class + getRandomFilename(deckData.class);

  updateCharacterSlot('slot-heart', heartImg);
  updateCharacterSlot('slot-kin', kinImg);
  updateCharacterSlot('slot-class', classImg);
});

document.getElementById('btn-item').addEventListener('click', () => {
  if (!deckData) return;

  const itemContainer = document.getElementById('item-container');
  const placeholder = document.getElementById('item-placeholder');
  
  if (placeholder) {
    placeholder.remove();
  }

  const itemImg = DECK_FOLDERS.item + getRandomFilename(deckData.item);
  const itemCard = createItemCardElement(itemImg);
  itemContainer.appendChild(itemCard);

  // Trigger flip animation after insertion
  setTimeout(() => {
    itemCard.classList.add('flipped');
  }, 50);
});
