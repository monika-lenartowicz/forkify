import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
	try {
		const id = window.location.hash.slice(1);

		if (!id) return;
		recipeView.renderSpinner();

		//  1. loading recipes
		await model.loadRecipe(id);
		// const { recipe } = model.state;
		// const res = await fetch("https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcb37");

		// 2. rendering recipe
		recipeView.render(model.state.recipe);
	} catch (error) {
		alert(error);
		recipeView.renderError();
	}
};

const controlSearchResult = async function () {
	try {
		// 1) get search query
		const query = searchView.getQuery();
		if (!query) return;

		// 2) load search results
		await model.loadSearchResults(query);

		// 3) render results
		console.log(model.state.search.results);
	} catch (error) {
		console.log(error);
	}
};

controlSearchResult();

const init = () => {
	recipeView.addHandlerRender(controlRecipes);
	searchView.addHandlerSearch(controlSearchResult);
};

init();
