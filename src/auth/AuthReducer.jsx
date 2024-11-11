import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.loginAdmin:
      return {
        ...state,
        data: action.payload,
        isAuthenticatedAdmin: true,
        isAuthenticatedCustomer: false,
        orders: [],
      };
    case types.loginCustomer:
      return {
        ...state,
        data: action.payload,
        isAuthenticatedAdmin: true,
        isAuthenticatedCustomer: true,
        orders: [],
      };
    case types.logout:
      return {
        ...state,
        data: null,
        isAuthenticatedAdmin: false,
        isAuthenticatedCustomer: false,
        orders: [],
      };
    default:
      return state;
  }
};
