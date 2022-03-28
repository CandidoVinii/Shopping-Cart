const getSavedCartItems = () => {
  const loaded = localStorage.getItem('cartItems');
  return loaded;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
