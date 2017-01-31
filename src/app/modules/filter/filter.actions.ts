import {Action} from "@ngrx/store";
import {type} from "../shared/util";

export const ActionTypes = {
    FILTER: type('[Filter] Filter'),
    FILTER_COMPLETE: type('[Filter] Filter Complete'),
    FILTER_FAIL: type('[Filter] Filter Fail')
};

export class FilterAction implements Action {
    type = ActionTypes.FILTER;

    constructor(public payload: string) {
    }
}

export class FilterCompleteAction implements Action {
    type = ActionTypes.FILTER_COMPLETE;

    constructor(public payload: any[]) {
    }
}

export class FilterFailAction implements Action {
    type = ActionTypes.FILTER_FAIL;

    constructor(public payload: any) {
    }
}

export type FilterActions
    = FilterAction
    | FilterCompleteAction
    | FilterFailAction;
