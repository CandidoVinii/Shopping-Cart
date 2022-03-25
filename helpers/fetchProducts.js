const fetchProducts = async (product) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
    const data = await fetch(url);
    const response = await data.json();

    return response;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
