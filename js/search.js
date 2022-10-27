window.onload = () => {
    let inputSerch = document.querySelector('#input');
    input.oninput = function() {
        let value = this.value.toLowerCase().trim();
        let list = document.querySelectorAll('.products-grid li');
        console.log(list);
        if (value != '') {
            list.forEach(elem => {
                if (elem.querySelector('.catalog_item_title').innerText.toLowerCase().search(value) == -1) {
                    elem.classList.add('hide');

                }
            });
        } else {
            list.forEach(elem => {
                elem.classList.remove('hide');
            });
        };
    };
    console.log(this.value);
};