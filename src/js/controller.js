import recipeView from './views/recipeView.js';
import * as model from './model.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

///////////////////////////////////////
// control recipes
const controlRecipes = async function () {
  try {
    // 0) getting id
    const id = window.location.hash.slice(1);

    if (!id) return;
    // 1) rendering spinner
    recipeView.renderSpinner();

    // 2) results view to mark selected search results

    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    // 3) loading recipe through id
    await model.loadRecipe(id);
    // 4) render recipe view
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

// control search results
const controlSearchResults = async function () {
  try {
    // 1) rendering spinner
    resultsView.renderSpinner();
    // 2) loading search results
    const query = searchView.getQuery();
    await model.loadSearchResults(query);
    // 3) rendering results and result view also pagination
    resultsView.render(model.getSearchResultsPage(1));
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};
// controling click pagination

const controlPagination = function (goTo) {
  // rendering new View results

  resultsView.render(model.getSearchResultsPage(goTo));
  // rendering new pagination
  paginationView.render(model.state.search);
};
// controlling servings

const controlServings = function (newServings) {
  // updating serving and recipe view
  model.updateServings(newServings);

  recipeView.update(model.state.recipe);
};

// control bookmarks

const controlAddBookmarks = function () {
  // 1) add/delete bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // 2) update bookmarks
  recipeView.update(model.state.recipe);
  // 3) render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

// bookmarks

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

// adding recipe data
const ControlAddRecipe = async function (recipe) {
  try {
    // 1) render spinner

    addRecipeView.renderSpinner();
    // 2) Upload the new recipe data

    await model.uploadRecipe(recipe);

    // Render recipe
    recipeView.render(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);

    // render success message
    addRecipeView.renderMessage();
    // id problem

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
    console.error(err);
  }
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerAddBookmark(controlAddBookmarks);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  addRecipeView.addHandlerUpload(ControlAddRecipe);
};
init();
