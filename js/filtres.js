let list = document.querySelectorAll('.products-grid li');
let inputs = Array.from(document.querySelectorAll('.filters-price__input'));
let obj = { min: 0, max: 1000 };
let filterPriceBtn = document.querySelector('.filter-price__btn');
let filterNull = document.querySelector('.filter-null__btn');
let filterCatDiamNull = document.querySelector('.filter-catDiam__btn');
filterPriceBtn.addEventListener('click', () => {
    console.log(inputs);
    inputs.map((elem, index) => {
            if (index == 0) {
                obj.min = +elem.value
            }
            if (index == 1) {
                obj.max = +elem.value
            }
        })


    console.log(list);
    list.forEach(elem => {

        if (elem.querySelector('.amount__price').innerText.split(' ')[0].split('.')[0] > obj.max || elem.querySelector('.amount__price').innerText.split(' ')[0].split('.')[0] < obj.min) {

            elem.classList.add('hide');
        }

    });
    filterPriceBtn.disabled = true;
})
filterNull.addEventListener('click', () => {
        //Сброс, не было фильтрации по диаметру и категории
        if (filterPriceBtn.disabled = true) {
            if (filterDiam == null && filterCatalog == null) {
                list.forEach(elem => {
                    elem.classList.remove('hide');
                })
                filterPriceBtn.disabled = false;
            }
            //Сброс,была фильтрации по диаметру 
            if (filterDiam != null && filterCatalog == null) {
                list.forEach(elem => {
                    list.forEach(elem => {
                        if (elem.querySelector('.catalog_item-num').innerText.split(' ')[0] == filterDiam) {
                            elem.classList.remove('hide');

                        }
                        if (elem.querySelector('.catalog_item-num').innerText.split(' ')[0] != filterDiam) {
                            elem.classList.add('hide');

                        }
                        filterPriceBtn.disabled = false;
                    })
                });
            }
            //Сброс, была фильтрация по категории
            if (filterDiam == null && filterCatalog != null) {
                list.forEach(elem => {
                    if (elem.querySelector('[data-categoty]').dataset.categoty == filterCatalog) {
                        elem.classList.remove('hide');

                    }
                    if (elem.querySelector('[data-categoty]').dataset.categoty != filterCatalog) {
                        elem.classList.add('hide');
                    }

                    filterPriceBtn.disabled = false;
                })


            }
            //Сброс,была фильтраци по диаметру и категории
            if (filterDiam != null && filterCatalog != null) {
                list.forEach(elem => {
                    if (elem.querySelector('[data-categoty]').dataset.categoty == filterCatalog && elem.querySelector('.catalog_item-num').innerText.split(' ')[0] == filterDiam) {
                        elem.classList.remove('hide');
                    }
                    if (elem.querySelector('[data-categoty]').dataset.categoty != filterCatalog || elem.querySelector('.catalog_item-num').innerText.split(' ')[0] !== filterDiam) {
                        elem.classList.add('hide');
                    }
                })
                filterPriceBtn.disabled = false;
            }

            obj.min = 0;
            obj.max = 1000;
            console.log(obj.min);
            console.log(obj.max);
        }
    })

let filtersCat = Array.from(document.querySelectorAll('.filter-category__btn'));
let filtersDiam = Array.from(document.querySelectorAll('.filter-diametr__btn'));
let filterCatalog;



filtersCat.forEach((elem) => {
    elem.addEventListener('click', (e) => {
        //Фильтрация категории, есть фильтрация по диаметру 
        if (obj.min == 0 && obj.max == 1000) {
            if (filterDiam != null) {
                let list = document.querySelectorAll('.products-grid li');
                filterCatalog = e.target.dataset.filter;
                list.forEach(elem => {
                    if (elem.querySelector('[data-categoty]').dataset.categoty == e.target.dataset.filter && elem.querySelector('.catalog_item-num').innerText.split(' ')[0] == filterDiam) {
                        elem.classList.remove('hide');

                    }
                    if (elem.querySelector('[data-categoty]').dataset.categoty != e.target.dataset.filter || elem.querySelector('.catalog_item-num').innerText.split(' ')[0] !== filterDiam) {
                        elem.classList.add('hide');
                    }

                })
            }
            //Фильтрация категории, нет фильтрации по диаметру 
            if (filterDiam == null) {
                let list = document.querySelectorAll('.products-grid li');
                list.forEach(elem => {
                    filterCatalog = e.target.dataset.filter;
                    if (elem.querySelector('[data-categoty]').dataset.categoty == e.target.dataset.filter) {
                        elem.classList.remove('hide');

                    }
                    if (elem.querySelector('[data-categoty]').dataset.categoty != e.target.dataset.filter) {
                        elem.classList.add('hide');
                    }

                });
            }
            console.log('price == null');
        }
        if (obj.min != 0 || obj.max != 1000) {
            if (filterDiam != null) {
                let list = document.querySelectorAll('.products-grid li');
                list.forEach(elem => {
                    filterCatalog = e.target.dataset.filter;
                    if (elem.querySelector('[data-categoty]').dataset.categoty == e.target.dataset.filter && elem.querySelector('.catalog_item-num').innerText.split(' ')[0] == filterDiam && elem.querySelector('.amount__price').innerText.split(' ')[0].split('.')[0] < obj.max && elem.querySelector('.amount__price').innerText.split(' ')[0].split('.')[0] > obj.min) {
                        elem.classList.remove('hide');

                    }
                    if (elem.querySelector('[data-categoty]').dataset.categoty != e.target.dataset.filter || elem.querySelector('.catalog_item-num').innerText.split(' ')[0] !== filterDiam || elem.querySelector('.amount__price').innerText.split(' ')[0].split('.')[0] > obj.max || elem.querySelector('.amount__price').innerText.split(' ')[0].split('.')[0] < obj.min) {
                        elem.classList.add('hide');
                    }

                })
            }
            //Фильтрация категории, нет фильтрации по диаметру 
            if (filterDiam == null) {
                let list = document.querySelectorAll('.products-grid li');
                list.forEach(elem => {
                    filterCatalog = e.target.dataset.filter;
                    if (elem.querySelector('[data-categoty]').dataset.categoty == e.target.dataset.filter && elem.querySelector('.amount__price').innerText.split(' ')[0].split('.')[0] < obj.max && elem.querySelector('.amount__price').innerText.split(' ')[0].split('.')[0] > obj.min) {
                        elem.classList.remove('hide');

                    }
                    if (elem.querySelector('[data-categoty]').dataset.categoty != e.target.dataset.filter || elem.querySelector('.amount__price').innerText.split(' ')[0].split('.')[0] > obj.max || elem.querySelector('.amount__price').innerText.split(' ')[0].split('.')[0] < obj.min) {
                        elem.classList.add('hide');
                    }

                });
            }
            console.log('price != null');
        }

    })


})



let filterDiam;
filtersDiam.forEach((elem) => {
        elem.addEventListener('click', (e) => {
            //Фильтрация диаметра, есть фильтрация по категории 

            if (obj.min == 0 && obj.max == 1000) {
                if (filterCatalog != null) {
                    // console.log(e.target.dataset.filter);
                    let list = document.querySelectorAll('.products-grid li');
                    filterDiam = e.target.dataset.filter;
                    console.log(filterDiam);
                    list.forEach(elem => {
                        if (elem.querySelector('.catalog_item-num').innerText.split(' ')[0] == e.target.dataset.filter && elem.querySelector('[data-categoty]').dataset.categoty == filterCatalog) {
                            elem.classList.remove('hide');

                        }
                        if (elem.querySelector('.catalog_item-num').innerText.split(' ')[0] != e.target.dataset.filter || elem.querySelector('[data-categoty]').dataset.categoty != filterCatalog) {
                            elem.classList.add('hide');

                        }

                    });
                }
                //Фильтрация диаметра, нет фильтрации по категории 
                if (filterCatalog == null) {
                    filterDiam = e.target.dataset.filter;
                    console.log(filterDiam);
                    let list = document.querySelectorAll('.products-grid li');
                    list.forEach(elem => {
                        if (elem.querySelector('.catalog_item-num').innerText.split(' ')[0] == e.target.dataset.filter) {
                            elem.classList.remove('hide');

                        }
                        if (elem.querySelector('.catalog_item-num').innerText.split(' ')[0] != e.target.dataset.filter) {
                            elem.classList.add('hide');
                        }

                    });
                }
            }
            if (obj.min != 0 || obj.max != 1000) {
                if (filterCatalog != null) {
                    let list = document.querySelectorAll('.products-grid li');
                    filterDiam = e.target.dataset.filter;
                    list.forEach(elem => {
                        if (elem.querySelector('.catalog_item-num').innerText.split(' ')[0] == e.target.dataset.filter && elem.querySelector('[data-categoty]').dataset.categoty == filterCatalog && elem.querySelector('.amount__price').innerText.split(' ')[0].split('.')[0] < obj.max && elem.querySelector('.amount__price').innerText.split(' ')[0].split('.')[0] > obj.min) {
                            elem.classList.remove('hide');

                        }
                        if (elem.querySelector('.catalog_item-num').innerText.split(' ')[0] != e.target.dataset.filter || elem.querySelector('[data-categoty]').dataset.categoty != filterCatalog || elem.querySelector('.amount__price').innerText.split(' ')[0].split('.')[0] > obj.max || elem.querySelector('.amount__price').innerText.split(' ')[0].split('.')[0] < obj.min) {
                            elem.classList.add('hide');

                        }

                    });
                }
                //Фильтрация диаметра, нет фильтрации по категории 
                if (filterCatalog == null) {
                    filterDiam = e.target.dataset.filter;
                    let list = document.querySelectorAll('.products-grid li');
                    list.forEach(elem => {
                        if (elem.querySelector('.catalog_item-num').innerText.split(' ')[0] == e.target.dataset.filter && elem.querySelector('.amount__price').innerText.split(' ')[0].split('.')[0] < obj.max && elem.querySelector('.amount__price').innerText.split(' ')[0].split('.')[0] > obj.min) {
                            elem.classList.remove('hide');

                        }
                        if (elem.querySelector('.catalog_item-num').innerText.split(' ')[0] != e.target.dataset.filter || elem.querySelector('.amount__price').innerText.split(' ')[0].split('.')[0] > obj.max || elem.querySelector('.amount__price').innerText.split(' ')[0].split('.')[0] < obj.min) {
                            elem.classList.add('hide');
                        }

                    });
                }
            }
        })
    })
    //Сброс категории и диаметра 

filterCatDiamNull.addEventListener('click', () => {
    //Сброс категории и диаметра, цена не менялась
    console.log(list);
    filterDiam = null;
    filterCatalog = null;
    list.forEach(e => {
        e.classList.remove('hide');
    })
    list.forEach(elem => {
        console.log(elem.querySelector('.amount__price').innerText.split(' ')[0].split('.')[0]);
        if (elem.querySelector('.amount__price').innerText.split(' ')[0].split('.')[0] < obj.max && elem.querySelector('.amount__price').innerText.split(' ')[0].split('.')[0] > obj.min) {
            elem.classList.remove('hide');

        } else {
            elem.classList.add('hide');
        }
    });
    console.log(list);


});