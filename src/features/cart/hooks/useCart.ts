import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';

import {
  cartItemsState,
  cartQuantitySelector,
  totalAmountSelector,
} from '@/atoms/cart.atom';
import { CartItem } from '@/types/models';

const useCart = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const totalQuantity = useRecoilValue(cartQuantitySelector);
  const totalAmount = useRecoilValue(totalAmountSelector);
  const resetCartItems = useResetRecoilState(cartItemsState);

  console.log({ cartItems, totalQuantity, totalAmount });

  const addItemToCart = (itemToAdd: CartItem) => {
    const existingItem = cartItems.find((item) => item.id === itemToAdd.id);

    if (!existingItem) {
      setCartItems((prevItems) => [
        ...prevItems,
        {
          ...itemToAdd,
          quantity: 1,
        },
      ]);
    } else {
      const existingItemIndex = cartItems.findIndex(
        (item) => item.id === itemToAdd.id,
      );
      const newCartItems = replaceItemAtIndex(cartItems, existingItemIndex, {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      });
      setCartItems(newCartItems);
    }
  };

  const removeItemFromCart = (itemToRemove: CartItem) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === itemToRemove.id,
    );
    if (existingItemIndex === -1) {
      return;
    }

    const existingItem = cartItems.at(existingItemIndex);

    if (existingItem.quantity === 1) {
      const newCartItems = removeItemAtIndex(cartItems, existingItemIndex);
      setCartItems(newCartItems);
    } else {
      const newCartItems = replaceItemAtIndex(cartItems, existingItemIndex, {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      });
      setCartItems(newCartItems);
    }
  };

  const clearItemFromCart = (itemToRemove: CartItem) => {
    const newCartItems = cartItems.filter(
      (item) => item.id !== itemToRemove.id,
    );

    setCartItems(newCartItems);
  };

  const clearCart = () => resetCartItems();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const memoizedValues = useMemo(
    () => ({
      cartItems: isMounted ? cartItems : [],
      quantity: isMounted ? totalQuantity : 0,
      totalAmount: isMounted ? totalAmount : 0,
    }),
    [cartItems, isMounted, totalQuantity, totalAmount],
  );

  return {
    ...memoizedValues,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    clearCart,
  };
};

export default useCart;

function replaceItemAtIndex<T>(arr: Array<T>, index: number, newValue: T) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex<T>(arr: Array<T>, index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
