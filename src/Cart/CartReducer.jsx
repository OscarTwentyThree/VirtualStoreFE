import { cartTypes } from "../types/cartTypes";

export const CartReducer = (state = {}, action) => {
  switch (action.type) {
    case cartTypes.pending:
      return {
        ...state,
        data: action.payload,
        checkOutFinished: false,
      };
      case cartTypes.checkOut:
        return {
          ...state,
          data: action.payload,
          checkOutFinished: true,
        };
    default:
      return state;
  }
};
