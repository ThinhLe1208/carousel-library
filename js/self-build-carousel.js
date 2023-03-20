function Carousel(options) {
    // =================
    // ==== States =====
    // =================

    let currentItemsIndex = [];
    let amountItems = options.responsive[0];

    // =====================
    // ==== Setup =====
    // =====================

    const carousel = document.querySelector(options.selector);

    // Create div containing items
    const div = document.createElement('div');

    div.className = 'items-container';
    div.innerHTML = carousel.innerHTML;
    carousel.innerHTML = '';
    carousel.appendChild(div);

    // Create 2 buttons for navigation
    carousel.innerHTML += `
    <button class="left-btn">Left</button>
    <button class="right-btn">Right</button>
    `;

    // ==============
    // ==== DOM =====
    // ==============

    const itemsContainer = carousel.querySelector('.items-container');
    const leftBtn = carousel.querySelector('.left-btn');
    const rightBtn = carousel.querySelector('.right-btn');
    const items = Array.from(carousel.querySelectorAll('.item'));

    // =====================
    // ==== Preprocess =====
    // =====================

    // Specify the width of an image based on responsive
    items.forEach((item) => {
        item.style.width = `${100 / amountItems}%`;
    });

    // Specify the currentItemsIndex based on responsive
    for (let index = 0; index <= amountItems - 1; index++) {
        currentItemsIndex.push(index);
    }

    showCurrentItemsIndex();

    // =====================
    // ==== Utilities ======
    // =====================

    // Show and hide item based on currentItemsIndex array
    function showCurrentItemsIndex() {
        items.forEach((item, index) => {
            if (currentItemsIndex.includes(index)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Change currentItemsIndex when moving to the next item
    function nextItem() {
        let nextIndex = currentItemsIndex[currentItemsIndex.length - 1] + 1;

        if (nextIndex > items.length - 1) {
            nextIndex = 0;
        }

        currentItemsIndex.shift();
        currentItemsIndex.push(nextIndex);
    };

    // Change currentItemsIndex when moving to the previous item
    function prevItem() {
        let prevIndex = currentItemsIndex[0] - 1;

        if (prevIndex < 0) {
            prevIndex = items.length - 1;
        }

        currentItemsIndex.pop();
        currentItemsIndex.unshift(prevIndex);
    };

    // Order items based on their index in currentItemsIndex array (support loop feature)
    function orderItem() {
        currentItemsIndex.forEach((currentIndex, index) => {
            items[currentIndex].style.order = index;
        });
    }

    // =======================
    // ==== Handle events ====
    // =======================

    leftBtn.onclick = () => {
        prevItem();
        showCurrentItemsIndex();
        orderItem();
    };

    rightBtn.onclick = () => {
        nextItem();
        showCurrentItemsIndex();
        orderItem();
    };

    console.log(currentItemsIndex);
}