// API key setting
const API_KEY = "joFNnJ94gEbJ3SvwO1W08WNy6teGYRhi";
const gifContainer = document.getElementById("gif-container");
let searchQuery = "";
let offset = 0;

// Function for requesting GIFs
async function fetchGifs(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error("Error while requesting GIF:", error);
  }
}

// Loading trending GIFs on start
async function loadTrending() {
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=12&offset=${offset}`;
  const data = await fetchGifs(url);
  renderGifs(data.data);
}

// Function for displaying GIFs in a container
function renderGifs(gifs) {
  gifs.forEach(gif => {
    const img = document.createElement("img");
    img.src = gif.images.fixed_height.url;
    gifContainer.appendChild(img);
  });
}

// Function for searching GIFs
async function searchGifs() {
  offset = 0;
  searchQuery = document.getElementById("search").value;
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchQuery}&limit=12&offset=${offset}`;
  const data = await fetchGifs(url);
  gifContainer.innerHTML = ""; //Clearing the container before a new search
  renderGifs(data.data);
  document.getElementById("load-more").style.display = "block"; //Show the "Load More" button so that the user can load additional GIFs
}

// Function for downloading more GIFs
async function loadMore() {
  offset += 12;
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchQuery}&limit=12&offset=${offset}`;
  const data = await fetchGifs(url);
  renderGifs(data.data);
}

// Loading trending GIFs
loadTrending();

// Adding event listeners to buttons
document.getElementById("searchGifs").addEventListener("click", searchGifs);
document.getElementById("load-more").addEventListener("click", loadMore);
