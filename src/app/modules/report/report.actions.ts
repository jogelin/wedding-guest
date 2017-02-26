import {Action} from "@ngrx/store";
import {type} from "../shared/util";
import {Report} from "./report.model";

const ActionTypes = {
    LOAD: type('[Report] Load'),
    LOAD_SUCCESS: type('[Report] Load success'),
    LOAD_FAIL: type('[Report] Load Fail')
};
export {ActionTypes as ReportActionTypes};

export class LoadAction implements Action {
    type = ActionTypes.LOAD;
    payload;

    constructor() {
    }
}

export class LoadSuccessAction implements Action {
    type = ActionTypes.LOAD_SUCCESS;

    constructor(public payload: Report) {
    }
}

export class LoadFailAction implements Action {
    type = ActionTypes.LOAD_FAIL;

    constructor(public payload: any) {
    }
}

export type ReportActions
    = LoadAction
    | LoadSuccessAction
    | LoadFailAction;
