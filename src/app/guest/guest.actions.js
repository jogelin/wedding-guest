"use strict";
var util_1 = require("../util");
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
exports.ActionTypes = {
    FILTER: util_1.type('[Guest] Filter'),
    FILTER_COMPLETE: util_1.type('[Guest] Filter Complete'),
    LOAD: util_1.type('[Guest] Load'),
    LOAD_SUCCESS: util_1.type('[Guest] Load Success'),
    LOAD_FAIL: util_1.type('[Guest] Load Fail'),
};
/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
var FilterAction = (function () {
    function FilterAction(payload) {
        this.payload = payload;
        this.type = exports.ActionTypes.FILTER;
    }
    return FilterAction;
}());
exports.FilterAction = FilterAction;
var FilterCompleteAction = (function () {
    function FilterCompleteAction(payload) {
        this.payload = payload;
        this.type = exports.ActionTypes.FILTER_COMPLETE;
    }
    return FilterCompleteAction;
}());
exports.FilterCompleteAction = FilterCompleteAction;
var LoadAction = (function () {
    function LoadAction() {
        this.type = exports.ActionTypes.LOAD;
    }
    return LoadAction;
}());
exports.LoadAction = LoadAction;
var LoadSuccessAction = (function () {
    function LoadSuccessAction(payload) {
        this.payload = payload;
        this.type = exports.ActionTypes.LOAD_SUCCESS;
    }
    return LoadSuccessAction;
}());
exports.LoadSuccessAction = LoadSuccessAction;
var LoadFailAction = (function () {
    function LoadFailAction(payload) {
        this.payload = payload;
        this.type = exports.ActionTypes.LOAD_FAIL;
    }
    return LoadFailAction;
}());
exports.LoadFailAction = LoadFailAction;
