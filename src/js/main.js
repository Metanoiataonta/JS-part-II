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
        // console.log(document.querySelectorAll('.goods-item__button'));
        let buttonList = document.querySelectorAll('.goods-item__button');
        buttonList.forEach((element) => {
                element.addEventListener('click', function (event) {
                    // console.log(this, event, event.target.id);
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
                    console.log(inCart);


                    console.log(goodItem, cartItem);
                    cart.render();
                });
            }
        )
    }


}

class Cart {
    constructor(product_name, price, amount) {
        this.items = [];
    }

    deleteItem() {

    }

    addItem() {

    }

    render() {
        let list = '';
        Object.keys(this.items[0]).forEach((item) => {
            list += `<div>${item} </div> `
        });
        this.items.forEach((item) => {
            console.log(item);
            for (const [key, value] of Object.entries(item)) {
                list += `<div>${value} </div> `;
            }
        });
        list += `<div>Full price</div><div>${this.summary()}</div>`;
        document.querySelector('.goods-cart').innerHTML = list;


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
