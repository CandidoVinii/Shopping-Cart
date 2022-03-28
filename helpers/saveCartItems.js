const saveCartItems = (lis) => {
  localStorage.setItem('cartItems', lis)
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
