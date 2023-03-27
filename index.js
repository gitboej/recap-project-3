import { createCharacterCard } from "./components/card/card.js";
import { createButton } from "./components/nav-button/nav-button.js";
import { createPagination } from "./components/nav-pagination/nav-pagination.js";
import { createSearchBar } from "./components/search-bar/search-bar.js";
const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);

const navigation = document.querySelector('[data-js="navigation"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";


const prevButton = createButton("previous", () => {
  if (page <= 1) return;
  page--;
  fetchCharacters();

});

const nextButton = createButton("next", () => {
  if (page >= maxPage) return;
  page++;
  fetchCharacters();
});

const pagination = createPagination();
const searchBar = createSearchBar((event) => {
  event.preventDefault();
  searchQuery = event.target.elements.query.value;
  page = 1;
  fetchCharacters();
});

navigation.append(prevButton, pagination, nextButton);
searchBarContainer.append(searchBar);
fetchCharacters();


async function fetchCharacters() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
    );
    const data = await response.json();
    maxPage = data.info.pages;
    pagination.textContent = `${page} / ${maxPage}`;
    cardContainer.innerHTML = "";
    const results = data.results;
    results
      .map(createCharacterCard)
      .forEach((card) => cardContainer.append(card));
  } catch (error) {
    console.error(error);
  }
}
