import { renderCards, noItems } from "../classes/cards.js";

export default function searchFilter(array) {
    const form = document.querySelector('#sorting-form');
    const cardsWrapper = document.querySelector('.main-cards');
    const search = document.querySelector('.search');
    const urgency = document.querySelector('#sorting-urgency');
    const status = document.querySelector('#status');

    // Filters by text input — matches fullName, doctor, purpose, or description
    const textFieldFilter = (arr) => {
        if (search.value === '') return arr;
        const query = search.value.toLowerCase();
        return arr.filter(visit =>
            visit.fullName.toLowerCase().includes(query) ||
            visit.doctor.toLowerCase().includes(query) ||
            visit.purpose.toLowerCase().includes(query) ||
            visit.description.toLowerCase().includes(query)
        );
    };

    // Filters by urgency dropdown
    const urgencyFieldFilter = (arr) => {
        if (urgency.value === 'all') return arr;
        return arr.filter(visit => visit.urgency === urgency.value);
    };

    // Filters by status dropdown
    const statusFieldFilter = (arr) => {
        if (status.value === 'all') return arr;
        return arr.filter(visit => visit.status === status.value);
    };

    // Re-render cards on every input change so all active filters apply simultaneously
    form.addEventListener('input', (event) => {
        event.preventDefault();

        cardsWrapper.innerHTML = '';

        let filtered = array;
        filtered = textFieldFilter(filtered);
        filtered = statusFieldFilter(filtered);
        filtered = urgencyFieldFilter(filtered);

        noItems(filtered);
        renderCards(filtered);
    });
}
