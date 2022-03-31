const getCart = document.querySelector('.cart__items');
const button = document.querySelector('.empty-cart');
const span = document.querySelector('.total-price');

const priceTotal = async () => {
  // https://www.w3schools.com/jsref/jsref_from.asp transforma em array qualquer objeto recebido.
  const array = await Array.from(document.querySelectorAll('.cart__item'));
  const value = array.reduce((acc, curr) => {
    // https://www.w3schools.com/jsref/jsref_number.asp Transforma o valor retornado em número, se o valor não puder ser retornado retorna NAN.
    const price = Number(curr.innerText.split('PRICE: $')[1]);
    return acc + price;
  }, 0);
  // https://www.w3schools.com/jsref/jsref_tofixed.asp metodo para arredondar o número em 2 casas decimais.
  span.innerText = `Subtotal: R$${(value).toFixed(2)}`;
};

// Deixa a mensagem de carregando enquanto espera a resposta da API
const loading = () => {
  const text = document.createElement('h1');
  text.innerText = 'Carregando...';
  text.className = 'loading';
  const items = document.querySelector('.items');
  items.appendChild(text);
};

// Remoove a mensagem quando a API traz os dados
const remove = () => {
  document.querySelector('.loading').remove();
};

const save = () => {
  const saveAll = getCart.innerHTML;
  saveCartItems(saveAll);
  priceTotal();
};

const load = async () => {
  const data = await getSavedCartItems();
  getCart.innerHTML = data;
  await priceTotal();
};

// Cria a imagem do produto no HTML
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// Carrega o produto na tela principal
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// Pega os dados da API na função criada no fetchProducts e joga para a função createProductItemElement
const callFetch = async () => {
  const items = document.querySelector('.items');
  const call = await fetchProducts('computador');
  call.results.forEach((obj) => {
    const catchInfo = {
      sku: obj.id,
      name: obj.title,
      image: obj.thumbnail,
    };
    items.appendChild(createProductItemElement(catchInfo));
  });
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// Ao clicar no item ele é removido do carrinho de compras
function cartItemClickListener(event) {
  event.target.remove();
  priceTotal();
}

// Ao clicar no button do produto ele replica no carrinho de compras como li
function createCartItemElement({ sku, name, salePrice }) {
  const hr = document.createElement('hr');
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  li.appendChild(hr);
  return li;
}

// função que ao clicar no button de esvaziar o carrinho ele percorre e remove os itens
const emptyCart = () => {
  const allItems = document.querySelectorAll('li');
  const cartIems = document.querySelector('ol');
  for (let i = 0; i < allItems.length; i += 1) {
    cartIems.removeChild(allItems[i]);
  }
  localStorage.removeItem('cartItems');
  span.innerText = 'Subtotal: R$0.00';
};

// função que pega os dados como o preço e joga para a função createCartItemElement
const insertCart = async (event) => {
  const getIdProduct = event.target.parentElement.firstChild.innerHTML;
  response = await fetchItem(getIdProduct);
  const info = { 
    sku: response.id,
    name: response.title, 
    salePrice: response.price,
  };
  getCart.appendChild(createCartItemElement(info));
  save();
  priceTotal();
};

// função de evento que ao clicar no adicionar carrinho chama o insert cart 
const btnEvent = () => {
  const btn = document.querySelectorAll('.item__add');
  btn.forEach((element) => element.addEventListener('click', insertCart));
};

// função que ao retornar o localstorage remove o bug de não conseguir apagar
const removeItemCart = async () => {
  const saved = await getSavedCartItems();
  getCart.innerHTML = saved;
  const li = document.querySelectorAll('.cart__item');
  [...li].forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
};

button.addEventListener('click', emptyCart);

// carrega as funções assincronas
window.onload = async () => {
  loading();
  await callFetch();
  remove();
  btnEvent();
  load();
  removeItemCart();
};
