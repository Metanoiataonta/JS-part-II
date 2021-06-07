function makeGETRequest(url) {
    return new Promise((callback) => {
        let xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                const products = xhr.responseText;
                callback(products);
            }
        }

        xhr.open('GET', url, true);

        xhr.send();
    })

}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsItem {
    constructor(product_name, price, id_product) {
        this.product_name = product_name;
        this.price = price;
        this.id_product = id_product;
    }

    render() {
        return `<div class="goods-item"> <h3>${this.product_name}</h3><p>${this.price} Rupee</p><button class="goods-item__button"  id="${this.id_product}">Buy</button></div>`;
    }

}

class GoodsList {
    constructor() {
        this.goods = []
    }

    fetchGoods() {
        makeGETRequest(`${API_URL}/catalogData.json`)
            .then((products) => {
                this.goods = JSON.parse(products);
                // console.log(this.goods, 'GETRequest');
                this.render();
                this.createButtonHandlers();
            })

    }

    render() {
        let listHtml = '';

        this.goods.forEach(good => {

            const goodItem = new GoodsItem(good.product_name, good.price, good.id_product);
            listHtml += goodItem.render();

        });
        document.querySelector('.goods-list').innerHTML = listHtml;

    }

    createButtonHandlers() {

        let buttonList = document.querySelectorAll('.goods-item__button');
        buttonList.forEach((element) => {
                element.addEventListener('click', function (event) {

                    const goodItem = list.goods.find((item) => item.id_product == event.target.id),
                        cartItem = new CartItem(goodItem.product_name, goodItem.price, goodItem.id_product, 1);
                    let inCart = {isIt: false, index: -1};
                    cart.items.find((item, index) => {
                        if (item.id_product == cartItem.id_product) {
                            return inCart = {isIt: true, index: index};
                        }

                    });
                    if (inCart.isIt) {
                        cart.items[inCart.index].amount++;
                    } else cart.items.push(cartItem);


                    console.log(goodItem, cartItem);
                    cart.render();
                });
            }
        )
    }


}

class Cart {
    constructor() {
        this.items = [];
    }

    deleteItem() {
        console.log(this);
        cart.items = cart.items.filter(item => !(item === this));
        cart.render();
    }

    addItem() {

    }

    render() {
        let querySelector = document.querySelector('.goods-cart');
        querySelector.innerHTML = '';
        if (this.items.length > 0) {

            Object.keys(this.items[0]).forEach((item) => {
                const div = document.createElement('div');
                div.classList.add('column');
                div.innerHTML = item;
                querySelector.appendChild(div);
            });
            this.items.forEach((item) => {


                for (const [key, value] of Object.entries(item)) {
                    let div = document.createElement('div');

                    div.innerHTML = value;
                    querySelector.appendChild(div);
                }
                let button = document.createElement('button');
                button.classList.add('delete-button');
                button.innerHTML = `delete`;
                querySelector.appendChild(button);
                button.addEventListener('click', this.deleteItem.bind(item));
            });
            let fullprice = document.createElement('div'),
                summary = document.createElement('div');
            fullprice.innerHTML = `fullprice`;
            summary.innerHTML = `${this.summary()}`;
            querySelector.appendChild(fullprice);
            querySelector.appendChild(summary);
        }


    }

    summary() {
        return this.items.reduce((acc, item) => {
            acc += item.price * item.amount;
            return acc;
        }, 0)
    }
}

class CartItem extends GoodsItem {
    constructor(product_name, price, id_product, amount) {
        super(product_name, price, id_product);
        this.amount = amount;
    }


}


const list = new GoodsList,
    cart = new Cart;
list.fetchGoods();


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
