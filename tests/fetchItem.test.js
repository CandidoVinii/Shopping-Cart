require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Testa se a função é realmente uma função' , async () => {
    expect.assertions(1);
    expect(typeof fetchItem).toBe('function');
  });
  it('Testa se a função ao receber o argmento MLB1615760527, retorna o valor correto', async() => {
    expect.assertions(1);
    fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled();
  });
  it('Testa se ao chamar a função, retorna a url correta', async () => {
    expect.assertions(1);
    const url = "https://api.mercadolibre.com/items/MLB1615760527";
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('Testa se ao chamar a fnção ela retorna o objeto correto', async () => {
    expect.assertions(1);
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });
  it('Testa se ao chamar a função sem argumento retorna a mensagem de erro', async () => {
    expect.assertions(1);
    const result = await fetchItem();
    expect(result).toEqual(new Error('You must provide an url'));
  });
});
