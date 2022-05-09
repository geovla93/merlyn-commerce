import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { CartItem } from "../types/models";

const { persistAtom } = recoilPersist();

export const cartHiddenState = atom({
  key: "cartHiddenState",
  default: true,
});

export const cartItemsState = atom<CartItem[]>({
  key: "cartItemsState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const cartQuantityState = atom({
  key: "cartQuantityState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const totalAmountState = atom({
  key: "totalAmountState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
