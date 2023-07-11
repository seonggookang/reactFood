import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}, // 더 나은 자동완성 기능을 얻는다
});

export default CartContext;
