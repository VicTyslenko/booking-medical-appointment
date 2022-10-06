import { renderCards, noItems } from "../classes/cards.js";

export default function searchFilter (array) {
    const form = document.querySelector('#sorting-form');
    const cardsWrapper = document.querySelector('.main-cards');
    const search = document.querySelector('.search')
    const urgency = document.querySelector('#sorting-urgency')
    const status = document.querySelector('#status')
    console.log(status.value);
    form.addEventListener('change', (event) => {
        event.preventDefault();
        console.log(event.target.value);

        let filteredArr = [];
        cardsWrapper.innerHTML = '';
        if (!search.value && urgency.value === 'all' && status.value === 'all'){
            noItems(array)
            renderCards(array);
        } else if(search.value && urgency.value === 'all' && status.value === 'all') {
            array.forEach(visit => {
                const obj = Object.values(visit)
                for (let value of obj) {
                    if(value === search.value) {
                        filteredArr.push(visit)
                    }
                }
            })
            renderCards(filteredArr);
        } else if (!search.value && urgency.value && status.value === 'all') {
            filteredArr = array.filter(visit => visit.urgency === urgency.value)
            renderCards(filteredArr);
        } else if (search.value && urgency.value && status.value === 'all') {
            filteredArr = array.filter(visit => (visit.fullName === search.value || visit.doctor === search.value) && visit.urgency === urgency.value)
            renderCards(filteredArr);
        } else if (!search.value && urgency.value === 'all' && status.value) {
            filteredArr = array.filter(visit => visit.status === status.value)
            renderCards(filteredArr);
        } else if (search.value && urgency.value === 'all' && status.value) {
            filteredArr = array.filter(visit => (visit.fullName === search.value || visit.doctor === search.value) && visit.status === status.value)
            renderCards(filteredArr);
        } else if (search.value && urgency.value && status.value) {
            filteredArr = array.filter(visit => (visit.fullName === search.value || visit.doctor === search.value) && visit.status === status.value && visit.urgency === urgency.value)
            renderCards(filteredArr);
        } else if (!search.value && urgency.value && status.value) {
            filteredArr = array.filter(visit => visit.status === status.value && visit.urgency === urgency.value)
            renderCards(filteredArr);
        }
        noItems(filteredArr)
    })
}
   














