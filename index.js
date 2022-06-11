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

document
  .querySelector('body')
  .appendChild(el(Product.list.tmpl(Product.list())));
