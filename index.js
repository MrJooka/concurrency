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

const Product = {};
Product.list = () => products;

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

const removeClass = (name, el) => (el.classList.remove(name), el);

// 아래 show코드  실행부분은 dataFn 실행 -> templFn 실행 -> append실행 되고 나서 removeclass를 실행하는데
// 하나의 콜스택 아래에 있을 땐 merge(병합되어) 실행되기 때문에 그냥 hide의 상태를 브라우저가 페인팅하지 않는다
// 디버그로 step하나씩 실행햇을 때는 css 애니메이션이 실행 잘된다. 그러나 실제 브라우저는 painting 변경에 영향을 주는 코드들은
// 비동기적으로 여러개의 실행후 최종결과 하나로 한번만 그리기  때문이다. (이것이 효율적이다)
// 그래서 settimeout으로 비동기로  callstack을 비워주고 실행하면 animation이 의도한대로 동작한다

// const show = (el) => removeClass('hide', el);
const show = (el) => setTimeout(() => removeClass('hide', el), 1);
const openPage = (title, dataFn, tmplFn) =>
  show(
    append(
      $('body'),
      el(`
        <div class="page hide">
          <h2 class="title">${title}</h2>
          <div class="content">${tmplFn(dataFn())}</div>
        </div>
    `)
    )
  );

document.addEventListener('click', () => {
  openPage('상품 목록', Product.list, Product.list.tmpl);
});
