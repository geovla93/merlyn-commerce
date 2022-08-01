import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { CartItem } from '../types/models';

const { persistAtom } = recoilPersist();

export const cartItemsState = atom<CartItem[]>({
  key: 'cartItemsState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const cartQuantitySelector = selector({
  key: 'cartQuantitySelector',
  get: ({ get }) =>
    get(cartItemsState).reduce((acc, cartItem) => acc + cartItem.quantity, 0),
});

export const totalAmountSelector = selector({
  key: 'totalAmountSelector',
  get: ({ get }) =>
    get(cartItemsState).reduce(
      (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
      0,
    ),
});
