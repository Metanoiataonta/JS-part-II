const goods = [
    {title: 'Shirt', price: 150},
    {title: 'Socks', price: 50},
    {title: 'Jacket', price: 350},
    {title: 'Shoes', price: 250},
];

// For grid display at ".goods-list"
for (let i = 0; i < 8; i++) {
    goods.push({})
}
const renderGoodsItem = (title = 'undefined item', price = NaN) => `<div class="goods-item"><h3>${title}</h3><p>${price} &pound</p></div>` // Можно не писать фигурный скобки и return

const renderGoodsList = (list = goods) => { //default === goods

    document.querySelector('.goods-list').innerHTML = list.map(item => renderGoodsItem(item.title, item.price)).join(''); // Можно не объявлять лишнюю переменную
//     
}

renderGoodsList();

