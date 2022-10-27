const fixedBlock = document.querySelector('.filters-price'),
    filters = document.querySelector('.filters'),
    container = document.querySelector('.container'),
    offsetLeft = container.offsetLeft + 15,
    filtersOffsetTop = filters.offsetTop,
    smallOffset = 20;


const fixedScrollBlock = () => {
    let scrollDistance = window.scrollY;

    if (scrollDistance > (filtersOffsetTop - smallOffset)) {
        // fixedBlock.style.left = `${offsetLeft}px`;
        // fixedBlock.classList.add('fixed');

    }
};

window.addEventListener('scroll', fixedScrollBlock)