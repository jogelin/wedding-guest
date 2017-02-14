import {Action} from "@ngrx/store";
import {type} from "../shared/util";
import {GuestListItem} from "./guest.model";

const ActionTypes = {
    LOAD: type('[Guest] Load'),
    LOAD_SUCCESS: type('[Guest] Load Success'),
    LOAD_FAIL: type('[Guest] Load Fail'),
    UPDATE: type('[Guest] Update'),
    UPDATE_SUCCESS: type('[Guest] Update Success'),
    UPDATE_FAILED: type('[Guest] Update Failed')
};
export {ActionTypes as GuestActionTypes};

export class LoadAction implements Action {
    type = ActionTypes.LOAD;
    payload;

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

export class UpdateAction implements Action {
    type = ActionTypes.UPDATE;

    constructor(public payload: GuestListItem) {
    }
}
export class UpdateSuccessAction implements Action {
    type = ActionTypes.UPDATE_SUCCESS;
    payload;

    constructor() {
    }
}
export class UpdateFailedAction implements Action {
    type = ActionTypes.UPDATE_FAILED;

    constructor(public payload: any) {
    }
}

export type GuestActions
    = LoadAction
    | LoadSuccessAction
    | LoadFailAction
    | UpdateAction
    | UpdateSuccessAction;
