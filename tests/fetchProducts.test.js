require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Testa se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Testa se o fecth foi chamado correttamente', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Testa se a função retorna o endPoint Correto', async () => {
    expect.assertions(1);
    const endPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });
  it('Testa se a função retorna o endPoint Correto', async () => {
    expect.assertions(1);
    const endPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=relogio';
    await fetchProducts('relogio');
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });
  it('Testa se o retorno da função tem a estrutura de dados igual ao objeto computadorSearch', async () => {
    expect.assertions(1);
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch)
  });
  it('Testa se ao chamar a função sem argumento, retorna o erro', async () => {
    expect.assertions(1);
    const result = await fetchProducts();
    expect(result).toEqual(new Error('You must provide an url'));
  });
});
