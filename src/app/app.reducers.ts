/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import {ActionReducer, combineReducers} from '@ngrx/store';
import {environment} from '../environments/environment';
/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import {compose} from '@ngrx/core/compose';
/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import {storeFreeze} from 'ngrx-store-freeze';
/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromGuest from './modules/guest/guest.reducer';
import * as fromFilter from './modules/filter/filter.reducer';
import * as fromReport from './modules/report/report.reducer';
import {createSelector} from 'reselect';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
    guest: fromGuest.State;
    filter: fromFilter.State;
    report: fromReport.State;
}


/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
    guest: fromGuest.reducer,
    filter: fromFilter.reducer,
    report: fromReport.reducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
    if (environment.production) {
        return productionReducer(state, action);
    } else {
        return developmentReducer(state, action);
    }
}


//GUEST
export const getGuestState = (state: State) => state.guest;

export const getGuestList = createSelector(getGuestState, fromGuest.getGuestList);
export const getGuestListLoading = createSelector(getGuestState, fromGuest.getLoading);

export const getGuestListTags = createSelector(getGuestList, guestList => {
    const tags = new Set<string>();
    guestList.forEach(guestListItem =>
        guestListItem.guests.forEach(guest =>
            guest.tags.forEach(tag => tags.add(tag)))
    );
    return Array.from(tags);
});

//FILTER
export const getFilterState = (state: State) => state.filter;

export const getFilterFilteredIds = createSelector(getFilterState, fromFilter.getFilteredIds);
export const getFilterQuery = createSelector(getFilterState, fromFilter.getQuery);
export const getFilterLoading = createSelector(getFilterState, fromFilter.getFiltering);

//REPORT
export const getReportState = (state: State) => state.report;

export const getReport = createSelector(getReportState, fromReport.getReport);
export const getReportHeaders = createSelector(getReportState, fromReport.getReportHeaders);
export const getReportRows = createSelector(getReportState, fromReport.getReportRows);


//COMMON
export const getFilteredGuestList = createSelector(getGuestList, getFilterFilteredIds, (guestList, filteredIds) =>
    guestList.filter(guestListItem => guestListItem.guests
        .filter(guest => filteredIds.includes(guest.name)).length > 0
    )
);
export const getFilteredGuestLength = createSelector(getFilterFilteredIds, filteredIds => filteredIds.length);
export const getFilteredGuestGroupLength = createSelector(getFilteredGuestList, filteredGuestList =>
    filteredGuestList.map(guestListItem => guestListItem.guests.length)
        .reduce((acc, one) => acc+one, 0)
);

