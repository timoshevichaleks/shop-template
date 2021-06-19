const cartCaunterLabel = document.querySelector('#cart-caunter-label');
const contentContainer = document.querySelector('#content-container');

let cartCaunter = 0;
let cartPrice = 0;

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

    cartPrice = getPrice(target, cartPrice);

    restoreHtml = target.innerHTML; // для восстановления кода кнопки после клика
    target.innerHTML = `ADDED ${cartPrice.toFixed(2)} $`;

    disableContrils(target, btnClickHandler);

    setTimeout(() => {
      target.innerHTML = restoreHtml;
      enableContrils(target, btnClickHandler);
    }, interval)
  }
};

contentContainer.addEventListener('click', btnClickHandler);