import {Action} from "@ngrx/store";
import {type} from "../../shared/util";

const ActionTypes = {
    SIDEBAR: type('[Sidebar] Sidebar'),
    SIDEBAR_COMPLETE: type('[Sidebar] Sidebar Complete'),
    SIDEBAR_FAIL: type('[Sidebar] Sidebar Fail')
};
export {ActionTypes as SidebarActionTypes};

export class SidebarAction implements Action {
    type = ActionTypes.SIDEBAR;

    constructor(public payload: string) {
    }
}

export class SidebarCompleteAction implements Action {
    type = ActionTypes.SIDEBAR_COMPLETE;

    constructor(public payload: any[]) {
    }
}

export class SidebarFailAction implements Action {
    type = ActionTypes.SIDEBAR_FAIL;

    constructor(public payload: any) {
    }
}

export type SidebarActions
    = SidebarAction
    | SidebarCompleteAction
    | SidebarFailAction;
