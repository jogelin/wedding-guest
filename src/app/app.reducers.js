"use strict";
/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
var store_1 = require("@ngrx/store");
var environment_1 = require("../environments/environment");
/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
var compose_1 = require("@ngrx/core/compose");
/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
var ngrx_store_freeze_1 = require("ngrx-store-freeze");
/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
var fromGuest = require("./guest/guest.reducer");
var reselect_1 = require('reselect');
/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
var reducers = {
    guests: fromGuest.reducer
};
var developmentReducer = compose_1.compose(ngrx_store_freeze_1.storeFreeze, store_1.combineReducers)(reducers);
var productionReducer = store_1.combineReducers(reducers);
function reducer(state, action) {
    if (environment_1.environment.production) {
        return productionReducer(state, action);
    }
    else {
        return developmentReducer(state, action);
    }
}
exports.reducer = reducer;
/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `books` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.booksState$ = state$.select(getBooksState);
 * 	}
 * }
 * ```
 */
exports.guestsState = function (state) { return state.guests; };
/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * Once again our compose function comes in handy. From right to left, we
 * first select the books state then we pass the state to the book
 * reducer's getBooks selector, finally returning an observable
 * of search results.
 *
 * Share memoizes the selector functions and publishes the result. This means
 * every time you call the selector, you will get back the same result
 * observable. Each subscription to the resultant observable
 * is shared across all subscribers.
 */
exports.guestsSelector = reselect_1.createSelector(exports.guestsState, fromGuest.getGuests);
exports.guestsLoadingSelector = reselect_1.createSelector(exports.guestsState, fromGuest.getLoading);
