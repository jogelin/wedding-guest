import {FilterActions, FilterActionTypes} from "./filter.actions";
import {GuestActions, GuestActionTypes} from "../guest/guest.actions";

export interface State {
    filteredIds: any[];
    filtering: boolean;
    query: string;
};

export const initialState: State = {
    filteredIds: [],
    filtering: false,
    query: ''
};

export function reducer(state = initialState, action: FilterActions | GuestActions): State {

    switch (action.type) {

        case FilterActionTypes.FILTER: {
            return Object.assign({}, state, {
                filtering: true,
                query: action.payload
            });
        }

        case GuestActionTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                filteredIds: action.payload
                    .map(guestListItem => guestListItem.guests.map(guest => guest.name))
                    .reduce((acc, one) => acc.concat(one))

            });
        }

        case FilterActionTypes.FILTER_COMPLETE: {
            return Object.assign({}, state, {
                filtering: false,
                filteredIds: action.payload
            });
        }

        case FilterActionTypes.FILTER_FAIL: {
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
export const getFilteredIds = (state: State) => state.filteredIds;
