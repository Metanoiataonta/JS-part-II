// Данные
//

hamburger = {
    // Виды гамбургеров
//     Маленький
//     Большой
//


    size: {
        large: {price: 100, calories: 40},
        small: {price: 50, calories: 20}
    },
    // Виды начинки
//     С сыром
//     С салатом
//     С картофелем
//

    stuff: {
        cheese: {price: 10, calories: 20},
        salad: {price: 20, calories: 5},
        potato: {price: 15, calories: 10}
    },
// Добавки
//     Приправы
//     Майонез
//     Без ничего
//
//
    additive: {
        flavoring: {price: 15, calories: 0},
        mayonnaise: {price: 20, calories: 5}
    }
}


function createHamburgerForm() {
    const hamburgerPlace = document.querySelector('.hamburger');
    hamburgerPlace.innerHTML += ` <form action="return false">
  <p>What kind of hamburger do you wish?</p>
<div>
    <input type="radio" name="size" id ="large" checked><label for="large">Large</label>
    <input type="radio" name="size" id ="small"><label for="small">Small</label>
</div>
<p>With what filling?</p>
<div>
    <input type="radio" name="stuff" id ="cheese" checked><label for="cheese">Cheese</label>
    <input type="radio" name="stuff" id ="salad"><label for="salad">Salad</label>
    <input type="radio" name="stuff" id ="potato"><label for="potato">Potato</label>
</div>

<p>Do you want additive?</p>
<div>
    <input type="checkbox" name ="additive" id="flavoring" ><label for="flavoring">Flavoring</label>
    <input type="checkbox" name ="additive" id="mayonnaise" ><label for="mayonnaise">Mayonnaise</label>
</div>
</form>
<div class="result"> Change something</div>`
}

function calcult(item, list,) {
    let sumCalories = 0,
        sumPrice = 0;
    list.forEach((block) => {
        if (block.checked === true) {
            sumPrice += hamburger[block.name][block.id].price;
            sumCalories += hamburger[block.name][block.id].calories;
            console.log(block, hamburger[block.name][block.id].price, hamburger[block.name][block.id].calories);

        }

    });
    console.log(sumPrice, sumCalories);
    document.querySelector('.result').innerHTML = ` <p>Result sum is: ${sumPrice} rupee.</p>
    Result calories is: ${sumCalories} calroies.
    `
}

function addListners() {
    let inputList = document.querySelectorAll('.hamburger input');
    inputList.forEach((item, index) => {
        console.log(item);
        item.addEventListener('change', () => calcult(item, inputList, index));
    });
    calcult(null, inputList);
}


createHamburgerForm();
addListners();


// for (let type of Object.keys(hamburger)){
//     if (item.name === type){
//
//         if (item.id === 0){
//
//         }
//     }
// }