const cartCaunterLabel = document.querySelector('#cart-caunter-label');
const contentContainer = document.querySelector('#content-container');
const contentHeader = document.querySelector('#header');
const btnShop = contentHeader.querySelector('#btn-shop');
const shoppingCart = document.createElement('div');
const shoppingList = document.createElement('ol');
const sumPrice = document.createElement('strong');

const BTN_DELETE = `<i class="fas fa-trash-alt"></i>`;

let cartCaunter = 0;
let cartPrice = 0;

const initShopBlock = () => {
  shoppingCart.setAttribute('class', 'header-shopping-cart__block');
  shoppingCart.setAttribute('id', 'shopping-cart');
  contentHeader.append(shoppingCart);
}

const initShopList = () => {
  shoppingList.setAttribute('class', 'header-shopping-cart__list');
  shoppingCart.append(shoppingList);
}

const initShopItem = (target) => {
  const shoppingItem = document.createElement('li');

  shoppingItem.setAttribute('class', 'header-shopping-cart__item');
  shoppingItem.setAttribute('id', `item${cartCaunter}`);

  shoppingList.append(shoppingItem);

  printNameDevice(target, shoppingItem);
}

const initSumPrice = () => {
  sumPrice.setAttribute('class', 'header-shopping-cart__list--sum');
  sumPrice.innerHTML = `TOTAL COST: ${cartPrice.toFixed(2)} $`;

  shoppingList.append(sumPrice);
}

const printNameDevice = (target, item) => {
  let el = target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.children;

  let price = getMockData(target);

  let name = el[0].innerHTML;
  item.innerHTML = `${name} ${price}$ ${BTN_DELETE}`;
}

const initBtnID = () => {
  const btnDelete = document.querySelector('.fa-trash-alt');
  btnDelete.setAttribute('id', `item${cartCaunter}`)
}

const deleteItem = (e) => {
  const target = e.target;

  if (target.classList.contains('fa-trash-alt')) {
    const price = target.parentElement.innerHTML.replace(/^\#\d+\s\D+(\d+)\D(\d+).*$/, '$1.$2');
    cartPrice = cartPrice - price;
    target.parentElement.remove();
    cartCaunterLabel.innerHTML = `${--cartCaunter}`;
    if (cartCaunter === 0) {
      cartCaunterLabel.style.display = 'none';
    }
    initSumPrice();
  }
}

const incrementCounter = () => {
  cartCaunterLabel.innerHTML = `${++cartCaunter}`;
  if (cartCaunter === 1) cartCaunterLabel.style.display = 'block';
}

const getMockData = (t) => +t.parentElement.previousElementSibling.innerHTML.replace(/^\$(\d+)\s\D+(\d+).*$/, '$1.$2'); // parentElement - возвращаемся к элементу родителя, previousElementSibling - получаем элемент на уровне выше нашего

const getPrice = (target, cartPrice) => Math.round((cartPrice + getMockData(target)) * 100) / 100;

const disableContrils = (target, fn) => {
  contentContainer.removeEventListener('click', fn);
  target.disabled = true;
}

const enableContrils = (target, fn) => {
  target.disabled = false;
  contentContainer.addEventListener('click', fn);
}

const btnClickHandler = (e) => {
  const target = e.target;
  const interval = 2000;

  let restoreHtml = null;

  if (target && target.matches('.item-btn--actions')) {
    incrementCounter();
    initShopItem(target);

    cartPrice = getPrice(target, cartPrice);

    restoreHtml = target.innerHTML; // для восстановления кода кнопки после клика
    target.innerHTML = `ADDED ${cartPrice.toFixed(2)} $`;

    disableContrils(target, btnClickHandler);
    initSumPrice();

    setTimeout(() => {
      target.innerHTML = restoreHtml;
      enableContrils(target, btnClickHandler);
    }, interval)
  };
};

const open = (target) => {
  if (target && target.matches('#btn-shop')) {
    shoppingCart.classList.add('shop-active')
  }
}
const closed = (target) => {
  if (target && target.matches('#btn-shop')) {
    shoppingCart.classList.remove('shop-active')
  }
}

const shoppingСartOpen = (e) => {
  const target = e.target;
  if (shoppingCart.classList.contains('shop-active')) {
    closed(target);
  } else {
    open(target);
  }
}

initListeners = () => {
  contentContainer.addEventListener('click', btnClickHandler);
  contentHeader.addEventListener('click', shoppingСartOpen);
  contentHeader.addEventListener('click', deleteItem);
}

const init = () => {
  initShopBlock();
  initShopList();
  initSumPrice();
}

init();
initListeners();