import {ReportActions, ReportActionTypes} from "./report.actions";
import {Report} from "./report.model";

export interface State {
    report: Report;
}

export const initialState: State = {
    report: null
};

export function reducer(state = initialState, action: ReportActions): State {

    switch (action.type) {

        case ReportActionTypes.LOAD_SUCCESS: {
            return {
                report:action.payload
            };
        }

        case ReportActionTypes.LOAD_FAIL: {
            console.error(action.type);
            return state;
        }

        default: {
            return state;
        }
    }
}

export const getReport = (state: State) => state.report;
