import { Action } from '@ngrx/store';
import { LoginRegisterReset } from '../../models/login-register-reset';
import { ResponseLogin } from '../../models/responselogin-register-reset';


export enum CustomerActionTypes {
    CustomerLogin = '[Customer] Login',
    CustomerLoginSuccess = '[Customer] LoginSuccess'
}

export class CustomerLogin implements Action {
    readonly type = CustomerActionTypes.CustomerLogin;

    constructor(public payload: LoginRegisterReset) { }
}

export class CustomerLoginSuccess implements Action {
    readonly type = CustomerActionTypes.CustomerLoginSuccess;

    constructor(public payload: ResponseLogin) { }
}

export const CustomerActions = {
    CustomerLogin,
    CustomerLoginSuccess
};

export type CustomerAction = CustomerLogin | CustomerLoginSuccess;
