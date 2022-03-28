const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('Testa se ao executar a fuunção o metodo setItem é chamado corretamente', async() => {
    const lis = '<ol><li>Item</li></ol>';
    saveCartItems(lis);
    expect(localStorage.setItem).toHaveBeenCalled();
  })
  it('Testa se ao executar a função ela retorna o método correto ao passar dois paramentros', async () => {
    const lis = '<ol><li>Item</li></ol>';
    saveCartItems(lis);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  })
});
