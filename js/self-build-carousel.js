// A logic based on making an array. This array include an index of shown items.
// Failure: cant make an aimation when carousel moving
function CarouselLogicVer1(options) {
    // =================
    // ==== States =====
    // =================

    let currentItemsIndex = [];
    let amountItems = options.responsive[0];

    // ================
    // ==== Setup =====
    // ================

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
}

// Improvement: make an animation by adding margin-left to the first item
function Carousel(options) {
    // =================
    // ==== States =====
    // =================

    let index = 1;
    let amountItems = options.responsive[0];
    let firstChild;

    // =====================
    // ==== Utilities ======
    // =====================

    function wrapperEls(els, type = "div", clas = "") {
        let parent;
        const wrapper = document.createElement(type);
        wrapper.className = clas;

        if (els.length) {
            parent = els[0].parentNode;
            els.forEach((ele) => {
                wrapper.appendChild(ele);
            });
        } else {
            parent = els.parentNode;
            wrapper.appendChild(eles);
        }
        parent.appendChild(wrapper);

        return wrapper;
    }

    function createEl(htmlString) {
        const div = document.createElement('div');
        div.innerHTML = htmlString;
        return div.childNodes[0];
    }

    // ==============
    // ==== DOM =====
    // ==============

    const carousel = document.querySelector(options.selector);
    const itemsList = carousel.querySelectorAll('.item');

    // =====================
    // ==== Preprocess =====
    // =====================

    // Specify the width of an image based on responsive
    itemsList.forEach((item) => {
        item.style.width = `${100 / amountItems}%`;
    });

    // Wrap items in a container
    const itemsContainer = wrapperEls(itemsList, 'div', 'items-container');

    // Create 2 items at the start and the end of the container
    const first = document.querySelector('.item:first-child');
    const last = document.querySelector('.item:last-child');

    itemsContainer.insertBefore(last.cloneNode(true), first);
    itemsContainer.appendChild(first.cloneNode(true));

    const before = document.querySelector('.item:first-child');
    before.style.marginLeft = -before.offsetWidth * index + 'px';
    before.classList.add('animation');

    // Create 2 navigation buttons
    const leftBtn = createEl(`<button class="left-btn">Left</button>`);
    const rightBtn = createEl(`<button class="right-btn">Right</button>`);

    carousel.insertBefore(leftBtn, itemsContainer);
    carousel.appendChild(rightBtn);

    // =======================
    // ==== Handle events ====
    // =======================

    leftBtn.onclick = () => {
        --index;
        before.style.marginLeft = -before.offsetWidth * index + 'px';
    };

    rightBtn.onclick = () => {
        ++index;
        before.style.marginLeft = -before.offsetWidth * index + 'px';
    };
}