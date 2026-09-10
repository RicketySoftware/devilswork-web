let deckData = null;

fetch('cards.json')
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
  img.alt = "LOREM_CARD_IMAGE_ALT";
  cardEl.appendChild(img);

  if (showUseButton) {
    const useBtn = document.createElement('button');
    useBtn.className = 'btn-use';
    useBtn.innerText = 'Use Item';
    useBtn.onclick = () => cardEl.remove();
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
  const itemCard = getRandomCard(deckData.item);

  itemContainer.appendChild(createCardElement(itemCard, true));
});
