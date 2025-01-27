const accessKey = "cWk8WQiZXbK1BGBq4xoRJf7SvNGC6z7iG8yeebd9FYU";

const searchForm = document.querySelector(".search-form") as HTMLFormElement;
const searchInput = document.querySelector(".search-input") as HTMLInputElement;
const searchButton = document.querySelector(
  ".search-button"
) as HTMLButtonElement;
const searchResults = document.querySelector(
  ".search-result"
) as HTMLDivElement;
const searchImgsResults = document.querySelector(
  ".search-result .imgs"
) as HTMLDivElement;
const showMoreBtn = document.querySelector(
  ".show-more-btn"
) as HTMLButtonElement;

let lightDarkModeIcon = document.querySelector(
  ".dark-light-toggle"
) as HTMLImageElement;
let keyword = "";
let page = 1;

async function searchPhotos(keyword: string, page: number) {
  keyword = searchInput.value;
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${keyword}&page=${page}&client_id=${accessKey}&per_page=12`
  );

  const data = await response.json();

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  const results = data.results;
  if (results.length === 0 && page === 1) {
    searchResults.innerHTML = "<h2>No results found</h2>";
    showMoreBtn.style.display = "none";
  } else if (results.length === 0) {
    showMoreBtn.style.display = "none";
  } else {
    results.map((result: any) => {
      const img = document.createElement("img");
      img.src = result.urls.small;
      const imgLink = document.createElement("a");
      imgLink.href = result.links.html;
      imgLink.target = "_blank";
      imgLink.appendChild(img);
      searchResults.appendChild(imgLink);
    });
    showMoreBtn.style.display = "block";
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page;
  searchPhotos(keyword, page);
});

showMoreBtn.addEventListener("click", () => {
  page++;
  searchPhotos(keyword, page);
});

// Initialize lightMode from localStorage
let lightMode: boolean = localStorage.getItem("lightMode") === "true";

// Function to toggle light and dark mode
const setLightDark = function () {
  if (lightMode) {
    lightDarkModeIcon.src = "./Images/sun.png";
    document.body.classList.add("light-theme");
  } else {
    lightDarkModeIcon.src = "./Images/moon.png";
    document.body.classList.remove("light-theme");
  }
};

// Event listener for light/dark mode toggle
lightDarkModeIcon.addEventListener("click", () => {
  lightMode = !lightMode;
  localStorage.setItem("lightMode", lightMode.toString());
  setLightDark();
});

// Initial call to set the correct mode on page load
setLightDark();
