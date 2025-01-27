"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const accessKey = "cWk8WQiZXbK1BGBq4xoRJf7SvNGC6z7iG8yeebd9FYU";
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const searchResults = document.querySelector(".search-result");
const searchImgsResults = document.querySelector(".search-result .imgs");
const showMoreBtn = document.querySelector(".show-more-btn");
let lightDarkModeIcon = document.querySelector(".dark-light-toggle");
let keyword = "";
let page = 1;
function searchPhotos(keyword, page) {
    return __awaiter(this, void 0, void 0, function* () {
        keyword = searchInput.value;
        const response = yield fetch(`https://api.unsplash.com/search/photos?query=${keyword}&page=${page}&client_id=${accessKey}&per_page=12`);
        const data = yield response.json();
        if (page === 1) {
            searchResults.innerHTML = "";
        }
        const results = data.results;
        if (results.length === 0 && page === 1) {
            searchResults.innerHTML = "<h2>No results found</h2>";
            showMoreBtn.style.display = "none";
        }
        else if (results.length === 0) {
            showMoreBtn.style.display = "none";
        }
        else {
            results.map((result) => {
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
    });
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
let lightMode = localStorage.getItem("lightMode") === "true";
// Function to toggle light and dark mode
const setLightDark = function () {
    if (lightMode) {
        lightDarkModeIcon.src = "./Images/sun.png";
        document.body.classList.add("light-theme");
    }
    else {
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
