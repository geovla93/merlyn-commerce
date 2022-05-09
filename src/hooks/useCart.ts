import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

import {
  cartHiddenState,
  cartItemsState,
  cartQuantityState,
  totalAmountState,
} from "../atoms/cart.atom";
import { CartItem } from "../types/models";

const useCart = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [cartHidden, setCartHidden] = useRecoilState(cartHiddenState);
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const [quantity, setQuantity] = useRecoilState(cartQuantityState);
  const [totalAmount, setTotalAmount] = useRecoilState(totalAmountState);
  const resetCartItems = useResetRecoilState(cartItemsState);
  const resetCartQuantity = useResetRecoilState(cartQuantityState);
  const resetTotalAmount = useResetRecoilState(totalAmountState);

  const toggleCartHidden = useCallback(
    () => setCartHidden((prevValue) => !prevValue),
    [setCartHidden]
  );

  const addItemToCart = useCallback(
    (itemToAdd: CartItem) => {
      const existingItem = cartItems.find((item) => item._id === itemToAdd._id);

      setQuantity((quantity) => quantity + 1);
      setTotalAmount((totalAmount) => totalAmount + itemToAdd.price);

      if (!existingItem) {
        setCartItems((prevItems) => [
          ...prevItems,
          { ...itemToAdd, quantity: 1 },
        ]);
      } else {
        const existingItemIndex = cartItems.findIndex(
          (item) => item._id === itemToAdd._id
        );
        const newCartItems = replaceItemAtIndex(cartItems, existingItemIndex, {
          ...existingItem,
          quantity: existingItem.quantity + 1,
          totalPrice: existingItem.totalPrice + itemToAdd.price,
        });
        setCartItems(newCartItems);
      }
    },
    [cartItems, setCartItems, setQuantity, setTotalAmount]
  );

  const removeItemFromCart = useCallback(
    (itemToRemove: CartItem) => {
      const existingItem = cartItems.find(
        (item) => item._id === itemToRemove._id
      );

      setQuantity((quantity) => quantity - 1);
      setTotalAmount((totalAmount) => totalAmount - itemToRemove.price);

      const existingItemIndex = cartItems.findIndex(
        (item) => item._id === itemToRemove._id
      );
      if (existingItem.quantity === 1) {
        const newCartItems = removeItemAtIndex(cartItems, existingItemIndex);
        setCartItems(newCartItems);
      } else {
        const newCartItems = replaceItemAtIndex(cartItems, existingItemIndex, {
          ...existingItem,
          quantity: existingItem.quantity - 1,
          totalPrice: existingItem.totalPrice - itemToRemove.price,
        });
        setCartItems(newCartItems);
      }
    },
    [cartItems, setCartItems, setQuantity, setTotalAmount]
  );

  const clearItemFromCart = useCallback(
    (itemToRemove: CartItem) => {
      const newCartItems = cartItems.filter(
        (item) => item._id !== itemToRemove._id
      );

      setCartItems(newCartItems);
      setQuantity((quantity) => quantity - itemToRemove.quantity);
      setTotalAmount(
        (amount) => amount - itemToRemove.quantity * itemToRemove.price
      );
    },
    [cartItems, setCartItems, setQuantity, setTotalAmount]
  );

  const clearCart = useCallback(() => {
    resetCartItems();
    resetCartQuantity();
    resetTotalAmount;
  }, [resetCartItems, resetCartQuantity, resetTotalAmount]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const memoizedValues = useMemo(
    () => ({
      cartHidden,
      cartItems: isMounted ? cartItems : [],
      quantity: isMounted ? quantity : 0,
      totalAmount: isMounted ? totalAmount : 0,
      toggleCartHidden,
      addItemToCart,
      removeItemFromCart,
      clearItemFromCart,
      clearCart,
    }),
    [
      addItemToCart,
      cartHidden,
      cartItems,
      clearCart,
      clearItemFromCart,
      isMounted,
      quantity,
      removeItemFromCart,
      toggleCartHidden,
      totalAmount,
    ]
  );

  return { ...memoizedValues };
};

export default useCart;

function replaceItemAtIndex<T>(arr: Array<T>, index: number, newValue: T) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex<T>(arr: Array<T>, index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
