import { CustomerActions, CustomerActionTypes, CustomerAction } from './customer.action';
import { ResponseLogin } from '../../models/responselogin-register-reset';

export interface StateModel {
    customerLoginSessionData: ResponseLogin;
}

const initialState: StateModel = {
    customerLoginSessionData: null
};

export function customerReducer(state = initialState, action: CustomerAction): StateModel {

    switch (action.type) {

        case CustomerActionTypes.CustomerLoginSuccess: {
            return {
                ...state,
                customerLoginSessionData: action.payload
            };
        }

        default:
            return state;
    }
}
