const apiKey = 'G37gLaEizhTkiBREF1bLvhKf1kKCAPhC';
const searchEndpoint = 'https://api.giphy.com/v1/gifs/search';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const gifContainer = document.getElementById('gif-container');

async function fetchGIFs(query) {
    const response = await fetch(`${searchEndpoint}?q=${query}&api_key=${apiKey}`);
    const data = await response.json();
    return data.data;
}

function createLikeButton() {
    const likeButton = document.createElement('button');
    likeButton.classList.add('like-button');
    likeButton.innerHTML = '<i class="far fa-heart"></i> Like';
    return likeButton;
}

function createShareButton(gifUrl) {
    const shareButton = document.createElement('button');
    shareButton.classList.add('share-button');
    shareButton.innerHTML = '<i class="fas fa-share"></i> Share';

    shareButton.addEventListener('click', () => {
        window.open(gifUrl, '_blank');
    });

    return shareButton;
}

function displayGIFs(gifs) {
    gifContainer.innerHTML = '';

    gifs.forEach(gif => {
        const gifBox = document.createElement('div');
        gifBox.classList.add('gif-box');

        const gifImage = document.createElement('img');
        gifImage.src = gif.images.fixed_height.url;

        const likeButton = createLikeButton();

        const shareButton = createShareButton();

        gifBox.appendChild(gifImage);
        gifBox.appendChild(likeButton);
        gifBox.appendChild(shareButton);
        gifContainer.appendChild(gifBox);
    });
}

searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (query) {
        try {
            const gifs = await fetchGIFs(query);
            displayGIFs(gifs);
        } catch (error) {
            console.error('Error fetching GIFs:', error);
        }
    }
});