const getSavedCartItems = () => {
  try {
    const set = localStorage.getItem('cartItems');
    const insertCart = document.querySelecto('.cart__items');
    insertCart.innerHTML = set;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
