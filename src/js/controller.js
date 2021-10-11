import * as model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultView from './view/resultView.js';
import bookMarkView from './view/bookMarkView.js';
import addRecipeView from './view/addRecipeView.js';
import paginationView from './view/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { MODAL_CLOUSE_SEC } from './config.js';

const controlRecipe = async function () {
  try {
    // Taking hash ID
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // Update result in bookmark
    bookMarkView.update(model.state.bookMarks);

    // Update result view to mark selected
    resultView.update(model.getSearchResultsPage());

    // 1. Loading recipe
    await model.loadRecipe(id);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    // 1. Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Load search results
    await model.loadSearchResults(query);

    // 3. Render results
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultsPage());

    // 4. Render initial pagination button
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1. Render NEW results
  resultView.render(model.getSearchResultsPage(goToPage));

  // 4. Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServing = function (newServings) {
  // Update the recipe serving (in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookMark = function () {
  // Add or remove bookmark
  if (!model.state.recipe.bookMark) {
    model.addBookMark(model.state.recipe);
    // console.log(model.state.recipe);
  } else {
    model.deleteBookMark(model.state.recipe.id);
  }
  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookMarkView.render(model.state.bookMarks);
};

const controlBookMark = function () {
  bookMarkView.render(model.state.bookMarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    // Render Recipe
    recipeView.render(model.state.recipe);

    // Success method
    addRecipeView.renderMessage();

    // Render bookmark view
    bookMarkView.render(model.state.bookMarks);

    // Change ID in URL
    window.history.pushState(null, '', `${model.state.recipe.id}`);
    

    // Close form window
    setTimeout(() => {
      // addRecipeView.toggleWindow();
    }, MODAL_CLOUSE_SEC * 1000);
    console.log(model.state.recipe);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookMarkView.addHandlerRender(controlBookMark);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerBookMark(controlAddBookMark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
// Showing recipe when the hash has been changed
// window.addEventListener('hashchange', controlRecipe);
// Showing recipe when browser has loaded
// window.addEventListener('load', controlRecipe);
