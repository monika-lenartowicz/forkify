import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

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
	}
};

const init = () => {
	recipeView.addHandlerRender(controlRecipes);
};

init();
