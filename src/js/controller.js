import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (module.hot) {
// 	module.hot.accept();
// }

const controlRecipes = async function () {
	try {
		const id = window.location.hash.slice(1);

		if (!id) return;
		recipeView.renderSpinner();
		// 0. update results view to mark selected search result
		resultsView.update(model.getSearchResultsPage());

		//  1. loading recipes
		await model.loadRecipe(id);

		// 2. rendering recipe
		recipeView.render(model.state.recipe);
	} catch (error) {
		recipeView.renderError();
	}
};

const controlSearchResult = async function () {
	try {
		resultsView.renderSpinner();

		// 1) get search query
		const query = searchView.getQuery();
		if (!query) return;

		// 2) load search results
		await model.loadSearchResults(query);

		// 3) render results
		// console.log(model.state.search.results);
		// resultsView.render(model.state.search.results);

		resultsView.render(model.getSearchResultsPage());

		// 4) render initial pagination buttons
		paginationView.render(model.state.search);
	} catch (error) {
		console.log(error);
	}
};

const controlPagination = function (goToPage) {
	// 1) render new results
	resultsView.render(model.getSearchResultsPage(goToPage));

	// 2) render new pagination buttons
	paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
	//update the recipe servings (in state)
	model.updatedServings(newServings);

	//update the recipe view
	// recipeView.render(model.state.recipe);
	recipeView.update(model.state.recipe);
};

const init = () => {
	recipeView.addHandlerRender(controlRecipes);
	recipeView.addHandlerUpdateServings(controlServings);
	searchView.addHandlerSearch(controlSearchResult);
	paginationView.addHandlerClick(controlPagination);
};

init();
