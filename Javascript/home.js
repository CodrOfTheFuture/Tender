const cardContainer = document.querySelector('.card-container');

// Function to fetch meal data from the API based on search term
async function fetchMealData(searchTerm = '') {
    let url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    if (searchTerm) {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    if (data.meals) {
        return data.meals[0];
    } else {
        alert('No meals found for the provided search term.');
        return null;
    }
}

// Function to create a card with meal data based on search input
async function createCard(searchTerm = '') {
    const mealData = await fetchMealData(searchTerm);
    if (!mealData) return; // If no data is returned, exit the function

    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = mealData.strMealThumb; // Image source from API
    img.alt = mealData.strMeal;

    const caption = document.createElement('div');
    caption.classList.add('caption');
    caption.innerHTML = `
        <h2>${mealData.strMeal}</h2>
        <p>Category: ${mealData.strCategory}</p>
        <p>Area: ${mealData.strArea}</p>
    `;

    card.appendChild(img);
    card.appendChild(caption);
    cardContainer.appendChild(card);

    // Event listener for swiping right
    card.addEventListener('click', () => {
        swipeCard(card, 'right');
    });

    // Event listener for swiping left
    card.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        swipeCard(card, 'left');
    });
}

// Function to handle swipe animation
function swipeCard(card, direction) {
    card.classList.add(direction === 'right' ? 'swipe-right' : 'swipe-left');

    if (direction === 'right') {
        // Store favorite card data in localStorage
        const favoriteCards = JSON.parse(localStorage.getItem('favoriteCards')) || [];
        const cardData = {
            meal: card.querySelector('h2').innerText,
            category: card.querySelector('p:nth-of-type(1)').innerText,
            area: card.querySelector('p:nth-of-type(2)').innerText,
            image: card.querySelector('img').src
        };
        favoriteCards.push(cardData);
        localStorage.setItem('favoriteCards', JSON.stringify(favoriteCards));
    }

    setTimeout(() => {
        card.remove();
    }, 500);

    createCard();
}

// Event listener for search input
const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim();
    cardContainer.innerHTML = ''; // Clear previous cards
    if (searchTerm) {
        createCard(searchTerm); // Create card based on search term
    } else {
        createCard(); // Create random card if search term is empty
    }
});

// Initial card creation (random meal)
createCard();

// Event listener for arrow key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const currentCard = document.querySelector('.card');
        swipeCard(currentCard, e.key === 'ArrowLeft' ? 'left' : 'right');
    }
});

// Event listener for video instructions button
document.querySelector('.video-instructions-button').addEventListener('click', async () => {
    const mealData = await fetchMealData();
    const youtubeLink = mealData.strYoutube;
    window.open(youtubeLink, '_blank');
});

// Event listener for text instructions button
document.querySelector('.text-instructions-button').addEventListener('click', async () => {
    const mealData = await fetchMealData();
    const instructions = mealData.strInstructions;
    document.getElementById('textInstructionsContent').innerText = instructions;
    openPopup();
});

// Function to open the popup for text instructions
function openPopup() {
    document.getElementById('textInstructionsPopup').style.display = 'flex';
}

// Function to close the popup
function closePopup() {
    document.getElementById('textInstructionsPopup').style.display = 'none';
}

// Function to view favorite cards
function viewFavorites() {
    window.open('fav.html', '_self');
}