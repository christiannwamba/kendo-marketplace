import { ActionTypes } from './actions';
import { Product } from '../product/product.component';

export interface InitialState {
  items: Array<Product>;
  cart: Array<Product>;
}

export const initialState = {
  items: [],
  cart: []
};

export function ShopReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LoadSuccess:
      return {
        ...state,
        items: [...action.payload]
      };

    case ActionTypes.Add:
      return {
        ...state,
        cart: [...state.cart, action.payload]
      };

    case ActionTypes.Remove:
      return {
        ...state,
        cart: [...state.cart.filter(item => item.name !== action.payload.name)]
      };
    
    default:
      return state;
  }
}
