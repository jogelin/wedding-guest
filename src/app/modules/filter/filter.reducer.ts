
import {FilterActions, ActionTypes} from "./filter.actions";
export interface State {
    filteredList: any[];
    filtering: boolean;
    query: string;
};

export const initialState: State = {
    filteredList: [],
    filtering: false,
    query: ''
};

export function reducer(state = initialState, action: FilterActions): State {

    switch (action.type) {

        case ActionTypes.FILTER: {
            return Object.assign({}, state, {
                filtering: true,
                query: action.payload
            });
        }

        case ActionTypes.FILTER_COMPLETE: {
            return Object.assign({}, state, {
                filtering: false,
                filteredList: action.payload
            });
        }

        case ActionTypes.FILTER_FAIL: {
            console.error(action.type);
            return state;
        }

        default: {
            return state;
        }
    }
}

export const getFiltering = (state: State) => state.filtering;
export const getQuery = (state: State) => state.query;
export const getFilteredList = (state: State) => state.filteredList;
