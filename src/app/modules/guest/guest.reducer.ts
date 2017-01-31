import {GuestListItem} from "./guest.model";
import * as guest from "./guest.actions";
import {GuestActions} from "./guest.actions";

export interface State {
    guestList: GuestListItem[];
    loading: boolean;
}
;

export const initialState: State = {
    guestList: [],
    loading: false
};

export function reducer(state = initialState, action: GuestActions): State {

    switch (action.type) {

        case guest.ActionTypes.LOAD: {
            return Object.assign({}, state, {
                loading: true
            });
        }

        case guest.ActionTypes.LOAD_SUCCESS: {
            return {
                loading: false,
                guestList: action.payload
            };
        }

        case guest.ActionTypes.LOAD_FAIL: {
            console.log(action, 'FAILED')

            return state;
        }

        default: {
            return state;
        }
    }
}

export const getLoading = (state: State) => state.loading;
export const getGuestList = (state: State) => state.guestList;
