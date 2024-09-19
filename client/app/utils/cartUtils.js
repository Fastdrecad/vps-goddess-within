export const addDecimals = num => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// Utility function to compare products
export const areProductsEqual = (product1, product2) => {
  if (product1.name === product2.name && product1._id === product2._id) {
    return product1.sizes.every(size1 =>
      product2.sizes.some(
        size2 => size1.size === size2.size
        // size2 => size1.size === size2.size && size1.quantity === size2.quantity
      )
    );
  }
  return false;
};

export const updateCart = state => {
  // Calculate items price
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + (item.price * 100 * item.qty) / 100,
    0
  );

  state.itemsPrice = addDecimals(itemsPrice);

  // Calculate shipping price (If order is over €100 then free, else €10 shipping)
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  state.shippingPrice = addDecimals(shippingPrice);

  // Calculate tax price (15% tax)
  const taxPrice = 0.15 * itemsPrice;
  state.taxPrice = addDecimals(taxPrice);

  // Calculate the total price
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  state.totalPrice = addDecimals(totalPrice);

  // Save the cart to localStorage
  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
