import { recipes } from "./recipes.mjs";

const recipesGrid = document.querySelector("#recipesGrid");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");

function createRatingStars(rating) {
  const span = document.createElement("span");
  span.className = "rating";
  span.setAttribute("role", "img");
  span.setAttribute("aria-label", `Rating: ${rating} out of 5 stars`);
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.setAttribute("aria-hidden", "true");
    if (i <= rating) {
      star.className = "icon-star";
      star.textContent = "⭐";
    } else {
      star.className = "icon-star-empty";
      star.textContent = "☆";
    }
    span.appendChild(star);
  }
  return span;
}

function buildRecipeCard(recipe) {
  const card = document.createElement("article");
  card.className = "recipe-card";

  const media = document.createElement("div");
  media.className = "recipe-media";
  const img = document.createElement("img");
  img.src = recipe.image;
  img.alt = recipe.imageAlt;
  media.appendChild(img);

  const body = document.createElement("div");
  body.className = "recipe-body";

  const headerRow = document.createElement("div");
  headerRow.className = "recipe-header-row";

  const title = document.createElement("h3");
  title.className = "recipe-title";
  title.textContent = recipe.name;

  const meta = document.createElement("div");
  meta.className = "recipe-meta";

  const timeSpan = document.createElement("span");
  const timeLabel = document.createElement("span");
  timeLabel.textContent = "Time:";
  const timeValue = document.createElement("span");
  timeValue.textContent = recipe.time;
  timeSpan.append(timeLabel, timeValue);

  const servingsSpan = document.createElement("span");
  const servingsLabel = document.createElement("span");
  servingsLabel.textContent = "Serves:";
  const servingsValue = document.createElement("span");
  servingsValue.textContent = recipe.servings;
  servingsSpan.append(servingsLabel, servingsValue);

  const ratingSpan = createRatingStars(recipe.rating);

  meta.append(timeSpan, servingsSpan, ratingSpan);

  headerRow.append(title, meta);

  const description = document.createElement("p");
  description.className = "recipe-description";
  description.textContent = recipe.description;

  const hr = document.createElement("hr");
  hr.className = "recipe-separator";

  const detailsWrapper = document.createElement("div");
  detailsWrapper.className = "recipe-details";

  const ingredientsDiv = document.createElement("div");
  ingredientsDiv.className = "recipe-ingredients";

  const ingredientsTitle = document.createElement("h4");
  ingredientsTitle.className = "recipe-section-title";
  ingredientsTitle.textContent = "Ingredients";

  const ingredientsList = document.createElement("ul");
  recipe.ingredients.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ingredientsList.appendChild(li);
  });

  ingredientsDiv.append(ingredientsTitle, ingredientsList);

  const stepsDiv = document.createElement("div");
  stepsDiv.className = "recipe-steps";

  const stepsTitle = document.createElement("h4");
  stepsTitle.className = "recipe-section-title";
  stepsTitle.textContent = "Directions";

  const stepsList = document.createElement("ol");
  recipe.steps.forEach(step => {
    const li = document.createElement("li");
    li.textContent = step;
    stepsList.appendChild(li);
  });

  stepsDiv.append(stepsTitle, stepsList);

  detailsWrapper.append(ingredientsDiv, stepsDiv);

  body.append(headerRow, description, hr, detailsWrapper);

  card.append(media, body);
  return card;
}

function renderRecipes(list) {
  recipesGrid.innerHTML = "";
  if (!list.length) {
    const p = document.createElement("p");
    p.textContent = "No recipes found. Try a different search term.";
    recipesGrid.appendChild(p);
    return;
  }
  list.forEach(recipe => {
    const card = buildRecipeCard(recipe);
    recipesGrid.appendChild(card);
  });
}

function handleSearch(event) {
  event.preventDefault();
  const term = searchInput.value.trim().toLowerCase();
  if (!term) {
    renderRecipes(recipes);
    return;
  }
  const filtered = recipes.filter(recipe => {
    const nameMatch = recipe.name.toLowerCase().includes(term);
    const ingredientMatch = recipe.ingredients.some(ing =>
      ing.toLowerCase().includes(term)
    );
    return nameMatch || ingredientMatch;
  });
  renderRecipes(filtered);
}

renderRecipes(recipes);
searchForm.addEventListener("submit", handleSearch);
