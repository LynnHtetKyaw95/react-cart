export const getTotals = (cart) => {
  let totalPrice = 0;
  let totalQty = 0;

  // for (let item of cart.values()) {
  //   console.log(item);
  // }

  [...cart].map(([id, { amount, price }]) => {
    totalQty += amount;
    totalPrice += amount * price;
  });

  return { totalPrice, totalQty };
};
