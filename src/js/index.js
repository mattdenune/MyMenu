import Search from './models/Search';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import Recipe from './models/Recipe';

// forkify - api.herokuapp.com 

// Recipe.js
// const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);

/** ---Global state of the app---
 * -Search object
 * -Current recipe object
 * -Shopping list object
 * -Liked recipes
 */

const state = {};


// --- SEARCH CONTROLLER ---
const controlSearch = async () => {
    //1. Get query from view
    // const query = searchView.getInput().toString();
    const query = 'pizza';



    if (query) {
        //2. New search object and add it to state
        state.search = new Search(query);

        //3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {

            //4. Search for recipes
            await state.search.getResults();
            
            //5. Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);

        } catch(error) {
            alert('Something went srong with your search...');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// TESTING
window.addEventListener('load', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
})

// --- RECIPE CONTROLLER ---

const controlRecipe = async () => {
    // Get id from url
    const id = window.location.hash.replace('#', '');
    console.log(id)

    if (id) {
        // Prepare UI for changes


        // Create new recipe objects
        state.recipe = new Recipe(id);

        // TESTING
        window.r = state.recipe;

        try{
            // Get recipe data
            await state.recipe.getRecipe();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            
            // Render recipe
            console.log(state.recipe);

        } catch (error) {
            alert('Error processing recipe!');
        }    
    
    }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));