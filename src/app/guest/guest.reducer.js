"use strict";
var guest = require("./guest.actions");
;
exports.initialState = {
    guests: [],
    loading: false
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
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
                guests: action.payload
            };
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
exports.getLoading = function (state) { return state.loading; };
exports.getGuests = function (state) { return state.guests; };
