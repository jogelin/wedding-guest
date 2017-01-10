import {Guest} from "./guest.model";
import * as guest from "./guest.actions";


export interface State {
  guests: Guest[];
  loading: boolean;
};

export const initialState: State = {
  guests: [],
  loading: false
};

export function reducer(state = initialState, action: guest.Actions): State {
  switch (action.type) {

    case guest.ActionTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case guest.ActionTypes.LOAD_SUCCESS: {
      return {
        loading: false,
        guests: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoading = (state: State) => state.loading;

export const getGuests = (state: State) => state.guests;
