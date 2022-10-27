let btn = document.querySelector('.order__btn');
btn.addEventListener('click', () => {
    let inputs = document.getElementsByClassName('order__input');
    let obj = {}
    console.log(inputs);
    let items = document.getElementsByClassName('order-modal__item');
    let userOrder = {
        user_name: inputs['Имя'].value,
        user_phone: inputs['Телефон'].value,
        user_mail: inputs['Email'].value
    };
    console.log(userOrder);

    for (let item of items) {
        obj[item.dataset.id] = item.children[0].children[1].children[2].children[1].innerHTML

    }
    let now = new Date()
    let dateOrder = now.getFullYear() + "-" + zero(now.getMonth()) + "-" + zero(now.getDate());

    fetch("http://localhost:3025/vlados", {
        method: 'POST', // или 'PUT'
        body: JSON.stringify({...userOrder, ...obj, dateOrder }), // данные могут быть 'строкой' или {объектом}
        headers: {
            'Content-Type': 'application/json'
        }
    })
})

function zero(element) {
    return element < 10 ? "0" + element : element
}