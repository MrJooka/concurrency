const products = [
  { name: '반팔티', price: 14000, quantity: 1, selected: true },
  { name: '긴팔티', price: 16000, quantity: 1, selected: false },
  { name: '핸폰케이스', price: 17000, quantity: 1, selected: false },
  { name: '바지', price: 13000, quantity: 1, selected: true },
  { name: '후드티', price: 34000, quantity: 1, selected: false },
  { name: '선풍기', price: 60000, quantity: 1, selected: true },

  { name: '반팔티', price: 14000, quantity: 2, selected: true },
  { name: '긴팔티', price: 16000, quantity: 4, selected: false },
  { name: '핸폰케이스', price: 17000, quantity: 2, selected: true },
  { name: '바지', price: 13000, quantity: 1, selected: true },
  { name: '후드티', price: 34000, quantity: 2, selected: false },
  { name: '선풍기', price: 60000, quantity: 6, selected: true },

  { name: '반팔티', price: 14000, quantity: 1, selected: true },
  { name: '긴팔티', price: 16000, quantity: 3, selected: true },
  { name: '핸폰케이스', price: 17000, quantity: 6, selected: true },
  { name: '바지', price: 13000, quantity: 1, selected: true },
  { name: '후드티', price: 34000, quantity: 1, selected: true },
  { name: '선풍기', price: 60000, quantity: 5, selected: true },

  { name: '반팔티', price: 14000, quantity: 3, selected: true },
  { name: '긴팔티', price: 16000, quantity: 2, selected: false },
  { name: '핸폰케이스', price: 17000, quantity: 5, selected: true },
  { name: '바지', price: 13000, quantity: 1, selected: true },
  { name: '후드티', price: 34000, quantity: 7, selected: false },
  { name: '선풍기', price: 60000, quantity: 6, selected: false },

  { name: '반팔티', price: 14000, quantity: 1, selected: true },
  { name: '긴팔티', price: 16000, quantity: 1, selected: true },
  { name: '핸폰케이스', price: 17000, quantity: 3, selected: true },
  { name: '바지', price: 13000, quantity: 2, selected: false },
  { name: '후드티', price: 34000, quantity: 3, selected: false },
  { name: '선풍기', price: 60000, quantity: 1, selected: true },
];

const delay = (time, a) =>
  new Promise((resolve) => setTimeout(() => resolve(a), time));

const Product = {};
Product.list = () => products;

// 통신으로 데이터를 받는다는 가정(0.7초후 데이터 받음)
Product.list30 = () => delay(30, products);
Product.list250 = () => delay(250, products);
Product.list700 = () => delay(700, products);

Product.list.tmpl = (products) => `
  <table>
    <tr>
      <th>이름</th>
      <th>가격</th>
      <th>수량</th>
      <th>합계</th>
    </tr>
    ${products
      .map(
        (p) => `
      <tr>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>${p.quantity}</td>
        <td>${p.price * p.quantity}</td>
      </tr>
    `
      )
      .join('')}
  </table>
`;

const el = (html) => {
  const wrap = document.createElement('div');
  wrap.innerHTML = html;
  return wrap.children[0];
};

const $ = (sel, parent = document) => parent.querySelector(sel);

const append = (parent, child) => parent.appendChild(child);

const editClass = (method) => (name, el) => (el.classList[method](name), el);
const addClass = editClass('add');
const removeClass = editClass('remove');

const tap =
  (f) =>
  (a, ...bs) => (f(a, ...bs), a);

const transitionend = (f) => (el) =>
  new Promise((resolve) =>
    setTimeout(() => {
      f(el);
      el.addEventListener('transitionend', () => resolve(el), { once: true });
    }, 1)
  );
const show = transitionend((el) => removeClass('hide', el));

const openPage = async (title, dataFn, tmplFn) =>
  show(
    append(
      $('body'),
      el(`
        <div class="page hide">
          <h2 class="title">${title}</h2>
          <div class="content">${tmplFn(await dataFn())}</div>
        </div>
    `)
    )
  );

const openPage2 = async (title, dataFn, tmplFn) => {
  const dataP = dataFn();
  const page = await show(
    append(
      $('body'),
      el(`
        <div class="page hide">
          <h2 class="title">${title}</h2>
          <div class="content"></div>
        </div>
    `)
    )
  );

  show(
    tap(append)(addClass('hide', $('.content', page)), el(tmplFn(await dataP)))
  );
};

const isPromise = (a) => a instanceof Promise;

const openPage3 = async (title, dataFn, tmplFn) => {
  const dataP = dataFn();
  const page = await show(
    append(
      $('body'),
      el(`
        <div class="page hide">
          <h2 class="title">${title}</h2>
          <div class="content">${isPromise(dataP) ? '' : tmplFn(dataP)}</div>
        </div>
    `)
    )
  );

  isPromise(dataP) &&
    show(
      tap(append)(
        addClass('hide', $('.content', page)),
        el(tmplFn(await dataP))
      )
    );
};

const nop = Symbol('nop');

const isNop = (a) => a == nop;

const openPage4 = async (title, dataFn, tmplFn) => {
  const dataP = dataFn();
  const res = await Promise.race([dataP, delay(50, nop)]);

  const page = await show(
    append(
      $('body'),
      el(`
        <div class="page hide">
          <h2 class="title">${title}</h2>
          <div class="content">${isNop(res) ? '' : tmplFn(res)}</div>
        </div>
    `)
    )
  );

  isNop(res) &&
    show(
      tap(append)(
        addClass('hide', $('.content', page)),
        el(tmplFn(await dataP))
      )
    );
};

let i = 0;
document.addEventListener('click', () => {
  openPage4(
    '상품 목록',
    i++ % 2 ? Product.list700 : Product.list30,
    Product.list.tmpl
  );
});
