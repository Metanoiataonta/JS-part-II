class GoodsItem {
    constructor(title, price, img) {
        this.title = title;
        this.price = price;
        this.img = img;
    }

    render() {
        return `<div class="goods-item"> <img src="${this.img}" alt=""><h3>${this.title}</h3><p>${this.price} Rupee</p><button class="goods-item__button" data-index =" ${list.goods.indexOf(this)}">Buy</button></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = []
    }

    fetchGoods() {
        this.goods = [
            {title: 'Shirt', price: 150, img: 'src/img/img-1.jpg'},
            {title: 'Socks', price: 50, img: 'src/img/img-2.jpg'},
            {title: 'Jacket', price: 350, img: 'src/img/img-3.jpg'},
            {title: 'Shoes', price: 250, img: 'src/img/img-4.jpg'},
        ];
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.img);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    summary() {
        return this.goods.reduce((acc, item) => {
            acc += item.price;
            return acc;
        }, 0)
    }
}

class Cart {
    constructor() {
        this.goods = []
    }

    deleteItem() {

    }

    addItem() {

    }
}

class CartItem extends GoodsItem {
    constructor(title, price, img, amount) {
        super(title, price, img);
        this.amount = amount;
    }

    buyItem() {

    }
}


const list = new GoodsList();
list.fetchGoods();
list.render();


//
// // For grid display at ".goods-list"
// for (let i = 0; i < 8; i++) {
//     goods.push({})
// }
//
// const renderGoodsList = (list = goods) => { //default === goods
//
//     document.querySelector('.goods-list').innerHTML = list.map(item => renderGoodsItem(item.title, item.price)).join(''); // Можно не объявлять лишнюю переменную
// //
// }
//
// renderGoodsList();
//
