import { renderCards } from "./classes/cards.js";


export function filtering (array) {
    const form = document.querySelector('#sorting-form');
    const cardsWrapper = document.querySelector('.main-cards');

    form.addEventListener('change', (event) => {
        event.preventDefault();
        console.log(event.target.value);

        if(event.target === document.querySelector('#sorting-urgency')) {
            cardsWrapper.innerHTML = '';
            if(event.target.value === 'all') {
                renderCards(array)
            } else {
                console.log(array);
                let filteredArr = array.filter(visit => visit.urgency === event.target.value);
                renderCards(filteredArr);
                }

            
        }
    } )








}