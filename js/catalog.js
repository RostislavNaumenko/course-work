 const generateCatalogProduct = (id, cat_id, img, title, about, price) => {
     return `
    <li class="product-grid_item ">
    <article class="catalog_items ">
        <div class="catalog_item" data-id=${id} data-categoty=${cat_id} >
            <div class="catalog_item_img">
                <img class="img_catalog" src="${img}" alt="">
            </div>
            <div class="catalog_item_title">
                ${title}
            </div>
             <div class="catalog_item_about">
                        <div class="catalog_item-text">
                             Діаметр:
                             <div class="catalog_item-num">${about} мм</div>
                         </div>
                <div class="details-wrapper">
                    <div class="items counter-wrapper">
                        <div class="items__control_body" data-action="minus">-</div>
                        <div class="items__current_body" data-counter>1</div>
                        <div class="items__control_body" data-action="plus">+</div>
                    </div>
                </div>
                <div class="count_price">
                    <div class="catalog_item_price">
                        Ціна:

                    </div>
                    <div class="amount__price">
                        ${price} грн
                    </div>
                </div>

            </div>
            <div data-cart class="catalog_item_btn">
                Додати в кошик
            </div>
    </article>
</li>
`;
 }
 let img;
 let cards = [];
 fetch("http://localhost:3025/product").then(response => {
         return response.json("text")
     })
     .then(data => {
         console.log(data)
         cards = [...data];
         //Считывание данных с базы данных 
         for (let product of data) {

             document
                 .querySelector('.products-grid')
                 .insertAdjacentHTML('afterbegin', generateCatalogProduct(product.id_product, product.cat_id, product.img, product.name_product, product.diameter_product, product.price_product))

         }
         //див корзины
         const cartWrapper = document.querySelector('.cart-content__list');
         const cart = document.querySelector('.cart');
         const cartQuantity = cart.querySelector('.cart__quantity');



         window.addEventListener('click', function(event) {
             // Проверяем что клик был совершен по кнопке "Добавить в корзину"
             if (event.target.hasAttribute('data-cart')) {
                 // Находим карточку с товаром, внутри котрой был совершен клик
                 const card = event.target.closest('.catalog_items');

                 //отображение корзины и увеличение счесчика 
                 const printQuantity = () => {
                     let length = cartWrapper.querySelector('.simplebar-content').children.length;
                     cartQuantity.textContent = length;
                     length > 0 ? cart.classList.add('active') : cart.classList.remove('active');
                 };
                 //Удаление товаров
                 const deleteProducts = (productParent) => {

                     productParent.remove();
                     printQuantity();
                     calsCartPrice();

                 }



                 // Собираем данные с этого товара и записываем их в единый объект productInfo
                 const productInfo = {
                     id: card.querySelector('.catalog_item').getAttribute('data-id'),
                     img: card.querySelector('.img_catalog').getAttribute('src'),
                     title: card.querySelector('.catalog_item_title').innerText,
                     about: card.querySelector('.catalog_item-text').innerText,
                     priceNumber: parseInt(card.querySelector('.amount__price').textContent),
                     counter: card.querySelector('[data-counter]').innerText,
                 };

                 //Сумирование товаров в корзине или отображение нового 
                 const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);
                 if (itemInCart) {
                     const counterElement = itemInCart.querySelector('[data-counter]');

                     counterElement.innerHTML = parseInt(counterElement.innerHTML) + parseInt(productInfo.counter);


                     calsCartPrice();

                     card.querySelector('[data-counter]').innerText = '1';

                 } else {
                     const generateCartProduct = `
                    <li class="cart-content__item">
                    <article class="cart-content__product cart-product" data-id="${productInfo.id}">
                        <img src="${productInfo.img}" alt="" class="cart-product__img">
                        <div class="cart-product__text">
                            <h3 class="cart-product__title">${productInfo.title}</h3>
                            <div class="cart-product__about">
                                ${productInfo.about}
                            </div>
                            <div class="items items--small counter-wrapper">
                                <div class="items__control" data-action="minus">-</div>
                                <div class="items__current" data-counter="">${productInfo.counter}</div>
                                <div class="items__control" data-action="plus">+</div>
                            </div>
                            <span class="cart-product__price">${productInfo.priceNumber} грн</span>
                        </div>
                        <button class="cart-product__delete" aria-label="Видалити товар"></button>
                    </article>
                    </li>
                    `;
                     cartWrapper.querySelector('.simplebar-content').insertAdjacentHTML('beforeend', generateCartProduct);
                     printQuantity();
                     calsCartPrice();
                     //Обнуление коунтера после добавления в корзину 
                     card.querySelector('[data-counter]').innerText = '1';

                 }
                 //Удадение товара 
                 cartWrapper.addEventListener('click', (e) => {
                     if (e.target.classList.contains('cart-product__delete')) {
                         deleteProducts(e.target.closest('.cart-content__item'))
                     }

                 });





             }
             const orderModalOpenProd = document.querySelector('.order-modal__btn');
             const orderModalList = document.querySelector('.order-modal__list');
             let cartFullPrice = document.querySelector('.cart-content__fullprice')
             const ModalWrapper = document.querySelector('.order-modal__list');

             const generateModalProduct = (id, img, title, about, counter, price) => {
                 return `
                <li class="order-modal__item" data-id="${id}">
                                    <article class="order-modal__product order-product">
                                        <img src="${img}" alt="" class="order-product__img">
                                        <div class="order-product__text">
                                            <h3 class="order-product__title">${title}</h3>
                                            <div class="order-product__about">${about}</div>
                                            <div class="order-product-counter">
                                                <div class="order-product__count__text">Кількість:</div>
                                                <div class="order-product__count">${counter}</div>
                                            </div>
                                            <span class="order-product__price">${price} грн</span>
                                        </div>
                                        
                                    </article>
                                </li>
                `;
             }
             const cartProductsList = document.querySelector('.cart-content__list');
             const modal = new GraphModal({
                 isOpen: (modal) => {
                     orderModalList.innerHTML = '';
                     console.log('opened');
                     let array = cartProductsList.querySelector('.simplebar-content').children;
                     let fullpriceModal = parseInt(cartFullPrice.querySelector('.fullprice').textContent);
                     let length = array.length;
                     document.querySelector('.order-modal__summ span').textContent = `${fullpriceModal} грн`;
                     document.querySelector('.order-modal__quantity span').textContent = `${length} шт`;

                     for (item of array) {
                         console.log(item)
                         let id = item.querySelector('.cart-product').dataset.id;
                         let img = item.querySelector('.cart-product__img').getAttribute('src');
                         let title = item.querySelector('.cart-product__title').textContent;
                         let about = item.querySelector('.cart-product__about').innerText;
                         let price = parseInt(item.querySelector('.cart-product__price').textContent);
                         let counter = item.querySelector('[data-counter]').innerText;
                         console.log(id, img, title, about, counter, price);
                         orderModalList.insertAdjacentHTML('afterbegin', generateModalProduct(id, img, title, about, counter, price));

                     };
                 },
                 isClose: () => {
                     console.log('closed');

                 }

             });


         });
     });