const fetchProducts = async (product) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
    const data = await fetch(url);
    const response = await data.json();

    return response.results;
  } catch (error) {
    return error;
  }
};

window.onload = () => fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
