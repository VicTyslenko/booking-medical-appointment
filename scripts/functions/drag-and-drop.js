// Варіант 1

// export default function dragAndDrop() {
//     const dragItems = document.querySelector('.main-cards');
//     // console.log(dragItems);
//     dragItems.addEventListener('dragstart', (e) => {
//         e.target.classList.add('opacity-75')
//     });

//     dragItems.addEventListener('dragend', (e) => {
//         e.target.classList.remove('opacity-75');
//     });

//     dragItems.addEventListener('dragover', (e) => {
//         e.preventDefault();
//         const activeElement = dragItems.querySelector('.opacity-75');
//         const currentElement = e.target.closest('.visit-card');
//         if (activeElement !== currentElement && currentElement) {
//             // console.log(currentElement);
//             const nextElement = () => {
//                 if (currentElement === activeElement.nextElementSibling) {
//                     return currentElement.nextElementSibling;
//                 } else {
//                     return currentElement;
//                 }
//             }
//             dragItems.insertBefore(activeElement, nextElement());
//         }
//     });
// }



// Варіант 2
// export default function dragAndDrop() {
//     let cards = document.querySelector('.main-cards')
//     console.log(cards);
//     let cardsList = [...(cards.querySelectorAll('.visit-card'))]
//     console.log(cardsList);
//     for (const card of cardsList) {
//         console.log(card);
//         const moveBtn = card.querySelector('#move')
//         console.log(moveBtn);
//         moveBtn.onmousedown = function (event) {
//             let shiftX = event.clientX - card.getBoundingClientRect().left;
//             let shiftY = event.clientY - card.getBoundingClientRect().top;
//             card.style.position = 'absolute';
//             cards.append(card);
//             moveAt(event.pageX, event.pageY);

//             function moveAt(pageX, pageY) {
//                 card.style.left = pageX - shiftX + 'px';
//                 card.style.top = pageY - shiftY + 'px';
//             }
//             function onMouseMove(event) {
//                 moveAt(event.pageX, event.pageY);
//             }
//             document.addEventListener('mousemove', onMouseMove);

//             moveBtn.onmouseup = function () {
//                 document.removeEventListener('mousemove', onMouseMove);
//                 moveBtn.onmouseup = null;
//             };
//         }
//         card.ondragstart = function () {
//             return false;
//         };
//     }
// }


// Варіант з interact.js
export default function dragAndDrop() {
    // target elements with the "draggable" class
    interact('.draggable')
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
        interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
        })
        ],
        // enable autoScroll
        autoScroll: true,

        listeners: {
        // call this function on every dragmove event
        move: dragMoveListener,

        // call this function on every dragend event
        end (event) {
            let textEl = event.target.querySelector('p')

            textEl && (textEl.textContent =
            'moved a distance of ' +
            (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                        Math.pow(event.pageY - event.y0, 2) | 0))
                .toFixed(2) + 'px')
        }
        }
    })

    function dragMoveListener (event) {
    let target = event.target
    // keep the dragged position in the data-x/data-y attributes
    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
    }

    // this function is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener
}