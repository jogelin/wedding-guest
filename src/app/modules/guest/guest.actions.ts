import {Action} from "@ngrx/store";
import {type} from "../shared/util";
import {GuestListItem} from "./guest.model";

const ActionTypes = {
    LOAD: type('[Guest] Load'),
    LOAD_SUCCESS: type('[Guest] Load Success'),
    LOAD_FAIL: type('[Guest] Load Fail')
};
export {ActionTypes as GuestActionTypes};

export class LoadAction implements Action {
    type = ActionTypes.LOAD;

    constructor() {
    }
}

export class LoadSuccessAction implements Action {
    type = ActionTypes.LOAD_SUCCESS;

    constructor(public payload: GuestListItem[]) {
    }
}

export class LoadFailAction implements Action {
    type = ActionTypes.LOAD_FAIL;

    constructor(public payload: any) {
    }
}


export type GuestActions
    = LoadAction
    | LoadSuccessAction
    | LoadFailAction;
