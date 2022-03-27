const saveCartItems = (saveItems) => {
  localStorage.setItem('getCart', saveItems);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
