import Search from './models/Search';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';

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

const controlSearch = async () => {
    //1. Get query from view
    const query = searchView.getInput().toString();
    // console.log(query);


    if (query) {
        //2. New search object and add it to state
        state.search = new Search(query);

        //3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);


        //4. Search for recipes
        await state.search.getResults();

        //5. Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();

});


// const search = new Search('pizza');
// console.log(search);
// search.getResults();
