const rangeSlider = document.getElementById('range-slider');
let items = document.getElementsByClassName('product-grid_item');
if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
        start: [0, 1000],
        connect: true,
        step: 1,
        range: {
            'min': [0],
            'max': [1000]
        }
    });

    const input0 = document.getElementById('input-0');
    const input1 = document.getElementById('input-1');
    const inputs = [input0, input1];

    rangeSlider.noUiSlider.on('update', function(values, handle) {
        inputs[handle].value = Math.round(values[handle]);
    });

    const setRangeSlider = (i, value) => {
        let arr = [null, null];
        arr[i] = value;

        console.log(arr);

        rangeSlider.noUiSlider.set(arr);
    };

    inputs.forEach((el, index) => {
        el.addEventListener('change', (e) => {
            console.log(index);
            console.log(e.currentTarget.value);
            setRangeSlider(index, e.currentTarget.value);


        });
    });


}