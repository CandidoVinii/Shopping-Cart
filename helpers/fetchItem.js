const fetchItem = async (item) => {
  try {
  const url = `https://api.mercadolibre.com/items/${item}`;
  const data = await fetch(url);
  const response = await data.json();
    return response;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
