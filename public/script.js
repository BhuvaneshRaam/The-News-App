const API_KEY = "ebc0f024ffe0418b9dbd4b219553528d";
const url = "api/news";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
  window.location.reload();
}

async function fetchNews(query) {
  const apiUrl = query ? `${url}?q=${query}&apiKey=${API_KEY}` : url;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`API request failed with status: ${res.status}`);
    }
    console.log("API Response:", res);
    const data = await res.json();
    console.log("Parsed Data:", data);
    bindData(data);
    console.log("Received news data:", data);
  } catch (error) {
    console.error("Error fetching news data:", error);
  }
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";

  if (articles && articles.length > 0) {
    articles.forEach((article) => {
      if (!article.urlToImage) return;

      // Clone the news card template
      const cardClone = newsCardTemplate.content.cloneNode(true);

      // Fill data in the card
      fillDataInCard(cardClone, article);

      // Append the card to the container
      cardsContainer.appendChild(cardClone);
    });
  } else {
    // Handle case when no news data is available
    cardsContainer.innerHTML = "No news articles available.";
  }
  console.log("Received news data:", articles);
}

function fillDataInCard(cardClone, article) {
  console.log("Filling data:", article);
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} · ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});
const darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", toggleDarkMode);
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");
}
