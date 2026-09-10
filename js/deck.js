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
      <img src="assets/cards/deck-item/0-item-card-back.png" alt="Item Deck Back" style="border-radius: 10px;">
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

function createCardElement(imagePath, showUseButton = false) {
  const cardEl = document.createElement('div');
  cardEl.className = 'card';

  const img = document.createElement('img');
  img.src = imagePath;
  img.alt = "Devil's Work Card";
  cardEl.appendChild(img);

  if (showUseButton) {
    const useBtn = document.createElement('button');
    useBtn.className = 'btn-use';
    useBtn.innerText = 'Use Item';
    useBtn.onclick = () => {
      cardEl.remove();
      const itemContainer = document.getElementById('item-container');
      if (itemContainer.children.length === 0) {
        itemContainer.innerHTML = itemPlaceholderHTML;
      }
    };
    cardEl.appendChild(useBtn);
  }

  return cardEl;
}

document.getElementById('btn-character').addEventListener('click', () => {
  if (!deckData) return;

  const slotHeart = document.getElementById('slot-heart');
  const slotKin = document.getElementById('slot-kin');
  const slotClass = document.getElementById('slot-class');

  slotHeart.innerHTML = '';
  slotKin.innerHTML = '';
  slotClass.innerHTML = '';

  const heartImg = DECK_FOLDERS.heart + getRandomFilename(deckData.heart);
  const kinImg = DECK_FOLDERS.kin + getRandomFilename(deckData.kin);
  const classImg = DECK_FOLDERS.class + getRandomFilename(deckData.class);

  slotHeart.appendChild(createCardElement(heartImg));
  slotKin.appendChild(createCardElement(kinImg));
  slotClass.appendChild(createCardElement(classImg));
});

document.getElementById('btn-item').addEventListener('click', () => {
  if (!deckData) return;

  const itemContainer = document.getElementById('item-container');
  const placeholder = document.getElementById('item-placeholder');
  
  if (placeholder) {
    placeholder.remove();
  }

  const itemImg = DECK_FOLDERS.item + getRandomFilename(deckData.item);
  itemContainer.appendChild(createCardElement(itemImg, true));
});
