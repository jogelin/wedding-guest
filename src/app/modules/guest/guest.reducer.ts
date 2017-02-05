import {GuestListItem} from "./guest.model";
import {GuestActions, GuestActionTypes} from "./guest.actions";

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

        case GuestActionTypes.LOAD: {
            return Object.assign({}, state, {
                loading: true
            });
        }

        case GuestActionTypes.LOAD_SUCCESS: {
            return {
                loading: false,
                guestList: action.payload
            };
        }

        case GuestActionTypes.LOAD_FAIL: {
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
