const getCart = document.querySelector('.cart__items');
const saveItems = document.querySelector('ol.cart__items');

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

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(saveItems.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const hr = document.createElement('hr');
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  li.appendChild(hr);
  return li;
}

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

const insertCart = async (event) => {
  const getIdProduct = event.target.parentElement.firstChild.innerHTML;
  response = await fetchItem(getIdProduct);
  const info = { 
    sku: response.id,
    name: response.title, 
    salePrice: response.price,
  };
  getCart.appendChild(createCartItemElement(info));
  saveCartItems(saveItems.innerHTML);
};

const btnEvent = () => {
  const btn = document.querySelectorAll('.item__add');
  btn.forEach((element) => element.addEventListener('click', insertCart));
};

const button = document.querySelector('.empty-cart');
const emptyCart = () => {
  const allItems = document.querySelectorAll('li');
  const cartIems = document.querySelector('ol');
  for (let i = 0; i < allItems.length; i += 1) {
    cartIems.removeChild(allItems[i]);
  }
};

window.onload = async () => {
 await callFetch();
 btnEvent();
 button.addEventListener('click', emptyCart);
};
