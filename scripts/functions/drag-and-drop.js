// Drag & drop implemented with Interact.js
export default function dragAndDrop() {
    interact('.draggable')
        .draggable({
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true,
                }),
            ],
            autoScroll: true,
            listeners: {
                move: dragMoveListener,
            },
        });

    function dragMoveListener(event) {
        const target = event.target;
        // Accumulate translation from previous drag events stored in data attributes
        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        target.style.transform = `translate(${x}px, ${y}px)`;
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }
}
