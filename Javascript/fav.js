const favoriteCards = JSON.parse(localStorage.getItem('favoriteCards')) || [];
const container = document.querySelector('.container');
favoriteCards.forEach(cardData => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = cardData.image;
    img.alt = cardData.meal;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h2');
    title.classList.add('card-title');
    title.textContent = cardData.meal;

    const category = document.createElement('p');
    category.classList.add('card-text');
    category.textContent = `Category: ${cardData.category}`;

    const area = document.createElement('p');
    area.classList.add('card-text');
    area.textContent = `Area: ${cardData.area}`;

    cardBody.appendChild(title);
    cardBody.appendChild(category);
    cardBody.appendChild(area);

    card.appendChild(img);
    card.appendChild(cardBody);

    container.appendChild(card);
});

function resetCards() {
    localStorage.removeItem('favoriteCards');
    location.reload(); // Refresh the page to reflect changes
}