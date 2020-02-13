import { elements } from './base';

export const getInput = () => elements.searchInput.value

export const clearInput = () => { elements.searchInput.value = ''; }

export const clearResult = () => { elements.searchResList.innerHTML = ''; }

const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  let lengthAccumulator = 0;

  if (title.length > limit) {
    for (let word of title.split(' ')) {
      lengthAccumulator += word.length;
      if (lengthAccumulator <= limit)  newTitle.push(word);
      else break;
    }
    return `${newTitle.join(' ')} ...`;
  }

  return title;
}

const renderRecipe = recipe => {
  const markup = `
    <li>
      <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
          <img src=${recipe.image_url} alt=${recipe.title}>
        </figure>
        <div class="results__data">
          <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
          <p class="results__author">${recipe.publisher}</p>
        </div>
      </a>
    </li>
  `;

  elements.searchResList.insertAdjacentHTML("beforeend", markup);
}

export const renderResults = recipes => {
  recipes.forEach(renderRecipe);
}