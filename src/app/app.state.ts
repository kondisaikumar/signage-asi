import { ActionReducer, MetaReducer, ActionReducerMap } from '@ngrx/store';
import * as customer from './state/customer/customer.reducer';

export interface RootStateModel {
    customer: customer.StateModel;
}

export const reducers: ActionReducerMap<RootStateModel> = {
    customer: customer.customerReducer,
};

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state, action) {
        if (action.type === 'ClearState') {
            state = undefined;
        }

        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<any>[] = [clearState];
