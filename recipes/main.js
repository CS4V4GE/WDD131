import recipes from "./recipes.mjs";

const recipesGrid = document.querySelector("#recipesGrid");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function getRandomListEntry(list) {
  if (!list.length) return null;
  const index = getRandomNumber(list.length);
  return list[index];
}

function tagsTemplate(tags) {
  if (!tags || !tags.length) return "";
  const items = tags.map(tag => `<li>${tag}</li>`).join("");
  return `<ul class="recipe__tags">${items}</ul>`;
}

function ratingTemplate(rating) {
  let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
    } else {
      html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
    }
  }
  html += `</span>`;
  return html;
}

function recipeTemplate(recipe) {
  const tagsHtml = tagsTemplate(recipe.tags);
  const ratingHtml = ratingTemplate(recipe.rating);
  return `<figure class="recipe">
    <img src="${recipe.image}" alt="${recipe.imageAlt}">
    <figcaption>
      ${tagsHtml}
      <h2><a href="#">${recipe.name}</a></h2>
      <p class="recipe__ratings">
        ${ratingHtml}
      </p>
      <p class="recipe__description">
        ${recipe.description}
      </p>
    </figcaption>
  </figure>`;
}

function renderRecipes(recipeList) {
  if (!recipesGrid) return;
  if (!recipeList.length) {
    recipesGrid.innerHTML = "<p>No recipes found. Try another search.</p>";
    return;
  }
  const html = recipeList.map(recipeTemplate).join("");
  recipesGrid.innerHTML = html;
}

function filterRecipes(query) {
  if (!query) return recipes.slice().sort((a, b) => a.name.localeCompare(b.name));
  const q = query.toLowerCase();
  const filtered = recipes.filter(recipe => {
    const inName = recipe.name.toLowerCase().includes(q);
    const inDescription = recipe.description && recipe.description.toLowerCase().includes(q);
    const inTags = recipe.tags && recipe.tags.find(tag => tag.toLowerCase().includes(q));
    const inIngredients = recipe.ingredients && recipe.ingredients.find(ing => ing.toLowerCase().includes(q));
    return inName || inDescription || inTags || inIngredients;
  });
  return filtered.sort((a, b) => a.name.localeCompare(b.name));
}

function searchHandler(event) {
  event.preventDefault();
  const query = searchInput ? searchInput.value.trim() : "";
  const list = filterRecipes(query);
  renderRecipes(list);
}

function init() {
  const recipe = getRandomListEntry(recipes);
  if (recipe) {
    renderRecipes([recipe]);
  }
  if (searchForm) {
    searchForm.addEventListener("submit", searchHandler);
  }
}

init();
