import {Action} from '@ngrx/store';
import {type} from '../util';
import {Guest} from './guest.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
    FILTER: type('[Guest] Filter'),
    FILTER_COMPLETE: type('[Guest] Filter Complete'),
    LOAD: type('[Guest] Load'),
    LOAD_SUCCESS: type('[Guest] Load Success'),
    LOAD_FAIL: type('[Guest] Load Fail'),
};


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class FilterAction implements Action {
    type = ActionTypes.FILTER;
    constructor(public payload: string) {}
}

export class FilterCompleteAction implements Action {
    type = ActionTypes.FILTER_COMPLETE;
    constructor(public payload: Guest[]) {}
}

export class LoadAction implements Action {
    type = ActionTypes.LOAD;
    constructor() {}
}

export class LoadSuccessAction implements Action {
    type = ActionTypes.LOAD_SUCCESS;
    constructor(public payload: Guest[]) {}
}

export class LoadFailAction implements Action {
    type = ActionTypes.LOAD_FAIL;
    constructor(public payload: any) {}
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
    = FilterAction
    | FilterCompleteAction
    | LoadAction
    | LoadSuccessAction;
