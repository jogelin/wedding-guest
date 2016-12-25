import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Book } from './../types/book';
import { Injectable } from '@angular/core';
import { createStore, Store, combineReducers, Action } from 'redux'
import {Guest} from "./guest.model";

export interface GuestState {
    guests: Guest[]
};

export enum ActionTypes { GET_BOOKS };

@Injectable()
export class GuestReducer {
    store: Store<IAppState>;
    state$: BehaviorSubject<IAppState> = new BehaviorSubject<IAppState>({ guests: [] });

    constructor() {
        const reducers = combineReducers<IAppState>({
          guests: this.guestsReducer
        });

        this.store = createStore(reducers);

        this.store.subscribe(() => this.state$.next(this.store.getState()));


    }

    guestReducer(guests: Guest[] = [], action): Guest[] {
        //console.log(action);
        switch (action.type) {
            //case ActionTypes.GET_BOOK:
            case ActionTypes.GET_BOOKS:
                return action.books;
            default:
                return guests;

        }
    }
}
