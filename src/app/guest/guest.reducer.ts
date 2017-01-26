import {Guest, Guests} from './guest.model';
import * as guest from './guest.actions';


export interface State {
  guestList: Guests[];
  loading: boolean;
};

export const initialState: State = {
  guestList: [],
  loading: false
};

export function reducer(state = initialState, action: guest.Actions): State {
  console.log(action.type);

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

    default: {
      return state;
    }
  }
}

export const getLoading = (state: State) => state.loading;

export const getGuestList = (state: State) => state.guestList;
