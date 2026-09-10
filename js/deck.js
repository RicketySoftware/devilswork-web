let deckData = null;

// HTML structure for the inventory empty state placeholder
const itemPlaceholderHTML = `
  <div id="item-placeholder" class="card placeholder" style="width: 100%; max-width: 520px; height: auto; min-height: 140px;">
    <p><strong>NO CURSED ITEMS HELD</strong></p>
    <p style="margin-top: 8px;">In each "room" there are a number of interactions of interest presented to the players, each one either rewards the players with items or progresses the story[cite: 1]. You will meet other weirdos during the story, helping them may result in earning a cursed item card[cite: 1].</p>
  </div>
`;

fetch('data/cards.json')
  .then(response => response.json())
  .then(data => {
    deckData = data;
  })
  .catch(error => console.error('Error loading cards.json:', error));

function getRandomCard(deckArray) {
  const randomIndex = Math.floor(Math.random() * deckArray.length);
  return deckArray[randomIndex];
}

function createCardElement(cardData, showUseButton = false) {
  const cardEl = document.createElement('div');
  cardEl.className = 'card';

  const img = document.createElement('img');
  img.src = cardData.image;
  img.alt = "Devil's Work Card";
  cardEl.appendChild(img);

  if (showUseButton) {
    const useBtn = document.createElement('button');
    useBtn.className = 'btn-use';
    useBtn.innerText = 'Use Item';
    useBtn.onclick = () => {
      cardEl.remove();
      // If no cards remain in inventory, show the placeholder again
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

  slotHeart.appendChild(createCardElement(getRandomCard(deckData.heart)));
  slotKin.appendChild(createCardElement(getRandomCard(deckData.kin)));
  slotClass.appendChild(createCardElement(getRandomCard(deckData.class)));
});

document.getElementById('btn-item').addEventListener('click', () => {
  if (!deckData) return;

  const itemContainer = document.getElementById('item-container');
  
  // Remove empty state placeholder if present before adding item
  const placeholder = document.getElementById('item-placeholder');
  if (placeholder) {
    placeholder.remove();
  }

  const itemCard = getRandomCard(deckData.item);
  itemContainer.appendChild(createCardElement(itemCard, true));
});
