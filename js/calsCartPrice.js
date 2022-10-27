function calsCartPrice() {
    const cartWrapper = document.querySelector('.cart-content__list');
    const cartItems = document.querySelectorAll('.cart-content__item');

    const totalPriceEl = document.querySelector('.fullprice');

    console.log(cartItems);
    let totalPrice = 0;

    cartItems.forEach(function(item) {
        const amount = item.querySelector('[data-counter]');
        const amountEl = parseInt(amount.innerHTML);
        const priceDiv = item.querySelector('.cart-product__price');
        const priceEl = parseInt(priceDiv.innerHTML);

        const currentPrice = amountEl * priceEl;
        totalPrice += currentPrice;
    })
    console.log(totalPrice);
    totalPriceEl.innerText = totalPrice;
}