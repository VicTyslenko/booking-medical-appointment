import { renderCards, noItems } from "../classes/cards.js";



export default function searchFilter (array) {
    const form = document.querySelector('#sorting-form');
    const cardsWrapper = document.querySelector('.main-cards');
    const search = document.querySelector('.search')
    const urgency = document.querySelector('#sorting-urgency')
    const status = document.querySelector('#status')
    
    const textFieldFilter = (array) => {                // фільтрує масив відповідно до даних в текстовому полі
        if (search.value === '') {                      // якщо в полі пусто, то повертає масив без змін
            return array;
        } else {                                        // якщо є значення, звіряє його з полями fullName, doctor, purpose та description
            let filteredArr;
            filteredArr = array.filter(visit => 
                visit.fullName.toLowerCase().includes(search.value.toLowerCase()) || 
                visit.doctor.toLowerCase().includes(search.value.toLowerCase()) || 
                visit.purpose.toLowerCase().includes(search.value.toLowerCase()) ||
                visit.description.toLowerCase().includes(search.value.toLowerCase())
            );
            return filteredArr;
        }
    }

    const urgencyFieldFilter = (array) => {             // фільтрує масив відповідно до даних в полі urgency
        let filteredArr;
        if (urgency.value !== 'all') {                    
            filteredArr = array.filter(visit => visit.urgency === urgency.value)
        } else {                                        // якщо нічого не вибрано, повертає масив без змін
            return array
        }
        return filteredArr;
    }

    const statusFieldFilter = (array) => {              // фільтрує масив відповідно до даних в полі status
        let filteredArr;
        if (status.value !== 'all') {
            filteredArr = array.filter(visit => visit.status === status.value)
        } else {                                        // якщо нічого не вибрано, повертає масив без змін
            return array
        }
        return filteredArr;
    }

    form.addEventListener('input', (event) => {         // замінив подію change на input щоб відбувались зміни одразу, не чекаючи зміни фокусу
        event.preventDefault();
        console.log(array);

        let filteredArr = array;                        
        cardsWrapper.innerHTML = '';

        // перевіряємо кожне з полів щоразу як відбувається подія
        // таким чином всі раніше змінені значення залишаються
        filteredArr = textFieldFilter(filteredArr);
        filteredArr = statusFieldFilter(filteredArr);
        filteredArr = urgencyFieldFilter(filteredArr);

        noItems(filteredArr);
        renderCards(filteredArr);

    })
}
   














